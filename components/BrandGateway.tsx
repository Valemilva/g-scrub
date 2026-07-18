"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Old home-page anchors (/#products etc.) now live on /golf — forward them so
// every link shared before the gateway existed keeps working.
const GOLF_ANCHORS = [
  "#products",
  "#how",
  "#story",
  "#lineup",
  "#wholesale",
  "#solution",
  "#launch",
  "#faq",
];

// Inline blur placeholders: the composed hero takes a moment to decode on
// slower machines, and without these the gateway opens on a black frame.
const BLUR_HERO =
  "data:image/webp;base64,UklGRs4AAABXRUJQVlA4IMIAAABQBACdASocABAAPu1iqU2ppaOiMAgBMB2JYgC7AYxE3mLqsSgrsWaTjKGAAP7n+7MTJoCMvfh45T46YGwX7ipG4D5RPDEQKJfProUHH2qduY1hbsnj6gmWJgKFG5q+KFWHBuxTlwZepn2MfzkvuHqz0AsKQaarvGt7/cbigw7JKHJ5ib79j7C04UA2hk8GpWgSsEEA5peAbRZUKatMY/u4N5yM0GoLeLf6lsHMi3Au3vsB0YAdPVfyidyLZILAYQAAAA==";
const BLUR_GOLF =
  "data:image/webp;base64,UklGRkgBAABXRUJQVlA4IDwBAAAQBwCdASocACcAPu1wr1MppiQipWmZMB2JYgC/Od2viMMkEKzJ+cgcGe3fNPD7h1VBOmm1kbJ1+Yp6advM2DuHQAD++AR15JsSvjV5gSf232nkJc6ENrmaAbcqUxcUrfmUVTVlOKiE9ayPrWbkr88l3Ovta223tm4R33Zpbgl1+H9zPfaa1mgGNw/zvfhBfh6U8p/JSGUiWPRMgMnP4oshv+bADgH5/eNLXTph1wIOnAYGt1dvVxZExAhrnqBCwOgkHHwS1uB28hlRkloTJRgVH2AP8Qu7auHqUYbSQ3952LuEcJAVj0bj6MKXkhgrcdmvOoo3teXUEGW9M559+JP829qYrDfZnwWCC1M3tCxh1c1Rco3tCtFbJ4IACRkA+Xjh4I3JMCEKfZtjXYxB3YgcdBW0p5j36WHOAAAA";
const BLUR_ATHLETIC =
  "data:image/webp;base64,UklGRlgBAABXRUJQVlA4IEwBAADwBgCdASocACcAPu1qrVEppaQipWzJMB2JQBdgtySpk4CV9ZS38IXaKSOBp85xOv9gHemxbLklaIfXIWbdGToAAP71fTBNrpfckVFMwKb3m4nO8iC7CspaL+stIHE0/105hD5s637CJh2cW30use9tp+RjhfqYcbg/sjQ98qvzkzFcBUnIOB8NVMVSMhvEAkXq8NspIp3hd3SbNHGvvrGixlkf9xF0u2L9ALNgLY8+8GKBNeQPBuKUUeFiIoy+HVsKDz8OUcRbzFk5LJW4iqjAsFIPaFxHaV3iNSGvojqUlZc20i3V/4rWQdplbpKvPPMBstli4Mjar2atvBxIDkfUQwXtRJ4E6WzEARTeCGU9HB7Ma8g36Tk+ARsFb/dKJ0iXetpQwFoVVJ2rQ1omxWy+v4PhPplkw+JSAO6I606U2K4whJr8W3tEl4AAAA==";

// Deterministic bubble field (no Math.random — avoids hydration mismatch).
// Spread across the whole viewport, denser near the center seam; roughly half
// sway sideways while rising for a more natural soap-bubble feel.
const BUBBLES = [
  { left: "4%", size: 16, duration: 19, delay: 1, sway: true },
  { left: "9%", size: 24, duration: 22, delay: 6, sway: false },
  { left: "15%", size: 13, duration: 16, delay: 11, sway: true },
  { left: "21%", size: 20, duration: 20, delay: 3, sway: false },
  { left: "27%", size: 15, duration: 15, delay: 14, sway: true },
  { left: "33%", size: 28, duration: 23, delay: 8, sway: false },
  { left: "38%", size: 18, duration: 17, delay: 0.5, sway: true },
  { left: "43%", size: 23, duration: 18, delay: 12, sway: false },
  { left: "46%", size: 32, duration: 21, delay: 4, sway: true },
  { left: "49%", size: 14, duration: 14, delay: 9, sway: false },
  { left: "52%", size: 38, duration: 24, delay: 2, sway: true },
  { left: "55%", size: 21, duration: 16, delay: 15, sway: false },
  { left: "60%", size: 16, duration: 18, delay: 7, sway: true },
  { left: "66%", size: 26, duration: 21, delay: 0, sway: false },
  { left: "71%", size: 13, duration: 15, delay: 10, sway: true },
  { left: "77%", size: 21, duration: 19, delay: 5, sway: false },
  { left: "83%", size: 17, duration: 17, delay: 13, sway: true },
  { left: "89%", size: 28, duration: 22, delay: 3.5, sway: false },
  { left: "94%", size: 14, duration: 16, delay: 8.5, sway: true },
  { left: "97%", size: 21, duration: 20, delay: 12.5, sway: false },
];

// Shared renderer so desktop and mobile draw the exact same field.
function BubbleField() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {BUBBLES.map((b, i) => (
        <span
          key={i}
          className={b.sway ? "gw-bubble gw-bubble-sway" : "gw-bubble"}
          style={{
            left: b.left,
            width: b.size,
            height: b.size,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function trackChoice(line: "golf" | "athletic") {
  try {
    // GA4 custom event — shows up alongside enhanced-measurement data.
    (
      window as unknown as {
        gtag?: (...args: unknown[]) => void;
      }
    ).gtag?.("event", "select_brand_line", { line });
  } catch {
    // Analytics must never block navigation.
  }
}

export default function BrandGateway() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (GOLF_ANCHORS.includes(hash)) router.replace(`/golf${hash}`);
  }, [router]);

  return (
    <main className="h-[100dvh] w-full overflow-hidden bg-[#06090c]">
      {/* ===== Desktop: the composed split hero; hover feedback lives on the
          CTA cards only (a side-to-side dim overlay was tried and cut). ===== */}
      <div className="relative hidden h-full md:block">
        <div className="absolute inset-0">
          {/* Base layer: the full composed image, untouched (no filters).
              A persistent blurred backdrop sits underneath: next/image drops
              its own blur on `load`, but painting waits for DECODE — on slow
              machines that gap showed pure black. This div never goes away;
              the sharp image simply paints over it. */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${BLUR_HERO})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0">
            <Image
              src="/images/gateway-hero.webp"
              placeholder="blur"
              blurDataURL={BLUR_HERO}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Readability scrim for the CTA row. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

          {/* Soap bubbles rising across the whole screen. */}
          <BubbleField />
        </div>

        {/* Entrance curtain — fades out over the already-painted hero. */}
        <div className="gw-cover pointer-events-none absolute inset-0 z-40 bg-[#06090c]" />

        {/* Choose chip under the composed center logo. */}
        <div
          className="gw-rise pointer-events-none absolute left-1/2 top-[65%] z-30 -translate-x-1/2"
          style={{ animationDelay: "0.85s" }}
        >
          <p className="m-0 flex items-center gap-3 text-[12px] font-extrabold tracking-[0.34em] text-white/85 uppercase">
            <span className="h-px w-9 bg-gradient-to-r from-transparent to-white/70" />
            Choose your side
            <span className="h-px w-9 bg-gradient-to-l from-transparent to-white/70" />
          </p>
        </div>

        {/* Golf half. */}
        <Link
          href="/golf"
          aria-label="Enter G-SCRUB Golf — Clean Shoes. Better Game."
          className="group absolute inset-y-0 left-0 z-20 w-[48.5%] outline-none"
          onClick={() => trackChoice("golf")}
        >
          <div
            className="gw-rise absolute bottom-12 left-[clamp(24px,4vw,64px)] w-[clamp(280px,26vw,380px)] rounded-2xl border border-white/15 bg-[rgba(8,14,8,0.42)] p-6 backdrop-blur-md transition-all duration-500 group-hover:-translate-y-2 group-hover:border-[rgba(96,200,96,0.6)] group-hover:bg-[rgba(8,16,8,0.6)] group-focus-visible:ring-2 group-focus-visible:ring-white"
            style={{ animationDelay: "0.45s" }}
          >
            <p className="m-0 text-[11.5px] font-extrabold tracking-[0.3em] text-[#7fd47f] uppercase">
              Golf
            </p>
            <h2 className="m-0 mt-1.5 font-heading text-[clamp(21px,1.9vw,27px)] leading-[1.12] font-black text-white">
              Clean Shoes.
              <br />
              Better Game.
            </h2>
            <p className="m-0 mt-2 text-[13.5px] leading-[1.55] text-white/75">
              The original golf cleaning system — shoes, clubs, and gear.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-primary px-5 py-2.5 font-heading text-[13.5px] font-extrabold text-white transition-all duration-300 group-hover:gap-3.5 group-hover:bg-green-primary-hover">
              Enter Golf
              <span aria-hidden>→</span>
            </span>
          </div>
        </Link>

        {/* Athletic half. */}
        <Link
          href="/athletic"
          aria-label="Enter G-SCRUB Athletic Care — Built for Performance."
          className="group absolute inset-y-0 right-0 z-20 w-[51.5%] outline-none"
          onClick={() => trackChoice("athletic")}
        >
          <div
            className="gw-rise absolute bottom-12 right-[clamp(24px,4vw,64px)] w-[clamp(280px,26vw,380px)] rounded-2xl border border-white/15 bg-[rgba(5,10,16,0.45)] p-6 text-right backdrop-blur-md transition-all duration-500 group-hover:-translate-y-2 group-hover:border-[rgba(24,183,230,0.65)] group-hover:bg-[rgba(5,12,20,0.62)] group-focus-visible:ring-2 group-focus-visible:ring-white"
            style={{ animationDelay: "0.6s" }}
          >
            <p className="m-0 text-[11.5px] font-extrabold tracking-[0.3em] text-[#4fc7ec] uppercase">
              Athletic Care
            </p>
            <h2 className="m-0 mt-1.5 font-heading text-[clamp(21px,1.9vw,27px)] leading-[1.12] font-black text-white">
              Built for
              <br />
              Performance.
            </h2>
            <p className="m-0 mt-2 text-[13.5px] leading-[1.55] text-white/75">
              All-sport shoe care for courts, turf, and training.
            </p>
            <span className="gw-pulse mt-4 inline-flex items-center gap-2 rounded-full bg-[#18b7e6] px-5 py-2.5 font-heading text-[13.5px] font-extrabold text-[#04121a] transition-all duration-300 group-hover:gap-3.5 group-hover:bg-[#3cc6ef]">
              Enter Athletic
              <span aria-hidden>→</span>
            </span>
          </div>
        </Link>
      </div>

      {/* ===== Mobile: stacked panels (logo-free crops) + center brand badge ===== */}
      <div className="relative flex h-full flex-col md:hidden">
        <div className="gw-cover pointer-events-none absolute inset-0 z-40 bg-[#06090c]" />
        <Link
          href="/golf"
          aria-label="Enter G-SCRUB Golf"
          className="group relative flex-1 overflow-hidden outline-none"
          onClick={() => trackChoice("golf")}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${BLUR_GOLF})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0">
            <Image
              src="/images/gateway-golf-half.webp"
              placeholder="blur"
              blurDataURL={BLUR_GOLF}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
          <div
            className="gw-rise absolute inset-x-0 bottom-9 px-6 text-center"
            style={{ animationDelay: "0.35s" }}
          >
            <p className="m-0 text-[11px] font-extrabold tracking-[0.3em] text-[#7fd47f] uppercase">
              Golf
            </p>
            <h2 className="m-0 mt-1 font-heading text-[24px] font-black text-white">
              Clean Shoes. Better Game.
            </h2>
            <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-green-primary px-5 py-2.5 font-heading text-[13.5px] font-extrabold text-white">
              Enter Golf <span aria-hidden>→</span>
            </span>
          </div>
        </Link>

        {/* Seam: a thin brand-color divider (green → cyan) with a "Choose your
            side" label on it — no white box, so the split stays immersive. */}
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 z-20 h-[2px] -translate-y-1/2 bg-gradient-to-r from-green-primary via-white/85 to-[#18b7e6]" />
        <div className="gw-fade pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
          <p className="m-0 flex items-center gap-2.5 rounded-full bg-black/45 px-4 py-2 text-[10.5px] font-extrabold tracking-[0.3em] text-white uppercase backdrop-blur-sm">
            <span className="h-px w-5 bg-gradient-to-r from-transparent to-white/70" />
            Choose your side
            <span className="h-px w-5 bg-gradient-to-l from-transparent to-white/70" />
          </p>
        </div>

        {/* Soap bubbles rising over both panels. */}
        <BubbleField />

        <Link
          href="/athletic"
          aria-label="Enter G-SCRUB Athletic Care"
          className="group relative flex-1 overflow-hidden outline-none"
          onClick={() => trackChoice("athletic")}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${BLUR_ATHLETIC})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0">
            <Image
              src="/images/gateway-athletic-half.webp"
              placeholder="blur"
              blurDataURL={BLUR_ATHLETIC}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/35" />
          <div
            className="gw-rise absolute inset-x-0 bottom-9 px-6 text-center"
            style={{ animationDelay: "0.5s" }}
          >
            <p className="m-0 text-[11px] font-extrabold tracking-[0.3em] text-[#4fc7ec] uppercase">
              Athletic Care
            </p>
            <h2 className="m-0 mt-1 font-heading text-[24px] font-black text-white">
              Built for Performance.
            </h2>
            <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#18b7e6] px-5 py-2.5 font-heading text-[13.5px] font-extrabold text-[#04121a]">
              Enter Athletic <span aria-hidden>→</span>
            </span>
          </div>
        </Link>
      </div>
    </main>
  );
}
