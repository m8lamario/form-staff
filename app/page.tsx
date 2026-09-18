import { BrandMark } from "@/components/BrandMark";
import { StaffForm } from "@/components/StaffForm";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex h-dvh max-w-[1440px] flex-col overflow-hidden px-3 py-3 lg:h-svh lg:px-8 lg:py-5">
      <header className="flex shrink-0 items-center justify-between gap-3">
        <BrandMark layout="row" />
        <Link
          href="/admin/login"
          className="rounded-full border border-white/20 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-white/70 hover:border-mint hover:text-mint"
        >
          Admin
        </Link>
      </header>
      <section className="mt-3 min-h-0 flex-1 lg:mt-4">
        <StaffForm />
      </section>
    </main>
  );
}
