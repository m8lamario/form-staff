import { BrandMark } from "@/components/BrandMark";
import { PrivacyDocument } from "@/components/PrivacyDocument";
import { PRIVACY_POLICY_VERSION } from "@/lib/privacy";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Informativa privacy | Leonessa Cup",
  description:
    "Informativa sul trattamento dei dati personali e sulle riprese social per la candidatura staff della Leonessa Cup.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-12">
      <header className="flex items-center justify-between gap-4">
        <BrandMark layout="row" />
        <Link
          href="/"
          className="rounded-full border border-white/20 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-white/70 hover:border-mint hover:text-mint"
        >
          Torna al form
        </Link>
      </header>
      <section className="mt-8 rounded-[28px] border border-white/15 bg-white/10 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-mint">
          Art. 13-14 GDPR · versione {PRIVACY_POLICY_VERSION}
        </p>
        <h1 className="mt-2 font-display text-4xl tracking-widest text-white uppercase">
          Informativa privacy
        </h1>
        <p className="mt-3 text-white/75">
          Trattamento dei dati della candidatura staff e consenso alle
          riprese per i canali social dell&apos;evento.
        </p>
        <div className="mt-8">
          <PrivacyDocument />
        </div>
      </section>
    </main>
  );
}
