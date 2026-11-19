import { LegalShell } from "@/components/legal/LegalChrome";
import { TerminiDocument } from "@/components/legal/TerminiDocument";
import { TERMS_VERSION } from "@/lib/legal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Condizioni candidatura staff volontario | Leonessa Cup",
  description:
    "Condizioni della candidatura staff volontario, regole di condotta e diritti sui contenuti.",
};

export default function TerminiPage() {
  return (
    <LegalShell
      kicker={`Staff volontario · versione ${TERMS_VERSION}`}
      title="Condizioni della candidatura staff volontario"
      lede="Regole di condotta e diritti sui contenuti prodotti nei ruoli Foto, Interviste, Giornale e Social."
    >
      <TerminiDocument />
    </LegalShell>
  );
}
