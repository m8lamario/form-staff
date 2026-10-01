import { AdminDashboard } from "@/components/AdminDashboard";
import { BrandMark } from "@/components/BrandMark";
import { LogoutButton } from "@/components/LogoutButton";
import { toApplicationDTO } from "@/lib/applications";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function loadApplications() {
  try {
    const applications = await prisma.staffApplication.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { applications };
  } catch (error) {
    console.error("[admin] Impossibile leggere le candidature", error);
    return { applications: null };
  }
}

export default async function AdminPage() {
  const { applications } = await loadApplications();

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 py-10 sm:px-8">
      <header className="flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:justify-between">
        <BrandMark compact href="/admin" />
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="rounded-full border border-white/20 px-4 py-2 text-sm text-white hover:border-mint hover:text-mint"
          >
            Form pubblico
          </Link>
          <LogoutButton />
        </div>
      </header>
      <section className="mt-10">
        <h1 className="font-display text-4xl tracking-widest text-white uppercase">
          Risposte staff
        </h1>
        <p className="mt-2 max-w-2xl text-white/75">
          Panoramica delle candidature ricevute, con distribuzione dei ruoli
          preferiti.
        </p>
      </section>
      <div className="mt-8">
        {applications ? (
          <AdminDashboard applications={applications.map(toApplicationDTO)} />
        ) : (
          <div className="rounded-3xl border border-white/20 bg-white/10 p-6 text-white">
            <p className="font-medium">Non riesco a caricare le candidature.</p>
            <p className="mt-2 text-sm text-white/75">
              L&apos;accesso è andato a buon fine, ma la lettura del database su
              Vercel è fallita. In Vercel apri Logs → Runtime (non Build) e
              cerca <span className="text-mint">[admin]</span>. Controlla che{" "}
              <code className="text-mint">DATABASE_URL</code> sia impostata
              per Production, uguale a quella locale.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
