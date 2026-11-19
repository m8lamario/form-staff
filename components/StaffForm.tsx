"use client";

import { PolicyNoticeLinks } from "@/components/PolicyNoticeLinks";
import { RoleIcon } from "@/components/RoleIcons";
import { ageBandFromBirth } from "@/lib/age";
import {
  ADULT_MEDIA_TEXT,
  AGE_DECLARATION_TEXT,
  G3_TEXT,
  GUARDIAN_RELATIONS,
  MEDIA_KEYS,
  commsFutureText,
} from "@/lib/consent-copy";
import { POLICY_PATHS } from "@/lib/legal";
import {
  STAFF_ROLES,
  emptyStaffForm,
  getStepErrors,
  isAdultOnlyRole,
  isMediaRole,
  stepForField,
  stepsFor,
  validateStaffPayload,
  type FieldErrors,
  type StaffFormInput,
} from "@/lib/staff";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useState } from "react";

const NOTICE_KEY = "leonessa_staff_notice";

export function StaffForm() {
  const router = useRouter();
  const [form, setForm] = useState<StaffFormInput>(emptyStaffForm);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [pending, setPending] = useState(false);

  const computedAge = ageBandFromBirth(form.birthDate, new Date());
  const uiAge =
    computedAge ??
    (form.ageDeclaration === "adult" || form.ageDeclaration === "minor16_17"
      ? form.ageDeclaration
      : null);
  const steps = stepsFor(uiAge === "underage" ? null : uiAge);
  const safeStep = Math.min(step, steps.length - 1);
  const currentStep = steps[safeStep];
  const minor = uiAge === "minor16_17";

  const filled = useMemo(() => validateStaffPayload(form).ok, [form]);

  useEffect(() => {
    const computed = ageBandFromBirth(form.birthDate, new Date());
    const shown =
      computed ??
      (form.ageDeclaration === "adult" || form.ageDeclaration === "minor16_17"
        ? form.ageDeclaration
        : null);
    setStep((current) =>
      Math.min(current, stepsFor(shown === "underage" ? null : shown).length - 1),
    );
  }, [form.birthDate, form.ageDeclaration]);

  useEffect(() => {
    if (minor && isAdultOnlyRole(form.role)) {
      setForm((current) => ({ ...current, role: "" }));
    }
  }, [minor, form.role]);

  function update<K extends keyof StaffFormInput>(key: K, value: StaffFormInput[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSubmitError("");
  }

  function goNext() {
    const stepErrors = getStepErrors(form, safeStep);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep((current) => Math.min(current + 1, steps.length - 1));
  }

  async function submitApplication() {
    const result = validateStaffPayload(form);
    if (!result.ok) {
      setErrors(result.errors);
      const firstError = Object.keys(result.errors)[0];
        if (firstError && !isWideViewport()) {
        setStep(stepForField(firstError, uiAge === "underage" ? null : uiAge));
      }
      setSubmitError("Controlla i campi evidenziati.");
      return;
    }

    setPending(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = (await response.json()) as {
        errors?: FieldErrors;
        error?: string;
        notice?: unknown;
      };
      if (response.status === 409 || response.status === 400) {
        const nextErrors = payload.errors ?? {};
        setErrors(nextErrors);
        setSubmitError(payload.error ?? "Controlla i campi evidenziati.");
        const firstError = Object.keys(nextErrors)[0];
        if (firstError && !isWideViewport()) {
          setStep(stepForField(firstError, uiAge === "underage" ? null : uiAge));
        }
        return;
      }
      if (!response.ok) {
        setSubmitError("Invio non riuscito. Riprova tra poco.");
        return;
      }
      sessionStorage.setItem(NOTICE_KEY, JSON.stringify(payload.notice ?? null));
      router.push("/grazie");
    } catch {
      setSubmitError("Connessione non disponibile. Riprova.");
    } finally {
      setPending(false);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isWideViewport() && safeStep < steps.length - 1) {
      goNext();
      return;
    }
    await submitApplication();
  }

  const show = (id: (typeof steps)[number]["id"]) => {
    const index = steps.findIndex((item) => item.id === id);
    if (index < 0) return "hidden";
    const mobile = index === safeStep ? "flex flex-col" : "hidden";
    const desktop =
      id === "role"
        ? "lg:flex lg:min-h-0 lg:flex-1 lg:flex-col"
        : "lg:flex lg:flex-none lg:flex-col";
    return `${mobile} ${desktop}`;
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex h-fit max-h-full min-h-0 w-full flex-col overflow-hidden rounded-[28px] border border-white/15 bg-white/10 p-4 shadow-[0_20px_80px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:p-6 lg:h-full lg:max-h-[calc(100dvh-6.5rem)] lg:overflow-hidden lg:px-5 lg:py-3.5 xl:max-h-[calc(100dvh-7rem)] xl:px-8 xl:py-6"
      noValidate
    >
      <div className="mb-3 shrink-0 lg:hidden">
        <div className="flex gap-1.5" role="progressbar" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={safeStep + 1} aria-label="Avanzamento iscrizione">
          {steps.map((item, index) => (
            <span key={item.id} className={`h-1.5 flex-1 rounded-full ${index <= safeStep ? "bg-mint" : "bg-white/20"}`} />
          ))}
        </div>
        <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-mint">
          Passo {safeStep + 1} di {steps.length} · {currentStep.title}
        </p>
      </div>

      {submitError ? (
        <p role="alert" className="mb-5 shrink-0 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white">
          {submitError}
        </p>
      ) : null}

      <div className="min-h-0 flex-1 overflow-y-auto lg:flex lg:flex-col lg:gap-2.5 lg:overflow-y-auto lg:overscroll-contain">
        <header className="hidden shrink-0 lg:block">
          <h1 className="font-display text-[1.5rem] tracking-[0.14em] text-white uppercase xl:text-3xl">
            Unisciti allo staff
          </h1>
          <p className="mt-1 max-w-xl text-sm leading-5 text-white/70">
            Volontariato dai 16 anni. Se hai 16 o 17 anni, la candidatura vale dopo la conferma di un genitore.
          </p>
        </header>

        <div className={safeStep <= 1 ? "flex flex-col lg:flex-none" : "hidden lg:flex lg:flex-none lg:flex-col"}>
          <StepHeading stepId="identity" currentId={currentStep.id} steps={steps} />
          <StepHeading stepId="contacts" currentId={currentStep.id} steps={steps} />
          <SectionLabel title="Dati personali" />
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:mt-0 lg:gap-2.5">
            <div className={safeStep === 0 ? "contents" : "hidden lg:contents"}>
              <Field id="firstName" label="Nome" value={form.firstName} error={errors.firstName} autoComplete="given-name" onChange={(value) => update("firstName", value)} />
              <Field id="lastName" label="Cognome" value={form.lastName} error={errors.lastName} autoComplete="family-name" onChange={(value) => update("lastName", value)} />
              <div className="sm:col-span-2">
                <Field id="birthDate" label="Data di nascita" type="date" value={form.birthDate} error={errors.birthDate} autoComplete="bday" onChange={(value) => update("birthDate", value)} />
              </div>
              <fieldset className="sm:col-span-2">
                <legend className="mb-2 text-[13px] font-medium text-white/90">Fascia d&apos;età</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {(Object.keys(AGE_DECLARATION_TEXT) as Array<keyof typeof AGE_DECLARATION_TEXT>).map((key) => (
                    <ChoiceButton key={key} selected={form.ageDeclaration === key} onClick={() => update("ageDeclaration", key)}>
                      {AGE_DECLARATION_TEXT[key]}
                    </ChoiceButton>
                  ))}
                </div>
                {errors.ageDeclaration ? <p className="mt-2 text-sm text-mint">{errors.ageDeclaration}</p> : null}
              </fieldset>
            </div>
            <div className={safeStep === 1 ? "contents" : "hidden lg:contents"}>
              <Field id="phone" label="Telefono" type="tel" value={form.phone} error={errors.phone} autoComplete="tel" placeholder="+39 3xx xxx xxxx" onChange={(value) => update("phone", value)} />
              <Field id="email" label="Email" type="email" value={form.email} error={errors.email} autoComplete="email" placeholder="nome@email.com" onChange={(value) => update("email", value)} />
            </div>
          </div>
        </div>

        <section className={`${show("experience")} lg:border-t lg:border-white/10 lg:pt-2`}>
          <StepHeading stepId="experience" currentId={currentStep.id} steps={steps} />
          <fieldset className="mt-3 lg:mt-0">
            <legend className="sr-only">Hai partecipato allo staff l&apos;anno scorso?</legend>
            <div className="lg:flex lg:items-center lg:justify-between lg:gap-4">
              <p className="mb-4 hidden text-sm font-medium text-white lg:mb-0 lg:block">Hai partecipato allo staff l&apos;anno scorso?</p>
              <div className="grid grid-cols-2 gap-3 lg:w-[min(100%,280px)] lg:shrink-0">
                <ChoiceButton selected={form.participatedLastYear === true} onClick={() => update("participatedLastYear", true)}>Sì</ChoiceButton>
                <ChoiceButton selected={form.participatedLastYear === false} onClick={() => update("participatedLastYear", false)}>No</ChoiceButton>
              </div>
            </div>
            {errors.participatedLastYear ? <p className="mt-2 text-sm text-mint">{errors.participatedLastYear}</p> : null}
          </fieldset>
        </section>

        <section className={`${show("role")} lg:min-h-[7.75rem] lg:overflow-visible lg:border-t lg:border-white/10 lg:pt-2`}>
          <StepHeading stepId="role" currentId={currentStep.id} steps={steps} />
          <SectionLabel title="Ruolo preferito" />
          <fieldset className="mt-3 lg:mt-0">
            <legend className="sr-only">Ruolo che preferisci svolgere</legend>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-12">
              {STAFF_ROLES.map((role) => {
                const locked = minor && isAdultOnlyRole(role.id);
                const selected = form.role === role.id;
                return (
                  <button
                    key={role.id}
                    type="button"
                    disabled={locked}
                    onClick={() => update("role", role.id)}
                    aria-label={locked ? `${role.label}, riservato ai maggiorenni` : role.label}
                    aria-pressed={selected}
                    className={`relative flex min-h-12 items-center gap-2 rounded-2xl border px-2.5 py-2 text-left transition lg:col-span-4 ${
                      locked
                        ? "cursor-not-allowed border-white/10 bg-white/5 text-white/40"
                        : selected
                          ? "border-mint bg-mint text-navy shadow-[0_8px_24px_rgba(0,237,175,0.22)]"
                          : "border-white/15 bg-white/5 text-white hover:border-mint/55"
                    }`}
                  >
                    <span aria-hidden className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${selected && !locked ? "bg-navy/10" : "bg-white/10"}`}>
                      <RoleIcon role={role.id} />
                    </span>
                    <span className="min-w-0 text-[13px] font-semibold leading-tight">
                      {role.shortLabel}
                      {locked ? <span className="mt-0.5 block text-[10px] font-medium uppercase tracking-wide">Riservato ai maggiorenni</span> : null}
                    </span>
                  </button>
                );
              })}
            </div>
            {errors.role ? <p className="mt-2 text-sm text-mint">{errors.role}</p> : null}
            {minor && isMediaRole(form.role) ? (
              <p className="mt-2 text-sm text-white/70">
                Per questo ruolo la cessione dei diritti la conferma il genitore. Senza quella conferma il ruolo andrà cambiato.
              </p>
            ) : null}
          </fieldset>
        </section>

        {minor ? (
          <section className={`${show("guardian")} lg:border-t lg:border-white/10 lg:pt-2`}>
            <StepHeading stepId="guardian" currentId={currentStep.id} steps={steps} />
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field id="guardianFirstName" label="Nome del genitore o tutore" value={form.guardianFirstName} error={errors.guardianFirstName} onChange={(value) => update("guardianFirstName", value)} />
              <Field id="guardianLastName" label="Cognome del genitore o tutore" value={form.guardianLastName} error={errors.guardianLastName} onChange={(value) => update("guardianLastName", value)} />
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-[13px] font-medium text-white/90">Rapporto</span>
                <select
                  value={form.guardianRelation}
                  onChange={(event) => update("guardianRelation", event.target.value as StaffFormInput["guardianRelation"])}
                  className="w-full rounded-2xl border border-transparent bg-white/95 px-4 py-3 text-[15px] text-navy outline-none focus:ring-2 focus:ring-mint"
                >
                  <option value="">Seleziona</option>
                  {GUARDIAN_RELATIONS.map((item) => (
                    <option key={item.id} value={item.id}>{item.label}</option>
                  ))}
                </select>
                {errors.guardianRelation ? <span className="mt-1.5 block text-sm text-mint">{errors.guardianRelation}</span> : null}
              </label>
              <Field id="guardianEmail" label="Email del genitore" type="email" value={form.guardianEmail} error={errors.guardianEmail} onChange={(value) => update("guardianEmail", value)} />
              <Field id="guardianPhone" label="Telefono del genitore" type="tel" value={form.guardianPhone} error={errors.guardianPhone} onChange={(value) => update("guardianPhone", value)} />
              <fieldset className="sm:col-span-2">
                <legend className="mb-2 text-[13px] font-medium text-white/90">Responsabilità genitoriale</legend>
                <div className="grid gap-2">
                  <ChoiceButton selected={form.g3 === "other_parent"} onClick={() => update("g3", "other_parent")}>{G3_TEXT.other_parent}</ChoiceButton>
                  <ChoiceButton selected={form.g3 === "sole_holder"} onClick={() => update("g3", "sole_holder")}>{G3_TEXT.sole_holder}</ChoiceButton>
                </div>
                {errors.g3 ? <p className="mt-2 text-sm text-mint">{errors.g3}</p> : null}
              </fieldset>
              {form.g3 === "other_parent" ? (
                <>
                  <Field id="secondGuardianFirstName" label="Nome dell'altro genitore" value={form.secondGuardianFirstName} error={errors.secondGuardianFirstName} onChange={(value) => update("secondGuardianFirstName", value)} />
                  <Field id="secondGuardianLastName" label="Cognome dell'altro genitore" value={form.secondGuardianLastName} error={errors.secondGuardianLastName} onChange={(value) => update("secondGuardianLastName", value)} />
                  <div className="sm:col-span-2">
                    <Field id="secondGuardianEmail" label="Email dell'altro genitore" type="email" value={form.secondGuardianEmail} error={errors.secondGuardianEmail} onChange={(value) => update("secondGuardianEmail", value)} />
                  </div>
                </>
              ) : null}
            </div>
            <p className="mt-3 text-sm text-white/70">
              Inserire questi dati non è un&apos;autorizzazione: il genitore riceverà un&apos;email per confermare.
            </p>
          </section>
        ) : null}

        <section className={`${show("privacy")} lg:border-t lg:border-white/10 lg:pt-2`}>
          <StepHeading stepId="privacy" currentId={currentStep.id} steps={steps} />
          <div className="mt-3 flex flex-col gap-3">
            <PolicyNoticeLinks minor={minor} />
            {uiAge === "underage" ? (
              <p className="rounded-2xl border border-mint/40 bg-mint/10 px-3 py-3 text-sm text-white">
                Per candidarti allo staff devi aver compiuto 16 anni.
              </p>
            ) : uiAge === null ? (
              <p className="text-sm text-white/70">
                Inserisci la data di nascita e la fascia d&apos;età per vedere le caselle giuste.
              </p>
            ) : minor ? (
              <>
                <CheckField id="privacyRead" checked={form.privacyRead} error={errors.privacyRead} onChange={(value) => update("privacyRead", value)}>
                  Ho letto, insieme ai miei genitori, l&apos;<DocLink href={POLICY_PATHS.privacy}>informativa privacy</DocLink> e l&apos;<DocLink href={POLICY_PATHS.minori}>informativa per minori</DocLink>.
                </CheckField>
                <CheckField id="termsRead" checked={form.termsRead} error={errors.termsRead} onChange={(value) => update("termsRead", value)}>
                  Ho letto le <DocLink href={POLICY_PATHS.termini}>condizioni</DocLink> e mi impegno a rispettare le regole di condotta. So che la candidatura vale solo dopo la conferma di un genitore.
                </CheckField>
                <CheckField id="g16" checked={form.g16} onChange={(value) => update("g16", value)}>
                  <strong>Accordo del minore:</strong> ho letto la <DocLink href={POLICY_PATHS.socialMinori}>liberatoria</DocLink>, so come verranno usate le mie foto, i miei video e i contenuti che realizzerò, e sono d&apos;accordo. Senza questa casella le autorizzazioni non si attivano.
                </CheckField>
              </>
            ) : (
              <>
                <CheckField id="privacyRead" checked={form.privacyRead} error={errors.privacyRead} onChange={(value) => update("privacyRead", value)}>
                  {linkedAdultPrivacy()}
                </CheckField>
                <CheckField id="termsAccepted" checked={form.termsAccepted} error={errors.termsAccepted} onChange={(value) => update("termsAccepted", value)}>
                  Accetto le <DocLink href={POLICY_PATHS.termini}>condizioni della candidatura staff volontario e le regole di condotta</DocLink> (versione 1.0).
                </CheckField>
                {isMediaRole(form.role) ? (
                  <CheckField id="rightsAssignment" checked={form.rightsAssignment} error={errors.rightsAssignment} onChange={(value) => update("rightsAssignment", value)}>
                    Cedo a ESL, a titolo gratuito, i diritti di utilizzazione economica sui contenuti che realizzerò come staff, con facoltà di sublicenza ai media partner di ESL, nei termini dell&apos;<DocLink href={POLICY_PATHS.diritti}>art. 8 delle condizioni</DocLink>. I miei diritti morali di autore restano salvi.
                  </CheckField>
                ) : null}
                <fieldset className="rounded-2xl border border-white/15 bg-white/[0.04] px-3 py-3">
                  <legend className="px-1 text-sm font-medium text-white">
                    Autorizzo ESL a pubblicare foto e video in cui compaio, con il mio nome e il mio ruolo nello staff, per:
                  </legend>
                  <div className="mt-2 space-y-2">
                    {MEDIA_KEYS.map((key) => (
                      <CheckField key={key} id={key} checked={form[key]} onChange={(value) => update(key, value)}>
                        {ADULT_MEDIA_TEXT[key]}
                      </CheckField>
                    ))}
                  </div>
                  <p className="mt-3 text-sm leading-5 text-white/70">
                    Spuntando una casella confermi di aver letto la <DocLink href={POLICY_PATHS.social}>liberatoria completa</DocLink> (versione 2.0). Le caselle sono facoltative: puoi candidarti anche senza spuntarne nessuna. Puoi revocare ogni autorizzazione in qualsiasi momento scrivendo a privacy@legacalciostudenti.it.
                  </p>
                </fieldset>
                <CheckField id="comms_future" checked={form.comms_future} onChange={(value) => update("comms_future", value)}>
                  {commsFutureText}
                </CheckField>
              </>
            )}
          </div>
        </section>
      </div>

      <button type="submit" disabled={pending} className="mt-4 hidden min-h-11 w-full shrink-0 rounded-2xl bg-mint px-5 py-2.5 font-display text-lg tracking-[0.2em] text-navy uppercase disabled:opacity-70 lg:mt-2 lg:flex lg:items-center lg:justify-center">
        {pending ? "Invio in corso..." : filled ? "Invia candidatura" : "Completa e invia"}
      </button>
      <div className="mt-3 flex shrink-0 gap-3 lg:hidden">
        {safeStep > 0 ? (
          <button type="button" onClick={() => { setErrors({}); setStep((current) => Math.max(current - 1, 0)); }} className="min-h-11 rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold text-white">
            Indietro
          </button>
        ) : null}
        <button type="submit" disabled={pending} className="min-h-11 flex-1 rounded-2xl bg-mint px-5 py-3 font-display tracking-[0.16em] text-navy uppercase disabled:opacity-70">
          {safeStep < steps.length - 1 ? "Avanti" : pending ? "Invio..." : "Invia"}
        </button>
      </div>
    </form>
  );
}

function linkedAdultPrivacy() {
  return (
    <>
      Ho letto l&apos;<DocLink href={POLICY_PATHS.privacy}>informativa privacy</DocLink> (versione 2.0) e ne ho compreso i contenuti.
    </>
  );
}

function isWideViewport() {
  return window.matchMedia("(min-width: 1024px)").matches;
}

function SectionLabel({ title }: { title: string }) {
  return (
    <div className="mb-4 hidden lg:mb-1 lg:block">
      <h2 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-mint">{title}</h2>
    </div>
  );
}

function StepHeading({
  stepId,
  currentId,
  steps,
}: {
  stepId: string;
  currentId: string;
  steps: ReturnType<typeof stepsFor>;
}) {
  const item = steps.find((step) => step.id === stepId);
  if (!item) return null;
  return (
    <div className={currentId === stepId ? "lg:hidden" : "hidden"}>
      <h1 className="font-display text-[1.65rem] tracking-[0.12em] text-white uppercase">{item.title}</h1>
      <p className="mt-1 text-sm leading-5 text-white/75">{item.description}</p>
    </div>
  );
}

function ChoiceButton({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={selected} className={`min-h-12 rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${selected ? "border-mint bg-mint text-navy" : "border-white/20 bg-white/5 text-white hover:border-mint/60"}`}>
      {children}
    </button>
  );
}

function DocLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} target="_blank" rel="noreferrer" className="font-semibold text-mint underline underline-offset-2" onClick={(event) => event.stopPropagation()}>
      {children}
    </Link>
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
      <span className="mb-1.5 block text-[13px] font-medium text-white/90">{label}</span>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-2xl border bg-white/95 px-4 py-3 text-[15px] text-navy outline-none placeholder:text-navy/40 ${error ? "border-mint ring-2 ring-mint/40" : "border-transparent focus:ring-2 focus:ring-mint"}`}
      />
      {error ? <span className="mt-1.5 block text-sm text-mint">{error}</span> : null}
    </label>
  );
}

function CheckField({
  id,
  checked,
  onChange,
  error,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/[0.04] px-3 py-3">
      <div className="flex items-start gap-3">
        <input id={id} type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-[#00edaf]" />
        <label htmlFor={id} className="text-sm leading-6 text-white">
          {children}
        </label>
      </div>
      {error ? <p className="mt-2 text-sm text-mint">{error}</p> : null}
    </div>
  );
}
