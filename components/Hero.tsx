import Image from "next/image";
import AmazonButton from "./AmazonButton";
import { AMAZON_RATING } from "@/lib/constants";

// Immersive full-bleed hero — the golf-line mirror of the Athletic hero, so
// both sections read as one brand: a full-screen product photo, a dark scrim
// on the reading side, white headline with the line's accent color (green
// here, cyan on Athletic), CTAs, and a status tag.
export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[86dvh] items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/gscrub-hero-course.png"
          alt="G-SCRUB Premium Golf Shoe Cleaner Kit on the course beside a club, ball, and a mud-caked golf shoe"
          fill
          priority
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRgoBAABXRUJQVlA4IP4AAADwBQCdASogABIAPu1gqE2ppaOiMAgBMB2JaAC7L5AUAIM4ZfOSBUq2fDYGi/kv47OHHlfiRhoeAAD+0mqiP8deBRhTFdMLgIXop0wopW3WqlxBgchSuhAAF6Zw3Tnxfka0x95bcbkGbI+zGFbt5v63fcOU+XaOx9jWd2CwzOv0NVNK5IlE4/djp2W7nvHkvQAtEGerAplLS4+DH6O3wVUd8am4m+VYNTy/PyLivyvlmHW3tNPjzId+i/42ViJ9u5LlRtHZeBPEqgze7WB6mFr/14d76xwRpwBGSJpjW1JTdNqYkZk5Uhvw8YnVlwgKsoHq2ia+aL756yuvQyyAAA=="
          sizes="100vw"
          className="object-cover object-[58%_center]"
        />
        {/* Reading scrim from the left + a base gradient for the CTA row. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#06120a]/92 via-[#06120a]/55 to-[#06120a]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081006] via-transparent to-black/25" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-24">
        <div className="max-w-[640px]" data-reveal>
          <p className="m-0 flex items-center gap-3 text-[12px] font-extrabold tracking-[0.3em] text-[#7fd47f] uppercase">
            <span className="h-px w-9 bg-green-primary" />
            Premium Golf Cleaning System
          </p>

          <h1 className="m-0 mt-4 font-heading text-[clamp(40px,6.2vw,72px)] leading-[0.98] font-black tracking-[-0.025em] text-white">
            Clean Shoes.
            <br />
            Clean Clubs.
            <br />
            <span className="text-green-bright">Better Game.</span>
          </h1>

          <p className="m-0 mt-5 max-w-[480px] text-[clamp(15px,1.5vw,18px)] leading-[1.65] text-white/80">
            A premium golf cleaning system that keeps your shoes, clubs, and
            gear course-ready — before, during, and after every round.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <AmazonButton>Buy on Amazon →</AmazonButton>
            <a
              href="#solution"
              className="rounded-full border border-white/30 bg-white/[0.06] px-[30px] py-[17px] font-heading text-[16.5px] font-extrabold text-white no-underline backdrop-blur-sm transition-colors hover:border-green-bright hover:text-green-bright"
            >
              Explore the System
            </a>
            <span className="rounded-full border border-[rgba(96,200,96,0.5)] px-4 py-2 text-[11.5px] font-extrabold tracking-[0.18em] text-[#7fd47f] uppercase">
              Shoe Kit · Available Now
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px] font-semibold tracking-[0.02em] text-white/75">
            <span>{AMAZON_RATING.stars.toFixed(1)}★ on Amazon</span>
            <span className="h-1 w-1 rounded-full bg-white/40" />
            <span>Shoes · Clubs · Gear</span>
            <span className="h-1 w-1 rounded-full bg-white/40" />
            <span>Made in USA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
