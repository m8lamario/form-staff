import { SecondGuardianForm } from "@/components/SecondGuardianForm";
import { readSecondGuardianPage } from "@/lib/staff-record";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Conferma dell'altro genitore | Leonessa Cup",
};

export default async function SecondGuardianPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const loaded = await readSecondGuardianPage(token);
  if (!loaded.ok) notFound();
  return <SecondGuardianForm token={token} {...loaded.page} />;
}
