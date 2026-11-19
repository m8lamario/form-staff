import { revokeByToken } from "@/lib/staff-record";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ token: string }> };

export async function POST(request: Request, context: RouteContext) {
  const { token } = await context.params;
  let keys: unknown;
  let note: unknown;
  try {
    const body = (await request.json()) as { keys?: unknown; note?: unknown };
    keys = body.keys;
    note = body.note;
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }
  if (!Array.isArray(keys) || typeof note !== "string") {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }
  const saved = await revokeByToken(
    token,
    keys.filter((key): key is string => typeof key === "string"),
    note,
  );
  if (!saved.ok) {
    if ("reason" in saved) {
      const message =
        saved.reason === "used"
          ? "Questo link è già stato usato"
          : saved.reason === "expired"
            ? "Questo link è scaduto"
            : "Questo link non è valido";
      return NextResponse.json({ error: message }, { status: 410 });
    }
    return NextResponse.json({ error: saved.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true, updated: saved.updated });
}
