import {
  ageBandFromBirth,
  type AgeBand,
  type AgeResult,
} from "@/lib/age";
import {
  GUARDIAN_RELATIONS,
  MEDIA_KEYS,
  type GuardianRelationId,
  type MediaKey,
} from "@/lib/consent-copy";
import { ADULT_ONLY_ROLES, MEDIA_ROLES } from "@/lib/publication";
import type { G3Choice } from "@/lib/publication";

export const STAFF_ROLES = [
  { id: "CASSA", label: "Cassa", shortLabel: "Cassa" },
  { id: "INTERVISTE", label: "Interviste", shortLabel: "Interviste" },
  { id: "GIORNALE", label: "Giornale", shortLabel: "Giornale" },
  { id: "FOTOGRAFIA", label: "Fotografia", shortLabel: "Foto" },
  { id: "SOCIAL", label: "Aiuto in gestione social", shortLabel: "Social" },
  { id: "BUTTA_FUORI", label: "Sicurezza", shortLabel: "Sicurezza" },
] as const;

export type StaffRoleId = (typeof STAFF_ROLES)[number]["id"];

export type StaffFormInput = {
  firstName: string;
  lastName: string;
  birthDate: string;
  ageDeclaration: AgeBand | "";
  phone: string;
  email: string;
  participatedLastYear: boolean | null;
  role: StaffRoleId | "";
  guardianFirstName: string;
  guardianLastName: string;
  guardianRelation: GuardianRelationId | "";
  guardianEmail: string;
  guardianPhone: string;
  g3: G3Choice | "";
  secondGuardianFirstName: string;
  secondGuardianLastName: string;
  secondGuardianEmail: string;
  privacyRead: boolean;
  termsAccepted: boolean;
  termsRead: boolean;
  rightsAssignment: boolean;
  media_channels: boolean;
  media_promo: boolean;
  media_sponsor: boolean;
  media_press: boolean;
  media_interviews: boolean;
  comms_future: boolean;
  g16: boolean;
};

export type GuardianPayload = {
  firstName: string;
  lastName: string;
  relation: GuardianRelationId;
  email: string;
  phone: string;
  g3: G3Choice;
  second: { firstName: string; lastName: string; email: string } | null;
};

export type StaffPayload = {
  firstName: string;
  lastName: string;
  birthDate: string;
  ageBand: AgeBand;
  ageDeclaration: AgeBand;
  phone: string;
  email: string;
  participatedLastYear: boolean;
  role: StaffRoleId;
  guardian: GuardianPayload | null;
  privacyRead: true;
  termsAccepted: boolean;
  termsRead: boolean;
  rightsAssignment: boolean;
  media: Record<MediaKey, boolean>;
  comms_future: boolean;
  g16: boolean;
};

export type FieldErrors = Partial<Record<string, string>>;

export type FormStep = {
  id: "identity" | "contacts" | "experience" | "role" | "guardian" | "privacy";
  title: string;
  description: string;
  fields: readonly string[];
};

const ROLE_IDS = new Set<string>(STAFF_ROLES.map((role) => role.id));
const RELATION_IDS = new Set<string>(GUARDIAN_RELATIONS.map((item) => item.id));
const NAME_PATTERN = /^[\p{L}]+(?:[ '\u2019-][\p{L}]+)*$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const UNDERAGE_MESSAGE = "Per candidarti allo staff devi aver compiuto 16 anni";

export function roleLabel(role: string): string {
  return STAFF_ROLES.find((item) => item.id === role)?.label ?? role;
}

export function isAdultOnlyRole(role: string): boolean {
  return ADULT_ONLY_ROLES.has(role);
}

export function isMediaRole(role: string): boolean {
  return MEDIA_ROLES.has(role);
}

export function stepsFor(ageBand: AgeResult | null): FormStep[] {
  const steps: FormStep[] = [
    {
      id: "identity",
      title: "Chi sei",
      description: "Nome, cognome ed età",
      fields: ["firstName", "lastName", "birthDate", "ageDeclaration"],
    },
    {
      id: "contacts",
      title: "Recapiti",
      description: "Telefono e email",
      fields: ["phone", "email"],
    },
    {
      id: "experience",
      title: "Esperienza",
      description: "Edizione precedente",
      fields: ["participatedLastYear"],
    },
    {
      id: "role",
      title: "Ruolo",
      description: "Cosa preferisci fare",
      fields: ["role"],
    },
  ];
  if (ageBand === "minor16_17") {
    steps.push({
      id: "guardian",
      title: "Genitore",
      description: "Contatto di un genitore o tutore",
      fields: [
        "guardianFirstName",
        "guardianLastName",
        "guardianRelation",
        "guardianEmail",
        "guardianPhone",
        "g3",
        "secondGuardianFirstName",
        "secondGuardianLastName",
        "secondGuardianEmail",
      ],
    });
  }
  steps.push({
    id: "privacy",
    title: "Privacy",
    description: "Leggi le informative e scegli sui consensi",
    fields:
      ageBand === "minor16_17"
        ? ["privacyRead", "termsRead", "g16"]
        : [
            "privacyRead",
            "termsAccepted",
            "rightsAssignment",
            ...MEDIA_KEYS,
            "comms_future",
          ],
  });
  return steps;
}

function asRecord(input: unknown): Record<string, unknown> {
  if (typeof input === "object" && input !== null) {
    return input as Record<string, unknown>;
  }
  return {};
}

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function readBoolean(value: unknown): boolean {
  return value === true;
}

export function emptyStaffForm(): StaffFormInput {
  return {
    firstName: "",
    lastName: "",
    birthDate: "",
    ageDeclaration: "",
    phone: "",
    email: "",
    participatedLastYear: null,
    role: "",
    guardianFirstName: "",
    guardianLastName: "",
    guardianRelation: "",
    guardianEmail: "",
    guardianPhone: "",
    g3: "",
    secondGuardianFirstName: "",
    secondGuardianLastName: "",
    secondGuardianEmail: "",
    privacyRead: false,
    termsAccepted: false,
    termsRead: false,
    rightsAssignment: false,
    media_channels: false,
    media_promo: false,
    media_sponsor: false,
    media_press: false,
    media_interviews: false,
    comms_future: false,
    g16: false,
  };
}

function validateName(value: string, label: string): string | undefined {
  if (value.length < 2) return `Inserisci il ${label}`;
  if (value.length > 60) {
    return `${label[0].toUpperCase()}${label.slice(1)} troppo lungo`;
  }
  if (!NAME_PATTERN.test(value)) {
    return `${label[0].toUpperCase()}${label.slice(1)} non valido`;
  }
  return undefined;
}

function validatePhone(value: string, label = "numero di telefono"): string | undefined {
  if (!value) return `Inserisci il ${label}`;
  const digits = value.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) return "Numero di telefono non valido";
  return undefined;
}

function validateEmail(value: string): string | undefined {
  if (!value) return "Inserisci l'email";
  if (!EMAIL_PATTERN.test(value)) return "Email non valida";
  return undefined;
}

export function validateStaffPayload(
  input: unknown,
  now = new Date(),
): { ok: true; data: StaffPayload } | { ok: false; errors: FieldErrors } {
  const raw = asRecord(input);
  const firstName = readString(raw.firstName);
  const lastName = readString(raw.lastName);
  const birthDate = readString(raw.birthDate);
  const ageDeclaration = readString(raw.ageDeclaration);
  const phone = readString(raw.phone);
  const email = readString(raw.email).toLowerCase();
  const role = readString(raw.role);
  const participatedRaw = raw.participatedLastYear;
  const errors: FieldErrors = {};

  const firstNameError = validateName(firstName, "nome");
  if (firstNameError) errors.firstName = firstNameError;
  const lastNameError = validateName(lastName, "cognome");
  if (lastNameError) errors.lastName = lastNameError;

  const ageBand = ageBandFromBirth(birthDate, now);
  if (!birthDate) {
    errors.birthDate = "Inserisci la data di nascita";
  } else if (!ageBand) {
    errors.birthDate = "Data di nascita non valida";
  } else if (ageBand === "underage") {
    errors.birthDate = UNDERAGE_MESSAGE;
  }

  if (ageDeclaration !== "adult" && ageDeclaration !== "minor16_17") {
    errors.ageDeclaration = "Indica se hai compiuto 18 anni oppure se hai 16 o 17 anni";
  } else if (
    (ageBand === "adult" || ageBand === "minor16_17") &&
    ageDeclaration !== ageBand
  ) {
    errors.ageDeclaration = "La fascia d'età indicata non coincide con la data di nascita";
  }

  const phoneError = validatePhone(phone);
  if (phoneError) errors.phone = phoneError;
  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  if (typeof participatedRaw !== "boolean") {
    errors.participatedLastYear = "Indica se hai partecipato l'anno scorso";
  }

  if (!ROLE_IDS.has(role)) {
    errors.role = "Seleziona un ruolo";
  } else if (ageBand === "minor16_17" && isAdultOnlyRole(role)) {
    errors.role = "I ruoli Cassa e Sicurezza sono riservati ai maggiorenni";
  }

  const minor = ageBand === "minor16_17";
  let guardian: GuardianPayload | null = null;

  if (minor) {
    const guardianFirstName = readString(raw.guardianFirstName);
    const guardianLastName = readString(raw.guardianLastName);
    const guardianRelation = readString(raw.guardianRelation);
    const guardianEmail = readString(raw.guardianEmail).toLowerCase();
    const guardianPhone = readString(raw.guardianPhone);
    const g3 = readString(raw.g3);

    const guardianFirstError = validateName(guardianFirstName, "nome del genitore");
    if (guardianFirstError) errors.guardianFirstName = guardianFirstError;
    const guardianLastError = validateName(guardianLastName, "cognome del genitore");
    if (guardianLastError) errors.guardianLastName = guardianLastError;
    if (!RELATION_IDS.has(guardianRelation)) {
      errors.guardianRelation = "Indica il rapporto del genitore o tutore";
    }
    const guardianEmailError = validateEmail(guardianEmail);
    if (guardianEmailError) {
      errors.guardianEmail = guardianEmailError;
    } else if (guardianEmail === email) {
      errors.guardianEmail = "L'email del genitore deve essere diversa da quella del candidato";
    }
    const guardianPhoneError = validatePhone(guardianPhone, "telefono del genitore");
    if (guardianPhoneError) errors.guardianPhone = guardianPhoneError;
    if (g3 !== "other_parent" && g3 !== "sole_holder") {
      errors.g3 = "Indica se c'è un altro genitore o se il contatto è l'unico esercente";
    }

    let second: GuardianPayload["second"] = null;
    if (g3 === "other_parent") {
      const secondFirst = readString(raw.secondGuardianFirstName);
      const secondLast = readString(raw.secondGuardianLastName);
      const secondEmail = readString(raw.secondGuardianEmail).toLowerCase();
      const secondFirstError = validateName(secondFirst, "nome dell'altro genitore");
      if (secondFirstError) errors.secondGuardianFirstName = secondFirstError;
      const secondLastError = validateName(secondLast, "cognome dell'altro genitore");
      if (secondLastError) errors.secondGuardianLastName = secondLastError;
      const secondEmailError = validateEmail(secondEmail);
      if (secondEmailError) {
        errors.secondGuardianEmail = secondEmailError;
      } else if (secondEmail === email || secondEmail === guardianEmail) {
        errors.secondGuardianEmail =
          "L'email dell'altro genitore deve essere diversa da quelle già indicate";
      }
      if (!errors.secondGuardianFirstName && !errors.secondGuardianLastName && !errors.secondGuardianEmail) {
        second = { firstName: secondFirst, lastName: secondLast, email: secondEmail };
      }
    }

    if (
      !errors.guardianFirstName &&
      !errors.guardianLastName &&
      !errors.guardianRelation &&
      !errors.guardianEmail &&
      !errors.guardianPhone &&
      !errors.g3 &&
      (g3 !== "other_parent" || second)
    ) {
      guardian = {
        firstName: guardianFirstName,
        lastName: guardianLastName,
        relation: guardianRelation as GuardianRelationId,
        email: guardianEmail,
        phone: guardianPhone,
        g3: g3 as G3Choice,
        second,
      };
    }

    if (raw.privacyRead !== true) {
      errors.privacyRead =
        "Conferma di avere letto l'informativa privacy e l'informativa per minori";
    }
    if (raw.termsRead !== true) {
      errors.termsRead = "Conferma di avere letto le condizioni e le regole di condotta";
    }
  } else if (ageBand === "adult") {
    if (raw.privacyRead !== true) {
      errors.privacyRead = "Conferma di avere letto l'informativa privacy";
    }
    if (raw.termsAccepted !== true) {
      errors.termsAccepted = "Per inviare la candidatura accetta le condizioni";
    }
    if (isMediaRole(role) && raw.rightsAssignment !== true) {
      errors.rightsAssignment =
        "Per questo ruolo serve la cessione dei diritti sui contenuti";
    }
  }

  if (Object.keys(errors).length > 0 || !ageBand || ageBand === "underage" || !guardian && minor) {
    return { ok: false, errors };
  }

  if (ageBand !== "adult" && ageBand !== "minor16_17") {
    return { ok: false, errors };
  }

  const media = Object.fromEntries(
    MEDIA_KEYS.map((key) => [key, minor ? false : readBoolean(raw[key])]),
  ) as Record<MediaKey, boolean>;

  return {
    ok: true,
    data: {
      firstName,
      lastName,
      birthDate,
      ageBand,
      ageDeclaration: ageDeclaration as AgeBand,
      phone,
      email,
      participatedLastYear: participatedRaw === true,
      role: role as StaffRoleId,
      guardian,
      privacyRead: true,
      termsAccepted: ageBand === "adult",
      termsRead: minor,
      rightsAssignment: ageBand === "adult" && raw.rightsAssignment === true,
      media,
      comms_future: ageBand === "adult" && raw.comms_future === true,
      g16: minor && raw.g16 === true,
    },
  };
}

export function getStepErrors(
  input: unknown,
  step: number,
  now = new Date(),
): FieldErrors {
  const raw = asRecord(input);
  const birthDate = readString(raw.birthDate);
  const ageBand = ageBandFromBirth(birthDate, now);
  const steps = stepsFor(ageBand);
  const current = steps[step];
  if (!current) return {};
  const result = validateStaffPayload(input, now);
  if (result.ok) return {};
  const picked: FieldErrors = {};
  for (const field of current.fields) {
    const message = result.errors[field];
    if (message) picked[field] = message;
  }
  return picked;
}

export function stepForField(field: string, ageBand: AgeResult | null): number {
  const index = stepsFor(ageBand).findIndex((step) => step.fields.includes(field));
  return index >= 0 ? index : 0;
}
