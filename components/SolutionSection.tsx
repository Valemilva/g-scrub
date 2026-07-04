"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import SectionEyebrow from "./SectionEyebrow";
import { IconChevrons } from "./icons";

export default function SolutionSection() {
  const [reveal, setReveal] = useState(58);

  const revealPct = `${reveal}%`;
  const revealInner = reveal > 0 ? `${10000 / reveal}%` : "100%";

  return (
    <section
      id="solution"
      className="relative bg-green-deep py-[clamp(60px,8vw,110px)] text-[#EDEDED]"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal className="mx-auto mb-10 max-w-[640px] text-center">
          <SectionEyebrow>The Solution</SectionEyebrow>
          <h2 className="m-0 mb-4 font-heading text-[clamp(30px,4.5vw,50px)] leading-[1.04] font-extrabold tracking-[-0.015em] text-white">
            A simple system made for golfers.
          </h2>
          <p className="m-0 text-[17px] leading-[1.65] text-muted-on-dark">
            Drag to scrub — watch your gear go from course-worn to
            course-ready.
          </p>
        </Reveal>

        <Reveal className="mx-auto max-w-[760px]">
          <div className="relative overflow-hidden rounded-[22px] border border-[rgba(255,255,255,0.14)] shadow-[0_40px_80px_-34px_rgba(0,0,0,0.6)] select-none">
            <Image
              src="/images/gscrub-shoe-dirty.png"
              alt="Golf shoe caked in mud and grass before cleaning"
              width={1448}
              height={1086}
              className="block w-full grayscale-[0.55] brightness-[0.82] contrast-[1.05] sepia-[0.28]"
            />
            <div
              className="absolute top-0 bottom-0 left-0 overflow-hidden"
              style={{ width: revealPct }}
            >
              <Image
                src="/images/gscrub-shoe-dirty.png"
                alt="Golf shoe restored to clean after using G-SCRUB"
                width={1448}
                height={1086}
                style={{ width: revealInner, maxWidth: "none" }}
                className="block h-full object-cover"
              />
            </div>
            <div
              className="pointer-events-none absolute top-0 bottom-0 w-[3px] -translate-x-[1.5px] bg-green-primary shadow-[0_0_14px_rgba(42,140,42,0.7)]"
              style={{ left: revealPct }}
            />
            <div
              className="pointer-events-none absolute top-1/2 flex h-[46px] w-[46px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-green-primary text-white shadow-[0_6px_16px_rgba(0,0,0,0.35)]"
              style={{ left: revealPct }}
            >
              <IconChevrons size={22} />
            </div>
            <span className="absolute top-3.5 left-3.5 rounded-full bg-[rgba(0,0,0,0.45)] px-[11px] py-[5px] font-heading text-xs font-extrabold tracking-[0.1em] text-white uppercase">
              Worn
            </span>
            <span className="absolute top-3.5 right-3.5 rounded-full bg-green-primary px-[11px] py-[5px] font-heading text-xs font-extrabold tracking-[0.1em] text-white uppercase">
              Clean
            </span>
            <input
              type="range"
              min={0}
              max={100}
              value={reveal}
              onChange={(e) => setReveal(Number(e.target.value))}
              aria-label="Drag to reveal clean gear"
              className="absolute inset-0 m-0 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>
          <p className="mt-4 text-center text-sm text-muted-on-dark">
            G-SCRUB brings shoe care, club care, refills, towels, and future
            bundles into one clean golf-focused system.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
