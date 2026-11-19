import { LegalShell } from "@/components/legal/LegalChrome";
import { SocialDocument } from "@/components/legal/archive/SocialDocument";
import { ARCHIVED_SOCIAL_VERSION, CONTROLLER, LEGACY_ARCHIVE_DATE } from "@/lib/legal";
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
      versionDate={LEGACY_ARCHIVE_DATE}
      showDraft={false}
      archiveNote={
        <>
          Questo testo conteneva segnaposto non compilati. Il titolare del
          trattamento è {CONTROLLER.name}, {CONTROLLER.address}, P.IVA {CONTROLLER.vat},{" "}
          {CONTROLLER.privacyEmail}. Le candidature inviate con questa versione
          vengono reinformate con l&apos;informativa aggiornata.
        </>
      }
    >
      <SocialDocument />
    </LegalShell>
  );
}
