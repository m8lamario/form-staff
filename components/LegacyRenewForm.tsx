"use client";

import { BrandMark } from "@/components/BrandMark";
import { LegalFooter } from "@/components/legal/LegalChrome";
import { ADULT_MEDIA_TEXT, MEDIA_KEYS, adultRightsText } from "@/lib/consent-copy";
import { POLICY_PATHS, PRIVACY_VERSION } from "@/lib/legal";
import Link from "next/link";
import { FormEvent, useState } from "react";

export function LegacyRenewForm({
  token,
  firstName,
  roleLabel,
  mediaRole,
}: {
  token: string;
  firstName: string;
  roleLabel: string;
  mediaRole: boolean;
}) {
  const [privacyRead, setPrivacyRead] = useState(false);
  const [rightsAssignment, setRightsAssignment] = useState(false);
  const [media, setMedia] = useState<Record<string, boolean>>({});
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const response = await fetch(`/api/rinnovo/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ privacyRead, rightsAssignment, media }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(payload.error ?? "Non è stato possibile registrare le scelte.");
        return;
      }
      setDone(true);
    } catch {
      setError("Connessione non disponibile.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col px-5 py-10">
      <BrandMark layout="row" />
      <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-[28px] border border-white/15 bg-white/10 p-6">
        <h1 className="font-display text-3xl tracking-widest text-white uppercase">Aggiorna le scelte</h1>
        <p className="text-white/80">
          Ciao {firstName}. Ruolo indicato: {roleLabel}. Questa pagina registra la presa visione dell&apos;informativa {PRIVACY_VERSION} e, se le spunti, le nuove scelte su foto, video e diritti.
        </p>
        <p className="text-sm text-white/70">
          <Link className="text-mint underline" href={POLICY_PATHS.privacy}>Privacy</Link>
          {" · "}
          <Link className="text-mint underline" href={POLICY_PATHS.social}>Liberatoria</Link>
          {" · "}
          <Link className="text-mint underline" href={POLICY_PATHS.termini}>Condizioni</Link>
        </p>
        {done ? (
          <p role="status" className="text-white">Scelte registrate. Grazie.</p>
        ) : (
          <>
            <label className="flex items-start gap-3 text-sm text-white">
              <input type="checkbox" checked={privacyRead} onChange={(event) => setPrivacyRead(event.target.checked)} className="mt-1 h-5 w-5 accent-[#00edaf]" />
              Ho letto l&apos;informativa privacy aggiornata.
            </label>
            {MEDIA_KEYS.map((key) => (
              <label key={key} className="flex items-start gap-3 text-sm text-white">
                <input
                  type="checkbox"
                  checked={Boolean(media[key])}
                  onChange={(event) => setMedia((current) => ({ ...current, [key]: event.target.checked }))}
                  className="mt-1 h-5 w-5 accent-[#00edaf]"
                />
                {ADULT_MEDIA_TEXT[key]}
              </label>
            ))}
            {mediaRole ? (
              <label className="flex items-start gap-3 text-sm text-white">
                <input type="checkbox" checked={rightsAssignment} onChange={(event) => setRightsAssignment(event.target.checked)} className="mt-1 h-5 w-5 accent-[#00edaf]" />
                {adultRightsText}
              </label>
            ) : null}
            {error ? <p role="alert" className="text-mint">{error}</p> : null}
            <button type="submit" disabled={pending} className="min-h-11 rounded-2xl bg-mint px-5 py-3 font-display tracking-[0.16em] text-navy uppercase">
              {pending ? "Invio..." : "Registra le scelte"}
            </button>
          </>
        )}
      </form>
      <LegalFooter />
    </main>
  );
}
