import { LEGAL } from "@/lib/legal";

const REQUIRED = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "EMAIL_FROM"] as const;

export function emailConfigError(): string | null {
  if (process.env.GUARDIAN_EMAIL_ENABLED !== "true") {
    return "GUARDIAN_EMAIL_ENABLED non è true: le email di servizio non partono.";
  }
  const missing = REQUIRED.filter((key) => !process.env[key]?.trim());
  if (missing.length > 0) {
    return `Mancano le variabili SMTP: ${missing.join(", ")}. Le email di servizio non partono.`;
  }
  return null;
}

export function warnEmailConfig(): void {
  const error = emailConfigError();
  if (error) {
    console.warn(`[leonessa-email] ATTENZIONE: ${error}`);
  }
}

export function mailFrom(): string {
  return process.env.EMAIL_FROM?.trim() || LEGAL.email.from;
}

export function mailReplyTo(): string {
  return process.env.EMAIL_REPLY_TO?.trim() || LEGAL.email.replyTo;
}
