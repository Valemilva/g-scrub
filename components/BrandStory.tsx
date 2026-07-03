import Reveal from "./Reveal";
import SectionEyebrow from "./SectionEyebrow";

export default function BrandStory() {
  return (
    <section id="story" className="bg-bg py-[clamp(60px,8vw,110px)]">
      <div className="mx-auto max-w-[820px] px-6 text-center">
        <Reveal>
          <SectionEyebrow>Our Story</SectionEyebrow>
          <h2 className="m-0 mb-[30px] font-heading text-[clamp(30px,4.5vw,50px)] leading-[1.04] font-extrabold tracking-[-0.015em] text-ink">
            How G-SCRUB was born &mdash; with mud, laughs, and family.
          </h2>
        </Reveal>

        <Reveal className="text-left text-[17px] leading-[1.75] text-body">
          <p className="m-0 mb-5">
            We&rsquo;re the L&oacute;pez family &mdash; and this is the real
            story of how we ended up creating G-SCRUB, a product made
            specifically for golfers like you (and us, though we&rsquo;re
            still working on our handicaps).
          </p>
          <p className="m-0 mb-5">
            It all started because we love golf. Not just playing it &mdash;
            we like to look good while playing: clean caps, crisp shirts,
            shiny shoes. That was the plan. But reality had other ideas.
          </p>
          <p className="m-0 mb-5">
            Our golf balls seemed to have GPS &mdash; not for the green, but
            straight into the mud, tall grass, ditches, and our beloved sand
            traps. After every round, our shoes and clubs looked like
            they&rsquo;d survived a swamp.
          </p>
          <p className="m-0 mb-5">
            We searched everywhere for a product made to clean golf shoes.
            Something practical, quick, and made for the game &mdash; but
            there was nothing specific out there. Everything was generic,
            low quality, or made overseas.
          </p>
          <p className="m-0">
            One day, while scrubbing shoes with an old brush and dish soap
            (true story), one of us joked: &ldquo;What if we made our
            own?&rdquo; Through ideas, prototypes, trial and error, and a lot
            of muddy rounds, G-SCRUB was born &mdash; made by golfers, for
            golfers, and proudly manufactured in the USA.
          </p>
        </Reveal>

        <Reveal className="mt-9 grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
          <div className="rounded-[16px] border border-[rgba(17,17,17,0.09)] bg-bg-alt px-5 py-4">
            <span className="mb-1 block font-heading text-sm font-black tracking-[0.04em] text-green-primary uppercase">
              Dad L&oacute;pez
            </span>
            <p className="m-0 text-[14.5px] leading-[1.6] text-body-2">
              Decades of manufacturing experience. The one who took the
              &ldquo;what if we made our own?&rdquo; joke seriously enough to
              actually build it.
            </p>
          </div>
          <div className="rounded-[16px] border border-[rgba(17,17,17,0.09)] bg-bg-alt px-5 py-4">
            <span className="mb-1 block font-heading text-sm font-black tracking-[0.04em] text-green-primary uppercase">
              The L&oacute;pez Brothers
            </span>
            <p className="m-0 text-[14.5px] leading-[1.6] text-body-2">
              The golfers behind the muddy shoes, the sand-trap stories, and
              the idea that turned into G-SCRUB.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-8 border-l-[3px] border-green-primary py-1 pl-5 text-left font-heading text-xl leading-[1.4] font-bold text-ink">
            Thanks for being part of our story. This is just the beginning.
            <span className="mt-2 block text-base font-semibold text-body">
              &mdash; The L&oacute;pez Family
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
