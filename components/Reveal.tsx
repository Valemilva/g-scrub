"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/**
 * Wraps content that should fade/slide in on scroll via IntersectionObserver.
 * Content is visible by default (data-reveal in globals.css starts at opacity:0,
 * but we guard here so if JS never runs the "is-visible" class simply never gets
 * added — to keep base content visible without JS we rely on progressive
 * enhancement: only start hidden once we know JS/observer is active).
 */
export default function Reveal({ children, className = "", as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) ||
      typeof IntersectionObserver === "undefined"
    ) {
      // Leave content visible as-is (no armed/hidden state applied).
      return;
    }

    el.classList.add("js-reveal-armed");

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Component = as as ElementType;

  return (
    <Component ref={ref} data-reveal className={className}>
      {children}
    </Component>
  );
}
