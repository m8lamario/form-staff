import { LegalShell } from "@/components/legal/LegalChrome";
import { PrivacyDocument } from "@/components/PrivacyDocument";
import { ARCHIVED_PRIVACY_VERSION } from "@/lib/legal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Informativa privacy 1.1 (archivio) | Leonessa Cup",
  description: "Versione archiviata 1.1 dell'informativa privacy, in sola lettura.",
};

export default function PrivacyArchivePage() {
  return (
    <LegalShell
      kicker={`Versione archiviata ${ARCHIVED_PRIVACY_VERSION} · sola lettura`}
      title="Informativa privacy 1.1"
      lede="Testo in vigore per le candidature inviate prima della versione 2.0. Non si applica alle nuove candidature."
    >
      <PrivacyDocument />
    </LegalShell>
  );
}
