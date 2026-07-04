import Image from "next/image";
import Reveal from "./Reveal";
import SectionEyebrow from "./SectionEyebrow";

// Static before/after, not a drag-to-reveal slider: a reveal slider needs
// the SAME shoe photographed dirty and clean in the exact same frame, which
// we don't have (the dirty and clean shots are different shoes/angles). Two
// labeled panels communicate the same transformation and actually work.
export default function SolutionSection() {
  return (
    <section
      id="solution"
      className="relative bg-green-deep py-[clamp(60px,8vw,110px)] text-[#EDEDED]"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal className="mx-auto mb-10 max-w-[640px] text-center">
          <SectionEyebrow>The Solution</SectionEyebrow>
          <h2 className="m-0 mb-4 font-heading text-[clamp(30px,4.5vw,50px)] leading-[1.04] font-extrabold tracking-[-0.015em] text-white">
            A simple system made for golfers.
          </h2>
          <p className="m-0 text-[17px] leading-[1.65] text-muted-on-dark">
            Foam, scrub, wipe — and your gear goes from course-worn to
            course-ready.
          </p>
        </Reveal>

        <Reveal className="mx-auto grid max-w-[900px] grid-cols-1 items-stretch gap-4 sm:grid-cols-2 sm:gap-5">
          <figure className="relative m-0 overflow-hidden rounded-[20px] border border-[rgba(255,255,255,0.14)] shadow-[0_30px_60px_-34px_rgba(0,0,0,0.6)]">
            <Image
              src="/images/gscrub-shoe-dirty.png"
              alt="Golf shoe caked in mud and grass before cleaning"
              width={1448}
              height={1086}
              className="block aspect-[4/3] w-full object-cover"
            />
            <figcaption className="absolute top-3.5 left-3.5 rounded-full bg-[rgba(0,0,0,0.55)] px-[13px] py-[6px] font-heading text-xs font-extrabold tracking-[0.1em] text-white uppercase">
              Before
            </figcaption>
          </figure>

          <figure className="relative m-0 overflow-hidden rounded-[20px] border border-[rgba(255,255,255,0.14)] shadow-[0_30px_60px_-34px_rgba(0,0,0,0.6)]">
            <Image
              src="/images/gscrub-shoe-clean.png"
              alt="Fresh clean white golf shoe on the course after using G-SCRUB"
              width={1448}
              height={1086}
              className="block aspect-[4/3] w-full object-cover"
            />
            <figcaption className="absolute top-3.5 left-3.5 rounded-full bg-green-primary px-[13px] py-[6px] font-heading text-xs font-extrabold tracking-[0.1em] text-white uppercase">
              After
            </figcaption>
          </figure>
        </Reveal>

        <p className="mx-auto mt-6 max-w-[640px] text-center text-sm text-muted-on-dark">
          G-SCRUB brings shoe care, club care, refills, towels, and future
          bundles into one clean golf-focused system.
        </p>
      </div>
    </section>
  );
}
