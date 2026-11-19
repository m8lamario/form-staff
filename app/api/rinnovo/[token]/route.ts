import { completeLegacyRenewal, readRenewalPage } from "@/lib/staff-record";
import { MEDIA_KEYS, type MediaKey } from "@/lib/consent-copy";
import { requestMeta } from "@/lib/tokens";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type RouteContext = { params: Promise<{ token: string }> };

export async function POST(request: Request, context: RouteContext) {
  const { token } = await context.params;
  const loaded = await readRenewalPage(token);
  if (!loaded.ok) {
    const status = loaded.reason === "expired" ? 410 : 404;
    return NextResponse.json({ error: "Link non utilizzabile" }, { status });
  }
  let body: { privacyRead?: unknown; rightsAssignment?: unknown; media?: unknown };
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }
  const media = {} as Record<MediaKey, boolean>;
  const source = typeof body.media === "object" && body.media !== null ? (body.media as Record<string, unknown>) : {};
  for (const key of MEDIA_KEYS) media[key] = source[key] === true;
  const saved = await completeLegacyRenewal(
    token,
    {
      privacyRead: body.privacyRead === true,
      media,
      rightsAssignment: body.rightsAssignment === true,
    },
    requestMeta(request),
  );
  if (!saved.ok) {
    const status = "error" in saved ? 400 : saved.reason === "expired" ? 410 : 404;
    return NextResponse.json({ error: "error" in saved ? saved.error : "Link non utilizzabile" }, { status });
  }
  return NextResponse.json({ ok: true });
}
