import { LegalShell } from "@/components/legal/LegalChrome";
import { MinoriV10Document } from "@/components/legal/archive/MinoriV10Document";
import { PREVIOUS_LEGAL_DATE } from "@/lib/legal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Informativa minori 1.0 (archivio) | Leonessa Cup",
  description: "Versione archiviata 1.0 dell'informativa per lo staff minorenne, in sola lettura.",
  alternates: { canonical: "/privacy/minori/v/1.0" },
};

export default function MinoriArchivePage() {
  return (
    <LegalShell
      kicker="Versione archiviata 1.0 · sola lettura"
      title="Informativa minori 1.0"
      lede="Testo in vigore dal 18 novembre 2026 fino alla versione 1.1. Non si applica alle nuove candidature."
      versionDate={PREVIOUS_LEGAL_DATE}
    >
      <MinoriV10Document />
    </LegalShell>
  );
}
