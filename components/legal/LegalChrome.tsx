import { BrandMark } from "@/components/BrandMark";
import {
  CONTROLLER,
  LEGAL_EFFECTIVE_DATE,
  LEGAL_NAV,
  POLICY_PATHS,
  hasLegalOpenPoints,
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

export function PlaceholderNotice({ always = false }: { always?: boolean }) {
  if (!always && !hasLegalOpenPoints()) return null;
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
        {CONTROLLER.name} · {CONTROLLER.address} · P.IVA {CONTROLLER.vat}
        {" · "}PEC {CONTROLLER.pec}
        {" · "}Info: {CONTROLLER.secretariatEmail}
        {" · "}Privacy: {CONTROLLER.privacyEmail}
      </p>
      <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
        <SocialLink href={CONTROLLER.instagramLeonessa} label="Instagram @leonessacup" />
        <SocialLink href={CONTROLLER.instagramLcs} label="Instagram @lcsrealemutua" />
        <SocialLink href={CONTROLLER.tiktok} label="TikTok @leonessacup" />
      </p>
      <p className="mt-2">
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
      </p>
    </footer>
  );
}

export function LegalShell({
  kicker,
  title,
  lede,
  children,
  versionDate = LEGAL_EFFECTIVE_DATE,
  archiveNote,
}: {
  kicker: string;
  title: string;
  lede: string;
  children: ReactNode;
  versionDate?: string;
  archiveNote?: ReactNode;
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
          <p className="text-sm text-white/70">Versione del {versionDate}</p>
          {archiveNote ? <div className="text-sm leading-6 text-white/80">{archiveNote}</div> : null}
        </div>
        <div className="mt-8">{children}</div>
      </section>
      <LegalFooter />
    </main>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  const tiktok = href.includes("tiktok");
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-mint">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5 fill-current">
        {tiktok ? (
          <path d="M14.5 3c.4 2.4 1.8 4 4.2 4.3v2.4c-1.4 0-2.8-.4-4-1.2v6.7c0 3.4-2.6 6.1-6.1 6.1S2.5 18.6 2.5 15.2c0-3.3 2.5-5.9 5.7-6.1v2.5c-1.5.2-2.6 1.4-2.6 2.9 0 1.6 1.3 2.9 2.9 2.9s2.9-1.3 2.9-2.9V3h3.1Z" />
        ) : (
          <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm8.2 2.2h-1.5a3.4 3.4 0 0 0-3.4 3.4v6.7a2.6 2.6 0 1 1-2.6-2.6h.3V11a4.8 4.8 0 1 0 4.8 4.8V9.2a5.5 5.5 0 0 0 3.2 1v-1.6a3.6 3.6 0 0 1-2.1-1.2 3.6 3.6 0 0 1-.7-2.2Z" />
        )}
      </svg>
      {label}
    </a>
  );
}

export function LegalHeading({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2 id={id} className="font-display text-2xl tracking-widest text-white uppercase">
      {children}
    </h2>
  );
}
