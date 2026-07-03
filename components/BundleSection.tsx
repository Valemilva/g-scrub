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
          <div className="relative overflow-hidden rounded-[28px] bg-green-deep p-[clamp(38px,6vw,68px)] text-center text-[#EDEDED] shadow-[0_40px_80px_-40px_rgba(17,17,17,0.7)]">
            <div className="pointer-events-none absolute -top-[60px] -right-10 h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(42,140,42,0.28),transparent_70%)]" />

            <span className="relative mb-4 inline-block text-xs font-extrabold tracking-[0.14em] text-white uppercase">
              Coming Soon
            </span>
            <h2 className="relative mx-auto mb-[18px] max-w-[760px] font-heading text-[clamp(28px,4.2vw,48px)] leading-[1.05] font-extrabold tracking-[-0.015em] text-white">
              The Complete G-SCRUB Golf Cleaning Kit
            </h2>
            <p className="relative mx-auto mb-[30px] max-w-[660px] text-[17px] leading-[1.65] text-muted-on-dark-2">
              The future G-SCRUB bundle brings together shoe cleaner, club
              cleaner, refill, and towel into one complete golf cleaning
              solution for golfers, gifts, tournaments, and pro shops.
            </p>

            <div className="relative mb-[34px] flex flex-wrap justify-center gap-2.5">
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
              className="relative inline-block rounded-full bg-green-primary px-[30px] py-[15px] font-heading text-base font-extrabold text-white no-underline hover:bg-green-primary-hover"
            >
              Join the Bundle Launch List
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
