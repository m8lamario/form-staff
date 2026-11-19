import { LegalShell } from "@/components/legal/LegalChrome";
import { TerminiV10Document } from "@/components/legal/archive/TerminiV10Document";
import { PREVIOUS_LEGAL_DATE } from "@/lib/legal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Condizioni 1.0 (archivio) | Leonessa Cup",
  description: "Versione archiviata 1.0 delle condizioni, in sola lettura.",
  alternates: { canonical: "/termini/v/1.0" },
};

export default function TerminiArchivePage() {
  return (
    <LegalShell
      kicker="Versione archiviata 1.0 · sola lettura"
      title="Condizioni 1.0"
      lede="Testo in vigore dal 18 novembre 2026 fino alla versione 1.1. Non si applica alle nuove candidature."
      versionDate={PREVIOUS_LEGAL_DATE}
      showDraft={false}
    >
      <TerminiV10Document />
    </LegalShell>
  );
}
