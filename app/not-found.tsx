import { BrandMark } from "@/components/BrandMark";
import { LegalFooter } from "@/components/legal/LegalChrome";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col px-5 py-16">
      <BrandMark layout="row" />
      <section className="mt-10 rounded-[32px] border border-white/15 bg-white/10 p-8 text-center">
        <h1 className="font-display text-4xl tracking-widest text-white uppercase">Pagina non trovata</h1>
        <p className="mt-3 text-white/75">Questo indirizzo non corrisponde a una pagina del sito.</p>
        <Link href="/" className="mt-8 inline-flex rounded-2xl bg-mint px-5 py-3 font-display tracking-[0.16em] text-navy uppercase">
          Torna al form
        </Link>
      </section>
      <LegalFooter />
    </main>
  );
}
