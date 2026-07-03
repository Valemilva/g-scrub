import Reveal from "./Reveal";
import SectionEyebrow from "./SectionEyebrow";

// Refill count is easy to change here if the real number changes later.
const REFILL_COUNT_LABEL = "Up to 4 refills";

export default function RefillSystem() {
  return (
    <section className="bg-bg py-[clamp(60px,8vw,110px)]">
      <div className="mx-auto max-w-[1000px] px-6 text-center">
        <Reveal>
          <SectionEyebrow>Refill System</SectionEyebrow>
          <h2 className="m-0 mb-4 font-heading text-[clamp(30px,4.5vw,50px)] leading-[1.04] font-extrabold tracking-[-0.015em] text-ink">
            Refill. Scrub. Play.
          </h2>
          <p className="mx-auto mb-11 max-w-[680px] text-[17px] leading-[1.65] text-body">
            The G-SCRUB refill system is designed around repeat use. Buy the
            brush bottle once, then keep it filled with the larger G-SCRUB
            Club Cleaner Refill.
          </p>
        </Reveal>

        <Reveal className="mb-9 flex flex-wrap items-center justify-center gap-5">
          <div className="max-w-[230px] min-w-[180px] flex-1 rounded-[18px] border border-[rgba(17,17,17,0.1)] bg-white px-[22px] py-7 shadow-[0_20px_40px_-32px_rgba(17,17,17,0.4)]">
            <div className="mb-2 font-heading text-[15px] font-black text-green-primary">
              BRUSH BOTTLE
            </div>
            <p className="m-0 text-sm text-body-2">
              Your reusable club brush cleaner.
            </p>
          </div>
          <div className="font-heading text-[34px] leading-none font-black text-green-primary">
            →
          </div>
          <div className="max-w-[230px] min-w-[180px] flex-1 rounded-[18px] border border-[rgba(17,17,17,0.1)] bg-white px-[22px] py-7 shadow-[0_20px_40px_-32px_rgba(17,17,17,0.4)]">
            <div className="mb-2 font-heading text-[15px] font-black text-green-primary">
              REFILL BOTTLE
            </div>
            <p className="m-0 text-sm text-body-2">
              Larger bottle to keep it topped up.
            </p>
          </div>
        </Reveal>

        <Reveal className="inline-flex flex-col gap-1.5 rounded-[18px] bg-green-deep px-[34px] py-[22px]">
          <span className="font-heading text-[28px] font-black text-green-bright">
            {REFILL_COUNT_LABEL}
          </span>
          <span className="text-sm font-bold tracking-[0.14em] text-muted-on-dark uppercase">
            Fill. Scrub. Repeat.
          </span>
        </Reveal>

        <p className="mt-7 text-[15px] text-body-2">
          One refill bottle is designed to refill the club brush bottle
          multiple times.
        </p>
      </div>
    </section>
  );
}
