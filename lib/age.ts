import { ADULT_AGE, STAFF_MIN_AGE } from "@/lib/legal";

export type AgeBand = "adult" | "minor16_17";
export type AgeResult = AgeBand | "underage";

const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export function romeDateParts(on: Date): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Rome",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(on);
  const [year, month, day] = parts.split("-").map(Number);
  return { year, month, day };
}

export function isRealCalendarDate(value: string): boolean {
  const match = DATE_PATTERN.exec(value);
  if (!match) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return false;
  const utc = new Date(Date.UTC(year, month - 1, day));
  return (
    utc.getUTCFullYear() === year &&
    utc.getUTCMonth() === month - 1 &&
    utc.getUTCDate() === day
  );
}

export function ageYears(birthDate: string, on: Date): number | null {
  if (!isRealCalendarDate(birthDate)) return null;
  const [year, month, day] = birthDate.split("-").map(Number);
  const today = romeDateParts(on);
  if (
    year > today.year ||
    (year === today.year && month > today.month) ||
    (year === today.year && month === today.month && day > today.day)
  ) {
    return null;
  }
  let age = today.year - year;
  if (today.month < month || (today.month === month && today.day < day)) {
    age -= 1;
  }
  return age;
}

export function ageBandFromBirth(birthDate: string, on: Date): AgeResult | null {
  const age = ageYears(birthDate, on);
  if (age === null || age > 120) return null;
  if (age >= ADULT_AGE) return "adult";
  if (age >= STAFF_MIN_AGE) return "minor16_17";
  return "underage";
}

export function birthDateToDb(birthDate: string): Date {
  return new Date(`${birthDate}T00:00:00.000Z`);
}

export function formatStoredDate(value: Date | null | undefined): string {
  if (!value) return "";
  const [year, month, day] = value.toISOString().slice(0, 10).split("-");
  return `${day}/${month}/${year}`;
}
