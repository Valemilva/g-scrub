import Reveal from "./Reveal";
import SectionEyebrow from "./SectionEyebrow";

const cards = [
  {
    title: "Amazon Available",
    copy: "Shop the current G-SCRUB Shoe Cleaner Kit on Amazon, ranked in Shoe Care Kits and Shoe Brushes.",
  },
  {
    title: "Golf-Focused",
    copy: "Created specifically around golf shoes, clubs, and course conditions.",
  },
  {
    title: "Expandable System",
    copy: "Designed to grow into a full golf cleaning product line.",
  },
  {
    title: "Practical Routine",
    copy: "Simple foam, scrub, wipe, and play approach.",
  },
];

export default function TrustSection() {
  return (
    <section className="bg-bg py-[clamp(60px,8vw,110px)]">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal className="mx-auto mb-[46px] max-w-[600px] text-center">
          <SectionEyebrow>Why G-SCRUB</SectionEyebrow>
          <h2 className="m-0 font-heading text-[clamp(28px,4vw,46px)] leading-[1.05] font-extrabold tracking-[-0.015em] text-ink">
            Built for golfers who care about their gear.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <Reveal key={c.title}>
              <div className="h-full rounded-[18px] border border-[rgba(17,17,17,0.09)] bg-white p-7 shadow-[0_20px_40px_-32px_rgba(17,17,17,0.4)]">
                <h3 className="m-0 mb-2.5 font-heading text-[18px] font-extrabold text-ink">
                  {c.title}
                </h3>
                <p className="m-0 text-[14.5px] leading-[1.6] text-body-2">{c.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
