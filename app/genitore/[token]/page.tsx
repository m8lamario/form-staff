import { GuardianConfirmForm } from "@/components/GuardianConfirmForm";
import { readGuardianPage } from "@/lib/staff-record";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Conferma del genitore | Leonessa Cup",
};

export default async function GuardianPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const loaded = await readGuardianPage(token);
  if (!loaded.ok) notFound();
  return <GuardianConfirmForm token={token} page={loaded.page} />;
}
