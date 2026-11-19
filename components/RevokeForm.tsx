"use client";

import { BrandMark } from "@/components/BrandMark";
import { LegalFooter } from "@/components/legal/LegalChrome";
import { CONTROLLER } from "@/lib/legal";
import { useState } from "react";

type Option = { key: string; label: string; active: boolean; rights: boolean };

export function RevokeForm({
  token,
  personName,
  options,
}: {
  token: string;
  personName: string;
  options: Option[];
}) {
  const [selected, setSelected] = useState<string[]>([]);
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit() {
    setPending(true);
    setError("");
    try {
      const response = await fetch(`/api/revoca/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keys: selected, note }),
      });
      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        setError(payload.error ?? "Revoca non registrata.");
        return;
      }
      setMessage("Revoca registrata. Non rende illecito il trattamento precedente. La cessione dei diritti sui contenuti già realizzati resta valida.");
    } catch {
      setError("Connessione non disponibile. Riprova.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-3xl px-5 py-8">
      <BrandMark layout="row" />
      <section className="mt-6 rounded-[28px] border border-white/15 bg-white/10 p-6 text-sm leading-6 text-white/85">
        <h1 className="font-display text-3xl tracking-widest text-white uppercase">Revoca autorizzazioni</h1>
        <p className="mt-3">
          Candidatura di {personName}. Puoi revocare i singoli usi ancora attivi. Per i minori basta la revoca di uno dei genitori. La cessione dei diritti sui contenuti già realizzati non si ritira: dopo la revoca ESL non usa i contenuti per nuovi utilizzi, ma quelli già realizzati restano ceduti.
        </p>
        {message ? <p className="mt-4 text-white">{message}</p> : options.length === 0 ? (
          <p className="mt-4">Non ci sono autorizzazioni attive da revocare. Puoi scrivere a {CONTROLLER.privacyEmail}.</p>
        ) : (
          <div className="mt-4 space-y-3">
            {options.map((option) => (
              <label key={option.key} className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={selected.includes(option.key)}
                  onChange={(event) =>
                    setSelected((current) =>
                      event.target.checked ? [...current, option.key] : current.filter((key) => key !== option.key),
                    )
                  }
                  className="mt-1 h-5 w-5 accent-[#00edaf]"
                />
                <span>
                  {option.label}
                  {option.rights ? " — la revoca non ritira i contenuti già realizzati." : ""}
                </span>
              </label>
            ))}
            <label className="block">
              Nota
              <textarea value={note} onChange={(event) => setNote(event.target.value)} className="mt-1 w-full rounded-2xl bg-white px-3 py-2 text-navy" rows={3} />
            </label>
            {error ? <p className="text-mint">{error}</p> : null}
            <button type="button" disabled={pending} onClick={submit} className="rounded-2xl bg-mint px-4 py-3 font-semibold text-navy disabled:opacity-70">
              {pending ? "Invio..." : "Registra revoca"}
            </button>
          </div>
        )}
      </section>
      <LegalFooter />
    </main>
  );
}
