import { BrandMark } from "@/components/BrandMark";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME, isValidSessionToken } from "@/lib/auth";

export default async function AdminLoginPage() {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (await isValidSessionToken(token)) {
    redirect("/admin");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-16">
      <BrandMark compact href="/admin/login" />
      <section className="mt-10 rounded-[32px] border border-white/15 bg-white/10 p-6 sm:p-8">
        <h1 className="font-display text-3xl tracking-widest text-white uppercase">
          Accesso admin
        </h1>
        <p className="mt-3 text-sm text-white/75">
          Inserisci la password per vedere totale risposte, elenco candidature e
          i grafici sui ruoli.
        </p>
        <div className="mt-6">
          <AdminLoginForm />
        </div>
      </section>
    </main>
  );
}
