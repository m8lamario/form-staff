"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError("Password non corretta.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Accesso non disponibile. Riprova.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <label className="block" htmlFor="password">
        <span className="mb-2 block text-sm font-medium text-white">
          Password admin
        </span>
        <input
          id="password"
          name="password"
          type="password"
          value={password}
          autoComplete="current-password"
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-2xl border border-transparent bg-white px-4 py-3 text-navy outline-none focus:ring-2 focus:ring-mint"
        />
      </label>
      {error ? (
        <p role="alert" className="text-sm text-mint">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-2xl bg-mint px-5 py-4 font-display text-lg tracking-[0.18em] text-navy uppercase disabled:opacity-70"
      >
        {pending ? "Accesso..." : "Entra"}
      </button>
    </form>
  );
}
