"use client";

import type { FormEvent } from "react";
import Reveal from "./Reveal";
import SectionEyebrow from "./SectionEyebrow";
import { CONTACT_EMAIL } from "@/lib/constants";

export default function WholesaleSection() {
  // CONTACT_EMAIL is a placeholder — replace with the real wholesale inbox
  // once available. No backend yet, so this opens the user's mail client.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (key: string) => (data.get(key) as string) || "";

    const body = [
      `Name: ${get("name")}`,
      `Business / Golf Course: ${get("business")}`,
      `Email: ${get("email")}`,
      `Phone: ${get("phone")}`,
      `Quantity Interested: ${get("quantity")}`,
      "",
      "Message:",
      get("message"),
    ].join("\n");

    const subject = encodeURIComponent("G-SCRUB Wholesale Inquiry");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${encodeURIComponent(
      body
    )}`;
  }

  return (
    <section id="wholesale" className="bg-bg-alt py-[clamp(60px,8vw,110px)]">
      <div className="mx-auto max-w-[820px] px-6">
        <Reveal className="mx-auto mb-10 max-w-[640px] text-center">
          <SectionEyebrow>Wholesale &amp; Pro Shops</SectionEyebrow>
          <h2 className="m-0 mb-4 font-heading text-[clamp(26px,3.8vw,42px)] leading-[1.08] font-extrabold tracking-[-0.015em] text-ink">
            For Pro Shops, Golf Events &amp; Corporate Gifts
          </h2>
          <p className="m-0 text-base leading-[1.65] text-body">
            G-SCRUB is available for golf shops, tournaments, golf outings,
            corporate events, and bulk gift packages. If you are interested
            in carrying G-SCRUB or using it for an event, contact us for
            wholesale and bulk order opportunities.
          </p>
        </Reveal>

        <Reveal>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-3.5 sm:grid-cols-2"
          >
            <input
              name="name"
              required
              placeholder="Name"
              className="rounded-xl border border-[rgba(15,68,41,0.16)] bg-white px-[17px] py-[15px] text-[15px] text-[#14180F] outline-none"
            />
            <input
              name="business"
              placeholder="Business / Golf Course"
              className="rounded-xl border border-[rgba(15,68,41,0.16)] bg-white px-[17px] py-[15px] text-[15px] text-[#14180F] outline-none"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className="rounded-xl border border-[rgba(15,68,41,0.16)] bg-white px-[17px] py-[15px] text-[15px] text-[#14180F] outline-none"
            />
            <input
              name="phone"
              placeholder="Phone"
              className="rounded-xl border border-[rgba(15,68,41,0.16)] bg-white px-[17px] py-[15px] text-[15px] text-[#14180F] outline-none"
            />
            <input
              name="quantity"
              placeholder="Quantity Interested"
              className="rounded-xl border border-[rgba(15,68,41,0.16)] bg-white px-[17px] py-[15px] text-[15px] text-[#14180F] outline-none sm:col-span-2"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              className="resize-y rounded-xl border border-[rgba(15,68,41,0.16)] bg-white px-[17px] py-[15px] text-[15px] text-[#14180F] outline-none sm:col-span-2"
            />
            <button
              type="submit"
              className="justify-self-start rounded-full bg-green-primary px-[30px] py-[15px] font-heading text-[15px] font-extrabold text-white hover:bg-green-primary-hover sm:col-span-2"
            >
              Send Wholesale Inquiry
            </button>
          </form>
          <p className="mt-4 text-center text-[13px] text-[#8A9382]">
            Inquiries go to {CONTACT_EMAIL} (placeholder — update with your
            real address).
          </p>
        </Reveal>
      </div>
    </section>
  );
}
