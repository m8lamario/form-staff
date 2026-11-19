import { describe, expect, it } from "vitest";
import { UNDERAGE_MESSAGE, getStepErrors, validateStaffPayload } from "./staff";

const NOW = new Date("2026-11-18T10:00:00+01:00");

const adult = {
  firstName: "Giulia",
  lastName: "Rossi",
  birthDate: "2000-01-15",
  ageDeclaration: "adult",
  phone: "+39 333 1234567",
  email: "giulia.rossi@example.com",
  participatedLastYear: false,
  role: "CASSA",
  privacyRead: true,
  termsAccepted: true,
  termsRead: false,
  rightsAssignment: false,
  media_channels: false,
  media_promo: false,
  media_sponsor: false,
  media_press: false,
  media_interviews: false,
  comms_future: false,
  g16: false,
  guardianFirstName: "",
  guardianLastName: "",
  guardianRelation: "",
  guardianEmail: "",
  guardianPhone: "",
  g3: "",
  secondGuardianFirstName: "",
  secondGuardianLastName: "",
  secondGuardianEmail: "",
};

const minorBase = {
  ...adult,
  birthDate: "2009-06-01",
  ageDeclaration: "minor16_17",
  role: "GIORNALE",
  termsAccepted: false,
  termsRead: true,
  g16: true,
  guardianFirstName: "Marco",
  guardianLastName: "Rossi",
  guardianRelation: "GENITORE",
  guardianEmail: "marco.rossi@example.com",
  guardianPhone: "+39 333 7654321",
  g3: "sole_holder",
};

describe("validateStaffPayload", () => {
  it("accetta un maggiorenne con le sole caselle obbligatorie", () => {
    const result = validateStaffPayload(adult, NOW);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.ageBand).toBe("adult");
      expect(result.data.termsAccepted).toBe(true);
      expect(result.data.media.media_channels).toBe(false);
      expect(result.data.rightsAssignment).toBe(false);
    }
  });

  it("accetta un maggiorenne con ruolo Foto e cessione dei diritti", () => {
    const result = validateStaffPayload(
      { ...adult, role: "FOTOGRAFIA", rightsAssignment: true, media_channels: true },
      NOW,
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.role).toBe("FOTOGRAFIA");
      expect(result.data.rightsAssignment).toBe(true);
    }
  });

  it("rifiuta il ruolo Foto senza cessione dei diritti", () => {
    const result = validateStaffPayload({ ...adult, role: "FOTOGRAFIA" }, NOW);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.rightsAssignment).toBeTruthy();
  });

  it("accetta un minorenne con un solo genitore unico esercente", () => {
    const result = validateStaffPayload(minorBase, NOW);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.ageBand).toBe("minor16_17");
      expect(result.data.guardian?.g3).toBe("sole_holder");
      expect(result.data.guardian?.second).toBeNull();
    }
  });

  it("richiede i dati dell'altro genitore", () => {
    const result = validateStaffPayload({ ...minorBase, g3: "other_parent" }, NOW);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.secondGuardianFirstName).toBeTruthy();
      expect(result.errors.secondGuardianEmail).toBeTruthy();
    }
  });

  it("accetta due genitori", () => {
    const result = validateStaffPayload(
      {
        ...minorBase,
        g3: "other_parent",
        secondGuardianFirstName: "Laura",
        secondGuardianLastName: "Bianchi",
        secondGuardianEmail: "laura.bianchi@example.com",
      },
      NOW,
    );
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.guardian?.second?.email).toBe("laura.bianchi@example.com");
    }
  });

  it("blocca Cassa e Sicurezza per i 16-17enni", () => {
    const cassa = validateStaffPayload({ ...minorBase, role: "CASSA" }, NOW);
    const security = validateStaffPayload({ ...minorBase, role: "BUTTA_FUORI" }, NOW);
    expect(cassa.ok).toBe(false);
    expect(security.ok).toBe(false);
    if (!cassa.ok) expect(cassa.errors.role).toMatch(/maggiorenni/);
  });

  it("blocca chi non ha compiuto 16 anni", () => {
    const result = validateStaffPayload(
      { ...adult, birthDate: "2010-11-19", ageDeclaration: "minor16_17" },
      NOW,
    );
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.birthDate).toBe(UNDERAGE_MESSAGE);
  });

  it("considera maggiorenne chi compie 18 anni nel giorno della candidatura", () => {
    const result = validateStaffPayload({ ...adult, birthDate: "2008-11-18" }, NOW);
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.ageBand).toBe("adult");
  });

  it("considera 16 anni compiuti chi nasce nello stesso giorno", () => {
    const result = validateStaffPayload(
      { ...minorBase, birthDate: "2010-11-18" },
      NOW,
    );
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.ageBand).toBe("minor16_17");
  });

  it("rifiuta una fascia d'età incoerente con la data di nascita", () => {
    const result = validateStaffPayload({ ...adult, ageDeclaration: "minor16_17" }, NOW);
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors.ageDeclaration).toMatch(/non coincide/);
  });

  it("non richiede più una scelta sì/no unica sulle riprese", () => {
    const result = validateStaffPayload(adult, NOW);
    expect(result.ok).toBe(true);
  });
});

describe("getStepErrors", () => {
  it("isola gli errori dello step corrente", () => {
    const identity = getStepErrors({}, 0, NOW);
    expect(identity.firstName).toBeTruthy();
    expect(identity.birthDate).toBeTruthy();
    expect(identity.email).toBeUndefined();

    const contacts = getStepErrors({ ...adult, phone: "", email: "" }, 1, NOW);
    expect(contacts.phone).toBeTruthy();
    expect(contacts.email).toBeTruthy();
    expect(contacts.firstName).toBeUndefined();
  });
});
