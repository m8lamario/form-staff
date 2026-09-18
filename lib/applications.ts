import { STAFF_ROLES, type StaffRoleId } from "@/lib/staff";
import type { StaffApplication } from "@prisma/client";

export type ApplicationDTO = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  participatedLastYear: boolean;
  role: StaffRoleId;
  createdAt: string;
};

export function toApplicationDTO(row: StaffApplication): ApplicationDTO {
  return {
    id: row.id,
    firstName: row.firstName,
    lastName: row.lastName,
    phone: row.phone,
    email: row.email,
    participatedLastYear: row.participatedLastYear,
    role: row.role,
    createdAt: row.createdAt.toISOString(),
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
