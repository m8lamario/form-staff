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

export const metadata: Metadata = {
  title: "Leonessa Cup | Candidatura staff",
  description:
    "Form di candidatura per lo staff della Leonessa Cup: lascia i tuoi dati e il ruolo che preferisci.",
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
