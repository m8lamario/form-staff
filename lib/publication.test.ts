import { describe, expect, it } from "vitest";
import {
  acceptanceBlockers,
  publicationFlags,
  type ConsentSnapshot,
} from "./publication";

function row(
  partial: Partial<ConsentSnapshot> & Pick<ConsentSnapshot, "key" | "actor">,
): ConsentSnapshot {
  return {
    value: "true",
    revokedAt: null,
    createdAt: "2026-11-18T09:00:00.000Z",
    ...partial,
  };
}

const guardianMedia = [
  row({ key: "G1", actor: "guardian1" }),
  row({ key: "G16", actor: "candidate" }),
  row({ key: "soleHolderDeclaration", actor: "guardian1" }),
  row({ key: "media_channels", actor: "guardian1" }),
  row({ key: "rightsAssignment", actor: "guardian1" }),
];

describe("publicationFlags", () => {
  it("attiva i flag del maggiorenne solo se la casella è vera e non revocata", () => {
    const flags = publicationFlags({
      ageBand: "adult",
      g3: null,
      consents: [
        row({ key: "media_channels", actor: "candidate" }),
        row({ key: "media_press", actor: "candidate", value: "false" }),
        row({
          key: "media_promo",
          actor: "candidate",
          revokedAt: "2026-11-18T10:00:00.000Z",
        }),
      ],
    });
    expect(flags.media_channels).toBe(true);
    expect(flags.media_press).toBe(false);
    expect(flags.media_promo).toBe(false);
  });

  it("non pubblica un minore con due genitori prima del C1", () => {
    const flags = publicationFlags({
      ageBand: "minor16_17",
      g3: "other_parent",
      consents: guardianMedia,
    });
    expect(flags.media_channels).toBe(false);
    expect(flags.rightsAssignment).toBe(false);
  });

  it("pubblica un minore con due genitori dopo il C1", () => {
    const flags = publicationFlags({
      ageBand: "minor16_17",
      g3: "other_parent",
      consents: [...guardianMedia, row({ key: "C1", actor: "guardian2" })],
    });
    expect(flags.media_channels).toBe(true);
    expect(flags.rightsAssignment).toBe(true);
  });

  it("pubblica un minore con unico esercente senza C1", () => {
    const flags = publicationFlags({
      ageBand: "minor16_17",
      g3: "sole_holder",
      consents: guardianMedia,
    });
    expect(flags.media_channels).toBe(true);
  });

  it("non pubblica se manca l'accordo del minore", () => {
    const flags = publicationFlags({
      ageBand: "minor16_17",
      g3: "sole_holder",
      consents: guardianMedia.filter((item) => item.key !== "G16"),
    });
    expect(flags.media_channels).toBe(false);
  });
});

describe("acceptanceBlockers", () => {
  it("blocca Cassa per un minore e i ruoli media senza cessione attiva", () => {
    const cassa = acceptanceBlockers({
      legacy: false,
      ageBand: "minor16_17",
      role: "CASSA",
      status: "submitted",
      g3: "sole_holder",
      consents: [row({ key: "G1", actor: "guardian1" })],
    });
    expect(cassa.some((item) => item.includes("Cassa"))).toBe(true);

    const photo = acceptanceBlockers({
      legacy: false,
      ageBand: "minor16_17",
      role: "FOTOGRAFIA",
      status: "submitted",
      g3: "other_parent",
      consents: [row({ key: "G1", actor: "guardian1" })],
    });
    expect(photo.some((item) => item.includes("cessione"))).toBe(true);
  });

  it("non blocca un maggiorenne", () => {
    const blockers = acceptanceBlockers({
      legacy: false,
      ageBand: "adult",
      role: "CASSA",
      status: "submitted",
      g3: null,
      consents: [],
    });
    expect(blockers).toEqual([]);
  });
});
