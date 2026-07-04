"use client";

import { useState, type FormEvent } from "react";
import Reveal from "./Reveal";
import SectionEyebrow from "./SectionEyebrow";

export default function EmailCapture() {
  const [joined, setJoined] = useState(false);

  // No backend yet — this handler is structured so a real provider
  // (Formspree, Mailchimp, ConvertKit, Supabase, etc.) can be wired in
  // later by replacing the body of this function with a fetch() call.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setJoined(true);
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

        {joined ? (
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
              placeholder="Email address"
              className="min-w-[220px] flex-1 rounded-full border border-[rgba(17,17,17,0.18)] bg-white px-[18px] py-4 text-[15px] text-[#111111] outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-green-primary px-7 py-4 font-heading text-[15px] font-extrabold text-white hover:bg-green-primary-hover"
            >
              Join Launch List
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
