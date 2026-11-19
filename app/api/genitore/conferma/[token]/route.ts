import { confirmSecondGuardian } from "@/lib/staff-record";
import { requestMeta } from "@/lib/tokens";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ token: string }> };

export async function POST(request: Request, context: RouteContext) {
  const { token } = await context.params;
  let decision: unknown;
  try {
    const body = (await request.json()) as { decision?: unknown };
    decision = body.decision;
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }
  if (decision !== "confirm" && decision !== "decline") {
    return NextResponse.json({ error: "Scelta non valida" }, { status: 400 });
  }
  const saved = await confirmSecondGuardian(token, decision, requestMeta(request));
  if (!saved.ok) {
    const message =
      saved.reason === "used"
        ? "Questo link è già stato usato"
        : saved.reason === "expired"
          ? "Questo link è scaduto"
          : "Questo link non è valido";
    return NextResponse.json({ error: message }, { status: 410 });
  }
  return NextResponse.json({ ok: true, confirmed: saved.confirmed });
}
