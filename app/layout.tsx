import { LEGAL } from "@/lib/legal";
import type { Metadata } from "next";
import { Barlow_Condensed, Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow",
});

const description =
  "Form di candidatura per lo staff volontario della Leonessa Cup 2027 a Brescia, Centro Sportivo Mario Rigamonti.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.leonessacup.app"),
  title: "Leonessa Cup | Candidatura staff",
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Leonessa Cup | Candidatura staff",
    description,
    locale: "it_IT",
    siteName: "Leonessa Cup",
    type: "website",
    ...(LEGAL.ogImage ? { images: [{ url: LEGAL.ogImage }] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Leonessa Cup | Candidatura staff",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${outfit.variable} ${barlow.variable} antialiased`}>
        <div className="court-shell">
          <div className="page-frame">{children}</div>
        </div>
      </body>
    </html>
  );
}
