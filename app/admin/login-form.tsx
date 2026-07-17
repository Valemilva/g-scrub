"use client";

import { useState, type FormEvent } from "react";

export default function LoginForm({ configured }: { configured: boolean }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = (
      (e.currentTarget.elements.namedItem("password") as HTMLInputElement)
        ?.value ?? ""
    ).trim();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.reload();
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(data?.error ?? "Couldn’t sign in.");
    } catch {
      setError("Network error. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg px-6">
      <div className="w-full max-w-[380px]">
        <div className="mb-8 text-center">
          <span className="font-heading text-[28px] font-black text-green-primary">
            G
          </span>
          <span className="ml-2 font-heading text-[19px] font-black text-ink">
            G-SCRUB Admin
          </span>
        </div>

        {configured ? (
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-[rgba(17,17,17,0.1)] bg-white p-7"
          >
            <label className="mb-2 block text-[13px] font-extrabold tracking-[0.08em] text-body-2 uppercase">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              autoFocus
              disabled={busy}
              className="w-full rounded-xl border border-[rgba(17,17,17,0.18)] bg-white px-4 py-3 text-[15px] text-[#111111] outline-none disabled:opacity-60"
            />
            {error && (
              <p role="alert" className="mt-3 text-[13.5px] text-red-600">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={busy}
              className="mt-5 w-full rounded-full bg-green-primary px-6 py-3 font-heading text-[15px] font-extrabold text-white hover:bg-green-primary-hover disabled:opacity-70"
            >
              {busy ? "Signing in…" : "Sign in"}
            </button>
          </form>
        ) : (
          <div className="rounded-2xl border border-[rgba(17,17,17,0.1)] bg-white p-7 text-center">
            <p className="m-0 text-[15px] leading-[1.6] text-body">
              The admin panel isn’t configured yet. Set{" "}
              <code className="rounded bg-bg-alt px-1.5 py-0.5 text-[13px]">
                ADMIN_PASSWORD
              </code>{" "}
              in Vercel to enable it.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
