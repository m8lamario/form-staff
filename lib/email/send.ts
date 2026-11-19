import nodemailer from "nodemailer";
import { emailConfigError, mailFrom, mailReplyTo } from "@/lib/email/config";

export type OutboundEmail = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

export async function sendEmail(message: OutboundEmail): Promise<{ ok: true } | { ok: false; error: string }> {
  const configError = emailConfigError();
  if (configError) return { ok: false, error: configError };
  const port = Number(process.env.SMTP_PORT);
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    await transporter.sendMail({
      from: mailFrom(),
      replyTo: mailReplyTo(),
      to: message.to,
      subject: message.subject,
      html: message.html,
      text: message.text,
    });
    return { ok: true };
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Invio SMTP non riuscito";
    return { ok: false, error: detail };
  }
}
