import { SecondGuardianForm } from "@/components/SecondGuardianForm";
import { TokenState, tokenMessage } from "@/components/TokenState";
import { readSecondGuardianPage } from "@/lib/staff-record";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function SecondGuardianPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const loaded = await readSecondGuardianPage(token);
  if (!loaded.ok) {
    return <TokenState title="Link non utilizzabile" message={tokenMessage(loaded.reason)} />;
  }
  return <SecondGuardianForm token={token} {...loaded.page} />;
}
