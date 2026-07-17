"use client";

import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import SectionEyebrow from "./SectionEyebrow";
import { CONTACT_EMAIL } from "@/lib/constants";

type Status = "idle" | "submitting" | "done" | "error";

export default function EmailCapture() {
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
        body: JSON.stringify({ email, source: "launch-list" }),
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

  return (
    <section id="launch" className="bg-bg py-[clamp(60px,8vw,110px)]">
      <div className="mx-auto max-w-[640px] px-6 text-center">
        <Reveal>
          <SectionEyebrow>Launch List</SectionEyebrow>
          <h2 className="m-0 mb-3.5 font-heading text-[clamp(28px,4vw,44px)] leading-[1.05] font-extrabold tracking-[-0.015em] text-ink">
            Get launch updates from G-SCRUB.
          </h2>
          <p className="m-0 mb-[30px] text-base leading-[1.65] text-body">
            Join the list for updates on the upcoming club cleaner, refill
            bottle, golf towel, and complete G-SCRUB bundle.
          </p>
        </Reveal>

        {status === "done" ? (
          <div
            role="status"
            className="rounded-2xl border border-[rgba(42,140,42,0.3)] bg-bg-alt p-[22px] font-heading text-[17px] font-bold text-green-primary"
          >
            You&rsquo;re on the list. We&rsquo;ll be in touch before launch.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-wrap justify-center gap-3"
          >
            <input
              type="email"
              name="email"
              required
              disabled={status === "submitting"}
              placeholder="Email address"
              className="min-w-[220px] flex-1 rounded-full border border-[rgba(17,17,17,0.18)] bg-white px-[18px] py-4 text-[15px] text-[#111111] outline-none disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === "submitting"}
              className="rounded-full bg-green-primary px-7 py-4 font-heading text-[15px] font-extrabold text-white hover:bg-green-primary-hover disabled:opacity-70"
            >
              {status === "submitting" ? "Joining…" : "Join Launch List"}
            </button>
          </form>
        )}

        {status === "error" && (
          <p role="alert" className="mt-4 text-[14px] text-body-2">
            {error} You can also email us at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-semibold text-green-primary hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        )}
      </div>
    </section>
  );
}
