import { LegalShell } from "@/components/legal/LegalChrome";
import { TerminiV11Document } from "@/components/legal/archive/TerminiV11Document";
import { LEGAL_EFFECTIVE_DATE } from "@/lib/legal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Condizioni 1.1 (archivio) | Leonessa Cup",
  description: "Versione archiviata 1.1 delle condizioni, in sola lettura.",
  alternates: { canonical: "/termini/v/1.1" },
};

export default function TerminiV11Page() {
  return (
    <LegalShell
      kicker="Versione archiviata 1.1 · sola lettura"
      title="Condizioni 1.1"
      lede="Testo in vigore dal 19 novembre 2026 fino alla versione 1.2. Non si applica alle nuove candidature."
      versionDate={LEGAL_EFFECTIVE_DATE}
      showDraft={false}
    >
      <TerminiV11Document />
    </LegalShell>
  );
}
