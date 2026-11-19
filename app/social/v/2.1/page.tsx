import { LegalShell } from "@/components/legal/LegalChrome";
import { SocialV21Document } from "@/components/legal/archive/SocialV21Document";
import { LEGAL_EFFECTIVE_DATE } from "@/lib/legal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liberatoria 2.1 (archivio) | Leonessa Cup",
  description: "Versione archiviata 2.1 della liberatoria, in sola lettura.",
  alternates: { canonical: "/social/v/2.1" },
};

export default function SocialV21Page() {
  return (
    <LegalShell
      kicker="Versione archiviata 2.1 · sola lettura"
      title="Liberatoria 2.1"
      lede="Testo in vigore dal 19 novembre 2026 fino alla versione 2.2. Non si applica alle nuove candidature."
      versionDate={LEGAL_EFFECTIVE_DATE}
      showDraft={false}
    >
      <SocialV21Document />
    </LegalShell>
  );
}
