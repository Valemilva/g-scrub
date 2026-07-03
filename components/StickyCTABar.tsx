"use client";

import { useEffect, useState } from "react";
import { AMAZON_URL } from "@/lib/constants";

export default function StickyCTABar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed right-0 bottom-0 left-0 z-[70] flex flex-wrap items-center justify-center gap-4 border-t-2 border-gold bg-[rgba(15,68,41,0.96)] px-5 py-3 backdrop-blur-md transition-transform duration-[400ms] ease-[cubic-bezier(.2,.8,.2,1)] ${
        visible ? "translate-y-0" : "translate-y-[130%]"
      }`}
      aria-hidden={!visible}
    >
      <span className="font-heading text-[15px] font-extrabold text-white">
        Clean Shoes. Better Game.
      </span>
      <a
        href={AMAZON_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-gold px-[22px] py-[11px] font-heading text-sm font-extrabold whitespace-nowrap text-[#12160F] no-underline hover:bg-gold-hover"
      >
        Buy on Amazon →
      </a>
    </div>
  );
}
