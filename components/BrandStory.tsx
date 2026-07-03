import Reveal from "./Reveal";
import SectionEyebrow from "./SectionEyebrow";

export default function BrandStory() {
  return (
    <section id="story" className="bg-bg py-[clamp(60px,8vw,110px)]">
      <div className="mx-auto max-w-[820px] px-6 text-center">
        <Reveal>
          <SectionEyebrow>Our Story</SectionEyebrow>
          <h2 className="m-0 mb-[30px] font-heading text-[clamp(30px,4.5vw,50px)] leading-[1.04] font-extrabold tracking-[-0.015em] text-ink">
            Built from a real golfer&rsquo;s problem.
          </h2>
        </Reveal>

        <Reveal className="text-left text-[17px] leading-[1.75] text-[#4B5347]">
          <p className="m-0 mb-5">
            G-SCRUB was created from a simple frustration: golf shoes get
            dirty fast, and most golfers do not have a quick, clean, and
            practical way to take care of them after a round.
          </p>
          <p className="m-0 mb-5">
            What started as a small idea became a product built around the
            golfer&rsquo;s routine — something compact, useful, and easy to
            keep nearby. The first G-SCRUB product focused on golf shoes
            because shoes are one of the first things that show the wear of
            the course.
          </p>
          <p className="m-0">
            But the vision was always bigger than one bottle. Golfers also
            need to clean their clubs, towels, and gear. That is why G-SCRUB
            is growing from a shoe cleaner into a complete golf cleaning
            system.
          </p>
        </Reveal>

        <Reveal>
          <p className="mt-8 border-l-[3px] border-gold py-1 pl-5 text-left font-heading text-xl leading-[1.4] font-bold text-ink">
            The goal is simple: help golfers keep their gear clean without
            overcomplicating the game.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
