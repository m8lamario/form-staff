export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  const { warnEmailConfig } = await import("@/lib/email/config");
  warnEmailConfig();
}
