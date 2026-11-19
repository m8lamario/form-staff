import { LegalShell } from "@/components/legal/LegalChrome";
import { SocialV2Document } from "@/components/legal/SocialV2Document";
import { SOCIAL_VERSION } from "@/lib/legal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liberatoria foto, video e social — Staff | Leonessa Cup",
  description:
    "Liberatoria per foto, video e social dello staff della Leonessa Cup, con sezioni per maggiorenni e minorenni.",
  alternates: { canonical: "/social" },
};

export default function SocialPage() {
  return (
    <LegalShell
      kicker={`Art. 10 c.c. · artt. 96-97 L. 633/1941 · versione ${SOCIAL_VERSION}`}
      title="Liberatoria foto, video e social — Staff"
      lede="Due sezioni: maggiorenni e staff di 16-17 anni. Gli usi non spuntati nel form non sono autorizzati."
    >
      <SocialV2Document />
    </LegalShell>
  );
}
