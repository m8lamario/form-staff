import { createHash, randomBytes } from "node:crypto";

export function newToken(): string {
  return randomBytes(32).toString("base64url");
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function hashText(text: string): string {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

export function hashIp(ip: string): string {
  return createHash("sha256").update(ip.trim()).digest("hex");
}

export function requestMeta(request: Request): { ipHash: string | null; userAgent: string | null } {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip")?.trim() || "";
  const userAgent = request.headers.get("user-agent")?.slice(0, 500) ?? "";
  return {
    ipHash: ip ? hashIp(ip) : null,
    userAgent: userAgent || null,
  };
}

export function addDays(from: Date, days: number): Date {
  return new Date(from.getTime() + days * 24 * 60 * 60 * 1000);
}
