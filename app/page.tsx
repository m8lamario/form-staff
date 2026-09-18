import { BrandMark } from "@/components/BrandMark";
import { StaffForm } from "@/components/StaffForm";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex h-dvh overflow-hidden lg:h-svh">
      <aside className="relative hidden h-full w-[min(38vw,480px)] shrink-0 overflow-hidden xl:w-[min(40vw,520px)] lg:block">
        <Image
          src="/hero.jpg"
          alt="Leonessa Cup"
          fill
          priority
          sizes="520px"
          className="object-cover object-[center_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#011674]/10 via-transparent to-[#011674]/70" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-[#011674]" />
      </aside>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col px-5 py-5 sm:px-6 sm:py-5 lg:px-6 lg:pb-3 lg:pt-4 xl:px-10 xl:pb-6 xl:pt-8">
        <header className="flex shrink-0 items-center justify-between gap-2 sm:gap-3">
          <BrandMark layout="row" />
          <div className="flex shrink-0 items-center justify-end gap-1.5 sm:gap-2">
            <Link
              href="/privacy"
              className="rounded-full border border-white/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-white/70 hover:border-mint hover:text-mint sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[0.16em]"
            >
              Privacy
            </Link>
            <Link
              href="/social"
              className="rounded-full border border-white/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-white/70 hover:border-mint hover:text-mint sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[0.16em]"
            >
              Riprese
            </Link>
            <Link
              href="/admin/login"
              className="hidden rounded-full border border-white/20 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-white/70 hover:border-mint hover:text-mint sm:inline-flex sm:px-3 sm:py-1.5 sm:text-[11px] sm:tracking-[0.16em]"
            >
              Admin
            </Link>
          </div>
        </header>

        <div className="relative mt-4 hidden h-36 shrink-0 overflow-hidden rounded-[24px] md:block lg:hidden">
          <Image
            src="/hero.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[center_42%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#011674] via-[#011674]/30 to-transparent" />
        </div>

        <section className="mt-6 flex min-h-0 flex-1 flex-col justify-center overflow-hidden sm:mt-5 lg:mt-3 lg:justify-start xl:mt-4">
          <StaffForm />
        </section>
      </div>
    </main>
  );
}
