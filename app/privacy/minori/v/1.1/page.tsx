import { LegalShell } from "@/components/legal/LegalChrome";
import { MinoriV11Document } from "@/components/legal/archive/MinoriV11Document";
import { LEGAL_EFFECTIVE_DATE } from "@/lib/legal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Informativa minori 1.1 (archivio) | Leonessa Cup",
  description: "Versione archiviata 1.1 dell'informativa per lo staff minorenne, in sola lettura.",
  alternates: { canonical: "/privacy/minori/v/1.1" },
};

export default function MinoriV11Page() {
  return (
    <LegalShell
      kicker="Versione archiviata 1.1 · sola lettura"
      title="Informativa minori 1.1"
      lede="Testo in vigore dal 19 novembre 2026 fino alla versione 1.2. Non si applica alle nuove candidature."
      versionDate={LEGAL_EFFECTIVE_DATE}
      showDraft={false}
    >
      <MinoriV11Document />
    </LegalShell>
  );
}
