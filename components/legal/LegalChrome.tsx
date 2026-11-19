import { BrandMark } from "@/components/BrandMark";
import {
  CONTROLLER,
  LEGAL_EFFECTIVE_DATE,
  LEGAL_NAV,
  POLICY_PATHS,
  showLegalDraftBanner,
} from "@/lib/legal";
import Link from "next/link";
import type { ReactNode } from "react";

export function LegalDraftBanner() {
  if (!showLegalDraftBanner()) return null;
  return (
    <p className="rounded-2xl border border-mint bg-mint/20 px-4 py-3 font-medium text-mint">
      Bozza DA VALIDARE LEGALMENTE
    </p>
  );
}

export function PlaceholderNotice() {
  return (
    <p className="rounded-2xl border border-mint/40 bg-mint/10 px-4 py-3 text-white">
      I testi evidenziati in verde vanno sostituiti con i dati reali del
      Titolare prima della pubblicazione. Questa è una bozza: va fatta
      revisionare da un legale di fiducia e non sostituisce una consulenza
      professionale.
    </p>
  );
}

export function LegalFooter({ compact = false }: { compact?: boolean }) {
  return (
    <footer
      className={
        compact
          ? "shrink-0 px-1 pt-2 text-[10px] leading-4 text-white/60"
          : "mt-8 border-t border-white/10 pt-4 text-xs leading-5 text-white/65"
      }
    >
      <p>
        {CONTROLLER.name} · P.IVA {CONTROLLER.vat}
        {" · "}
        <Link href={POLICY_PATHS.privacy} className="underline underline-offset-2 hover:text-mint">
          Privacy
        </Link>
        {" · "}
        <Link href={POLICY_PATHS.minori} className="underline underline-offset-2 hover:text-mint">
          Informativa minori
        </Link>
        {" · "}
        <Link href={POLICY_PATHS.social} className="underline underline-offset-2 hover:text-mint">
          Liberatoria
        </Link>
        {" · "}
        <Link href={POLICY_PATHS.termini} className="underline underline-offset-2 hover:text-mint">
          Condizioni
        </Link>
        {" · "}
        <Link href={POLICY_PATHS.cookie} className="underline underline-offset-2 hover:text-mint">
          Cookie
        </Link>
        {" · "}
        <a
          href={`mailto:${CONTROLLER.privacyEmail}`}
          className="underline underline-offset-2 hover:text-mint"
        >
          {CONTROLLER.privacyEmail}
        </a>
      </p>
    </footer>
  );
}

export function LegalShell({
  kicker,
  title,
  lede,
  children,
}: {
  kicker: string;
  title: string;
  lede: string;
  children: ReactNode;
}) {
  return (
    <main className="mx-auto max-w-3xl px-5 py-8 sm:px-8 sm:py-12">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <BrandMark layout="row" />
        <Link
          href={POLICY_PATHS.form}
          className="rounded-full border border-white/20 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-white/70 hover:border-mint hover:text-mint"
        >
          Torna al form
        </Link>
      </header>
      <nav className="mt-4 flex flex-wrap gap-2" aria-label="Pagine legali">
        {LEGAL_NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-white/20 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-white/70 hover:border-mint hover:text-mint"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <section className="mt-8 rounded-[28px] border border-white/15 bg-white/10 p-6 sm:p-8">
        <div className="space-y-4">
          <LegalDraftBanner />
          <p className="text-xs uppercase tracking-[0.28em] text-mint">{kicker}</p>
          <h1 className="font-display text-4xl tracking-widest text-white uppercase">{title}</h1>
          <p className="text-white/75">{lede}</p>
          <p className="text-sm text-white/70">Versione del {LEGAL_EFFECTIVE_DATE}</p>
        </div>
        <div className="mt-8">{children}</div>
      </section>
      <LegalFooter />
    </main>
  );
}

export function LegalHeading({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className="font-display text-2xl tracking-widest text-white uppercase">
      {children}
    </h2>
  );
}
