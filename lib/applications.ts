import { formatStoredDate, type AgeBand } from "@/lib/age";
import { FLAG_LABELS, PUBLICATION_KEYS } from "@/lib/consent-copy";
import { PRIVACY_VERSION } from "@/lib/legal";
import {
  MEDIA_ROLES,
  acceptanceBlockers,
  flagEntries,
  publicationFlags,
  toSnapshots,
  waitingOnOtherGuardian,
  type ConsentSnapshot,
  type G3Choice,
  type PublicationFlags,
} from "@/lib/publication";
import { STAFF_ROLES, type StaffRoleId } from "@/lib/staff";

type ApplicationRow = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  participatedLastYear: boolean;
  role: StaffRoleId;
  privacyConsent: boolean;
  mediaConsent: boolean;
  createdAt: Date;
  privacyPolicyVersion: string;
  birthDate: Date | null;
  ageBand: string | null;
  applicationStatus: string | null;
  guardianFirstName: string | null;
  guardianLastName: string | null;
  guardianEmail: string | null;
  guardianPhone: string | null;
  g3: string | null;
  secondGuardianFirstName: string | null;
  secondGuardianLastName: string | null;
  secondGuardianEmail: string | null;
  consents?: {
    key: string;
    value: string;
    actor: ConsentSnapshot["actor"];
    revokedAt: Date | null;
    createdAt: Date;
  }[];
};

export type ApplicationDTO = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  participatedLastYear: boolean;
  role: StaffRoleId;
  privacyConsent: boolean;
  mediaConsent: boolean;
  createdAt: string;
  legacy: boolean;
  birthDate: string | null;
  ageBand: AgeBand | null;
  applicationStatus: string | null;
  guardianName: string | null;
  guardianEmail: string | null;
  guardianPhone: string | null;
  g3: G3Choice | null;
  secondGuardianName: string | null;
  secondGuardianEmail: string | null;
  pendingGuardian: boolean;
  pendingOtherGuardian: boolean;
  flags: PublicationFlags;
  legacyMediaLabel: string | null;
  legacyRightsNote: string | null;
  blockers: string[];
  policyVersion: string;
};

export function toApplicationDTO(row: ApplicationRow): ApplicationDTO {
  const legacy = row.privacyPolicyVersion !== PRIVACY_VERSION;
  const ageBand = (row.ageBand as AgeBand | null) ?? null;
  const g3 = (row.g3 as G3Choice | null) ?? null;
  const consents: ConsentSnapshot[] = toSnapshots(row.consents ?? []);
  const flags = legacy
    ? {
        media_channels: false,
        media_promo: false,
        media_sponsor: false,
        media_press: false,
        media_interviews: false,
        fullSurname: false,
        rightsAssignment: false,
      }
    : publicationFlags({ ageBand, g3, consents });
  const blockers = acceptanceBlockers({
    legacy,
    ageBand,
    role: row.role,
    status: row.applicationStatus,
    g3,
    consents,
  });

  return {
    id: row.id,
    firstName: row.firstName,
    lastName: row.lastName,
    phone: row.phone,
    email: row.email,
    participatedLastYear: row.participatedLastYear,
    role: row.role,
    privacyConsent: row.privacyConsent,
    mediaConsent: row.mediaConsent,
    createdAt: row.createdAt.toISOString(),
    legacy,
    birthDate: formatStoredDate(row.birthDate) || null,
    ageBand,
    applicationStatus: row.applicationStatus,
    guardianName: row.guardianFirstName
      ? `${row.guardianFirstName} ${row.guardianLastName ?? ""}`.trim()
      : null,
    guardianEmail: row.guardianEmail,
    guardianPhone: row.guardianPhone,
    g3,
    secondGuardianName: row.secondGuardianFirstName
      ? `${row.secondGuardianFirstName} ${row.secondGuardianLastName ?? ""}`.trim()
      : null,
    secondGuardianEmail: row.secondGuardianEmail,
    pendingGuardian:
      !legacy &&
      ageBand === "minor16_17" &&
      (row.applicationStatus === "pending_guardian" || blockers.includes("In attesa della conferma del genitore.")),
    pendingOtherGuardian: !legacy && waitingOnOtherGuardian({ ageBand, g3, consents }),
    flags,
    legacyMediaLabel:
      legacy && row.mediaConsent ? "consenso v1.0 (solo canali ufficiali)" : null,
    legacyRightsNote:
      legacy && MEDIA_ROLES.has(row.role)
        ? "Manca la cessione dei diritti: per un ruolo media serve una nuova accettazione."
        : null,
    blockers,
    policyVersion: row.privacyPolicyVersion,
  };
}

export function roleDistribution(applications: ApplicationDTO[]) {
  return STAFF_ROLES.map((role) => ({
    id: role.id,
    label: role.label,
    shortLabel: role.shortLabel,
    count: applications.filter((item) => item.role === role.id).length,
  }));
}

export function hasMediaConsent(item: ApplicationDTO): boolean {
  if (item.legacy) return item.mediaConsent;
  return PUBLICATION_KEYS.some((key) => key.startsWith("media_") && item.flags[key]);
}

export { flagEntries, FLAG_LABELS };
