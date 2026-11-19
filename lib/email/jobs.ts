import { reminderEmail, reminderLinkFromHtml } from "@/lib/email/messages";
import { enqueueEmail } from "@/lib/email/queue";
import { REMINDER_AFTER_DAYS } from "@/lib/legal";
import { prisma } from "@/lib/prisma";
import { addDays } from "@/lib/tokens";
import type { TokenPurpose } from "@prisma/client";

const REMINDER_KIND: Partial<Record<TokenPurpose, string>> = {
  guardian1: "guardian_invite",
  guardian2: "guardian_c1",
  reinform: "reinform",
};

export async function sendDueReminders(now = new Date()): Promise<number> {
  const cutoff = addDays(now, -REMINDER_AFTER_DAYS);
  const tokens = await prisma.staffToken.findMany({
    where: {
      purpose: { in: ["guardian1", "guardian2", "reinform"] },
      usedAt: null,
      reminderSentAt: null,
      expiresAt: { gt: now },
      createdAt: { lte: cutoff },
    },
    include: { application: true },
  });
  let queued = 0;
  for (const token of tokens) {
    const kind = REMINDER_KIND[token.purpose];
    if (!kind) continue;
    const previous = await prisma.emailOutbox.findFirst({
      where: { applicationId: token.applicationId, kind },
      orderBy: { createdAt: "desc" },
    });
    const link = previous ? reminderLinkFromHtml(previous.html) : null;
    if (!link) continue;
    const app = token.application;
    const to =
      token.purpose === "guardian2"
        ? app.secondGuardianEmail
        : token.purpose === "guardian1"
          ? app.guardianEmail
          : app.email;
    if (!to) continue;
    const recipient =
      token.purpose === "reinform"
        ? app.firstName
        : token.purpose === "guardian2"
          ? `${app.secondGuardianFirstName ?? ""} ${app.secondGuardianLastName ?? ""}`.trim() || "genitore"
          : `${app.guardianFirstName ?? ""} ${app.guardianLastName ?? ""}`.trim() || "genitore";
    const message = reminderEmail({
      recipientName: recipient,
      subjectName: `${app.firstName} ${app.lastName}`,
      link,
    });
    await enqueueEmail({
      applicationId: app.id,
      kind: "reminder",
      to,
      subject: message.subject,
      html: message.html,
      text: message.text,
    });
    await prisma.staffToken.update({
      where: { id: token.id },
      data: { reminderSentAt: now },
    });
    queued += 1;
  }
  return queued;
}

