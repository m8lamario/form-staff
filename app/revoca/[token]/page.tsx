import { RevokeForm } from "@/components/RevokeForm";
import { TokenState, tokenMessage } from "@/components/TokenState";
import { readRevokePage } from "@/lib/staff-record";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function RevokePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const loaded = await readRevokePage(token);
  if (!loaded.ok) {
    return <TokenState title="Link non utilizzabile" message={tokenMessage(loaded.reason)} />;
  }
  return <RevokeForm token={token} {...loaded.page} />;
}
