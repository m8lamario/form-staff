import { COOKIE_NAME, isValidSessionToken } from "@/lib/auth";
import {
  revokeByAdmin,
  setApplicationRole,
  setApplicationStatus,
} from "@/lib/staff-record";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ id: string }> };

async function unauthorized() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!(await isValidSessionToken(token))) {
    return NextResponse.json({ error: "Non autorizzato" }, { status: 401 });
  }
  return null;
}

export async function POST(request: Request, context: RouteContext) {
  const denied = await unauthorized();
  if (denied) return denied;

  const { id: rawId } = await context.params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id < 1) {
    return NextResponse.json({ error: "Candidatura non trovata" }, { status: 404 });
  }

  let body: { action?: unknown; role?: unknown; key?: unknown; note?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }

  if (body.action === "accept" || body.action === "reject") {
    const saved = await setApplicationStatus(id, body.action === "accept" ? "accepted" : "rejected");
    if (!saved.ok) return NextResponse.json({ error: saved.error }, { status: 400 });
    return NextResponse.json({ ok: true });
  }

  if (body.action === "role") {
    if (typeof body.role !== "string") {
      return NextResponse.json({ error: "Ruolo non previsto" }, { status: 400 });
    }
    const saved = await setApplicationRole(id, body.role);
    if (!saved.ok) return NextResponse.json({ error: saved.error }, { status: 400 });
    return NextResponse.json({ ok: true });
  }

  if (body.action === "revoke") {
    if (typeof body.key !== "string" || typeof body.note !== "string") {
      return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
    }
    const saved = await revokeByAdmin(id, [body.key], body.note);
    if (!saved.ok) return NextResponse.json({ error: saved.error }, { status: 400 });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Azione non prevista" }, { status: 400 });
}
