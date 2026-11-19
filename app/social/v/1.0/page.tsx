import { LegalShell } from "@/components/legal/LegalChrome";
import { SocialDocument } from "@/components/SocialDocument";
import { ARCHIVED_SOCIAL_VERSION } from "@/lib/legal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liberatoria riprese 1.0 (archivio) | Leonessa Cup",
  description: "Versione archiviata 1.0 della liberatoria riprese, in sola lettura.",
};

export default function SocialArchivePage() {
  return (
    <LegalShell
      kicker={`Versione archiviata ${ARCHIVED_SOCIAL_VERSION} · sola lettura`}
      title="Liberatoria riprese social 1.0"
      lede="Testo in vigore per le candidature inviate prima della versione 2.0. Il consenso sì/no di allora vale solo per i canali ufficiali."
    >
      <SocialDocument />
    </LegalShell>
  );
}
