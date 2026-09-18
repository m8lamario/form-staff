import { AdminDashboard } from "@/components/AdminDashboard";
import { BrandMark } from "@/components/BrandMark";
import { LogoutButton } from "@/components/LogoutButton";
import { toApplicationDTO } from "@/lib/applications";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const applications = await prisma.staffApplication.findMany({
    orderBy: { createdAt: "desc" },
  });

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
        <AdminDashboard applications={applications.map(toApplicationDTO)} />
      </div>
    </main>
  );
}
