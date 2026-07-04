import Image from "next/image";
import Reveal from "./Reveal";

const benefits = [
  "Great for golfers",
  "Great for golf gifts",
  "Great for tournaments",
  "Great for pro shops",
  "Great for keeping gear clean",
];

export default function BundleSection() {
  return (
    <section className="bg-bg-alt py-[clamp(30px,5vw,70px)] pb-[clamp(60px,8vw,110px)]">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <div className="relative grid grid-cols-1 overflow-hidden rounded-[28px] bg-green-deep text-[#EDEDED] shadow-[0_40px_80px_-40px_rgba(17,17,17,0.7)] md:grid-cols-2">
            <div className="relative min-h-[240px]">
              <Image
                src="/images/gscrub-flatlay-wood.png"
                alt="Golf cleaning gear flat lay: towel, brush, spray bottle, glove, and golf ball on a wood surface"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>

            <div className="relative flex flex-col justify-center p-[clamp(32px,5vw,56px)] text-center md:text-left">
              <span className="mb-4 inline-block text-xs font-extrabold tracking-[0.14em] text-white uppercase">
                Coming Soon
              </span>
              <h2 className="m-0 mb-[18px] font-heading text-[clamp(26px,3.6vw,40px)] leading-[1.08] font-extrabold tracking-[-0.015em] text-white">
                The Complete G-SCRUB Golf Cleaning Kit
              </h2>
              <p className="m-0 mb-[26px] text-[16px] leading-[1.65] text-muted-on-dark-2">
                The future G-SCRUB bundle brings together shoe cleaner, club
                cleaner, refill, and towel into one complete golf cleaning
                solution for golfers, gifts, tournaments, and pro shops.
              </p>

              <div className="mb-[30px] flex flex-wrap justify-center gap-2.5 md:justify-start">
                {benefits.map((b) => (
                  <span
                    key={b}
                    className="rounded-full bg-[rgba(255,255,255,0.1)] px-[15px] py-2 text-[13.5px] font-semibold text-white"
                  >
                    {b}
                  </span>
                ))}
              </div>

              <a
                href="#launch"
                className="inline-block self-center rounded-full bg-green-primary px-[30px] py-[15px] font-heading text-base font-extrabold text-white no-underline hover:bg-green-primary-hover md:self-start"
              >
                Join the Bundle Launch List
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
