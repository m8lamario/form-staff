import { RevokeForm } from "@/components/RevokeForm";
import { readRevokePage } from "@/lib/staff-record";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Revoca | Leonessa Cup",
};

export default async function RevokePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const loaded = await readRevokePage(token);
  if (!loaded.ok) notFound();
  return <RevokeForm token={token} {...loaded.page} />;
}
