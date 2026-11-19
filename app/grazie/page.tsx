import { ThanksNotice } from "@/components/ThanksNotice";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Candidatura inviata | Leonessa Cup",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return <ThanksNotice />;
}
