import Image from "next/image";
import Reveal from "./Reveal";
import AmazonButton from "./AmazonButton";
import { AMAZON_RATING } from "@/lib/constants";

const features = [
  {
    title: "Foaming Cleaner",
    copy: "Helps lift dirt and course debris from golf shoes.",
  },
  {
    title: "Brush Included",
    copy: "Designed to help scrub soles, edges, and textured areas.",
  },
  {
    title: "Microfiber Towel",
    copy: "Wipe away loosened dirt and finish the clean.",
  },
  {
    title: "Golf Bag Friendly",
    copy: "Built for golfers who want a practical cleaning routine.",
  },
];

export default function ProductShowcase() {
  return (
    <section id="products" className="bg-bg-alt py-[clamp(60px,8vw,110px)]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:gap-14">
        <Reveal className="relative">
          <Image
            src="/images/gscrub-course-bench.png"
            alt="G-SCRUB Shoe Cleaner Kit resting on a clubhouse bench next to golf clubs and a clean golf shoe"
            width={1672}
            height={941}
            className="block w-full rounded-[18px] shadow-[0_40px_70px_-30px_rgba(17,17,17,0.5)]"
          />
          <Image
            src="/images/gscrub-usa-badge.png"
            alt="Made in USA"
            width={92}
            height={92}
            className="absolute -bottom-4 -left-4 h-[92px] w-[92px] rounded-full shadow-[0_12px_24px_-10px_rgba(17,17,17,0.45)]"
          />
        </Reveal>

        <Reveal>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(42,140,42,0.3)] bg-white px-[13px] py-1.5">
            <span className="h-[7px] w-[7px] rounded-full bg-green-primary" />
            <span className="text-xs font-extrabold tracking-[0.12em] text-green-primary uppercase">
              Available Now
            </span>
          </div>
          <h2 className="m-0 mb-2 font-heading text-[clamp(28px,4vw,46px)] leading-[1.04] font-extrabold tracking-[-0.015em] text-ink">
            G-SCRUB Shoe Cleaner Kit
          </h2>
          <p className="m-0 mb-[18px] font-heading text-lg font-bold text-green-primary">
            Clean Shoes. Better Game.
          </p>
          <p className="m-0 mb-[26px] text-base leading-[1.65] text-body">
            The original G-SCRUB Shoe Cleaner Kit was created for golfers who
            want to keep their shoes looking fresh from the course to the
            clubhouse. The foaming cleaner helps remove dirt, grass, and
            course debris with a simple foam, scrub, and wipe routine.
          </p>

          <div className="mb-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-[13px] border border-[rgba(17,17,17,0.08)] bg-white px-4 py-3.5"
              >
                <strong className="mb-1 block font-heading text-[15px] text-ink">
                  {f.title}
                </strong>
                <span className="text-[13.5px] text-body-2">{f.copy}</span>
              </div>
            ))}
          </div>

          <div className="mb-4 flex items-center gap-2 text-sm text-body-2">
            <span className="text-green-primary" aria-hidden="true">
              {"★".repeat(Math.round(AMAZON_RATING.stars))}
            </span>
            <span>
              {AMAZON_RATING.stars.toFixed(1)} on Amazon ({AMAZON_RATING.reviewCount}{" "}
              {AMAZON_RATING.reviewCount === 1 ? "review" : "reviews"})
            </span>
          </div>

          <AmazonButton>Buy G-SCRUB on Amazon →</AmazonButton>
        </Reveal>
      </div>
    </section>
  );
}
