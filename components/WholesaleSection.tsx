"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Reveal from "./Reveal";
import SectionEyebrow from "./SectionEyebrow";
import { WHOLESALE_EMAIL } from "@/lib/constants";

// PHASE 1 — WAITLIST. The wholesale program isn't taking orders yet; this
// section collects interested pro shops for early access. Until the DB is
// wired (Supabase, Phase 2), the submission opens the visitor's mail client
// addressed to the wholesale inbox so Valentín can hand-keep the early-access
// list. TODO(phase-2): POST to /api/wholesale-apply -> store in
// wholesale_applications, show in /admin, then approve -> account -> ordering
// with shipping calc (see lib/wholesale.ts).
export default function WholesaleSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (key: string) => (data.get(key) as string) || "";

    const body = [
      "G-SCRUB Wholesale — Early Access Request",
      "",
      `Name: ${get("name")}`,
      `Business / Golf Course: ${get("business")}`,
      `Email: ${get("email")}`,
      `Phone: ${get("phone")}`,
      `Quantity Interested: ${get("quantity")}`,
      "",
      "Message:",
      get("message"),
    ].join("\n");

    const subject = encodeURIComponent("G-SCRUB Wholesale — Early Access");
    window.location.href = `mailto:${WHOLESALE_EMAIL}?subject=${subject}&body=${encodeURIComponent(
      body
    )}`;
    setSubmitted(true);
  }

  return (
    <section id="wholesale" className="bg-bg-alt py-[clamp(60px,8vw,110px)]">
      <div className="mx-auto max-w-[820px] px-6">
        <Reveal className="mx-auto mb-10 max-w-[640px] text-center">
          <SectionEyebrow>Wholesale &amp; Pro Shops</SectionEyebrow>
          <h2 className="m-0 mb-3 font-heading text-[clamp(26px,3.8vw,42px)] leading-[1.08] font-extrabold tracking-[-0.015em] text-ink">
            For Pro Shops, Golf Events &amp; Corporate Gifts
          </h2>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(42,140,42,0.3)] bg-white px-[13px] py-1.5">
            <span className="h-[7px] w-[7px] rounded-full bg-green-primary" />
            <span className="text-xs font-extrabold tracking-[0.12em] text-green-primary uppercase">
              Launching Soon
            </span>
          </div>
          <p className="m-0 text-base leading-[1.65] text-body">
            Our wholesale program for golf shops, tournaments, outings,
            corporate events, and bulk gift packages is launching soon. Join
            the early-access list and be one of the first pro shops to carry
            G-SCRUB — we&rsquo;ll reach out with wholesale pricing and bulk
            order details before we open.
          </p>
        </Reveal>

        {submitted ? (
          <Reveal className="mx-auto max-w-[560px] rounded-[20px] border border-[rgba(42,140,42,0.3)] bg-white px-7 py-9 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(42,140,42,0.12)]">
              <span className="text-2xl text-green-primary">✓</span>
            </div>
            <h3 className="m-0 mb-2 font-heading text-xl font-extrabold text-ink">
              You&rsquo;re on the early-access list
            </h3>
            <p className="m-0 text-[15px] leading-[1.6] text-body-2">
              Thanks for your interest in carrying G-SCRUB. We&rsquo;ll be in
              touch with wholesale pricing and bulk order details before the
              program opens. If your mail app didn&rsquo;t open, email us
              directly at {WHOLESALE_EMAIL}.
            </p>
          </Reveal>
        ) : (
          <Reveal>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-3.5 sm:grid-cols-2"
            >
              <input
                name="name"
                required
                placeholder="Name"
                className="rounded-xl border border-[rgba(17,17,17,0.16)] bg-white px-[17px] py-[15px] text-[15px] text-[#111111] outline-none"
              />
              <input
                name="business"
                placeholder="Business / Golf Course"
                className="rounded-xl border border-[rgba(17,17,17,0.16)] bg-white px-[17px] py-[15px] text-[15px] text-[#111111] outline-none"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                className="rounded-xl border border-[rgba(17,17,17,0.16)] bg-white px-[17px] py-[15px] text-[15px] text-[#111111] outline-none"
              />
              <input
                name="phone"
                placeholder="Phone"
                className="rounded-xl border border-[rgba(17,17,17,0.16)] bg-white px-[17px] py-[15px] text-[15px] text-[#111111] outline-none"
              />
              <input
                name="quantity"
                placeholder="Quantity Interested"
                className="rounded-xl border border-[rgba(17,17,17,0.16)] bg-white px-[17px] py-[15px] text-[15px] text-[#111111] outline-none sm:col-span-2"
              />
              <textarea
                name="message"
                placeholder="Tell us about your shop or event (optional)"
                rows={4}
                className="resize-y rounded-xl border border-[rgba(17,17,17,0.16)] bg-white px-[17px] py-[15px] text-[15px] text-[#111111] outline-none sm:col-span-2"
              />
              <button
                type="submit"
                className="justify-self-start rounded-full bg-green-primary px-[30px] py-[15px] font-heading text-[15px] font-extrabold text-white hover:bg-green-primary-hover sm:col-span-2"
              >
                Join the Early-Access List
              </button>
            </form>
            <p className="mt-4 text-center text-[13px] text-body-2">
              Early-access requests go to {WHOLESALE_EMAIL}.
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
