"use client";

import { useState, type FormEvent } from "react";
import { CONTACT_EMAIL } from "@/lib/constants";

type Status = "idle" | "submitting" | "done" | "error";

// Dark-themed launch-list capture for the Athletic Care line. Same honest
// pipeline as EmailCapture (POST /api/subscribe → Resend); only the styling
// and the `source` tag differ.
export default function AthleticNotify() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (
      (form.elements.namedItem("email") as HTMLInputElement)?.value ?? ""
    ).trim();

    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "athletic-launch" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        // Fail honestly — never show "you're on the list" if it wasn't stored.
        setError(
          data?.error ??
            "Couldn’t save your email. Please try again in a moment.",
        );
        setStatus("error");
        return;
      }
      setStatus("done");
    } catch {
      setError("Network error. Please try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-[rgba(24,183,230,0.45)] bg-[rgba(24,183,230,0.08)] p-[22px] font-heading text-[17px] font-bold text-[#4fc7ec]"
      >
        You&rsquo;re on the list. You&rsquo;ll hear from us the moment the
        Athletic Care line drops.
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-wrap justify-center gap-3">
        <input
          type="email"
          name="email"
          required
          disabled={status === "submitting"}
          placeholder="Email address"
          className="min-w-[220px] flex-1 rounded-full border border-white/20 bg-white/[0.06] px-[18px] py-4 text-[15px] text-white outline-none placeholder:text-white/40 focus:border-[rgba(24,183,230,0.6)] disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full bg-[#18b7e6] px-7 py-4 font-heading text-[15px] font-extrabold text-[#04121a] hover:bg-[#3cc6ef] disabled:opacity-70"
        >
          {status === "submitting" ? "Joining…" : "Get Launch Updates"}
        </button>
      </form>

      {status === "error" && (
        <p role="alert" className="mt-4 text-[14px] text-white/60">
          {error} You can also email us at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-semibold text-[#4fc7ec] hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </p>
      )}
    </>
  );
}
