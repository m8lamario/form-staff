export const LEGAL_EFFECTIVE_DATE = "19 novembre 2026";
export const PREVIOUS_LEGAL_DATE = "18 novembre 2026";
export const LEGACY_ARCHIVE_DATE = "18 settembre 2026";

export const PRIVACY_VERSION = "2.2";
export const PRIVACY_MINOR_VERSION = "1.2";
export const SOCIAL_VERSION = "2.2";
export const TERMS_VERSION = "1.2";
export const COOKIE_VERSION = "1.0";

export const ARCHIVED_PRIVACY_VERSION = "1.1";
export const ARCHIVED_SOCIAL_VERSION = "1.0";

export const STAFF_MIN_AGE = 16;
export const ADULT_AGE = 18;
export const TOKEN_TTL_DAYS = 60;
export const REMINDER_AFTER_DAYS = 14;

export const PRIVACY_POLICY_VERSION = PRIVACY_VERSION;
export const MEDIA_POLICY_VERSION = SOCIAL_VERSION;

export const CONTROLLER = {
  name: "ESL European Students League S.r.l.",
  shortName: "ESL",
  address: "Corso Vinzaglio 24, 10121 Torino",
  vat: "IT12974200011",
  taxCode: "12974200011",
  privacyEmail: "privacy@legacalciostudenti.it",
  pec: "europeanstudentsleague@legalmail.it",
  secretariatEmail: "support@legacalciostudenti.it",
  cupEmail: "leonessacup@gmail.com",
  dpo: "non nominato",
  website: "https://www.leonessacup.app",
  formUrl: "https://www.leonessacup.app",
  garanteName: "Garante per la protezione dei dati personali",
  garanteUrl: "https://www.garanteprivacy.it",
  instagramLeonessa: "https://www.instagram.com/leonessacup/",
  instagramLcs: "https://www.instagram.com/lcsrealemutua/",
  tiktok: "https://www.tiktok.com/@leonessacup",
} as const;

/**
 * Unica fonte per pagine legali, form ed email.
 * I valori null restano segnaposto evidenziati, tranne le date (vedi formatEventDates).
 */
export const LEGAL = {
  event: {
    edition: "2027",
    city: "Brescia",
    venue: "Centro Sportivo Mario Rigamonti",
    startDate: null as string | null,
    endDate: null as string | null,
    applicationsCloseAt: null as string | null,
  },
  email: {
    provider: "gmail_smtp" as "gmail_smtp" | "transactional",
    from: "Leonessa Cup <leonessacup@gmail.com>",
    replyTo: "leonessacup@gmail.com",
  },
  volunteering: {
    expenseReimbursement: false,
    insurance: null as string | null,
    minorMaxShiftHours: 3,
    adultsOnlyRoles: ["Cassa", "Sicurezza"],
    securityRoleDuties: null as string | null,
  },
  rights: {
    transfer: "exclusive" as const,
  },
  retention: {
    rejectedApplicationsMonths: 12,
  },
  channels: {
    extra: null as string[] | null,
  },
  ogImage: null as string | null,
  showEventSection: false,
};

export const SITE_FACTS = {
  database: "PostgreSQL Neon, AWS eu-central-1",
  vercelRegion:
    "con funzioni server nella regione di Francoforte (UE) e rete di distribuzione dei contenuti globale",
  emailProviderLabel:
    "servizio email Google (Gmail), fornito da Google Ireland Limited, usato per inviare le email di servizio (conferme dei genitori, promemoria, revoche) dall'indirizzo leonessacup@gmail.com",
  processorsNote:
    "I fornitori trattano i dati per conto di ESL come responsabili del trattamento (art. 28 GDPR), sulla base dei rispettivi accordi sul trattamento dei dati.",
} as const;

export const POLICY_PATHS = {
  privacy: "/privacy",
  privacyArchive: "/privacy/v/1.1",
  privacyV20: "/privacy/v/2.0",
  privacyV21: "/privacy/v/2.1",
  minori: "/privacy/minori",
  minoriArchive: "/privacy/minori/v/1.0",
  minoriV11: "/privacy/minori/v/1.1",
  social: "/social",
  socialMinori: "/social#minori",
  socialArchive: "/social/v/1.0",
  socialV20: "/social/v/2.0",
  socialV21: "/social/v/2.1",
  liberatorie: "/liberatorie",
  termini: "/termini",
  terminiArchive: "/termini/v/1.0",
  terminiV11: "/termini/v/1.1",
  diritti: "/termini#diritti",
  cookie: "/cookie",
  form: "/",
} as const;

export const LEGAL_NAV = [
  { href: POLICY_PATHS.privacy, label: "Privacy" },
  { href: POLICY_PATHS.minori, label: "Informativa minori" },
  { href: POLICY_PATHS.social, label: "Liberatoria" },
  { href: POLICY_PATHS.termini, label: "Condizioni" },
  { href: POLICY_PATHS.cookie, label: "Cookie" },
] as const;

export const PUBLIC_HEADER_NAV = [
  { href: POLICY_PATHS.privacy, label: "Privacy" },
  { href: POLICY_PATHS.termini, label: "Condizioni" },
  { href: POLICY_PATHS.social, label: "Liberatoria" },
] as const;

const dateFormatter = new Intl.DateTimeFormat("it-IT", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Rome",
});

function formatIsoDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return dateFormatter.format(new Date(Date.UTC(year, month - 1, day, 12)));
}

export function formatEventDates(
  event: { startDate: string | null; endDate: string | null } = LEGAL.event,
  mode: "label" | "sentence" = "label",
): string {
  const start = event.startDate ? formatIsoDate(event.startDate) : null;
  const end = event.endDate ? formatIsoDate(event.endDate) : null;
  if (!start && !end) {
    return mode === "sentence" ? "in date in via di definizione" : "Date in via di definizione";
  }
  if (start && end) return `dal ${start} al ${end}`;
  if (start) return `dal ${start}`;
  return `fino al ${end}`;
}

export function eventPlaceLine(): string {
  return `Leonessa Cup ${LEGAL.event.edition} · ${LEGAL.event.city} · ${LEGAL.event.venue}`;
}

export function eventLegalWhere(): string {
  return `per la Leonessa Cup ${LEGAL.event.edition}, che si svolge a ${LEGAL.event.city}, presso il ${LEGAL.event.venue}, ${formatEventDates(LEGAL.event, "sentence")}`;
}

export function applicationsOpen(
  now = new Date(),
  closeAt: string | null = LEGAL.event.applicationsCloseAt,
): boolean {
  if (!closeAt) return true;
  const close = new Date(closeAt);
  if (Number.isNaN(close.getTime())) return true;
  return now.getTime() < close.getTime();
}

export function isPreV2(version: string): boolean {
  const major = Number.parseInt(version.split(".")[0] ?? "", 10);
  return !Number.isFinite(major) || major < 2;
}

export function guardianEmailEnabled(): boolean {
  return process.env.GUARDIAN_EMAIL_ENABLED === "true";
}

export function legalReviewDone(): boolean {
  return process.env.LEGAL_REVIEW_DONE === "true";
}

export function hasLegalOpenPoints(): boolean {
  return (
    LEGAL.volunteering.insurance === null ||
    LEGAL.volunteering.securityRoleDuties === null ||
    LEGAL.channels.extra === null ||
    !legalReviewDone()
  );
}

export function showLegalDraftBanner(): boolean {
  return process.env.VERCEL_ENV !== "production";
}
