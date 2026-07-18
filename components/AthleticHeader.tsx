"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Athletic top bar — same light frosted bar as the golf Header (so the real
// wordmark sits directly on it, no white plate), with cyan accents for the
// Athletic line. Structure mirrors golf: logo left, nav row that collapses to
// a hamburger under 881px, CTA on the right.
const athleticLinks = [
  { href: "#lineup", label: "The Line-Up" },
  { href: "#faq", label: "FAQ" },
  { href: "#notify", label: "Launch List" },
  { href: "/golf", label: "Golf Line" },
];

export default function AthleticHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[60] border-b border-[rgba(17,17,17,0.1)] bg-[rgba(255,255,255,0.85)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-5 px-6 py-[13px]">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <Image
            src="/images/gscrub-wordmark.webp"
            alt="G-SCRUB"
            width={900}
            height={205}
            priority
            className="h-[28px] w-auto"
          />
          <span className="hidden text-[10px] font-extrabold tracking-[0.26em] text-[#0e9dcc] uppercase sm:block">
            Athletic Care
          </span>
        </Link>

        <nav className="hidden items-center gap-[30px] min-[881px]:flex">
          {athleticLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-semibold text-[#3A3A3A] no-underline hover:text-[#0e9dcc]"
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
            className="flex h-[42px] w-[42px] items-center justify-center rounded-[11px] border border-[rgba(17,17,17,0.2)] bg-transparent text-xl text-[#0e9dcc] min-[881px]:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="flex flex-col border-t border-[rgba(17,17,17,0.08)] px-6 pt-1.5 pb-4 min-[881px]:hidden">
          {athleticLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-[11px] font-semibold text-[#3A3A3A] no-underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
