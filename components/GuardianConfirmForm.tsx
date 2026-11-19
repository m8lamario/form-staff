"use client";

import { BrandMark } from "@/components/BrandMark";
import { LegalFooter } from "@/components/legal/LegalChrome";
import {
  G3_TEXT,
  MEDIA_KEYS,
  MINOR_MEDIA_TEXT,
  fullSurnameText,
  g1Text,
  guardianPrivacyText,
  guardianRightsText,
  soleHolderText,
  type MediaKey,
} from "@/lib/consent-copy";
import { POLICY_PATHS, TERMS_VERSION } from "@/lib/legal";
import type { G3Choice } from "@/lib/publication";
import Link from "next/link";
import { FormEvent, useState } from "react";

type PageData = {
  minorName: string;
  birthDate: string;
  roleLabel: string;
  mediaRole: boolean;
  g3: G3Choice;
  second: { firstName: string; lastName: string; email: string } | null;
};

type Notice = {
  emailSent?: boolean;
  emailReason?: string;
  devSecondGuardianPath?: string;
  devRevokePath?: string;
};

export function GuardianConfirmForm({ token, page }: { token: string; page: PageData }) {
  const [g1, setG1] = useState(false);
  const [g3Confirm, setG3Confirm] = useState<G3Choice | "">("");
  const [sole, setSole] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [terms, setTerms] = useState(false);
  const [media, setMedia] = useState<Record<MediaKey, boolean>>({
    media_channels: false,
    media_promo: false,
    media_sponsor: false,
    media_press: false,
    media_interviews: false,
  });
  const [fullSurname, setFullSurname] = useState(false);
  const [rights, setRights] = useState(false);
  const [second, setSecond] = useState(page.second ?? { firstName: "", lastName: "", email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState<Notice | null>(null);
  const [soleHolderDone, setSoleHolderDone] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setErrors({});
    try {
      const response = await fetch(`/api/genitore/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          g1,
          g3Confirm,
          soleHolderDeclaration: sole,
          guardianPrivacyRead: privacy,
          guardianTermsAccepted: terms,
          ...media,
          fullSurname,
          rightsAssignment: rights,
          secondGuardianFirstName: second.firstName,
          secondGuardianLastName: second.lastName,
          secondGuardianEmail: second.email,
        }),
      });
      const payload = (await response.json()) as {
        errors?: Record<string, string>;
        error?: string;
        notice?: Notice;
        soleHolder?: boolean;
      };
      if (!response.ok) {
        setErrors(payload.errors ?? { form: payload.error ?? "Controlla i campi." });
        return;
      }
      setSoleHolderDone(Boolean(payload.soleHolder));
      setDone(payload.notice ?? {});
    } catch {
      setErrors({ form: "Connessione non disponibile. Riprova." });
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <Shell>
        <h1 className="font-display text-3xl tracking-widest text-white uppercase">Conferma registrata</h1>
        <p className="mt-3 text-white/80">
          {soleHolderDone
            ? "La candidatura è confermata. Le autorizzazioni spuntate sono attive, se c'è anche l'accordo del minore."
            : done.emailSent
              ? "Abbiamo chiesto conferma anche all'altro genitore. Foto, video, cognome completo e cessione dei diritti restano inattivi fino a quella conferma."
              : "La candidatura è confermata dal genitore di contatto. L'email all'altro genitore non è stata inviata: senza quella conferma il minore non è pubblicabile e non può svolgere i ruoli che richiedono la cessione dei diritti."}
        </p>
        <DevBox notice={done} />
      </Shell>
    );
  }

  return (
    <Shell>
      <p className="text-xs uppercase tracking-[0.22em] text-mint">Conferma del genitore</p>
      <h1 className="mt-2 font-display text-3xl tracking-widest text-white uppercase">Candidatura di {page.minorName}</h1>
      <p className="mt-3 text-white/75">
        Data di nascita {page.birthDate}. Ruolo preferito: {page.roleLabel}. Leggi{" "}
        <Doc href={POLICY_PATHS.privacy}>privacy</Doc>,{" "}
        <Doc href={POLICY_PATHS.minori}>informativa minori</Doc>,{" "}
        <Doc href={POLICY_PATHS.socialMinori}>liberatoria</Doc> e{" "}
        <Doc href={POLICY_PATHS.termini}>condizioni</Doc>.
      </p>
      <form onSubmit={onSubmit} className="mt-6 space-y-3" noValidate>
        <Box checked={g1} onChange={setG1} error={errors.g1}>{g1Text(page.minorName)}</Box>
        <fieldset className="space-y-2">
          <legend className="text-sm text-white">Conferma o correggi la scelta sulla responsabilità genitoriale</legend>
          <button type="button" aria-pressed={g3Confirm === "other_parent"} onClick={() => setG3Confirm("other_parent")} className={choiceClass(g3Confirm === "other_parent")}>{G3_TEXT.other_parent}</button>
          <button type="button" aria-pressed={g3Confirm === "sole_holder"} onClick={() => setG3Confirm("sole_holder")} className={choiceClass(g3Confirm === "sole_holder")}>{G3_TEXT.sole_holder}</button>
          {errors.g3Confirm ? <p className="text-sm text-mint">{errors.g3Confirm}</p> : null}
        </fieldset>
        {g3Confirm === "sole_holder" ? (
          <Box checked={sole} onChange={setSole} error={errors.soleHolderDeclaration}>{soleHolderText}</Box>
        ) : null}
        {g3Confirm === "other_parent" ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <Text label="Nome dell'altro genitore" value={second.firstName} error={errors.secondGuardianFirstName} onChange={(value) => setSecond((current) => ({ ...current, firstName: value }))} />
            <Text label="Cognome dell'altro genitore" value={second.lastName} error={errors.secondGuardianLastName} onChange={(value) => setSecond((current) => ({ ...current, lastName: value }))} />
            <div className="sm:col-span-2">
              <Text label="Email dell'altro genitore" value={second.email} error={errors.secondGuardianEmail} onChange={(value) => setSecond((current) => ({ ...current, email: value }))} />
            </div>
          </div>
        ) : null}
        <Box checked={privacy} onChange={setPrivacy} error={errors.guardianPrivacyRead}>
          {guardianPrivacyText} <Doc href={POLICY_PATHS.privacy}>Privacy</Doc> · <Doc href={POLICY_PATHS.minori}>Minori</Doc>
        </Box>
        <Box checked={terms} onChange={setTerms} error={errors.guardianTermsAccepted}>
          Autorizzo la candidatura di mio/a figlio/a allo staff volontario della Leonessa Cup e accetto per suo conto le <Doc href={POLICY_PATHS.termini}>condizioni (versione {TERMS_VERSION})</Doc>.
        </Box>
        <fieldset className="rounded-2xl border border-white/15 p-3">
          <legend className="px-1 text-sm text-white">
            Autorizzo ESL a pubblicare foto e video in cui compare il/la partecipante, con il suo nome e l&apos;iniziale del cognome, per:
          </legend>
          <div className="mt-2 space-y-2">
            {MEDIA_KEYS.map((key) => (
              <Box key={key} checked={media[key]} onChange={(value) => setMedia((current) => ({ ...current, [key]: value }))}>
                {MINOR_MEDIA_TEXT[key]}
              </Box>
            ))}
          </div>
        </fieldset>
        <Box checked={fullSurname} onChange={setFullSurname}>{fullSurnameText}</Box>
        {page.mediaRole ? (
          <>
            <Box checked={rights} onChange={setRights}>{guardianRightsText}</Box>
            <p className="text-sm text-white/70">
              Se non spunti la cessione, il ruolo Foto, Interviste, Giornale o Social andrà cambiato dallo staff.
            </p>
          </>
        ) : null}
        <p className="text-sm text-white/70">
          Le autorizzazioni su foto, video, cognome completo e cessione dei diritti diventano attive dopo la conferma dell&apos;altro genitore, salvo che lei sia l&apos;unico esercente. Può revocarle in qualsiasi momento.
        </p>
        {errors.form ? <p className="text-sm text-mint">{errors.form}</p> : null}
        <button type="submit" disabled={pending} className="w-full rounded-2xl bg-mint px-5 py-3 font-display tracking-[0.14em] text-navy uppercase disabled:opacity-70">
          {pending ? "Invio..." : "Conferma la candidatura"}
        </button>
      </form>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-8">
      <BrandMark layout="row" />
      <section className="mt-6 rounded-[28px] border border-white/15 bg-white/10 p-6">{children}</section>
      <LegalFooter />
    </main>
  );
}

function Box({ checked, onChange, error, children }: { checked: boolean; onChange: (value: boolean) => void; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="flex items-start gap-3 text-sm leading-6 text-white">
        <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="mt-1 h-5 w-5 accent-[#00edaf]" />
        <span>{children}</span>
      </label>
      {error ? <p className="mt-1 text-sm text-mint">{error}</p> : null}
    </div>
  );
}

function Text({ label, value, error, onChange }: { label: string; value: string; error?: string; onChange: (value: string) => void }) {
  return (
    <label className="block text-sm text-white">
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full rounded-2xl bg-white px-3 py-2 text-navy" />
      {error ? <span className="mt-1 block text-mint">{error}</span> : null}
    </label>
  );
}

function Doc({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} target="_blank" rel="noreferrer" className="text-mint underline underline-offset-2">{children}</Link>;
}

function choiceClass(selected: boolean) {
  return `block w-full rounded-2xl border px-3 py-3 text-left text-sm ${selected ? "border-mint bg-mint text-navy" : "border-white/20 text-white"}`;
}

function DevBox({ notice }: { notice: Notice }) {
  if (!notice.devSecondGuardianPath && !notice.devRevokePath) return null;
  return (
    <div className="mt-4 rounded-2xl border border-mint/40 bg-mint/10 p-3 text-sm text-white">
      <p className="font-medium text-mint">Solo in questo ambiente di sviluppo</p>
      {notice.devSecondGuardianPath ? <p className="mt-2">Altro genitore: <Link className="underline" href={notice.devSecondGuardianPath}>{notice.devSecondGuardianPath}</Link></p> : null}
      {notice.devRevokePath ? <p className="mt-2">Revoca: <Link className="underline" href={notice.devRevokePath}>{notice.devRevokePath}</Link></p> : null}
    </div>
  );
}
