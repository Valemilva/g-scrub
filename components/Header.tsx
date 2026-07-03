"use client";

import { useState } from "react";
import AmazonButton from "./AmazonButton";
import { navLinks } from "@/lib/constants";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[60] border-b border-[rgba(15,68,41,0.1)] bg-[rgba(247,246,240,0.85)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-5 px-6 py-[13px]">
        <a href="#top" className="flex items-center gap-[11px] no-underline">
          <span className="flex h-[38px] w-[38px] items-center justify-center rounded-[11px] bg-green-primary font-heading text-2xl leading-none font-black text-white">
            G
          </span>
          <span className="font-heading text-[22px] font-black tracking-[0.01em] text-green-deep">
            G-SCRUB
          </span>
        </a>

        <nav className="hidden items-center gap-[30px] min-[881px]:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[15px] font-semibold text-[#3A4535] no-underline hover:text-green-primary"
            >
              {link.label}
            </a>
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
            className="flex h-[42px] w-[42px] items-center justify-center rounded-[11px] border border-[rgba(15,68,41,0.2)] bg-transparent text-xl text-green-deep min-[881px]:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="flex flex-col border-t border-[rgba(15,68,41,0.08)] px-6 pt-1.5 pb-4 min-[881px]:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-[11px] font-semibold text-[#3A4535] no-underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
