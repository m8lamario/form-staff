import { LegalShell } from "@/components/legal/LegalChrome";
import { CookieDocument } from "@/components/legal/CookieDocument";
import { COOKIE_VERSION } from "@/lib/legal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Informativa cookie | Leonessa Cup",
  description: "Cookie e storage tecnici usati da leonessacup.app.",
  alternates: { canonical: "/cookie" },
};

export default function CookiePage() {
  return (
    <LegalShell
      kicker={`Art. 122 Codice privacy · versione ${COOKIE_VERSION}`}
      title="Informativa cookie"
      lede="Elenco di cookie e storage realmente usati dal sito della candidatura staff."
    >
      <CookieDocument />
    </LegalShell>
  );
}
