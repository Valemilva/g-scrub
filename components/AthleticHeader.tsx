"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Athletic top bar — same structure as the golf Header (logo left, nav row
// that collapses into a hamburger under 881px, CTA on the right), but on the
// dark Athletic theme with the cyan accent. Keeps the white-plate wordmark so
// the black "G-S" stays legible over the dark bar.
const athleticLinks = [
  { href: "#lineup", label: "The Line-Up" },
  { href: "#notify", label: "Launch List" },
  { href: "/golf", label: "Golf Line" },
];

export default function AthleticHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[60] border-b border-white/10 bg-[rgba(6,10,14,0.82)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-5 px-6 py-[13px]">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <span className="flex items-center rounded-[10px] bg-white px-3 py-1.5">
            <Image
              src="/images/gscrub-wordmark.webp"
              alt="G-SCRUB"
              width={900}
              height={205}
              priority
              className="h-[24px] w-auto"
            />
          </span>
          <span className="hidden text-[10px] font-extrabold tracking-[0.28em] text-[#4fc7ec] uppercase sm:block">
            Athletic Care
          </span>
        </Link>

        <nav className="hidden items-center gap-[30px] min-[881px]:flex">
          {athleticLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-semibold text-white/70 no-underline hover:text-[#4fc7ec]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href="#notify"
            className="rounded-full bg-[#18b7e6] px-5 py-[11px] font-heading text-sm font-extrabold whitespace-nowrap text-[#04121a] no-underline hover:bg-[#3cc6ef]"
          >
            Get Launch Updates
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            className="flex h-[42px] w-[42px] items-center justify-center rounded-[11px] border border-white/20 bg-transparent text-xl text-white min-[881px]:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="flex flex-col border-t border-white/10 px-6 pt-1.5 pb-4 min-[881px]:hidden">
          {athleticLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-[11px] font-semibold text-white/80 no-underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
