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

      <div className="flex min-h-0 min-w-0 flex-1 flex-col px-4 py-4 sm:px-5 lg:px-8 lg:pb-5 lg:pt-6 xl:px-10 xl:pb-6 xl:pt-8">
        <header className="flex shrink-0 items-center justify-between gap-3">
          <BrandMark layout="row" />
          <div className="flex items-center gap-2">
            <Link
              href="/privacy"
              className="rounded-full border border-white/20 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-white/70 hover:border-mint hover:text-mint"
            >
              Privacy
            </Link>
            <Link
              href="/admin/login"
              className="rounded-full border border-white/20 px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-white/70 hover:border-mint hover:text-mint"
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

        <section className="mt-4 flex min-h-0 flex-1 flex-col overflow-hidden lg:mt-4">
          <StaffForm />
        </section>
      </div>
    </main>
  );
}
