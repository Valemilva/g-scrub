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
            Hey, I&rsquo;m Dylan &mdash; and this is the real story of how we
            ended up creating G-SCRUB, a product made specifically for
            golfers like you (and me, though I&rsquo;m still working on my
            handicap).
          </p>
          <p className="m-0 mb-5">
            It all started because my dad, my brother Stephen, and I love
            golf. Not just playing it &mdash; we like to look good while
            playing: clean caps, crisp shirts, shiny shoes. That was the
            plan. But reality had other ideas.
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
            (true story), I joked: &ldquo;What if we made our own?&rdquo; My
            dad, who has decades of experience in manufacturing, took it
            seriously. Stephen got excited too. Through ideas, prototypes,
            trial and error, and a lot of muddy rounds, G-SCRUB was born
            &mdash; made by golfers, for golfers, and proudly manufactured
            in the USA.
          </p>
        </Reveal>

        <Reveal>
          <p className="mt-8 border-l-[3px] border-green-primary py-1 pl-5 text-left font-heading text-xl leading-[1.4] font-bold text-ink">
            Thanks for being part of our story. This is just the beginning.
            <span className="mt-2 block text-base font-semibold text-body">
              &mdash; Dylan
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
