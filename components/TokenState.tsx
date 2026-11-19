import { BrandMark } from "@/components/BrandMark";
import { LegalFooter } from "@/components/legal/LegalChrome";
import Link from "next/link";

export function TokenState({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col px-5 py-16">
      <BrandMark layout="row" />
      <section className="mt-8 rounded-[28px] border border-white/15 bg-white/10 p-6">
        <h1 className="font-display text-3xl tracking-widest text-white uppercase">{title}</h1>
        <p className="mt-3 text-white/80">{message}</p>
        <Link href="/" className="mt-6 inline-flex text-sm text-mint underline underline-offset-2">
          Torna al form
        </Link>
      </section>
      <LegalFooter />
    </main>
  );
}

export function tokenMessage(reason: "invalid" | "used" | "expired"): string {
  if (reason === "used") return "Questo link è già stato usato.";
  if (reason === "expired") return "Questo link è scaduto. Scrivi a privacy@legacalciostudenti.it.";
  return "Questo link non è valido.";
}
