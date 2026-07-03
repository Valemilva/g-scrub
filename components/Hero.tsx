"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import AmazonButton from "./AmazonButton";
import { heroRotatingWords } from "@/lib/constants";

const GRASS_SVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='34' viewBox='0 0 120 34'%3E%3Cpath d='M0 34 L8 6 L16 34 L26 10 L34 34 L44 2 L54 34 L64 8 L74 34 L84 12 L94 34 L104 4 L112 34 L120 10 L120 34 Z' fill='%231B8A3E'/%3E%3C/svg%3E";

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const timer = setInterval(() => {
      setWordIdx((i) => (i + 1) % heroRotatingWords.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#E3F0F6_0%,#EAF3E8_42%,#DCEEDA_100%)] pt-[clamp(52px,7vw,86px)]"
    >
      {/* sun glow */}
      <div className="pointer-events-none absolute -top-[120px] -right-20 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(255,247,214,0.9),rgba(255,247,214,0)_70%)]" />

      <div className="relative z-[2] mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-8 px-6 md:grid-cols-2 md:gap-14">
        <div data-reveal>
          <div className="mb-[22px] inline-flex items-center gap-2 rounded-full border border-[rgba(15,68,41,0.18)] bg-[rgba(255,255,255,0.6)] px-3.5 py-[7px]">
            <span className="h-[7px] w-[7px] rounded-full bg-gold" />
            <span className="text-xs font-extrabold tracking-[0.15em] text-green-deep uppercase">
              Premium Golf Cleaning System
            </span>
          </div>

          <h1 className="m-0 mb-[18px] font-heading text-[clamp(40px,6.2vw,72px)] leading-[0.98] font-black tracking-[-0.025em] text-ink">
            Clean Shoes.
            <br />
            Clean Clubs.
            <br />
            <span className="relative text-green-primary">
              Better Game.
              <span className="absolute bottom-0.5 left-0 -z-10 h-[10px] w-full rounded bg-[rgba(196,162,74,0.4)]" />
            </span>
          </h1>

          <p className="m-0 mb-3 max-w-[500px] text-[clamp(16px,1.7vw,19px)] leading-[1.6] text-[#3F4A3B]">
            A premium golf cleaning system that keeps your shoes, clubs, and
            gear course-ready — before, during, and after every round.
          </p>

          <div className="mb-[26px] inline-flex items-center gap-2.5 font-heading text-[15px] font-extrabold text-green-deep">
            <span className="text-[13px] font-bold tracking-[0.08em] text-[#6B7563] uppercase">
              Goodbye
            </span>
            <span className="inline-block min-w-[118px] text-left text-green-primary">
              {heroRotatingWords[wordIdx]}
            </span>
          </div>

          <div className="mb-4 flex flex-wrap gap-3.5">
            <AmazonButton pulse>Buy on Amazon →</AmazonButton>
            <a
              href="#solution"
              className="rounded-full border border-[rgba(15,68,41,0.2)] bg-white px-[30px] py-[17px] font-heading text-[16.5px] font-extrabold text-green-deep no-underline hover:border-green-primary hover:text-green-primary"
            >
              Explore the System
            </a>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {[
              "⛳ Golf Shoe Cleaner",
              "Course-Ready Gear",
              "Amazon Available",
              "🇺🇸 Made in USA",
            ].map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-[rgba(15,68,41,0.1)] bg-[rgba(255,255,255,0.65)] px-[13px] py-[7px] text-[13px] font-semibold text-[#3A4535]"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        <div className="relative justify-self-center">
          {/* foam bubbles */}
          <span className="anim-rise absolute bottom-[60px] left-[12%] h-4 w-4 rounded-full bg-[rgba(255,255,255,0.9)]" />
          <span className="absolute bottom-20 left-[30%] h-2.5 w-2.5 animate-[gsRise_5.2s_ease-in_infinite_0.8s] rounded-full bg-[rgba(255,255,255,0.85)]" />
          <span className="absolute right-[22%] bottom-[50px] h-[13px] w-[13px] animate-[gsRise_4.8s_ease-in_infinite_1.6s] rounded-full bg-[rgba(255,255,255,0.9)]" />
          <span className="absolute right-[10%] bottom-[90px] h-2 w-2 animate-[gsRise_5.6s_ease-in_infinite_2.3s] rounded-full bg-[rgba(255,255,255,0.85)]" />

          <div className="anim-bob relative">
            <div className="absolute inset-x-[8%] top-[6%] bottom-[-2%] translate-y-5 bg-[radial-gradient(circle_at_50%_60%,rgba(15,68,41,0.28),transparent_70%)] blur-[14px]" />
            <Image
              src="/images/gscrub-kit.png"
              alt="G-SCRUB Premium Golf Shoe Cleaner Kit box with foaming cleaner bottle and wooden brush"
              width={360}
              height={360}
              priority
              className="relative block w-[min(360px,80vw)] rounded-[20px] shadow-[0_40px_70px_-28px_rgba(15,46,28,0.55)]"
            />
          </div>

          <div className="absolute top-2 right-0 rounded-full bg-gold px-3.5 py-2 font-heading text-xs font-extrabold tracking-[0.05em] text-[#12160F] uppercase shadow-[0_8px_20px_-8px_rgba(0,0,0,0.4)]">
            Available Now
          </div>

          <Image
            src="/images/gscrub-usa-badge.png"
            alt="Made in USA"
            width={96}
            height={96}
            className="anim-float absolute -bottom-3 -left-[22px] h-24 w-24 rounded-full shadow-[0_12px_24px_-10px_rgba(15,46,28,0.45)]"
          />
        </div>
      </div>

      {/* animated grass ground */}
      <div className="relative z-[1] mt-[-6px] h-16">
        <div
          className="absolute right-0 bottom-0 left-0 h-[34px] bg-repeat-x"
          style={{
            backgroundSize: "120px 34px",
            backgroundImage: `url("${GRASS_SVG}")`,
          }}
        />
        <span className="anim-sway absolute bottom-0 left-[14%] h-10 w-[5px] rounded-t-[3px] bg-green-primary" />
        <span className="absolute bottom-0 left-[38%] h-[52px] w-[5px] animate-[gsSway_4s_ease-in-out_infinite_0.5s] rounded-t-[3px] bg-[#157A36] [transform-origin:bottom_center]" />
        <span className="absolute bottom-0 left-[63%] h-11 w-[5px] animate-[gsSway_3.7s_ease-in-out_infinite_1s] rounded-t-[3px] bg-green-primary [transform-origin:bottom_center]" />
        <span className="absolute bottom-0 left-[83%] h-14 w-[5px] animate-[gsSway_4.3s_ease-in-out_infinite_0.3s] rounded-t-[3px] bg-[#157A36] [transform-origin:bottom_center]" />
      </div>
    </section>
  );
}
