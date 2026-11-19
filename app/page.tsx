import { BrandMark } from "@/components/BrandMark";
import { StaffForm } from "@/components/StaffForm";
import { LegalFooter } from "@/components/legal/LegalChrome";
import { PUBLIC_HEADER_NAV, applicationsOpen } from "@/lib/legal";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-svh w-full max-w-3xl flex-col px-5 py-5 sm:px-8 sm:py-8">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <BrandMark layout="row" />
        <div className="flex flex-wrap items-center gap-1.5 sm:justify-end sm:gap-2">
          {PUBLIC_HEADER_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full border border-white/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-white/70 hover:border-mint hover:text-mint sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[0.16em]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </header>

      <section className="mt-6 flex flex-1 flex-col sm:mt-8">
        <StaffForm applicationsClosed={!applicationsOpen()} />
      </section>
      <LegalFooter />
    </main>
  );
}
