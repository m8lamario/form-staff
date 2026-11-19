import {
  PRIVACY_VERSION,
  SOCIAL_VERSION,
  TERMS_VERSION,
} from "@/lib/legal";

export const MEDIA_KEYS = [
  "media_channels",
  "media_promo",
  "media_sponsor",
  "media_press",
  "media_interviews",
] as const;

export type MediaKey = (typeof MEDIA_KEYS)[number];

export const ADULT_MEDIA_TEXT: Record<MediaKey, string> = {
  media_channels:
    "Canali del torneo: sito, app e profili social ufficiali della Leonessa Cup e della Lega (es. Instagram, TikTok, Facebook, YouTube), comprese dirette streaming e highlights.",
  media_promo:
    "Promozione ESL: locandine, brochure, video promozionali e campagne pubblicitarie di ESL, anche sponsorizzate online.",
  media_sponsor:
    "Contenuti con sponsor: contenuti sul torneo realizzati insieme agli sponsor e ai partner (es. post co-firmati, premiazioni).",
  media_press:
    "Stampa: invio a giornali, TV e siti di informazione per la cronaca del torneo.",
  media_interviews: "Interviste: interviste audio e video in cui compaio.",
};

export const MINOR_MEDIA_TEXT: Record<MediaKey, string> = {
  media_channels:
    "Canali del torneo: sito, app e profili social ufficiali della Leonessa Cup e della Lega (es. Instagram, TikTok, Facebook, YouTube), comprese dirette streaming e highlights.",
  media_promo:
    "Promozione ESL: locandine, brochure, video promozionali e campagne pubblicitarie di ESL, anche sponsorizzate online.",
  media_sponsor:
    "Contenuti con sponsor: contenuti sul torneo realizzati insieme agli sponsor e ai partner (es. post co-firmati, premiazioni).",
  media_press:
    "Stampa: invio a giornali, TV e siti di informazione per la cronaca del torneo.",
  media_interviews:
    "Interviste: interviste audio e video in cui compare il/la partecipante.",
};

export const AGE_DECLARATION_TEXT = {
  adult: "Ho compiuto 18 anni",
  minor16_17: "Ho 16 o 17 anni",
} as const;

export const G3_TEXT = {
  other_parent:
    "C'è un altro genitore che esercita la responsabilità genitoriale",
  sole_holder:
    "Il genitore indicato è l'unico esercente la responsabilità genitoriale",
} as const;

export const adultPrivacyReadText = `Ho letto l'informativa privacy (versione ${PRIVACY_VERSION}) e ne ho compreso i contenuti.`;

export const adultTermsText = `Accetto le condizioni della candidatura staff volontario e le regole di condotta (versione ${TERMS_VERSION}).`;

export const adultRightsText =
  "Cedo a ESL, a titolo gratuito, i diritti di utilizzazione economica sui contenuti che realizzerò come staff, con facoltà di sublicenza ai media partner di ESL, nei termini dell'art. 8 delle condizioni. I miei diritti morali di autore restano salvi.";

export const commsFutureText =
  "Acconsento a ricevere da ESL, via email e messaggi, comunicazioni su candidature staff, eventi e tornei delle edizioni successive.";

export const minorPrivacyReadText =
  "Ho letto, insieme ai miei genitori, l'informativa privacy e l'informativa per minori.";

export const minorTermsText =
  "Ho letto le condizioni e mi impegno a rispettare le regole di condotta. So che la candidatura vale solo dopo la conferma di un genitore.";

export const g16Text =
  "Accordo del minore: ho letto la liberatoria, so come verranno usate le mie foto, i miei video e i contenuti che realizzerò, e sono d'accordo. Senza questa casella le autorizzazioni non si attivano.";

export function g1Text(minorName: string): string {
  return `Dichiaro di essere genitore o tutore di ${minorName} e di esercitare la responsabilità genitoriale.`;
}

export const soleHolderText =
  "Dichiaro di essere l'unico esercente la responsabilità genitoriale (l'altro genitore è deceduto, decaduto o sospeso dalla responsabilità, non ha riconosciuto il figlio, oppure un provvedimento del giudice mi attribuisce in via esclusiva anche le decisioni di maggiore interesse). So che il solo affidamento esclusivo non basta.";

export const guardianPrivacyText =
  "Ho letto l'informativa privacy e l'informativa per minori.";

export const guardianTermsText = `Autorizzo la candidatura di mio/a figlio/a allo staff volontario della Leonessa Cup e accetto per suo conto le condizioni (versione ${TERMS_VERSION}).`;

export const fullSurnameText =
  "Autorizzo l'indicazione del cognome completo nelle didascalie.";

export const guardianRightsText =
  "Per conto di mio/a figlio/a cedo a ESL, a titolo gratuito, i diritti di utilizzazione economica sui contenuti che realizzerà come staff, con facoltà di sublicenza ai media partner di ESL, nei termini dell'art. 8 delle condizioni. I diritti morali restano salvi.";

export const c1ConfirmText = "Confermo le scelte sopra indicate";

export const c1DeclineText = "Non sono d'accordo con una o più scelte";

export const GUARDIAN_RELATIONS = [
  { id: "GENITORE", label: "Genitore" },
  { id: "TUTORE", label: "Tutore" },
  { id: "AFFIDATARIO", label: "Affidatario" },
] as const;

export type GuardianRelationId = (typeof GUARDIAN_RELATIONS)[number]["id"];

export const FLAG_LABELS = {
  media_channels: "Canali",
  media_promo: "Promo",
  media_sponsor: "Sponsor",
  media_press: "Stampa",
  media_interviews: "Interviste",
  fullSurname: "Cognome",
  rightsAssignment: "Diritti",
} as const;

export const PUBLICATION_KEYS = [
  "media_channels",
  "media_promo",
  "media_sponsor",
  "media_press",
  "media_interviews",
  "fullSurname",
  "rightsAssignment",
] as const;

export type PublicationKey = (typeof PUBLICATION_KEYS)[number];

export const SOCIAL_LIBERATORIA_VERSION = SOCIAL_VERSION;

export const REVOCABLE_KEYS = [
  ...MEDIA_KEYS,
  "fullSurname",
  "comms_future",
  "rightsAssignment",
  "G16",
] as const;

export type RevocableKey = (typeof REVOCABLE_KEYS)[number];

export const REVOKE_LABELS: Record<RevocableKey, string> = {
  media_channels: "Canali",
  media_promo: "Promo",
  media_sponsor: "Sponsor",
  media_press: "Stampa",
  media_interviews: "Interviste",
  fullSurname: "Cognome",
  comms_future: "Comunicazioni",
  rightsAssignment: "Diritti",
  G16: "Accordo del minore",
};
