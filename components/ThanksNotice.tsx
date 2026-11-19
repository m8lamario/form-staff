"use client";

import { BrandMark } from "@/components/BrandMark";
import { LegalFooter } from "@/components/legal/LegalChrome";
import { CONTROLLER } from "@/lib/legal";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem("leonessa_staff_notice");
    if (!raw) {
      router.replace("/");
      return;
    }
    sessionStorage.removeItem("leonessa_staff_notice");
    try {
      const parsed = JSON.parse(raw) as Notice;
      if (parsed && (parsed.kind === "adult" || parsed.kind === "minor")) {
        setNotice(parsed);
        setReady(true);
        return;
      }
    } catch {
      router.replace("/");
      return;
    }
    router.replace("/");
  }, [router]);

  if (!ready) return null;

  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-5 py-16 text-center">
      <BrandMark />
      <section className="mt-10 rounded-[32px] border border-white/15 bg-white/10 p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-mint">Grazie</p>
        <h1 className="mt-3 font-display text-4xl tracking-widest text-white uppercase">
          Candidatura inviata
        </h1>
        <NoticeBody notice={notice} />
        <Link href="/" className="mt-8 inline-flex rounded-2xl bg-mint px-5 py-3 font-display tracking-[0.16em] text-navy uppercase">
          Torna al form
        </Link>
      </section>
      <LegalFooter />
    </main>
  );
}

function NoticeBody({ notice }: { notice: Notice | null }) {
  if (notice?.kind === "minor") {
    return (
      <>
        <p className="mt-4 text-white/80">
          {notice.emailSent
            ? `Abbiamo inviato un'email a ${notice.guardianEmail}. La candidatura sarà valida dopo la sua conferma.`
            : `Non siamo riusciti a inviare l'email a ${notice.guardianEmail ?? "il genitore"}. Scrivi a ${CONTROLLER.secretariatEmail}.`}
        </p>
        <DevLinks notice={notice} />
      </>
    );
  }

  return (
    <>
      <p className="mt-4 text-white/80">
        {notice?.emailSent
          ? "Abbiamo ricevuto i tuoi dati e ti abbiamo inviato un'email di conferma, con il link per revocare i consensi."
          : "Abbiamo ricevuto i tuoi dati. Lo staff della Leonessa Cup ti ricontatterà se il profilo è in linea con i ruoli aperti."}
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
