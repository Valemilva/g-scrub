import Image from "next/image";
import Reveal from "./Reveal";
import SectionEyebrow from "./SectionEyebrow";

// Real before/after of the same shoe, same angle, dirty vs. clean — replaces
// the earlier two-different-shoes panel workaround now that we have a true
// matched pair.
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

        <Reveal className="mx-auto max-w-[900px]">
          <figure className="relative m-0 overflow-hidden rounded-[20px] border border-[rgba(255,255,255,0.14)] shadow-[0_30px_60px_-34px_rgba(0,0,0,0.6)]">
            <Image
              src="/images/gscrub-before-after-same-shoe.png"
              alt="The same golf shoe, same angle: caked in mud and grass before G-SCRUB, spotless white after"
              width={1536}
              height={1024}
              className="block aspect-[3/2] w-full object-cover"
            />
            <figcaption className="absolute top-3.5 left-3.5 rounded-full bg-[rgba(0,0,0,0.55)] px-[13px] py-[6px] font-heading text-xs font-extrabold tracking-[0.1em] text-white uppercase">
              Before
            </figcaption>
            <figcaption className="absolute top-3.5 right-3.5 rounded-full bg-green-primary px-[13px] py-[6px] font-heading text-xs font-extrabold tracking-[0.1em] text-white uppercase">
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
