import { parseGuardianConfirm, validateGuardianConfirm } from "@/lib/guardian";
import { confirmGuardian, guardianValidationContext } from "@/lib/staff-record";
import { requestMeta } from "@/lib/tokens";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ token: string }> };

export async function POST(request: Request, context: RouteContext) {
  const { token } = await context.params;
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }

  const current = await guardianValidationContext(token);
  if (!current.ok) {
    return NextResponse.json({ error: tokenMessage(current.reason) }, { status: 410 });
  }

  const parsed = parseGuardianConfirm(body);
  const result = validateGuardianConfirm(parsed, current.context);
  if (!result.ok) {
    return NextResponse.json({ errors: result.errors }, { status: 400 });
  }

  const saved = await confirmGuardian(token, result.data, requestMeta(request));
  if (!saved.ok) {
    return NextResponse.json({ error: tokenMessage(saved.reason) }, { status: 410 });
  }
  return NextResponse.json({
    ok: true,
    notice: saved.notice,
    soleHolder: saved.soleHolder,
  });
}

function tokenMessage(reason: "invalid" | "used" | "expired"): string {
  if (reason === "used") return "Questo link è già stato usato";
  if (reason === "expired") return "Questo link è scaduto";
  return "Questo link non è valido";
}
