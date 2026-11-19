import {
  MEDIA_KEYS,
  type MediaKey,
} from "@/lib/consent-copy";
import type { G3Choice } from "@/lib/publication";
import { isMediaRole } from "@/lib/staff";

const NAME_PATTERN = /^[\p{L}]+(?:[ '\u2019-][\p{L}]+)*$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type GuardianConfirmInput = {
  g1: boolean;
  g3Confirm: G3Choice | "";
  soleHolderDeclaration: boolean;
  guardianPrivacyRead: boolean;
  guardianTermsAccepted: boolean;
  media: Record<MediaKey, boolean>;
  fullSurname: boolean;
  rightsAssignment: boolean;
  secondGuardianFirstName: string;
  secondGuardianLastName: string;
  secondGuardianEmail: string;
};

export type GuardianConfirmData = {
  g3: G3Choice;
  soleHolderDeclaration: boolean;
  media: Record<MediaKey, boolean>;
  fullSurname: boolean;
  rightsAssignment: boolean;
  second: { firstName: string; lastName: string; email: string } | null;
};

export type FieldErrors = Partial<Record<string, string>>;

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asRecord(input: unknown): Record<string, unknown> {
  if (typeof input === "object" && input !== null) return input as Record<string, unknown>;
  return {};
}

function validateName(value: string, label: string): string | undefined {
  if (value.length < 2) return `Inserisci il ${label}`;
  if (value.length > 60) return `${label[0].toUpperCase()}${label.slice(1)} troppo lungo`;
  if (!NAME_PATTERN.test(value)) return `${label[0].toUpperCase()}${label.slice(1)} non valido`;
  return undefined;
}

export function parseGuardianConfirm(input: unknown): GuardianConfirmInput {
  const raw = asRecord(input);
  const media = Object.fromEntries(
    MEDIA_KEYS.map((key) => [key, raw[key] === true]),
  ) as Record<MediaKey, boolean>;
  const g3 = readString(raw.g3Confirm);
  return {
    g1: raw.g1 === true,
    g3Confirm: g3 === "other_parent" || g3 === "sole_holder" ? g3 : "",
    soleHolderDeclaration: raw.soleHolderDeclaration === true,
    guardianPrivacyRead: raw.guardianPrivacyRead === true,
    guardianTermsAccepted: raw.guardianTermsAccepted === true,
    media,
    fullSurname: raw.fullSurname === true,
    rightsAssignment: raw.rightsAssignment === true,
    secondGuardianFirstName: readString(raw.secondGuardianFirstName),
    secondGuardianLastName: readString(raw.secondGuardianLastName),
    secondGuardianEmail: readString(raw.secondGuardianEmail).toLowerCase(),
  };
}

export function validateGuardianConfirm(
  input: GuardianConfirmInput,
  context: { candidateEmail: string; guardianEmail: string; role: string },
): { ok: true; data: GuardianConfirmData } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {};
  if (!input.g1) {
    errors.g1 = "Conferma di essere genitore o tutore e di esercitare la responsabilità genitoriale";
  }
  if (input.g3Confirm !== "other_parent" && input.g3Confirm !== "sole_holder") {
    errors.g3Confirm = "Conferma se c'è un altro genitore oppure se sei l'unico esercente";
  }
  if (input.g3Confirm === "sole_holder" && !input.soleHolderDeclaration) {
    errors.soleHolderDeclaration =
      "Se sei l'unico esercente, conferma la dichiarazione sulla responsabilità genitoriale";
  }
  if (!input.guardianPrivacyRead) {
    errors.guardianPrivacyRead = "Conferma di avere letto le informative";
  }
  if (!input.guardianTermsAccepted) {
    errors.guardianTermsAccepted = "Per confermare la candidatura accetta le condizioni";
  }

  let second: GuardianConfirmData["second"] = null;
  if (input.g3Confirm === "other_parent") {
    const firstError = validateName(input.secondGuardianFirstName, "nome dell'altro genitore");
    if (firstError) errors.secondGuardianFirstName = firstError;
    const lastError = validateName(input.secondGuardianLastName, "cognome dell'altro genitore");
    if (lastError) errors.secondGuardianLastName = lastError;
    if (!input.secondGuardianEmail) {
      errors.secondGuardianEmail = "Inserisci l'email";
    } else if (!EMAIL_PATTERN.test(input.secondGuardianEmail)) {
      errors.secondGuardianEmail = "Email non valida";
    } else if (
      input.secondGuardianEmail === context.candidateEmail ||
      input.secondGuardianEmail === context.guardianEmail
    ) {
      errors.secondGuardianEmail =
        "L'email dell'altro genitore deve essere diversa da quelle già indicate";
    }
    if (!errors.secondGuardianFirstName && !errors.secondGuardianLastName && !errors.secondGuardianEmail) {
      second = {
        firstName: input.secondGuardianFirstName,
        lastName: input.secondGuardianLastName,
        email: input.secondGuardianEmail,
      };
    }
  }

  if (Object.keys(errors).length > 0 || input.g3Confirm === "") {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      g3: input.g3Confirm,
      soleHolderDeclaration: input.g3Confirm === "sole_holder" && input.soleHolderDeclaration,
      media: input.media,
      fullSurname: input.fullSurname,
      rightsAssignment: isMediaRole(context.role) ? input.rightsAssignment : false,
      second,
    },
  };
}
