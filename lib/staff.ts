export const STAFF_ROLES = [
  { id: "RACCHETTA_PALLE", label: "Racchetta palle", shortLabel: "Racchetta" },
  { id: "CASSA", label: "Cassa", shortLabel: "Cassa" },
  { id: "INTERVISTE", label: "Interviste", shortLabel: "Interviste" },
  { id: "GIORNALE", label: "Giornale", shortLabel: "Giornale" },
  { id: "FOTOGRAFIA", label: "Fotografia", shortLabel: "Foto" },
  { id: "SOCIAL", label: "Aiuto in gestione social", shortLabel: "Social" },
  { id: "BUTTA_FUORI", label: "Butta fuori", shortLabel: "Butta fuori" },
] as const;

export type StaffRoleId = (typeof STAFF_ROLES)[number]["id"];

export type StaffPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  participatedLastYear: boolean;
  role: StaffRoleId;
};

export type FieldErrors = Partial<Record<keyof StaffPayload, string>>;

export type ValidationResult =
  | { ok: true; data: StaffPayload }
  | { ok: false; errors: FieldErrors };

const ROLE_IDS = new Set<string>(STAFF_ROLES.map((role) => role.id));
const NAME_PATTERN = /^[\p{L}]+(?:[ '\u2019-][\p{L}]+)*$/u;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asRecord(input: unknown): Record<string, unknown> {
  if (typeof input === "object" && input !== null) {
    return input as Record<string, unknown>;
  }
  return {};
}

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function validateName(value: string, label: string): string | undefined {
  if (value.length < 2) {
    return `Inserisci il ${label}`;
  }
  if (value.length > 60) {
    return `${label[0].toUpperCase()}${label.slice(1)} troppo lungo`;
  }
  if (!NAME_PATTERN.test(value)) {
    return `${label[0].toUpperCase()}${label.slice(1)} non valido`;
  }
  return undefined;
}

export function roleLabel(role: string): string {
  return STAFF_ROLES.find((item) => item.id === role)?.label ?? role;
}

export function validateStaffPayload(input: unknown): ValidationResult {
  const raw = asRecord(input);
  const firstName = readString(raw.firstName);
  const lastName = readString(raw.lastName);
  const phone = readString(raw.phone);
  const email = readString(raw.email).toLowerCase();
  const role = readString(raw.role);
  const participatedRaw = raw.participatedLastYear;

  const errors: FieldErrors = {};

  const firstNameError = validateName(firstName, "nome");
  if (firstNameError) errors.firstName = firstNameError;

  const lastNameError = validateName(lastName, "cognome");
  if (lastNameError) errors.lastName = lastNameError;

  const phoneDigits = phone.replace(/\D/g, "");
  if (!phone) {
    errors.phone = "Inserisci il numero di telefono";
  } else if (phoneDigits.length < 8 || phoneDigits.length > 15) {
    errors.phone = "Numero di telefono non valido";
  }

  if (!email) {
    errors.email = "Inserisci l'email";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Email non valida";
  }

  if (typeof participatedRaw !== "boolean") {
    errors.participatedLastYear = "Indica se hai partecipato l'anno scorso";
  }

  if (!ROLE_IDS.has(role)) {
    errors.role = "Seleziona un ruolo";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      firstName,
      lastName,
      phone,
      email,
      participatedLastYear: participatedRaw === true,
      role: role as StaffRoleId,
    },
  };
}
