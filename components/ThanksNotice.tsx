"use client";

import { CONTROLLER } from "@/lib/legal";
import Link from "next/link";
import { useEffect, useState } from "react";

type Notice = {
  kind: "adult" | "minor";
  guardianEmail?: string;
  emailSent: boolean;
  emailReason?: string;
  devGuardianPath?: string;
  devSecondGuardianPath?: string;
  devRevokePath?: string;
};

export function ThanksNotice() {
  const [notice, setNotice] = useState<Notice | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("leonessa_staff_notice");
    sessionStorage.removeItem("leonessa_staff_notice");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as Notice;
      if (parsed && (parsed.kind === "adult" || parsed.kind === "minor")) {
        setNotice(parsed);
      }
    } catch {
      setNotice(null);
    }
  }, []);

  if (notice?.kind === "minor") {
    return (
      <>
        <p className="mt-4 text-white/80">
          {notice.emailSent
            ? `Abbiamo inviato un'email a ${notice.guardianEmail}. La candidatura sarà valida dopo la sua conferma.`
            : `La candidatura resta in attesa della conferma di ${notice.guardianEmail ?? "un genitore"}. L'invio email non è attivo: senza email al genitore la candidatura di un minore non può essere confermata.`}
        </p>
        <DevLinks notice={notice} />
      </>
    );
  }

  return (
    <>
      <p className="mt-4 text-white/80">
        Abbiamo ricevuto i tuoi dati. Lo staff della Leonessa Cup ti
        ricontatterà se il profilo è in linea con i ruoli aperti.
      </p>
      <p className="mt-4 text-sm text-white/70">
        Puoi rileggere l&apos;{" "}
        <Link href="/privacy" className="text-mint underline underline-offset-2">informativa privacy</Link>, le{" "}
        <Link href="/termini" className="text-mint underline underline-offset-2">condizioni</Link> e la{" "}
        <Link href="/social" className="text-mint underline underline-offset-2">liberatoria</Link>.
        Per revocare un consenso scrivi a {CONTROLLER.privacyEmail}.
      </p>
      <DevLinks notice={notice} />
    </>
  );
}

function DevLinks({ notice }: { notice: Notice | null }) {
  if (!notice?.devGuardianPath && !notice?.devRevokePath && !notice?.devSecondGuardianPath) {
    return null;
  }
  return (
    <div className="mt-4 rounded-2xl border border-mint/40 bg-mint/10 p-3 text-left text-sm text-white">
      <p className="font-medium text-mint">Solo in questo ambiente di sviluppo</p>
      {notice.devGuardianPath ? <p className="mt-2">Conferma del genitore: <Link className="underline" href={notice.devGuardianPath}>{notice.devGuardianPath}</Link></p> : null}
      {notice.devSecondGuardianPath ? <p className="mt-2">Conferma dell&apos;altro genitore: <Link className="underline" href={notice.devSecondGuardianPath}>{notice.devSecondGuardianPath}</Link></p> : null}
      {notice.devRevokePath ? <p className="mt-2">Revoca: <Link className="underline" href={notice.devRevokePath}>{notice.devRevokePath}</Link></p> : null}
    </div>
  );
}
