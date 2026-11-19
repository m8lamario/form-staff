import type { MediaKey } from "@/lib/consent-copy";
import { enqueueEmail } from "@/lib/email/queue";
import {
  choiceLines,
  confirmationEmail,
  guardianInviteEmail,
  reinformEmail,
  secondGuardianEmail,
} from "@/lib/email/messages";

type MailResult = { sent: boolean; reason?: string };

async function sendQueued(input: {
  applicationId: number;
  kind: string;
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<MailResult> {
  if (!input.to.trim()) return { sent: false, reason: "Destinatario mancante" };
  const queued = await enqueueEmail(input);
  return { sent: queued.sent, reason: queued.reason };
}

export async function mailGuardianInvite(input: {
  applicationId: number;
  to: string;
  guardianName: string;
  minorName: string;
  birthDate: string;
  roleLabel: string;
  token: string;
}): Promise<MailResult> {
  const message = guardianInviteEmail(input);
  return sendQueued({
    applicationId: input.applicationId,
    kind: "guardian_invite",
    to: input.to,
    subject: message.subject,
    html: message.html,
    text: message.text,
  });
}

export async function mailSecondGuardian(input: {
  applicationId: number;
  to: string;
  minorName: string;
  firstGuardianName: string;
  roleLabel: string;
  summary: string;
  token: string;
}): Promise<MailResult> {
  const message = secondGuardianEmail(input);
  return sendQueued({
    applicationId: input.applicationId,
    kind: "guardian_c1",
    to: input.to,
    subject: message.subject,
    html: message.html,
    text: message.text,
  });
}

export async function mailConfirmation(input: {
  applicationId: number;
  to: string;
  recipientName: string;
  personName: string;
  summary: string;
  revokeToken: string;
  audience: "adult" | "guardian";
  kind?: string;
}): Promise<MailResult> {
  const message = confirmationEmail(input);
  return sendQueued({
    applicationId: input.applicationId,
    kind: input.kind ?? (input.audience === "adult" ? "adult_confirm" : "guardian_confirm"),
    to: input.to,
    subject: message.subject,
    html: message.html,
    text: message.text,
  });
}

export async function mailReinform(input: {
  applicationId: number;
  to: string;
  firstName: string;
  token: string;
}): Promise<MailResult> {
  const message = reinformEmail(input);
  return sendQueued({
    applicationId: input.applicationId,
    kind: "reinform",
    to: input.to,
    subject: message.subject,
    html: message.html,
    text: message.text,
  });
}

export function adultChoiceSummary(choices: Partial<Record<MediaKey | "rightsAssignment" | "comms_future", boolean>>): string {
  return choiceLines(choices);
}
