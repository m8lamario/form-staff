"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { RoleIcon } from "@/components/RoleIcons";
import {
  FORM_STEPS,
  STAFF_ROLES,
  getStepErrors,
  stepForField,
  validateStaffPayload,
  type FieldErrors,
  type FormStepIndex,
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

const LAST_STEP = (FORM_STEPS.length - 1) as FormStepIndex;

function isWideViewport() {
  return window.matchMedia("(min-width: 1024px)").matches;
}

function stepClass(
  current: FormStepIndex,
  step: FormStepIndex,
  growOnDesktop = false,
) {
  const mobile =
    current === step ? "flex min-h-0 flex-1 flex-col" : "hidden";
  const desktop = growOnDesktop
    ? "lg:flex lg:min-h-0 lg:flex-1 lg:flex-col"
    : "lg:flex lg:flex-none lg:flex-col";
  return `${mobile} ${desktop}`;
}

export function StaffForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [step, setStep] = useState<FormStepIndex>(0);
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

  function goNext() {
    const stepErrors = getStepErrors(form, step);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep((current) => Math.min(current + 1, LAST_STEP) as FormStepIndex);
  }

  async function submitApplication() {
    const result = validateStaffPayload({
      ...form,
      participatedLastYear: form.participatedLastYear,
    });

    if (!result.ok) {
      setErrors(result.errors);
      const firstError = (Object.keys(result.errors)[0] ?? "firstName") as keyof typeof result.errors;
      if (!isWideViewport()) {
        setStep(stepForField(firstError));
      }
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
        const nextErrors = payload.errors ?? {};
        setErrors(nextErrors);
        setSubmitError(payload.error ?? "Controlla i campi evidenziati.");
        const firstError = Object.keys(nextErrors)[0] as keyof FieldErrors | undefined;
        if (firstError && !isWideViewport()) {
          setStep(stepForField(firstError));
        }
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

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isWideViewport() && step < LAST_STEP) {
      goNext();
      return;
    }
    await submitApplication();
  }

  const currentStep = FORM_STEPS[step];

  return (
    <form
      onSubmit={onSubmit}
      className="flex h-full min-h-0 flex-col rounded-[24px] border border-white/15 bg-white/10 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.18)] backdrop-blur-sm lg:p-7"
      noValidate
    >
      <div className="mb-3 shrink-0 lg:hidden">
        <div
          className="flex gap-1.5"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={FORM_STEPS.length}
          aria-valuenow={step + 1}
          aria-label="Avanzamento iscrizione"
        >
          {FORM_STEPS.map((item, index) => (
            <span
              key={item.title}
              className={`h-1 flex-1 rounded-full ${index <= step ? "bg-mint" : "bg-white/20"}`}
            />
          ))}
        </div>
        <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-mint">
          Passo {step + 1} di {FORM_STEPS.length} · {currentStep.title}
        </p>
      </div>

      {submitError ? (
        <p
          role="alert"
          className="mb-3 shrink-0 rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white"
        >
          {submitError}
        </p>
      ) : null}

      <div className="flex min-h-0 flex-1 flex-col lg:justify-center lg:gap-4">
        <div
          className={`${
            step < 3 ? "flex min-h-0 flex-1 flex-col" : "hidden"
          } lg:flex lg:flex-none lg:flex-col lg:gap-4`}
        >
          <div className="hidden lg:block">
            <h1 className="font-display text-4xl tracking-widest text-white uppercase xl:text-5xl">
              Unisciti allo staff
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/75">
              Lascia i tuoi dati, dicci se hai già fatto parte dello staff e
              scegli il ruolo che preferisci.
            </p>
          </div>

          <section className={stepClass(step, 0)}>
            <StepHeading step={0} current={step} />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
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
          </section>

          <section className={`${stepClass(step, 1)} lg:mt-0`}>
            <StepHeading step={1} current={step} />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Field
                id="phone"
                label="Telefono"
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
            </div>
          </section>

          <section className={`${stepClass(step, 2)} lg:mt-0`}>
            <StepHeading step={2} current={step} />
            <fieldset className="mt-4">
              <legend className="sr-only lg:not-sr-only lg:mb-3 lg:block lg:text-sm lg:font-medium lg:text-white">
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
                      className={`rounded-2xl border px-4 py-4 text-sm font-semibold tracking-wide transition lg:py-3 ${
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
                <p className="mt-2 text-sm text-mint">
                  {errors.participatedLastYear}
                </p>
              ) : null}
            </fieldset>
          </section>
        </div>

        <section className={`${stepClass(step, 3, false)}`}>
          <StepHeading step={3} current={step} />
          <fieldset className="mt-3 flex min-h-0 flex-1 flex-col lg:mt-3 lg:flex-none">
            <legend className="sr-only lg:not-sr-only lg:mb-3 lg:block lg:text-sm lg:font-medium lg:text-white">
              Ruolo che preferisci svolgere
            </legend>
            <div className="grid min-h-0 flex-1 grid-cols-2 content-start gap-2 overflow-y-auto lg:grid-cols-4 lg:overflow-visible">
              {STAFF_ROLES.map((role) => {
                const selected = form.role === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => update("role", role.id)}
                    className={`flex items-center gap-2.5 rounded-2xl border px-3 py-2.5 text-left transition lg:flex-col lg:items-center lg:justify-center lg:gap-2 lg:px-2 lg:py-3 lg:text-center ${
                      selected
                        ? "border-mint bg-mint text-navy shadow-[0_0_24px_rgba(0,237,175,0.25)]"
                        : "border-white/20 bg-white/5 text-white hover:border-mint/60"
                    }`}
                    aria-pressed={selected}
                  >
                    <span
                      aria-hidden
                      className={`flex h-9 w-9 items-center justify-center rounded-xl lg:h-11 lg:w-11 ${
                        selected ? "bg-navy/10" : "bg-white/10"
                      }`}
                    >
                      <RoleIcon role={role.id} />
                    </span>
                    <span className="text-sm font-semibold leading-tight lg:text-xs">
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
            className="mt-4 hidden w-full rounded-2xl bg-mint px-5 py-3.5 font-display text-lg tracking-[0.18em] text-navy uppercase transition enabled:hover:brightness-110 disabled:cursor-wait disabled:opacity-70 lg:flex lg:items-center lg:justify-center"
          >
            {pending ? "Invio in corso..." : filled ? "Invia candidatura" : "Completa e invia"}
          </button>
        </section>
      </div>

      <div className="mt-4 flex shrink-0 gap-3 lg:hidden">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => {
              setErrors({});
              setStep((current) => Math.max(current - 1, 0) as FormStepIndex);
            }}
            className="rounded-2xl border border-white/20 px-4 py-3.5 text-sm font-semibold text-white"
          >
            Indietro
          </button>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="flex-1 rounded-2xl bg-mint px-5 py-3.5 font-display tracking-[0.16em] text-navy uppercase disabled:opacity-70"
        >
          {step < LAST_STEP
            ? "Avanti"
            : pending
              ? "Invio..."
              : "Invia"}
        </button>
      </div>
    </form>
  );
}

function StepHeading({
  step,
  current,
}: {
  step: FormStepIndex;
  current: FormStepIndex;
}) {
  const item = FORM_STEPS[step];
  return (
    <div className={current === step ? "lg:hidden" : "hidden"}>
      <h1 className="font-display text-3xl tracking-widest text-white uppercase">
        {item.title}
      </h1>
      <p className="mt-1 text-sm text-white/75">{item.description}</p>
    </div>
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
      <span className="mb-1.5 block text-sm font-medium text-white">{label}</span>
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
      {error ? <span className="mt-1.5 block text-sm text-mint">{error}</span> : null}
    </label>
  );
}
