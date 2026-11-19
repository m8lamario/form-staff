import { createStaffApplication } from "@/lib/staff-record";
import { validateStaffPayload } from "@/lib/staff";
import { requestMeta } from "@/lib/tokens";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
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
