import { LegacyRenewForm } from "@/components/LegacyRenewForm";
import { notFound } from "next/navigation";
import { readRenewalPage } from "@/lib/staff-record";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Aggiorna le scelte | Leonessa Cup",
};

export default async function RenewalPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const loaded = await readRenewalPage(token);
  if (!loaded.ok) notFound();
  return <LegacyRenewForm token={token} {...loaded.page} />;
}
