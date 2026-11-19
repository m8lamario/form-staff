import { applicationsOpen } from "@/lib/legal";
import { allowRequest } from "@/lib/rate-limit";
import { createStaffApplication } from "@/lib/staff-record";
import { validateStaffPayload } from "@/lib/staff";
import { requestMeta } from "@/lib/tokens";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!(await allowRequest("staff-submit", request, 10, 60 * 60 * 1000))) {
    return NextResponse.json({ error: "Troppe candidature da questa rete. Riprova più tardi." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }

  if (!applicationsOpen()) {
    return NextResponse.json({ error: "Candidature chiuse" }, { status: 409 });
  }

  const record = typeof body === "object" && body !== null ? (body as Record<string, unknown>) : null;
  if (!record || (typeof record.website === "string" && record.website.trim() !== "")) {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }
  const startedAt = record.formStartedAt;
  if (typeof startedAt !== "number" || Date.now() - startedAt < 2000) {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }

  const result = validateStaffPayload(body);
  if (!result.ok) {
    return NextResponse.json({ errors: result.errors }, { status: 400 });
  }

  try {
    const created = await createStaffApplication(result.data, requestMeta(request));
    return NextResponse.json({ id: created.id, notice: created.notice }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json(
        { errors: { email: "Questa email ha già inviato una candidatura" } },
        { status: 409 },
      );
    }
    console.error(error);
    return NextResponse.json(
      { error: "Non è stato possibile salvare la candidatura" },
      { status: 500 },
    );
  }
}
