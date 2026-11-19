import { CONTROLLER, LEGAL, POLICY_PATHS, eventPlaceLine, formatEventDates } from "@/lib/legal";

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function absoluteUrl(path: string): string {
  return new URL(path, CONTROLLER.website).toString();
}

export function eventSentence(): string {
  return `${eventPlaceLine().replaceAll(" · ", ", ")}. ${formatEventDates(LEGAL.event)}.`;
}

function footerText(): string {
  return [
    CONTROLLER.name,
    CONTROLLER.address,
    `P.IVA ${CONTROLLER.vat}`,
    `Privacy: ${CONTROLLER.privacyEmail}`,
  ].join(" · ");
}

export function renderEmail(input: { heading: string; paragraphs: string[]; links?: { href: string; label: string }[] }): {
  html: string;
  text: string;
} {
  const paragraphs = input.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("");
  const links = (input.links ?? [])
    .map((link) => `<p><a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a></p>`)
    .join("");
  const html = `<!doctype html><html lang="it"><body style="font-family:Arial,sans-serif;color:#10233f;line-height:1.5">
<h1 style="font-size:20px">${escapeHtml(input.heading)}</h1>
${paragraphs}
${links}
<hr>
<p style="font-size:12px;color:#445">${escapeHtml(footerText())}</p>
</body></html>`;
  const text = [
    input.heading,
    "",
    ...input.paragraphs.map((paragraph) => paragraph.replace(/<[^>]+>/g, "")),
    ...(input.links ?? []).map((link) => `${link.label}: ${link.href}`),
    "",
    footerText(),
  ].join("\n");
  return { html, text };
}

export function policyLinks() {
  return [
    { href: absoluteUrl(POLICY_PATHS.privacy), label: "Informativa privacy" },
    { href: absoluteUrl(POLICY_PATHS.minori), label: "Informativa minori" },
    { href: absoluteUrl(POLICY_PATHS.social), label: "Liberatoria" },
    { href: absoluteUrl(POLICY_PATHS.termini), label: "Condizioni" },
  ];
}
