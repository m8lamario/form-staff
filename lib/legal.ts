export const LEGAL_EFFECTIVE_DATE = "18 novembre 2026";

export const PRIVACY_VERSION = "2.0";
export const PRIVACY_MINOR_VERSION = "1.0";
export const SOCIAL_VERSION = "2.0";
export const TERMS_VERSION = "1.0";
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
  dpo: "non nominato",
  website: "https://www.leonessacup.app",
  formUrl: "https://www.leonessacup.app",
  garanteName: "Garante per la protezione dei dati personali",
  garanteUrl: "https://www.garanteprivacy.it",
  instagramLeonessa: "https://www.instagram.com/leonessacup/",
  instagramLcs: "https://www.instagram.com/lcsrealemutua/",
  tiktok: "https://www.tiktok.com/@leonessacup",
} as const;

/** Dati non presenti nel repository: restano segnaposto. */
export const EVENT_PLACEHOLDERS = {
  edition: "[edizione/anno]",
  place: "[comune e impianto]",
  start: "[data inizio]",
  end: "[data fine]",
  otherChannels: "[altri canali ufficiali: DA COMPLETARE]",
  vercelRegion: "[regione: DA VERIFICARE]",
  database: "PostgreSQL Neon, AWS eu-central-1",
  email: "[email: DA VERIFICARE]",
} as const;

export const POLICY_PATHS = {
  privacy: "/privacy",
  privacyArchive: "/privacy/v/1.1",
  minori: "/privacy/minori",
  social: "/social",
  socialMinori: "/social#minori",
  socialArchive: "/social/v/1.0",
  liberatorie: "/liberatorie",
  termini: "/termini",
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

export function guardianEmailEnabled(): boolean {
  return process.env.GUARDIAN_EMAIL_ENABLED === "true";
}

export function showLegalDraftBanner(): boolean {
  return process.env.NODE_ENV !== "production";
}
