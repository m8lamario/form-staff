import { describe, expect, it } from "vitest";
import { getStepErrors, validateStaffPayload } from "./staff";

const validPayload = {
  firstName: "Giulia",
  lastName: "Rossi",
  phone: "+39 333 1234567",
  email: "giulia.rossi@example.com",
  participatedLastYear: true,
  role: "FOTOGRAFIA",
  privacyConsent: true,
  mediaConsent: false,
};

describe("validateStaffPayload", () => {
  it("accetta una candidatura completa", () => {
    const result = validateStaffPayload(validPayload);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.email).toBe("giulia.rossi@example.com");
      expect(result.data.role).toBe("FOTOGRAFIA");
    }
  });

  it("richiede i campi obbligatori", () => {
    const result = validateStaffPayload({});
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.firstName).toBeTruthy();
      expect(result.errors.lastName).toBeTruthy();
      expect(result.errors.phone).toBeTruthy();
      expect(result.errors.email).toBeTruthy();
      expect(result.errors.participatedLastYear).toBeTruthy();
      expect(result.errors.role).toBeTruthy();
      expect(result.errors.privacyConsent).toBeTruthy();
      expect(result.errors.mediaConsent).toBeTruthy();
    }
  });

  it("rifiuta email e telefono non validi", () => {
    const result = validateStaffPayload({
      ...validPayload,
      email: "not-an-email",
      phone: "12",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.email).toBe("Email non valida");
      expect(result.errors.phone).toBe("Numero di telefono non valido");
    }
  });

  it("richiede i consensi privacy e riprese", () => {
    const result = validateStaffPayload({
      ...validPayload,
      privacyConsent: false,
      mediaConsent: null,
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.privacyConsent).toBeTruthy();
      expect(result.errors.mediaConsent).toBeTruthy();
    }
  });

  it("accetta il diniego alle riprese social", () => {
    const result = validateStaffPayload({
      ...validPayload,
      mediaConsent: false,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.data.privacyConsent).toBe(true);
      expect(result.data.mediaConsent).toBe(false);
    }
  });

  it("rifiuta un ruolo non previsto", () => {
    const result = validateStaffPayload({
      ...validPayload,
      role: "ALLENATORE",
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.role).toBe("Seleziona un ruolo");
    }
  });
});

describe("getStepErrors", () => {
  it("isola gli errori dello step corrente", () => {
    const identity = getStepErrors({}, 0);
    expect(identity.firstName).toBeTruthy();
    expect(identity.lastName).toBeTruthy();
    expect(identity.email).toBeUndefined();

    const contacts = getStepErrors({ firstName: "Giulia", lastName: "Rossi" }, 1);
    expect(contacts.phone).toBeTruthy();
    expect(contacts.email).toBeTruthy();
    expect(contacts.firstName).toBeUndefined();

    const privacy = getStepErrors({ ...validPayload, privacyConsent: false }, 4);
    expect(privacy.privacyConsent).toBeTruthy();
    expect(privacy.firstName).toBeUndefined();
  });
});
