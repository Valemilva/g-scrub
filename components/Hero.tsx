import Image from "next/image";
import AmazonButton from "./AmazonButton";
import { AMAZON_RATING } from "@/lib/constants";

// Premium restraint: no floating bubbles, no cartoon grass strip, no
// rotating-word gimmick, no bobbing product. The hero sells with type,
// whitespace, and one clean product presentation — the way premium golf
// brands (Titleist, FootJoy, Vessel) present gear.
export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-bg-alt py-[clamp(56px,8vw,104px)]"
    >
      <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
        <div data-reveal>
          <div className="mb-6 inline-flex items-center gap-2 border-b-2 border-green-primary pb-2">
            <span className="text-xs font-extrabold tracking-[0.18em] text-ink uppercase">
              Premium Golf Cleaning System
            </span>
          </div>

          <h1 className="m-0 mb-5 font-heading text-[clamp(40px,6.2vw,72px)] leading-[0.98] font-black tracking-[-0.025em] text-ink">
            Clean Shoes.
            <br />
            Clean Clubs.
            <br />
            <span className="text-green-primary">Better Game.</span>
          </h1>

          <p className="m-0 mb-8 max-w-[480px] text-[clamp(16px,1.7vw,18px)] leading-[1.65] text-body">
            A premium golf cleaning system that keeps your shoes, clubs, and
            gear course-ready — before, during, and after every round.
          </p>

          <div className="mb-7 flex flex-wrap gap-3.5">
            <AmazonButton>Buy on Amazon →</AmazonButton>
            <a
              href="#solution"
              className="rounded-full border border-[rgba(17,17,17,0.25)] bg-white px-[30px] py-[17px] font-heading text-[16.5px] font-extrabold text-ink no-underline transition-colors hover:border-green-primary hover:text-green-primary"
            >
              Explore the System
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px] font-semibold tracking-[0.02em] text-body">
            <span>{AMAZON_RATING.stars.toFixed(1)}★ on Amazon</span>
            <span className="h-1 w-1 rounded-full bg-[rgba(17,17,17,0.3)]" />
            <span>Golf Shoe Cleaner</span>
            <span className="h-1 w-1 rounded-full bg-[rgba(17,17,17,0.3)]" />
            <span>Made in USA</span>
          </div>
        </div>

        <div className="relative" data-reveal>
          <Image
            src="/images/gscrub-hero-course.png"
            alt="G-SCRUB Premium Golf Shoe Cleaner Kit on the golf course next to a club and ball, with a mud-caked golf shoe beside it"
            width={1672}
            height={941}
            priority
            className="block w-full rounded-[16px] shadow-[0_40px_70px_-32px_rgba(17,17,17,0.45)]"
          />
          <div className="absolute top-4 right-4 rounded-full bg-green-primary px-4 py-2 font-heading text-[11.5px] font-extrabold tracking-[0.08em] text-white uppercase shadow-[0_10px_24px_-10px_rgba(0,0,0,0.4)]">
            Available Now
          </div>
        </div>
      </div>
    </section>
  );
}
