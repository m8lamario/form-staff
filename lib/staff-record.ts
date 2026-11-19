import { birthDateToDb, formatStoredDate, type AgeBand } from "@/lib/age";
import {
  ADULT_MEDIA_TEXT,
  AGE_DECLARATION_TEXT,
  G3_TEXT,
  MEDIA_KEYS,
  MINOR_MEDIA_TEXT,
  REVOCABLE_KEYS,
  REVOKE_LABELS,
  adultPrivacyReadText,
  adultRightsText,
  adultTermsText,
  c1ConfirmText,
  c1DeclineText,
  commsFutureText,
  fullSurnameText,
  g16Text,
  g1Text,
  guardianPrivacyText,
  guardianRightsText,
  guardianTermsText,
  minorPrivacyReadText,
  minorTermsText,
  soleHolderText,
  type MediaKey,
} from "@/lib/consent-copy";
import type { GuardianConfirmData } from "@/lib/guardian";
import { adultChoiceSummary, mailConfirmation, mailGuardianInvite, mailReinform, mailSecondGuardian } from "@/lib/email/dispatch";
import { choiceLines } from "@/lib/email/messages";
import {
  PRIVACY_MINOR_VERSION,
  PRIVACY_VERSION,
  SOCIAL_VERSION,
  TERMS_VERSION,
  TOKEN_TTL_DAYS,
  isPreV2,
} from "@/lib/legal";
import { prisma } from "@/lib/prisma";
import {
  acceptanceBlockers,
  publicationFlags,
  toSnapshots,
  type ConsentSnapshot,
  type G3Choice,
} from "@/lib/publication";
import { isMediaRole, roleLabel, type StaffPayload } from "@/lib/staff";
import { addDays, hashText, hashToken, newToken } from "@/lib/tokens";
import type { ConsentActor, TokenPurpose } from "@prisma/client";

export type RequestMeta = { ipHash: string | null; userAgent: string | null };

export type SubmitNotice = {
  kind: "adult" | "minor";
  guardianEmail?: string;
  emailSent: boolean;
  emailReason?: string;
  devGuardianPath?: string;
  devSecondGuardianPath?: string;
  devRevokePath?: string;
};

type ConsentDraft = {
  key: string;
  value: string;
  actor: ConsentActor;
  document: string;
  documentVersion: string;
  text: string;
};

const REVOCABLE = new Set<string>(REVOCABLE_KEYS);

function draftsToRows(drafts: ConsentDraft[], meta: RequestMeta) {
  return drafts.map((draft) => ({
    key: draft.key,
    value: draft.value,
    actor: draft.actor,
    document: draft.document,
    documentVersion: draft.documentVersion,
    textHash: hashText(draft.text),
    ip: meta.ipHash,
    userAgent: meta.userAgent,
  }));
}

function boolValue(value: boolean): string {
  return value ? "true" : "false";
}

function candidateDrafts(data: StaffPayload): ConsentDraft[] {
  const drafts: ConsentDraft[] = [
    {
      key: "ageDeclaration",
      value: data.ageDeclaration,
      actor: "candidate",
      document: "privacy",
      documentVersion: PRIVACY_VERSION,
      text: AGE_DECLARATION_TEXT[data.ageDeclaration],
    },
  ];

  if (data.ageBand === "adult") {
    drafts.push(
      {
        key: "privacyRead",
        value: "true",
        actor: "candidate",
        document: "privacy",
        documentVersion: PRIVACY_VERSION,
        text: adultPrivacyReadText,
      },
      {
        key: "termsAccepted",
        value: "true",
        actor: "candidate",
        document: "termini",
        documentVersion: TERMS_VERSION,
        text: adultTermsText,
      },
    );
    if (isMediaRole(data.role)) {
      drafts.push({
        key: "rightsAssignment",
        value: boolValue(data.rightsAssignment),
        actor: "candidate",
        document: "termini",
        documentVersion: TERMS_VERSION,
        text: adultRightsText,
      });
    }
    for (const key of MEDIA_KEYS) {
      drafts.push({
        key,
        value: boolValue(data.media[key]),
        actor: "candidate",
        document: "social",
        documentVersion: SOCIAL_VERSION,
        text: ADULT_MEDIA_TEXT[key],
      });
    }
    drafts.push({
      key: "comms_future",
      value: boolValue(data.comms_future),
      actor: "candidate",
      document: "privacy",
      documentVersion: PRIVACY_VERSION,
      text: commsFutureText,
    });
    return drafts;
  }

  drafts.push(
    {
      key: "privacyRead",
      value: "true",
      actor: "candidate",
      document: "privacy",
      documentVersion: PRIVACY_VERSION,
      text: minorPrivacyReadText,
    },
    {
      key: "termsRead",
      value: "true",
      actor: "candidate",
      document: "termini",
      documentVersion: TERMS_VERSION,
      text: minorTermsText,
    },
    {
      key: "G16",
      value: boolValue(data.g16),
      actor: "candidate",
      document: "social",
      documentVersion: SOCIAL_VERSION,
      text: g16Text,
    },
  );
  if (data.guardian) {
    drafts.push({
      key: "G3",
      value: data.guardian.g3,
      actor: "candidate",
      document: "privacy_minori",
      documentVersion: PRIVACY_MINOR_VERSION,
      text: G3_TEXT[data.guardian.g3],
    });
  }
  return drafts;
}

function withDevLinks(
  notice: SubmitNotice,
  links: { guardian?: string | null; second?: string | null; revoke?: string | null },
): SubmitNotice {
  if (process.env.NODE_ENV === "production") return notice;
  return {
    ...notice,
    devGuardianPath: links.guardian ? `/genitore/${links.guardian}` : undefined,
    devSecondGuardianPath: links.second ? `/genitore/conferma/${links.second}` : undefined,
    devRevokePath: links.revoke ? `/revoca/${links.revoke}` : undefined,
  };
}

async function safeMail(task: () => Promise<{ sent: boolean; reason?: string }>): Promise<{ sent: boolean; reason?: string }> {
  try {
    return await task();
  } catch (error) {
    console.error("[leonessa-email]", error);
    return { sent: false, reason: "Invio email non riuscito" };
  }
}

export async function createStaffApplication(data: StaffPayload, meta: RequestMeta) {
  const now = new Date();
  const expiresAt = addDays(now, TOKEN_TTL_DAYS);
  const guardianRaw = data.guardian ? newToken() : null;
  const revokeRaw = newToken();

  const created = await prisma.staffApplication.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      participatedLastYear: data.participatedLastYear,
      role: data.role,
      privacyConsent: true,
      privacyConsentAt: now,
      privacyPolicyVersion: PRIVACY_VERSION,
      mediaConsent: false,
      mediaPolicyVersion: SOCIAL_VERSION,
      birthDate: birthDateToDb(data.birthDate),
      ageBand: data.ageBand,
      ageDeclaration: data.ageDeclaration,
      applicationStatus: data.ageBand === "minor16_17" ? "pending_guardian" : "submitted",
      guardianFirstName: data.guardian?.firstName,
      guardianLastName: data.guardian?.lastName,
      guardianRelation: data.guardian?.relation,
      guardianEmail: data.guardian?.email,
      guardianPhone: data.guardian?.phone,
      g3: data.guardian?.g3,
      secondGuardianFirstName: data.guardian?.second?.firstName,
      secondGuardianLastName: data.guardian?.second?.lastName,
      secondGuardianEmail: data.guardian?.second?.email,
      consents: { create: draftsToRows(candidateDrafts(data), meta) },
      tokens: {
        create: [
          ...(guardianRaw
            ? [
                {
                  purpose: "guardian1" as const,
                  actor: "guardian1" as const,
                  tokenHash: hashToken(guardianRaw),
                  expiresAt,
                },
              ]
            : []),
          {
            purpose: "revoke" as const,
            actor: (data.guardian ? "guardian1" : "candidate") as ConsentActor,
            tokenHash: hashToken(revokeRaw),
            expiresAt,
          },
        ],
      },
    },
  });

  const mail =
    data.ageBand === "minor16_17" && data.guardian && guardianRaw
      ? await safeMail(() =>
          mailGuardianInvite({
            applicationId: created.id,
            to: data.guardian!.email,
            guardianName: `${data.guardian!.firstName} ${data.guardian!.lastName}`.trim(),
            minorName: `${data.firstName} ${data.lastName}`.trim(),
            birthDate: data.birthDate,
            roleLabel: roleLabel(data.role),
            token: guardianRaw,
          }),
        )
      : await safeMail(() =>
          mailConfirmation({
            applicationId: created.id,
            to: data.email,
            recipientName: data.firstName,
            personName: `${data.firstName} ${data.lastName}`.trim(),
            summary: adultChoiceSummary({
              ...data.media,
              rightsAssignment: data.rightsAssignment,
              comms_future: data.comms_future,
            }),
            revokeToken: revokeRaw,
            audience: "adult",
          }),
        );

  const notice = withDevLinks(
    {
      kind: data.ageBand === "minor16_17" ? "minor" : "adult",
      guardianEmail: data.guardian?.email,
      emailSent: mail.sent,
      emailReason: mail.reason,
    },
    { guardian: guardianRaw, revoke: revokeRaw },
  );

  return { id: created.id, notice };
}

async function loadToken(raw: string, purpose: TokenPurpose) {
  const token = await prisma.staffToken.findUnique({
    where: { tokenHash: hashToken(raw) },
    include: {
      application: {
        include: { consents: { orderBy: { createdAt: "asc" } } },
      },
    },
  });
  if (!token || token.purpose !== purpose) return { ok: false as const, reason: "invalid" as const };
  if (purpose !== "revoke" && token.usedAt) return { ok: false as const, reason: "used" as const };
  if (token.expiresAt.getTime() < Date.now()) return { ok: false as const, reason: "expired" as const };
  return { ok: true as const, token };
}

export async function guardianValidationContext(raw: string) {
  const loaded = await loadToken(raw, "guardian1");
  if (!loaded.ok) return loaded;
  const app = loaded.token.application;
  return {
    ok: true as const,
    context: {
      candidateEmail: app.email.toLowerCase(),
      guardianEmail: (app.guardianEmail ?? "").toLowerCase(),
      role: app.role,
    },
  };
}

export async function readGuardianPage(raw: string) {
  const loaded = await loadToken(raw, "guardian1");
  if (!loaded.ok) return loaded;
  const app = loaded.token.application;
  return {
    ok: true as const,
    page: {
      minorName: `${app.firstName} ${app.lastName}`,
      birthDate: formatStoredDate(app.birthDate),
      roleLabel: roleLabel(app.role),
      mediaRole: isMediaRole(app.role),
      g3: (app.g3 ?? "other_parent") as G3Choice,
      second: app.secondGuardianEmail
        ? {
            firstName: app.secondGuardianFirstName ?? "",
            lastName: app.secondGuardianLastName ?? "",
            email: app.secondGuardianEmail,
          }
        : null,
    },
  };
}

export async function confirmGuardian(raw: string, data: GuardianConfirmData, meta: RequestMeta) {
  const loaded = await loadToken(raw, "guardian1");
  if (!loaded.ok) return loaded;
  const app = loaded.token.application;
  const minorName = `${app.firstName} ${app.lastName}`;
  const drafts: ConsentDraft[] = [
    {
      key: "G1",
      value: "true",
      actor: "guardian1",
      document: "privacy_minori",
      documentVersion: PRIVACY_MINOR_VERSION,
      text: g1Text(minorName),
    },
    {
      key: "G3_confirm",
      value: data.g3,
      actor: "guardian1",
      document: "privacy_minori",
      documentVersion: PRIVACY_MINOR_VERSION,
      text: G3_TEXT[data.g3],
    },
    {
      key: "guardianPrivacyRead",
      value: "true",
      actor: "guardian1",
      document: "privacy_minori",
      documentVersion: PRIVACY_MINOR_VERSION,
      text: guardianPrivacyText,
    },
    {
      key: "guardianTermsAccepted",
      value: "true",
      actor: "guardian1",
      document: "termini",
      documentVersion: TERMS_VERSION,
      text: guardianTermsText,
    },
  ];
  if (data.g3 === "sole_holder") {
    drafts.push({
      key: "soleHolderDeclaration",
      value: "true",
      actor: "guardian1",
      document: "privacy_minori",
      documentVersion: PRIVACY_MINOR_VERSION,
      text: soleHolderText,
    });
  }
  for (const key of MEDIA_KEYS) {
    drafts.push({
      key,
      value: boolValue(data.media[key]),
      actor: "guardian1",
      document: "social",
      documentVersion: SOCIAL_VERSION,
      text: MINOR_MEDIA_TEXT[key],
    });
  }
  drafts.push({
    key: "fullSurname",
    value: boolValue(data.fullSurname),
    actor: "guardian1",
    document: "social",
    documentVersion: SOCIAL_VERSION,
    text: fullSurnameText,
  });
  if (isMediaRole(app.role)) {
    drafts.push({
      key: "rightsAssignment",
      value: boolValue(data.rightsAssignment),
      actor: "guardian1",
      document: "termini",
      documentVersion: TERMS_VERSION,
      text: guardianRightsText,
    });
  }

  const secondRaw = data.g3 === "other_parent" ? newToken() : null;
  const revokeRaw = newToken();
  const expiresAt = addDays(new Date(), TOKEN_TTL_DAYS);

  await prisma.$transaction([
    prisma.staffApplication.update({
      where: { id: app.id },
      data: {
        g3: data.g3,
        applicationStatus: "submitted",
        secondGuardianFirstName: data.second?.firstName ?? null,
        secondGuardianLastName: data.second?.lastName ?? null,
        secondGuardianEmail: data.second?.email ?? null,
      },
    }),
    prisma.staffConsent.createMany({
      data: draftsToRows(drafts, meta).map((row) => ({ ...row, applicationId: app.id })),
    }),
    prisma.staffToken.update({
      where: { id: loaded.token.id },
      data: { usedAt: new Date() },
    }),
    prisma.staffToken.create({
      data: {
        applicationId: app.id,
        purpose: "revoke",
        actor: "guardian1",
        tokenHash: hashToken(revokeRaw),
        expiresAt,
      },
    }),
    ...(secondRaw
      ? [
          prisma.staffToken.create({
            data: {
              applicationId: app.id,
              purpose: "guardian2",
              actor: "guardian2",
              tokenHash: hashToken(secondRaw),
              expiresAt,
            },
          }),
        ]
      : []),
  ]);

  const summary = choiceLines({
    ...data.media,
    fullSurname: data.fullSurname,
    rightsAssignment: isMediaRole(app.role) ? data.rightsAssignment : undefined,
  });
  const mail =
    data.g3 === "other_parent" && data.second && secondRaw
      ? await safeMail(() =>
          mailSecondGuardian({
            applicationId: app.id,
            to: data.second!.email,
            minorName,
            firstGuardianName: `${app.guardianFirstName ?? ""} ${app.guardianLastName ?? ""}`.trim(),
            roleLabel: roleLabel(app.role),
            summary,
            token: secondRaw,
          }),
        )
      : await safeMail(() =>
          mailConfirmation({
            applicationId: app.id,
            to: app.guardianEmail ?? "",
            recipientName: `${app.guardianFirstName ?? ""} ${app.guardianLastName ?? ""}`.trim(),
            personName: minorName,
            summary,
            revokeToken: revokeRaw,
            audience: "guardian",
          }),
        );

  return {
    ok: true as const,
    notice: withDevLinks(
      {
        kind: "minor" as const,
        guardianEmail: data.g3 === "other_parent" ? data.second?.email : app.guardianEmail ?? undefined,
        emailSent: mail.sent,
        emailReason: mail.reason,
      },
      { second: secondRaw, revoke: revokeRaw },
    ),
    soleHolder: data.g3 === "sole_holder",
  };
}

export async function readSecondGuardianPage(raw: string) {
  const loaded = await loadToken(raw, "guardian2");
  if (!loaded.ok) return loaded;
  const app = loaded.token.application;
  const snapshots = toSnapshots(app.consents);
  const choices = [...MEDIA_KEYS, "fullSurname", "rightsAssignment"].map((key) => {
    const row = [...snapshots]
      .reverse()
      .find((item) => item.key === key && item.actor === "guardian1");
    return {
      key,
      label:
        key === "fullSurname"
          ? "Cognome completo"
          : key === "rightsAssignment"
            ? "Cessione dei diritti sui contenuti"
            : REVOKE_LABELS[key as MediaKey],
      yes: row?.value === "true" && !row.revokedAt,
    };
  });
  return {
    ok: true as const,
    page: {
      minorName: `${app.firstName} ${app.lastName}`,
      firstGuardianName: `${app.guardianFirstName ?? ""} ${app.guardianLastName ?? ""}`.trim(),
      birthDate: formatStoredDate(app.birthDate),
      roleLabel: roleLabel(app.role),
      choices,
    },
  };
}

export async function confirmSecondGuardian(
  raw: string,
  decision: "confirm" | "decline",
  meta: RequestMeta,
) {
  const loaded = await loadToken(raw, "guardian2");
  if (!loaded.ok) return loaded;
  const app = loaded.token.application;
  const confirmed = decision === "confirm";
  const revokeRaw = confirmed ? newToken() : null;
  await prisma.$transaction([
    prisma.staffConsent.create({
      data: {
        applicationId: app.id,
        key: "C1",
        value: boolValue(confirmed),
        actor: "guardian2",
        document: "social",
        documentVersion: SOCIAL_VERSION,
        textHash: hashText(confirmed ? c1ConfirmText : c1DeclineText),
        ip: meta.ipHash,
        userAgent: meta.userAgent,
      },
    }),
    prisma.staffToken.update({
      where: { id: loaded.token.id },
      data: { usedAt: new Date() },
    }),
    ...(revokeRaw
      ? [
          prisma.staffToken.create({
            data: {
              applicationId: app.id,
              purpose: "revoke" as const,
              actor: "guardian2" as const,
              tokenHash: hashToken(revokeRaw),
              expiresAt: addDays(new Date(), TOKEN_TTL_DAYS),
            },
          }),
        ]
      : []),
  ]);
  if (confirmed && revokeRaw) {
    const snapshots = toSnapshots(app.consents);
    const summary = choiceLines(
      Object.fromEntries(
        ["media_channels", "media_promo", "media_sponsor", "media_press", "media_interviews", "fullSurname", "rightsAssignment"].map(
          (key) => {
            const row = [...snapshots].reverse().find((item) => item.key === key && item.actor === "guardian1");
            return [key, row?.value === "true" && !row.revokedAt];
          },
        ),
      ),
    );
    const minorName = `${app.firstName} ${app.lastName}`;
    await safeMail(() =>
      mailConfirmation({
        applicationId: app.id,
        to: app.guardianEmail ?? "",
        recipientName: `${app.guardianFirstName ?? ""} ${app.guardianLastName ?? ""}`.trim(),
        personName: minorName,
        summary,
        revokeToken: revokeRaw,
        audience: "guardian",
      }),
    );
    if (app.secondGuardianEmail) {
      await safeMail(() =>
        mailConfirmation({
          applicationId: app.id,
          to: app.secondGuardianEmail ?? "",
          recipientName: `${app.secondGuardianFirstName ?? ""} ${app.secondGuardianLastName ?? ""}`.trim(),
          personName: minorName,
          summary,
          revokeToken: revokeRaw,
          audience: "guardian",
          kind: "guardian2_confirm",
        }),
      );
    }
  }
  return { ok: true as const, confirmed };
}

export async function readRevokePage(raw: string) {
  const loaded = await loadToken(raw, "revoke");
  if (!loaded.ok) return loaded;
  const app = loaded.token.application;
  const snapshots = toSnapshots(app.consents);
  const options = REVOCABLE_KEYS.map((key) => {
    const row = [...snapshots].reverse().find((item) => item.key === key && item.value === "true" && !item.revokedAt);
    return {
      key,
      label: REVOKE_LABELS[key],
      active: Boolean(row),
      rights: key === "rightsAssignment",
    };
  }).filter((item) => item.active);
  return {
    ok: true as const,
    page: {
      personName: `${app.firstName} ${app.lastName}`,
      options,
    },
  };
}

export async function revokeByToken(raw: string, keys: string[], note: string) {
  const loaded = await loadToken(raw, "revoke");
  if (!loaded.ok) return loaded;
  return revokeKeys(loaded.token.application.id, keys, loaded.token.actor ?? "candidate", note);
}

export async function revokeByAdmin(applicationId: number, keys: string[], note: string) {
  return revokeKeys(applicationId, keys, "admin", note);
}

async function revokeKeys(
  applicationId: number,
  keys: string[],
  actor: ConsentActor,
  note: string,
) {
  const cleanNote = note.trim();
  if (!cleanNote) return { ok: false as const, error: "Inserisci una nota per la revoca" };
  const selected = keys.filter((key) => REVOCABLE.has(key));
  if (selected.length === 0) {
    return { ok: false as const, error: "Seleziona almeno un consenso da revocare" };
  }
  const now = new Date();
  let updated = 0;
  for (const key of selected) {
    const row = await prisma.staffConsent.findFirst({
      where: { applicationId, key, value: "true", revokedAt: null },
      orderBy: { createdAt: "desc" },
    });
    if (!row) continue;
    await prisma.staffConsent.update({
      where: { id: row.id },
      data: { revokedAt: now, revokedBy: actor, revocationNote: cleanNote },
    });
    updated += 1;
  }
  if (updated === 0) {
    return { ok: false as const, error: "Nessun consenso attivo da revocare" };
  }
  return { ok: true as const, updated };
}

export async function setApplicationStatus(id: number, status: "accepted" | "rejected") {
  const app = await prisma.staffApplication.findUnique({
    where: { id },
    include: { consents: true },
  });
  if (!app || isPreV2(app.privacyPolicyVersion)) {
    return { ok: false as const, error: "Le candidature già inviate non si modificano da qui" };
  }
  if (status === "accepted") {
    const blockers = acceptanceBlockers({
      legacy: false,
      ageBand: (app.ageBand as AgeBand | null) ?? null,
      role: app.role,
      status: app.applicationStatus,
      g3: app.g3,
      consents: toSnapshots(app.consents),
    });
    if (blockers.length > 0) return { ok: false as const, error: blockers[0] };
  }
  await prisma.staffApplication.update({
    where: { id },
    data: { applicationStatus: status },
  });
  return { ok: true as const };
}

export async function setApplicationRole(id: number, role: string) {
  const app = await prisma.staffApplication.findUnique({ where: { id } });
  if (!app || isPreV2(app.privacyPolicyVersion)) {
    return { ok: false as const, error: "Le candidature già inviate non si modificano da qui" };
  }
  if (!["CASSA", "INTERVISTE", "GIORNALE", "FOTOGRAFIA", "SOCIAL", "BUTTA_FUORI"].includes(role)) {
    return { ok: false as const, error: "Ruolo non previsto" };
  }
  if (app.ageBand === "minor16_17" && (role === "CASSA" || role === "BUTTA_FUORI")) {
    return { ok: false as const, error: "I ruoli Cassa e Sicurezza sono riservati ai maggiorenni" };
  }
  await prisma.staffApplication.update({
    where: { id },
    data: { role: role as StaffPayload["role"] },
  });
  return { ok: true as const };
}

export async function purgeUnconfirmedSecondGuardians(now = new Date()) {
  const cutoff = addDays(now, -TOKEN_TTL_DAYS);
  const rows = await prisma.staffApplication.findMany({
    where: {
      privacyPolicyVersion: { startsWith: "2." },
      g3: "other_parent",
      secondGuardianEmail: { not: null },
      createdAt: { lt: cutoff },
    },
    include: { consents: { where: { key: "C1" } } },
  });
  for (const row of rows) {
    const confirmed = row.consents.some((consent) => consent.value === "true" && !consent.revokedAt);
    if (confirmed) continue;
    await prisma.staffApplication.update({
      where: { id: row.id },
      data: {
        secondGuardianFirstName: null,
        secondGuardianLastName: null,
        secondGuardianEmail: null,
      },
    });
  }
}

export function choiceFlags(ageBand: AgeBand | null, g3: G3Choice | null, consents: ConsentSnapshot[]) {
  return publicationFlags({ ageBand, g3, consents });
}

export async function resendGuardianInvite(applicationId: number) {
  const app = await prisma.staffApplication.findUnique({ where: { id: applicationId } });
  if (!app?.guardianEmail || app.applicationStatus !== "pending_guardian" || isPreV2(app.privacyPolicyVersion)) {
    return { ok: false as const, error: "Non c'è un invito al genitore da reinviare" };
  }
  const raw = newToken();
  const now = new Date();
  await prisma.$transaction([
    prisma.staffToken.updateMany({
      where: { applicationId, purpose: "guardian1", usedAt: null },
      data: { usedAt: now },
    }),
    prisma.staffToken.create({
      data: {
        applicationId,
        purpose: "guardian1",
        actor: "guardian1",
        tokenHash: hashToken(raw),
        expiresAt: addDays(now, TOKEN_TTL_DAYS),
      },
    }),
  ]);
  const mail = await safeMail(() =>
    mailGuardianInvite({
      applicationId,
      to: app.guardianEmail ?? "",
      guardianName: `${app.guardianFirstName ?? ""} ${app.guardianLastName ?? ""}`.trim(),
      minorName: `${app.firstName} ${app.lastName}`,
      birthDate: formatStoredDate(app.birthDate),
      roleLabel: roleLabel(app.role),
      token: raw,
    }),
  );
  return { ok: true as const, emailSent: mail.sent, emailReason: mail.reason };
}

export async function sendUpdatedNotice(applicationId: number) {
  const app = await prisma.staffApplication.findUnique({ where: { id: applicationId } });
  if (!app || !isPreV2(app.privacyPolicyVersion)) {
    return { ok: false as const, error: "Questa candidatura non è precedente alla versione 2.0" };
  }
  const raw = newToken();
  const now = new Date();
  await prisma.$transaction([
    prisma.staffToken.updateMany({
      where: { applicationId, purpose: "reinform", usedAt: null },
      data: { usedAt: now },
    }),
    prisma.staffToken.create({
      data: {
        applicationId,
        purpose: "reinform",
        actor: "candidate",
        tokenHash: hashToken(raw),
        expiresAt: addDays(now, TOKEN_TTL_DAYS),
      },
    }),
  ]);
  const mail = await safeMail(() =>
    mailReinform({
      applicationId,
      to: app.email,
      firstName: app.firstName,
      token: raw,
    }),
  );
  return { ok: true as const, emailSent: mail.sent, emailReason: mail.reason };
}

export async function readRenewalPage(raw: string) {
  const loaded = await loadToken(raw, "reinform");
  if (!loaded.ok) return loaded;
  const app = loaded.token.application;
  return {
    ok: true as const,
    page: {
      firstName: app.firstName,
      roleLabel: roleLabel(app.role),
      mediaRole: isMediaRole(app.role),
    },
  };
}

export async function completeLegacyRenewal(
  raw: string,
  input: { privacyRead: boolean; media: Record<MediaKey, boolean>; rightsAssignment: boolean },
  meta: RequestMeta,
) {
  const loaded = await loadToken(raw, "reinform");
  if (!loaded.ok) return loaded;
  if (!input.privacyRead) return { ok: false as const, error: "Conferma di aver letto l'informativa aggiornata" };
  const app = loaded.token.application;
  const drafts: ConsentDraft[] = [
    {
      key: "privacyRead",
      value: "true",
      actor: "candidate",
      document: "privacy",
      documentVersion: PRIVACY_VERSION,
      text: adultPrivacyReadText,
    },
    {
      key: "legacyRenewal",
      value: "true",
      actor: "candidate",
      document: "privacy",
      documentVersion: PRIVACY_VERSION,
      text: "Ho preso visione dell'informativa aggiornata e ho rinnovato le scelte.",
    },
  ];
  for (const key of MEDIA_KEYS) {
    drafts.push({
      key,
      value: boolValue(input.media[key]),
      actor: "candidate",
      document: "social",
      documentVersion: SOCIAL_VERSION,
      text: ADULT_MEDIA_TEXT[key],
    });
  }
  if (isMediaRole(app.role)) {
    drafts.push({
      key: "rightsAssignment",
      value: boolValue(input.rightsAssignment),
      actor: "candidate",
      document: "termini",
      documentVersion: TERMS_VERSION,
      text: adultRightsText,
    });
  }
  await prisma.$transaction([
    prisma.staffConsent.createMany({
      data: draftsToRows(drafts, meta).map((row) => ({ ...row, applicationId: app.id })),
    }),
    prisma.staffToken.update({
      where: { id: loaded.token.id },
      data: { usedAt: new Date() },
    }),
  ]);
  return { ok: true as const };
}
