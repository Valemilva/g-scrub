import Reveal from "./Reveal";

const features = [
  "Refillable bottle brush",
  "Built-in scrub brush",
  "Designed for clubfaces and grooves",
  "Golf bag friendly",
  "Pairs with the Club Cleaner Refill",
];

export default function ClubCleanerPreview() {
  return (
    <section className="bg-green-deep py-[clamp(60px,8vw,110px)] text-[#EDEDED]">
      <div className="mx-auto max-w-[960px] px-6 text-center">
        <Reveal>
          <div className="mb-[18px] inline-flex items-center gap-2 rounded-full border border-[rgba(42,140,42,0.4)] bg-[rgba(42,140,42,0.16)] px-[13px] py-1.5">
            <span className="text-xs font-extrabold tracking-[0.12em] text-white uppercase">
              Coming Soon
            </span>
          </div>
          <h2 className="m-0 mb-2 font-heading text-[clamp(28px,4vw,44px)] leading-[1.05] font-extrabold tracking-[-0.015em] text-white">
            G-SCRUB Club Brush Cleaner
          </h2>
          <p className="m-0 mb-5 font-heading text-xl font-bold text-green-bright">
            Clean Clubs. Cleaner Contact.
          </p>
          <p className="mx-auto mb-[34px] max-w-[700px] text-[17px] leading-[1.65] text-muted-on-dark">
            The next G-SCRUB product is designed for golfers who want a
            simple way to clean clubfaces and grooves. The refillable bottle
            brush system keeps cleaning solution and scrubbing power together
            in one golf bag friendly tool.
          </p>
        </Reveal>

        <Reveal className="mb-7 flex flex-wrap justify-center gap-2.5">
          {features.map((f) => (
            <span
              key={f}
              className="rounded-full border border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.08)] px-4 py-2.5 text-sm font-semibold text-[#EDEDED]"
            >
              {f}
            </span>
          ))}
        </Reveal>

        <p className="m-0 text-[13px] text-muted-on-dark italic">
          For cleaning only. Does not sharpen, modify, or alter club grooves.
        </p>
      </div>
    </section>
  );
}
