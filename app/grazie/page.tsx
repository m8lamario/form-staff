import { BrandMark } from "@/components/BrandMark";
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
        <p className="mt-4 text-white/80">
          Abbiamo ricevuto i tuoi dati. Lo staff della Leonessa Cup ti
          ricontatterà se il profilo è in linea con i ruoli aperti.
        </p>
        <p className="mt-4 text-sm text-white/70">
          Puoi rileggere in qualsiasi momento l&apos;{" "}
          <Link href="/privacy" className="text-mint underline underline-offset-2">
            informativa privacy
          </Link>{" "}
          e la{" "}
          <Link href="/social" className="text-mint underline underline-offset-2">
            liberatoria riprese
          </Link>
          . Per revocare il consenso alle foto e ai video usa i recapiti
          indicati nei due documenti.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-2xl bg-mint px-5 py-3 font-display tracking-[0.16em] text-navy uppercase"
        >
          Torna al form
        </Link>
      </section>
    </main>
  );
}
