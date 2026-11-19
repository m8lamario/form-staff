import { LegalShell } from "@/components/legal/LegalChrome";
import { PrivacyV21Document } from "@/components/legal/archive/PrivacyV21Document";
import { LEGAL_EFFECTIVE_DATE } from "@/lib/legal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Informativa privacy 2.1 (archivio) | Leonessa Cup",
  description: "Versione archiviata 2.1 dell'informativa privacy, in sola lettura.",
  alternates: { canonical: "/privacy/v/2.1" },
};

export default function PrivacyV21Page() {
  return (
    <LegalShell
      kicker="Versione archiviata 2.1 · sola lettura"
      title="Informativa privacy 2.1"
      lede="Testo in vigore dal 19 novembre 2026 fino alla versione 2.2. Non si applica alle nuove candidature."
      versionDate={LEGAL_EFFECTIVE_DATE}
      showDraft={false}
    >
      <PrivacyV21Document />
    </LegalShell>
  );
}
