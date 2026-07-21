"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Reveal from "./Reveal";
import SectionEyebrow from "./SectionEyebrow";
import { WHOLESALE_EMAIL } from "@/lib/constants";
import {
  WHOLESALE_MOQ,
  WHOLESALE_MSRP_USD,
  WHOLESALE_SHIPPING_NOTE,
  WHOLESALE_TIERS,
} from "@/lib/wholesale";

// Wholesale is OPEN as of 2026-07-21 with real pricing (lib/wholesale.ts).
// Orders are still taken by hand: the form opens the visitor's mail client
// addressed to the wholesale inbox, and Valentín replies with an invoice.
// That is deliberate — this site has no payment processor and no DB yet.
// TODO: POST to /api/wholesale-apply -> store the request, surface it in
// /admin, then add payment. Until that exists the copy must promise an
// invoice, never a checkout.
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
              Now Taking Orders
            </span>
          </div>
          <p className="m-0 text-base leading-[1.65] text-body">
            Carry G-SCRUB in your pro shop, or buy in bulk for a tournament,
            outing, or corporate gift. Pricing below is for the Shoe Cleaner
            Kit — tell us what you need and we&rsquo;ll send an invoice.
          </p>
        </Reveal>

        {/* Real wholesale pricing, confirmed 2026-07-21. Numbers come from
            lib/wholesale.ts so the table and any quote logic can never drift
            apart. Shipping is intentionally not priced here. */}
        <Reveal className="mx-auto mb-10 max-w-[640px]">
          <div className="overflow-hidden rounded-[18px] border border-[rgba(0,0,0,0.09)] bg-white">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-[rgba(0,0,0,0.08)] bg-bg-alt">
                  <th className="px-5 py-3 text-xs font-extrabold tracking-[0.1em] text-body-2 uppercase">
                    Quantity
                  </th>
                  <th className="px-5 py-3 text-xs font-extrabold tracking-[0.1em] text-body-2 uppercase">
                    Your cost
                  </th>
                  <th className="px-5 py-3 text-xs font-extrabold tracking-[0.1em] text-body-2 uppercase">
                    Your margin at&nbsp;${WHOLESALE_MSRP_USD}
                  </th>
                </tr>
              </thead>
              <tbody>
                {WHOLESALE_TIERS.slice()
                  .sort((a, b) => a.minQty - b.minQty)
                  .map((tier, i, sorted) => {
                    const next = sorted[i + 1];
                    const label = next
                      ? `${tier.minQty}–${next.minQty - 1} units`
                      : `${tier.minQty}+ units`;
                    const pct = Math.round(
                      ((WHOLESALE_MSRP_USD - tier.unitPriceUSD) /
                        WHOLESALE_MSRP_USD) *
                        100
                    );
                    return (
                      <tr
                        key={tier.minQty}
                        className="border-b border-[rgba(0,0,0,0.06)] last:border-b-0"
                      >
                        <td className="px-5 py-4 font-heading text-[15px] font-bold text-ink">
                          {label}
                        </td>
                        <td className="px-5 py-4 font-heading text-[17px] font-extrabold text-green-primary">
                          ${tier.unitPriceUSD.toFixed(2)}
                          <span className="text-[13px] font-bold text-body-2">
                            {" "}
                            / unit
                          </span>
                        </td>
                        <td className="px-5 py-4 text-[15px] text-body">
                          ${(WHOLESALE_MSRP_USD - tier.unitPriceUSD).toFixed(2)}{" "}
                          <span className="text-body-2">({pct}%)</span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
          <p className="m-0 mt-3 text-[13.5px] leading-[1.6] text-body-2">
            Minimum order {WHOLESALE_MOQ} units (one dozen).{" "}
            {WHOLESALE_SHIPPING_NOTE} Suggested retail is ${WHOLESALE_MSRP_USD},
            the same price we sell at on Amazon. Ordering more than 24? Ask us
            for a volume quote.
          </p>
        </Reveal>

        {submitted ? (
          <Reveal className="mx-auto max-w-[560px] rounded-[20px] border border-[rgba(42,140,42,0.3)] bg-white px-7 py-9 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(42,140,42,0.12)]">
              <span className="text-2xl text-green-primary">✓</span>
            </div>
            <h3 className="m-0 mb-2 font-heading text-xl font-extrabold text-ink">
              Request received
            </h3>
            <p className="m-0 text-[15px] leading-[1.6] text-body-2">
              Thanks for your interest in carrying G-SCRUB. We&rsquo;ll reply
              with an invoice covering your order and shipping. If your mail
              app didn&rsquo;t open, email us directly at {WHOLESALE_EMAIL}.
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
