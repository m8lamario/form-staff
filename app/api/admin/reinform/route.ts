import { COOKIE_NAME, isValidSessionToken } from "@/lib/auth";
import { sendUpdatedNotice } from "@/lib/staff-record";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!(await isValidSessionToken(token))) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }
  let ids: unknown;
  try {
    ids = ((await request.json()) as { ids?: unknown }).ids;
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }
  if (!Array.isArray(ids) || ids.some((id) => !Number.isInteger(id))) {
    return NextResponse.json({ error: "Seleziona le candidature da reinformare" }, { status: 400 });
  }
  let sent = 0;
  const errors: string[] = [];
  for (const id of ids as number[]) {
    const result = await sendUpdatedNotice(id);
    if (result.ok && result.emailSent) sent += 1;
    else if (!result.ok) errors.push(result.error);
  }
  return NextResponse.json({ ok: true, sent, errors });
}
