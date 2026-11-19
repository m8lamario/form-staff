import type { AgeBand } from "@/lib/age";
import {
  FLAG_LABELS,
  PUBLICATION_KEYS,
  type PublicationKey,
} from "@/lib/consent-copy";

export const ADULT_ONLY_ROLES = new Set(["CASSA", "BUTTA_FUORI"]);
export const MEDIA_ROLES = new Set([
  "INTERVISTE",
  "GIORNALE",
  "FOTOGRAFIA",
  "SOCIAL",
]);

export type ConsentSnapshot = {
  key: string;
  value: string;
  actor: "candidate" | "guardian1" | "guardian2" | "admin";
  revokedAt: string | null;
  createdAt: string;
};

export function toSnapshots(
  consents: {
    key: string;
    value: string;
    actor: ConsentSnapshot["actor"];
    revokedAt: Date | string | null;
    createdAt: Date | string;
  }[],
): ConsentSnapshot[] {
  return consents.map((consent) => ({
    key: consent.key,
    value: consent.value,
    actor: consent.actor,
    revokedAt:
      consent.revokedAt instanceof Date
        ? consent.revokedAt.toISOString()
        : consent.revokedAt,
    createdAt:
      consent.createdAt instanceof Date
        ? consent.createdAt.toISOString()
        : consent.createdAt,
  }));
}

export type PublicationFlags = Record<PublicationKey, boolean>;

export type G3Choice = "other_parent" | "sole_holder";

const emptyFlags = (): PublicationFlags => ({
  media_channels: false,
  media_promo: false,
  media_sponsor: false,
  media_press: false,
  media_interviews: false,
  fullSurname: false,
  rightsAssignment: false,
});

function latest(consents: ConsentSnapshot[], key: string): ConsentSnapshot | undefined {
  return consents
    .filter((item) => item.key === key)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : a.createdAt > b.createdAt ? -1 : 0))[0];
}

export function consentIsActive(consent: ConsentSnapshot | undefined): boolean {
  return Boolean(consent && consent.value === "true" && !consent.revokedAt);
}

export function publicationFlags(input: {
  ageBand: AgeBand | null;
  g3: G3Choice | null;
  consents: ConsentSnapshot[];
}): PublicationFlags {
  const flags = emptyFlags();
  if (input.ageBand === "adult") {
    for (const key of PUBLICATION_KEYS) {
      flags[key] = consentIsActive(
        latest(
          input.consents.filter((item) => item.actor === "candidate"),
          key,
        ),
      );
    }
    return flags;
  }

  if (input.ageBand !== "minor16_17") return flags;

  const g16 = consentIsActive(latest(input.consents, "G16"));
  const g1 = consentIsActive(latest(input.consents, "G1"));
  const c1 = consentIsActive(latest(input.consents, "C1"));
  const sole =
    input.g3 === "sole_holder" &&
    consentIsActive(latest(input.consents, "soleHolderDeclaration"));
  const gate = g16 && g1 && (c1 || sole);

  for (const key of PUBLICATION_KEYS) {
    flags[key] =
      gate &&
      consentIsActive(
        latest(
          input.consents.filter((item) => item.actor === "guardian1"),
          key,
        ),
      );
  }
  return flags;
}

export function waitingOnOtherGuardian(input: {
  ageBand: AgeBand | null;
  g3: G3Choice | null;
  consents: ConsentSnapshot[];
}): boolean {
  if (input.ageBand !== "minor16_17" || input.g3 !== "other_parent") return false;
  const g1 = consentIsActive(latest(input.consents, "G1"));
  const c1 = consentIsActive(latest(input.consents, "C1"));
  return g1 && !c1;
}

export function acceptanceBlockers(input: {
  legacy: boolean;
  ageBand: AgeBand | null;
  role: string;
  status: string | null;
  g3: G3Choice | null;
  consents: ConsentSnapshot[];
}): string[] {
  if (input.legacy) return [];
  const blockers: string[] = [];
  if (input.ageBand === "minor16_17") {
    if (input.status === "pending_guardian" || !consentIsActive(latest(input.consents, "G1"))) {
      blockers.push("In attesa della conferma del genitore.");
    }
    if (ADULT_ONLY_ROLES.has(input.role)) {
      blockers.push("I ruoli Cassa e Sicurezza sono riservati ai maggiorenni.");
    }
    const flags = publicationFlags(input);
    if (MEDIA_ROLES.has(input.role) && !flags.rightsAssignment) {
      blockers.push(
        "Per i ruoli Foto, Interviste, Giornale e Social serve la cessione dei diritti attiva.",
      );
    }
  }
  return blockers;
}

export function flagEntries(flags: PublicationFlags): { key: PublicationKey; label: string; active: boolean }[] {
  return PUBLICATION_KEYS.map((key) => ({
    key,
    label: FLAG_LABELS[key],
    active: flags[key],
  }));
}
