"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PolicyNoticeLinks } from "@/components/PolicyNoticeLinks";
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
  privacyConsent: boolean;
  mediaConsent: boolean | null;
};

const INITIAL_STATE: FormState = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  participatedLastYear: null,
  role: "",
  privacyConsent: false,
  mediaConsent: null,
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
  const mobile = current === step ? "flex flex-col" : "hidden";
  const desktop = growOnDesktop
    ? "lg:flex lg:min-h-0 lg:flex-1 lg:flex-col"
    : "lg:flex lg:flex-none lg:flex-col";
  return `${mobile} ${desktop}`;
}

function stepsClass(current: FormStepIndex, steps: FormStepIndex[]) {
  return steps.includes(current)
    ? "flex flex-col lg:flex-none"
    : "hidden lg:flex lg:flex-none lg:flex-col";
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
          form.role &&
          form.privacyConsent &&
          form.mediaConsent !== null,
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
      className="flex h-fit max-h-full min-h-0 w-full flex-col overflow-hidden rounded-[28px] border border-white/15 bg-white/10 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:p-6 lg:h-full lg:px-5 lg:py-3.5 xl:px-8 xl:py-6"
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
              className={`h-1.5 flex-1 rounded-full ${index <= step ? "bg-mint" : "bg-white/20"}`}
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
          className="mb-5 shrink-0 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white"
        >
          {submitError}
        </p>
      ) : null}

      <div className="min-h-0 flex-1 overflow-y-auto lg:flex lg:flex-col lg:gap-2.5 lg:overflow-hidden">
        <header className="hidden shrink-0 lg:block">
          <h1 className="font-display text-[1.5rem] tracking-[0.14em] text-white uppercase xl:text-3xl">
            Unisciti allo staff
          </h1>
          <p className="mt-1 max-w-xl text-sm leading-5 text-white/70">
            Lascia i tuoi dati, dicci se hai già fatto parte dello staff e
            scegli il ruolo che preferisci.
          </p>
        </header>

        <div className={stepsClass(step, [0, 1])}>
          <StepHeading step={0} current={step} />
          <StepHeading step={1} current={step} />
          <SectionLabel title="Dati personali" />
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:mt-0 lg:gap-2.5">
            <div className={step === 0 ? "contents" : "hidden lg:contents"}>
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
            <div className={step === 1 ? "contents" : "hidden lg:contents"}>
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
          </div>
        </div>

        <section className={`${stepClass(step, 2)} lg:border-t lg:border-white/10 lg:pt-2`}>
          <StepHeading step={2} current={step} />
          <fieldset className="mt-3 lg:mt-0">
            <legend className="sr-only">
              Hai partecipato allo staff l&apos;anno scorso?
            </legend>
            <div className="lg:flex lg:items-center lg:justify-between lg:gap-4">
              <p className="mb-4 hidden text-sm font-medium text-white lg:mb-0 lg:block">
                Hai partecipato allo staff l&apos;anno scorso?
              </p>
              <div className="grid grid-cols-2 gap-3 lg:w-[min(100%,280px)] lg:shrink-0 lg:gap-2">
              {[
                { value: true, label: "Sì" },
                { value: false, label: "No" },
              ].map((option) => (
                <ChoiceButton
                  key={option.label}
                  selected={form.participatedLastYear === option.value}
                  onClick={() => update("participatedLastYear", option.value)}
                >
                  {option.label}
                </ChoiceButton>
              ))}
              </div>
            </div>
            {errors.participatedLastYear ? (
              <p className="mt-2 text-sm text-mint">
                {errors.participatedLastYear}
              </p>
            ) : null}
          </fieldset>
        </section>

        <section className={`${stepClass(step, 3, true)} lg:min-h-[7.75rem] lg:overflow-hidden lg:border-t lg:border-white/10 lg:pt-2`}>
          <StepHeading step={3} current={step} />
          <SectionLabel title="Ruolo preferito" />
          <fieldset className="mt-3 lg:mt-0 lg:flex lg:h-full lg:min-h-0 lg:flex-1 lg:flex-col">
            <legend className="sr-only">Ruolo che preferisci svolgere</legend>
            <div className="grid grid-cols-2 content-start gap-2 lg:grid-cols-12 lg:h-full lg:min-h-0 lg:flex-1 lg:content-stretch lg:gap-2.5 lg:overflow-hidden">
              {STAFF_ROLES.map((role, index) => {
                const selected = form.role === role.id;
                const lastRow = index >= 4;
                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => update("role", role.id)}
                    aria-label={role.label}
                    className={`relative flex min-h-12 items-center gap-2 rounded-2xl border px-2.5 py-2 text-left transition lg:h-full lg:min-h-[2.75rem] lg:w-full lg:px-2.5 lg:py-1.5 ${
                      index === STAFF_ROLES.length - 1
                        ? "col-span-2 mx-auto w-[calc(50%-0.25rem)] lg:mx-0 lg:w-full"
                        : ""
                    } ${
                      lastRow ? "lg:col-span-4" : "lg:col-span-3"
                    } ${
                      selected
                        ? "border-mint bg-mint text-navy shadow-[0_8px_24px_rgba(0,237,175,0.22)]"
                        : "border-white/15 bg-white/5 text-white hover:border-mint/55 hover:bg-white/[0.08]"
                    }`}
                    aria-pressed={selected}
                  >
                    {selected ? (
                      <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-navy text-mint lg:right-2 lg:top-2">
                        <CheckIcon />
                      </span>
                    ) : null}
                    <span
                      aria-hidden
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl lg:h-7 lg:w-7 ${
                        selected ? "bg-navy/10" : "bg-white/10"
                      }`}
                    >
                      <RoleIcon role={role.id} />
                    </span>
                    <span className="min-w-0 pr-4 text-[13px] font-semibold leading-tight lg:line-clamp-2 lg:pr-5 lg:text-[12px]">
                      {role.shortLabel}
                    </span>
                  </button>
                );
              })}
            </div>
            {errors.role ? (
              <p className="mt-2 text-sm text-mint">{errors.role}</p>
            ) : null}
          </fieldset>
        </section>

        <section className={`${stepClass(step, 4)} lg:border-t lg:border-white/10 lg:pt-2`}>
          <StepHeading step={4} current={step} />
          <div className="mt-3 flex flex-col gap-3 lg:mt-0 lg:gap-2">
            <PolicyNoticeLinks />

            <div className="grid gap-3 lg:grid-cols-2 lg:gap-2">
              <div className="rounded-2xl border border-mint/35 bg-mint/[0.07] px-3 py-3 sm:px-5 sm:py-4 lg:flex lg:items-center lg:px-3 lg:py-1.5">
                <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-mint lg:hidden">
                  Obbligatorio
                </p>
                <label className="flex cursor-pointer items-start gap-3 lg:items-center">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-5 w-5 shrink-0 accent-[#00edaf] lg:mt-0 lg:h-4 lg:w-4"
                    checked={form.privacyConsent}
                    onChange={(event) =>
                      update("privacyConsent", event.target.checked)
                    }
                  />
                  <span className="text-sm leading-6 text-white lg:text-[12px] lg:leading-4">
                    Ho letto l&apos;
                    <Link
                      href="/privacy"
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-mint underline underline-offset-2"
                    >
                      informativa privacy
                    </Link>
                    <span className="lg:hidden"> e ne ho compreso i contenuti</span>
                    .
                  </span>
                </label>
                {errors.privacyConsent ? (
                  <p className="mt-3 text-sm text-mint lg:mt-1">{errors.privacyConsent}</p>
                ) : null}
              </div>

              <div
                role="group"
                aria-labelledby="media-consent-label media-consent-label-desktop"
                className="rounded-2xl border border-white/15 bg-white/[0.04] px-3 py-3 sm:px-5 sm:py-4 lg:flex lg:items-center lg:gap-3 lg:px-3 lg:py-1.5"
              >
                <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2 lg:hidden">
                  <p id="media-consent-label" className="text-sm font-medium text-white">
                    Foto, video e social
                  </p>
                  <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.16em] text-white/55">
                    Facoltativo
                  </span>
                </div>
                <p id="media-consent-label-desktop" className="hidden shrink-0 text-[12px] font-medium text-white lg:block">
                  Riprese
                </p>
                <p className="mb-2 text-sm leading-5 text-white/70 lg:sr-only">
                  Dopo aver letto la{" "}
                  <Link
                    href="/social"
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold text-mint underline underline-offset-2"
                  >
                    liberatoria riprese
                  </Link>
                  , acconsenti a foto, video e pubblicazione sui canali
                  ufficiali? Il No non pregiudica la candidatura.
                </p>
                <div className="grid grid-cols-2 gap-3 lg:min-w-0 lg:flex-1 lg:gap-2">
                  {[
                    { value: true, label: "Sì, acconsento", compact: "Sì" },
                    { value: false, label: "No", compact: "No" },
                  ].map((option) => (
                    <ChoiceButton
                      key={option.label}
                      selected={form.mediaConsent === option.value}
                      onClick={() => update("mediaConsent", option.value)}
                      ariaLabel={option.label}
                    >
                      <span className="lg:hidden">{option.label}</span>
                      <span className="hidden lg:inline">{option.compact}</span>
                    </ChoiceButton>
                  ))}
                </div>
                {errors.mediaConsent ? (
                  <p className="mt-3 text-sm text-mint lg:mt-1">{errors.mediaConsent}</p>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="mt-4 hidden min-h-11 w-full shrink-0 rounded-2xl bg-mint px-5 py-2.5 font-display text-lg tracking-[0.2em] text-navy uppercase shadow-[0_12px_36px_rgba(0,237,175,0.28)] transition enabled:hover:brightness-110 disabled:cursor-wait disabled:opacity-70 lg:mt-2 lg:flex lg:items-center lg:justify-center xl:mt-5"
      >
        {pending ? "Invio in corso..." : filled ? "Invia candidatura" : "Completa e invia"}
      </button>

      <div className="mt-3 flex shrink-0 gap-3 lg:hidden">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => {
              setErrors({});
              setStep((current) => Math.max(current - 1, 0) as FormStepIndex);
            }}
            className="min-h-11 rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold text-white"
          >
            Indietro
          </button>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="min-h-11 flex-1 rounded-2xl bg-mint px-5 py-3 font-display tracking-[0.16em] text-navy uppercase shadow-[0_8px_24px_rgba(0,237,175,0.22)] disabled:opacity-70"
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

function SectionLabel({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-4 hidden lg:mb-1 lg:block">
      <h2 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-mint">
        {title}
      </h2>
      {description ? (
        <p className="mt-1.5 text-sm leading-6 text-white/60">{description}</p>
      ) : null}
    </div>
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
      <h1 className="font-display text-[1.65rem] tracking-[0.12em] text-white uppercase sm:text-3xl sm:tracking-[0.14em]">
        {item.title}
      </h1>
      <p className="mt-1 text-sm leading-5 text-white/75">{item.description}</p>
    </div>
  );
}

function ChoiceButton({
  selected,
  onClick,
  children,
  ariaLabel,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={ariaLabel}
      className={`min-h-12 rounded-2xl border px-4 py-3 text-sm font-semibold tracking-wide transition lg:min-h-9 lg:px-3 lg:py-1.5 ${
        selected
          ? "border-mint bg-mint text-navy"
          : "border-white/20 bg-white/5 text-white hover:border-mint/60"
      }`}
    >
      {children}
    </button>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-2.5 w-2.5" fill="none" aria-hidden>
      <path
        d="M3.5 8.2 6.4 11l6.1-6.4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
      <span className="mb-1.5 block text-[13px] font-medium text-white/90">
        {label}
      </span>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-2xl border bg-white/95 px-4 py-3 text-[15px] text-navy outline-none placeholder:text-navy/40 lg:py-2 ${
          error ? "border-mint ring-2 ring-mint/40" : "border-transparent focus:ring-2 focus:ring-mint"
        }`}
      />
      {error ? <span className="mt-1.5 block text-sm text-mint">{error}</span> : null}
    </label>
  );
}
