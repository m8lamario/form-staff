import { BrandMark } from "@/components/BrandMark";
import { SocialDocument } from "@/components/SocialDocument";
import { MEDIA_POLICY_VERSION, POLICY_PATHS } from "@/lib/privacy";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Liberatoria riprese social | Leonessa Cup",
  description:
    "Liberatoria per foto, video e pubblicazione sui canali social della Leonessa Cup in occasione della candidatura staff.",
};

export default function SocialPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-12">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <BrandMark layout="row" />
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={POLICY_PATHS.privacy}
            className="rounded-full border border-white/20 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-white/70 hover:border-mint hover:text-mint"
          >
            Informativa privacy
          </Link>
          <Link
            href="/"
            className="rounded-full border border-white/20 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-white/70 hover:border-mint hover:text-mint"
          >
            Torna al form
          </Link>
        </div>
      </header>
      <section className="mt-8 rounded-[28px] border border-white/15 bg-white/10 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-mint">
          Art. 96-97 L. 633/1941 · Art. 6 e 7 GDPR · versione{" "}
          {MEDIA_POLICY_VERSION}
        </p>
        <h1 className="mt-2 font-display text-4xl tracking-widest text-white uppercase">
          Liberatoria riprese social
        </h1>
        <p className="mt-3 text-white/75">
          Autorizzazione facoltativa a foto, video e pubblicazione sui canali
          ufficiali dell&apos;evento. Va letta prima di scegliere Sì o No nel
          form.
        </p>
        <div className="mt-8">
          <SocialDocument />
        </div>
      </section>
    </main>
  );
}
