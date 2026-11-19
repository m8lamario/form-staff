import { MAX_EMAIL_ATTEMPTS, nextBackoffMs } from "@/lib/email/backoff";
import { warnEmailConfig } from "@/lib/email/config";
import { sendEmail } from "@/lib/email/send";
import { prisma } from "@/lib/prisma";

export type QueueInput = {
  applicationId?: number | null;
  kind: string;
  to: string;
  subject: string;
  html: string;
  text: string;
};

export async function enqueueEmail(input: QueueInput): Promise<{ id: number; sent: boolean; reason?: string }> {
  warnEmailConfig();
  const row = await prisma.emailOutbox.create({
    data: {
      applicationId: input.applicationId ?? null,
      kind: input.kind,
      toEmail: input.to,
      subject: input.subject,
      html: input.html,
      textBody: input.text,
      status: "queued",
      nextAttemptAt: new Date(),
    },
  });
  const result = await deliverOutbox(row.id);
  return { id: row.id, sent: result.sent, reason: result.reason };
}

export async function processOutbox(limit = 25): Promise<{ sent: number; failed: number }> {
  const due = await prisma.emailOutbox.findMany({
    where: {
      status: { in: ["queued", "error"] },
      attempts: { lt: MAX_EMAIL_ATTEMPTS },
      nextAttemptAt: { lte: new Date() },
    },
    orderBy: { nextAttemptAt: "asc" },
    take: limit,
  });
  let sent = 0;
  let failed = 0;
  for (const row of due) {
    const result = await deliverOutbox(row.id);
    if (result.sent) sent += 1;
    else failed += 1;
  }
  return { sent, failed };
}

async function deliverOutbox(id: number): Promise<{ sent: boolean; reason?: string }> {
  const row = await prisma.emailOutbox.findUnique({ where: { id } });
  if (!row || row.status === "sent" || row.attempts >= MAX_EMAIL_ATTEMPTS) {
    return { sent: row?.status === "sent" };
  }
  const result = await sendEmail({
    to: row.toEmail,
    subject: row.subject,
    html: row.html,
    text: row.textBody,
  });
  if (result.ok) {
    await prisma.emailOutbox.update({
      where: { id },
      data: { status: "sent", sentAt: new Date(), lastError: null, attempts: { increment: 1 } },
    });
    return { sent: true };
  }
  const attempts = row.attempts + 1;
  await prisma.emailOutbox.update({
    where: { id },
    data: {
      status: "error",
      attempts,
      lastError: result.error.slice(0, 500),
      nextAttemptAt: new Date(Date.now() + nextBackoffMs(attempts)),
    },
  });
  return { sent: false, reason: result.error };
}
