import { prisma } from "@/lib/prisma";
import { hashIp } from "@/lib/tokens";

export async function allowRequest(action: string, request: Request, limit: number, windowMs: number): Promise<boolean> {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip")?.trim() || "no-ip";
  const bucket = `${action}:${hashIp(ip)}`;
  const since = new Date(Date.now() - windowMs);
  await prisma.rateLimitHit.deleteMany({ where: { createdAt: { lt: new Date(Date.now() - 2 * 60 * 60 * 1000) } } });
  const count = await prisma.rateLimitHit.count({ where: { bucket, createdAt: { gte: since } } });
  if (count >= limit) return false;
  await prisma.rateLimitHit.create({ data: { bucket } });
  return true;
}
