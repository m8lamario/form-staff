import { BrandMark } from "@/components/BrandMark";
import { StaffForm } from "@/components/StaffForm";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex h-dvh overflow-hidden lg:h-svh">
      <aside className="relative hidden h-full w-[min(42vw,540px)] shrink-0 overflow-hidden lg:block">
        <Image
          src="/hero.png"
          alt="Leonessa Cup"
          fill
          priority
          sizes="540px"
          className="object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#011674]/10 via-transparent to-[#011674]/70" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-[#011674]" />
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col px-3 py-3 lg:px-8 lg:py-5">
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
      </div>
    </main>
  );
}
