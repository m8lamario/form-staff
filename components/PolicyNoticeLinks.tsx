import { POLICY_PATHS } from "@/lib/legal";
import Link from "next/link";

export function PolicyNoticeLinks({ minor }: { minor: boolean }) {
  const documents = [
    {
      href: POLICY_PATHS.privacy,
      kicker: "Obbligatoria",
      title: "Informativa privacy",
      hint: "Dati della candidatura",
    },
    ...(minor
      ? [
          {
            href: POLICY_PATHS.minori,
            kicker: "Obbligatoria",
            title: "Informativa minori",
            hint: "Per te e per i tuoi genitori",
          },
        ]
      : []),
    {
      href: POLICY_PATHS.termini,
      kicker: "Obbligatoria",
      title: "Condizioni",
      hint: "Volontariato, condotta e diritti",
    },
    {
      href: POLICY_PATHS.social,
      kicker: "Facoltativa",
      title: "Liberatoria foto e video",
      hint: "Usi che puoi rifiutare",
    },
  ];

  return (
    <div className="rounded-2xl border border-mint/45 bg-mint/[0.09] px-3 py-2.5 sm:px-4 sm:py-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mint">
        Leggi prima di inviare
      </p>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {documents.map((doc) => (
          <Link
            key={doc.href}
            href={doc.href}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-10 items-center justify-between gap-2 rounded-2xl border border-mint/50 bg-[#011674]/40 px-2.5 py-1.5 text-left text-white transition hover:border-mint hover:bg-mint/15"
          >
            <span className="min-w-0">
              <span className="block text-[10px] uppercase tracking-[0.16em] text-mint">
                {doc.kicker}
              </span>
              <span className="mt-0.5 block truncate text-sm font-semibold leading-tight">
                {doc.title}
              </span>
              <span className="mt-0.5 block text-[11px] text-white/60">{doc.hint}</span>
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
