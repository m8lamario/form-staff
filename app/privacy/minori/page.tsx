import { LegalShell } from "@/components/legal/LegalChrome";
import { MinoriDocument } from "@/components/legal/MinoriDocument";
import { PRIVACY_MINOR_VERSION } from "@/lib/legal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Informativa per staff minorenni e genitori | Leonessa Cup",
  description:
    "Informativa sul trattamento dei dati dei candidati staff di 16 e 17 anni e dei loro genitori.",
};

export default function MinoriPage() {
  return (
    <LegalShell
      kicker={`Artt. 13 e 14 GDPR · versione ${PRIVACY_MINOR_VERSION}`}
      title="Informativa per staff minorenni e genitori"
      lede="Da leggere insieme, candidato e genitori, prima della conferma della candidatura."
    >
      <MinoriDocument />
    </LegalShell>
  );
}
