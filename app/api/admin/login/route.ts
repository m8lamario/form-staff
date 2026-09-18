import {
  COOKIE_NAME,
  createSessionToken,
  isValidAdminPassword,
  sessionCookieOptions,
} from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let password: unknown;
  try {
    const body = (await request.json()) as { password?: unknown };
    password = body.password;
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }

  if (!isValidAdminPassword(password)) {
    return NextResponse.json({ error: "Password non corretta" }, { status: 401 });
  }

  const token = await createSessionToken();
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, token, sessionCookieOptions());
  return response;
}
