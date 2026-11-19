import { applicationsOpen, formatEventDates } from "@/lib/legal";
import { nextBackoffMs } from "@/lib/email/backoff";
import { describe, expect, it } from "vitest";

describe("formatEventDates", () => {
  it("usa la frase sulle date in via di definizione", () => {
    expect(formatEventDates({ startDate: null, endDate: null })).toBe("Date in via di definizione");
    expect(formatEventDates({ startDate: null, endDate: null }, "sentence")).toBe("in date in via di definizione");
  });

  it("formatta una o due date in italiano", () => {
    expect(formatEventDates({ startDate: "2027-04-12", endDate: null })).toBe("dal 12 aprile 2027");
    expect(formatEventDates({ startDate: "2027-04-12", endDate: "2027-04-14" })).toBe("dal 12 aprile 2027 al 14 aprile 2027");
  });
});

describe("applicationsOpen", () => {
  it("resta aperto senza scadenza e si chiude dopo la data", () => {
    expect(applicationsOpen(new Date("2027-01-01T00:00:00Z"), null)).toBe(true);
    expect(applicationsOpen(new Date("2027-06-02T00:00:00Z"), "2027-06-01T00:00:00Z")).toBe(false);
    expect(applicationsOpen(new Date("2027-05-01T00:00:00Z"), "2027-06-01T00:00:00Z")).toBe(true);
  });
});

describe("nextBackoffMs", () => {
  it("aumenta i tempi di ritrasmissione", () => {
    expect(nextBackoffMs(1)).toBe(60_000);
    expect(nextBackoffMs(2)).toBe(5 * 60_000);
    expect(nextBackoffMs(9)).toBe(6 * 60 * 60_000);
  });
});
