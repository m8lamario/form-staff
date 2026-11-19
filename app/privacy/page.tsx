import { LegalShell } from "@/components/legal/LegalChrome";
import { PrivacyV2Document } from "@/components/legal/PrivacyV2Document";
import { PRIVACY_VERSION } from "@/lib/legal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Informativa privacy — Candidatura staff | Leonessa Cup",
  description:
    "Informativa sul trattamento dei dati personali per la candidatura staff della Leonessa Cup.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalShell
      kicker={`Artt. 13 e 14 GDPR · versione ${PRIVACY_VERSION}`}
      title="Informativa privacy — Candidatura staff"
      lede="Trattamento dei dati della candidatura allo staff volontario della Leonessa Cup."
    >
      <PrivacyV2Document />
    </LegalShell>
  );
}
