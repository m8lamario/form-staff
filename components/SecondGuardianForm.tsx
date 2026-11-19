"use client";

import { BrandMark } from "@/components/BrandMark";
import { LegalFooter } from "@/components/legal/LegalChrome";
import { CONTROLLER, LEGAL, POLICY_PATHS, formatEventDates } from "@/lib/legal";
import Link from "next/link";
import { useState } from "react";

type Choice = { key: string; label: string; yes: boolean };

export function SecondGuardianForm({
  token,
  minorName,
  firstGuardianName,
  birthDate,
  roleLabel,
  choices,
}: {
  token: string;
  minorName: string;
  firstGuardianName: string;
  birthDate: string;
  roleLabel: string;
  choices: Choice[];
}) {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function send(decision: "confirm" | "decline") {
    setPending(true);
    setError("");
    try {
      const response = await fetch(`/api/genitore/conferma/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision }),
      });
      const payload = (await response.json()) as { error?: string; confirmed?: boolean };
      if (!response.ok) {
        setError(payload.error ?? "Non è stato possibile registrare la scelta.");
        return;
      }
      setMessage(
        payload.confirmed
          ? "Le scelte sono confermate. Le autorizzazioni diventano attive se c'è anche l'accordo del minore."
          : `La conferma non è stata data. Puoi scrivere a ${CONTROLLER.privacyEmail}. ${minorName} può comunque far parte dello staff, ma non verrà pubblicato/a in foto e video in modo riconoscibile e non potrà svolgere i ruoli Foto, Interviste, Giornale o Social.`,
      );
    } catch {
      setError("Connessione non disponibile. Riprova.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-8">
      <BrandMark layout="row" />
      <section className="mt-6 rounded-[28px] border border-white/15 bg-white/10 p-6 text-sm leading-7 text-white/85">
        <h1 className="font-display text-3xl tracking-widest text-white uppercase">Conferma dell&apos;altro genitore</h1>
        {message ? <p className="mt-4 text-white">{message}</p> : (
          <>
            <p className="mt-4">
              Gentile genitore, {firstGuardianName} ha autorizzato la candidatura di {minorName} (nata/o il {birthDate}) allo staff volontario della Leonessa Cup {LEGAL.event.edition}, a {LEGAL.event.city}, presso il {LEGAL.event.venue}, {formatEventDates(LEGAL.event, "sentence")}, nel ruolo di {roleLabel}, e ha fatto queste scelte:
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-5">
              {choices.map((choice) => (
                <li key={choice.key}>{choice.label}: {choice.yes ? "sì" : "no"}</li>
              ))}
            </ul>
            <p className="mt-3">
              Può leggere l&apos;<Link className="text-mint underline" href={POLICY_PATHS.privacy}>informativa</Link>, l&apos;<Link className="text-mint underline" href={POLICY_PATHS.minori}>informativa per minori</Link>, la <Link className="text-mint underline" href={POLICY_PATHS.socialMinori}>liberatoria</Link> e le <Link className="text-mint underline" href={POLICY_PATHS.termini}>condizioni</Link>.
            </p>
            <p className="mt-3">
              Informativa per lei (art. 14 GDPR): il titolare del trattamento è {CONTROLLER.name}, {CONTROLLER.address}, {CONTROLLER.privacyEmail}. Il suo nome e la sua email ci sono stati forniti da {minorName} / {firstGuardianName}. Li usiamo solo per questa conferma e per comunicazioni di servizio sull&apos;evento (art. 6.1.b GDPR): se conferma, per 24 mesi dalla fine della stagione, altrimenti li cancelliamo dopo 60 giorni. Può esercitare i diritti degli artt. 15–22 GDPR scrivendo a {CONTROLLER.privacyEmail}. Per rendere attive le autorizzazioni serve anche la sua conferma. Se non conferma, {minorName} può comunque far parte dello staff, ma non verrà pubblicato/a in foto e video in modo riconoscibile e non potrà svolgere i ruoli Foto, Interviste, Giornale o Social.
            </p>
            {error ? <p className="mt-3 text-mint">{error}</p> : null}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button type="button" disabled={pending} onClick={() => send("confirm")} className="rounded-2xl bg-mint px-4 py-3 font-semibold text-navy disabled:opacity-70">
                Confermo le scelte sopra indicate
              </button>
              <button type="button" disabled={pending} onClick={() => send("decline")} className="rounded-2xl border border-white/20 px-4 py-3 text-white disabled:opacity-70">
                Non sono d&apos;accordo con una o più scelte
              </button>
            </div>
          </>
        )}
      </section>
      <LegalFooter />
    </main>
  );
}
