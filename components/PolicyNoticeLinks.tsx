import { POLICY_PATHS } from "@/lib/privacy";
import Link from "next/link";

const DOCUMENTS = [
  {
    href: POLICY_PATHS.privacy,
    kicker: "Obbligatoria",
    title: "Informativa privacy",
    hint: "Dati della candidatura",
  },
  {
    href: POLICY_PATHS.social,
    kicker: "Facoltativa",
    title: "Liberatoria riprese",
    hint: "Foto, video e canali social",
  },
] as const;

export function PolicyNoticeLinks() {
  return (
    <div className="rounded-2xl border border-mint/45 bg-mint/[0.09] px-3 py-2.5 sm:px-4 sm:py-3 lg:flex lg:items-center lg:gap-3 lg:px-3 lg:py-2">
      <div className="lg:shrink-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mint">
          Leggi prima di inviare
        </p>
        <p className="mt-1 text-sm leading-5 text-white/80 lg:hidden">
          Apri i testi, poi conferma la lettura. Le riprese sono facoltative.
        </p>
      </div>
      <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:mt-0 lg:min-w-0 lg:flex-1">
        {DOCUMENTS.map((doc) => (
          <Link
            key={doc.href}
            href={doc.href}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-10 items-center justify-between gap-2 rounded-2xl border border-mint/50 bg-[#011674]/40 px-2.5 py-1.5 text-left text-white transition hover:border-mint hover:bg-mint/15 sm:min-h-11 sm:gap-3 sm:px-3 sm:py-2 lg:min-h-9 lg:py-1.5"
          >
            <span className="min-w-0">
              <span className="block text-[10px] uppercase tracking-[0.16em] text-mint">
                {doc.kicker}
              </span>
              <span className="mt-0.5 block truncate text-sm font-semibold leading-tight lg:text-[13px]">
                {doc.title}
              </span>
              <span className="mt-0.5 hidden text-[11px] text-white/60 sm:block lg:hidden">
                {doc.hint}
              </span>
            </span>
            <span aria-hidden className="text-mint">
              ↗
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
