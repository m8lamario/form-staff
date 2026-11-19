import { processOutbox } from "@/lib/email/queue";
import { sendDueReminders } from "@/lib/email/jobs";
import { purgeUnconfirmedSecondGuardians } from "@/lib/staff-record";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (process.env.NODE_ENV === "production") {
    if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
    }
  }
  const outbox = await processOutbox();
  const reminders = await sendDueReminders();
  await purgeUnconfirmedSecondGuardians();
  return NextResponse.json({ ok: true, outbox, reminders });
}
