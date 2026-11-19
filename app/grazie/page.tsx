import { BrandMark } from "@/components/BrandMark";
import { ThanksNotice } from "@/components/ThanksNotice";
import { LegalFooter } from "@/components/legal/LegalChrome";
import Link from "next/link";

export default function ThanksPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-5 py-16 text-center">
      <BrandMark />
      <section className="mt-10 rounded-[32px] border border-white/15 bg-white/10 p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-mint">Grazie</p>
        <h1 className="mt-3 font-display text-4xl tracking-widest text-white uppercase">
          Candidatura inviata
        </h1>
        <ThanksNotice />
        <Link href="/" className="mt-8 inline-flex rounded-2xl bg-mint px-5 py-3 font-display tracking-[0.16em] text-navy uppercase">
          Torna al form
        </Link>
      </section>
      <LegalFooter />
    </main>
  );
}
