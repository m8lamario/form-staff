import { GuardianConfirmForm } from "@/components/GuardianConfirmForm";
import { TokenState, tokenMessage } from "@/components/TokenState";
import { readGuardianPage } from "@/lib/staff-record";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function GuardianPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const loaded = await readGuardianPage(token);
  if (!loaded.ok) {
    return <TokenState title="Link non utilizzabile" message={tokenMessage(loaded.reason)} />;
  }
  return <GuardianConfirmForm token={token} page={loaded.page} />;
}
