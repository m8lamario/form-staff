import { describe, expect, it } from "vitest";
import { validateStaffPayload } from "./staff";

const validPayload = {
  firstName: "Giulia",
  lastName: "Rossi",
  phone: "+39 333 1234567",
  email: "giulia.rossi@example.com",
  participatedLastYear: true,
  role: "FOTOGRAFIA",
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

  it("accetta solo i ruoli dello staff", () => {
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
