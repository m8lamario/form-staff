import { LegalShell } from "@/components/legal/LegalChrome";
import { PrivacyV20Document } from "@/components/legal/archive/PrivacyV20Document";
import { PREVIOUS_LEGAL_DATE } from "@/lib/legal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Informativa privacy 2.0 (archivio) | Leonessa Cup",
  description: "Versione archiviata 2.0 dell'informativa privacy, in sola lettura.",
  alternates: { canonical: "/privacy/v/2.0" },
};

export default function PrivacyV20Page() {
  return (
    <LegalShell
      kicker="Versione archiviata 2.0 · sola lettura"
      title="Informativa privacy 2.0"
      lede="Testo in vigore dal 18 novembre 2026 fino alla versione 2.1. Non si applica alle nuove candidature."
      versionDate={PREVIOUS_LEGAL_DATE}
      showDraft={false}
    >
      <PrivacyV20Document />
    </LegalShell>
  );
}
