"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AmazonButton from "./AmazonButton";
import { navLinks } from "@/lib/constants";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[60] border-b border-[rgba(17,17,17,0.1)] bg-[rgba(255,255,255,0.85)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-5 px-6 py-[13px]">
        {/* Official lockup (new logo, Jul 2026): standalone green G letterform
            + the real G-SCRUB wordmark artwork (bubbly CRUB). The wordmark PNG
            has a transparent background so it sits cleanly on the light header. */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <span className="font-heading text-[32px] leading-none font-black text-green-primary">
            G
          </span>
          <Image
            src="/images/gscrub-wordmark.webp"
            alt="G-SCRUB"
            width={900}
            height={205}
            priority
            className="h-[26px] w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-[30px] min-[881px]:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-semibold text-[#3A3A3A] no-underline hover:text-green-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <AmazonButton className="!px-5 !py-[11px] !text-sm">
            Buy on Amazon
          </AmazonButton>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
            className="flex h-[42px] w-[42px] items-center justify-center rounded-[11px] border border-[rgba(17,17,17,0.2)] bg-transparent text-xl text-green-deep min-[881px]:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="flex flex-col border-t border-[rgba(17,17,17,0.08)] px-6 pt-1.5 pb-4 min-[881px]:hidden">
          {navLinks.map((link) => (
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
