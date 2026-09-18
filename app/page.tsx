import { BrandMark } from "@/components/BrandMark";
import { StaffForm } from "@/components/StaffForm";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col px-5 py-10 sm:px-8">
      <BrandMark />
      <section className="mt-10 rounded-[32px] border border-white/15 bg-white/10 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.18)] backdrop-blur-sm sm:p-8">
        <h1 className="font-display text-3xl tracking-widest text-white uppercase sm:text-4xl">
          Unisciti allo staff
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80 sm:text-base">
          Compila il form con nome, recapiti e il ruolo che preferisci. Ci serve
          anche sapere se hai già fatto parte dello staff della Leonessa Cup
          l&apos;anno scorso.
        </p>
        <div className="mt-8">
          <StaffForm />
        </div>
      </section>
      <footer className="mt-8 flex items-center justify-between pb-6 text-xs text-white/60">
        <span>Leonessa Cup</span>
        <Link href="/admin/login" className="hover:text-mint">
          Area admin
        </Link>
      </footer>
    </main>
  );
}
