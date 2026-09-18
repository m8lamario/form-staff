"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { RoleIcon } from "@/components/RoleIcons";
import {
  STAFF_ROLES,
  validateStaffPayload,
  type FieldErrors,
  type StaffRoleId,
} from "@/lib/staff";

type FormState = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  participatedLastYear: boolean | null;
  role: StaffRoleId | "";
};

const INITIAL_STATE: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  participatedLastYear: null,
  role: "",
};

export function StaffForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [pending, setPending] = useState(false);

  const filled = useMemo(
    () =>
      Boolean(
        form.firstName &&
          form.lastName &&
          form.phone &&
          form.email &&
          form.participatedLastYear !== null &&
          form.role,
      ),
    [form],
  );

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSubmitError("");
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = validateStaffPayload({
      ...form,
      participatedLastYear: form.participatedLastYear,
    });

    if (!result.ok) {
      setErrors(result.errors);
      return;
    }

    setPending(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const payload = (await response.json()) as {
        errors?: FieldErrors;
        error?: string;
      };

      if (response.status === 409 || response.status === 400) {
        setErrors(payload.errors ?? {});
        setSubmitError(payload.error ?? "Controlla i campi evidenziati.");
        return;
      }

      if (!response.ok) {
        setSubmitError("Invio non riuscito. Riprova tra poco.");
        return;
      }

      router.push("/grazie");
    } catch {
      setSubmitError("Connessione non disponibile. Riprova.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {submitError ? (
        <p
          role="alert"
          className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white"
        >
          {submitError}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id="firstName"
          label="Nome"
          value={form.firstName}
          error={errors.firstName}
          autoComplete="given-name"
          onChange={(value) => update("firstName", value)}
        />
        <Field
          id="lastName"
          label="Cognome"
          value={form.lastName}
          error={errors.lastName}
          autoComplete="family-name"
          onChange={(value) => update("lastName", value)}
        />
      </div>

      <Field
        id="phone"
        label="Numero di telefono"
        type="tel"
        value={form.phone}
        error={errors.phone}
        autoComplete="tel"
        placeholder="+39 3xx xxx xxxx"
        onChange={(value) => update("phone", value)}
      />

      <Field
        id="email"
        label="Email"
        type="email"
        value={form.email}
        error={errors.email}
        autoComplete="email"
        placeholder="nome@email.com"
        onChange={(value) => update("email", value)}
      />

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-white">
          Hai partecipato allo staff l&apos;anno scorso?
        </legend>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: true, label: "Sì" },
            { value: false, label: "No" },
          ].map((option) => {
            const selected = form.participatedLastYear === option.value;
            return (
              <button
                key={option.label}
                type="button"
                onClick={() => update("participatedLastYear", option.value)}
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold tracking-wide transition ${
                  selected
                    ? "border-mint bg-mint text-navy"
                    : "border-white/20 bg-white/5 text-white hover:border-mint/60"
                }`}
                aria-pressed={selected}
              >
                {option.label}
              </button>
            );
          })}
        </div>
        {errors.participatedLastYear ? (
          <p className="mt-2 text-sm text-mint">{errors.participatedLastYear}</p>
        ) : null}
      </fieldset>

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-white">
          Ruolo che preferisci svolgere
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {STAFF_ROLES.map((role) => {
            const selected = form.role === role.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => update("role", role.id)}
                className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                  selected
                    ? "border-mint bg-mint text-navy shadow-[0_0_24px_rgba(0,237,175,0.25)]"
                    : "border-white/20 bg-white/5 text-white hover:border-mint/60"
                }`}
                aria-pressed={selected}
              >
                <span
                  aria-hidden
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    selected ? "bg-navy/10" : "bg-white/10"
                  }`}
                >
                  <RoleIcon role={role.id} />
                </span>
                <span className="text-sm font-semibold leading-tight">
                  {role.label}
                </span>
              </button>
            );
          })}
        </div>
        {errors.role ? (
          <p className="mt-2 text-sm text-mint">{errors.role}</p>
        ) : null}
      </fieldset>

      <button
        type="submit"
        disabled={pending}
        className="flex w-full items-center justify-center rounded-2xl bg-mint px-5 py-4 font-display text-lg tracking-[0.18em] text-navy uppercase transition enabled:hover:brightness-110 disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? "Invio in corso..." : filled ? "Invia candidatura" : "Completa e invia"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  autoComplete,
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <label className="block" htmlFor={id}>
      <span className="mb-2 block text-sm font-medium text-white">{label}</span>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-2xl border bg-white/95 px-4 py-3 text-navy outline-none placeholder:text-navy/40 ${
          error ? "border-mint ring-2 ring-mint/40" : "border-transparent focus:ring-2 focus:ring-mint"
        }`}
      />
      {error ? <span className="mt-2 block text-sm text-mint">{error}</span> : null}
    </label>
  );
}
