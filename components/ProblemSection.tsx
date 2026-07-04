import Reveal from "./Reveal";
import SectionEyebrow from "./SectionEyebrow";
import { IconShoe, IconClub, IconBag, IconSparkle } from "./icons";

const cards = [
  {
    Icon: IconShoe,
    title: "Dirty Shoes",
    copy: "Golf shoes take a beating from grass, mud, sand, and wet course conditions.",
  },
  {
    Icon: IconClub,
    title: "Clubface Debris",
    copy: "Dirt and sand can build up on clubfaces and grooves throughout the round.",
  },
  {
    Icon: IconBag,
    title: "No Simple Routine",
    copy: "Most golfers do not want a bulky cleaning setup in their car or golf bag.",
  },
  {
    Icon: IconSparkle,
    title: "Gear Looks Worn",
    copy: "Even good golf gear can look neglected when it is not cleaned regularly.",
  },
];

export default function ProblemSection() {
  return (
    <section className="bg-bg py-[clamp(60px,8vw,110px)]">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal>
          <SectionEyebrow>The Problem</SectionEyebrow>
          <h2 className="m-0 mb-4 max-w-[720px] font-heading text-[clamp(30px,4.5vw,50px)] leading-[1.04] font-extrabold tracking-[-0.015em] text-ink">
            Golf gear gets dirty fast.
          </h2>
          <p className="m-0 mb-11 max-w-[680px] text-[17px] leading-[1.65] text-body">
            Grass, mud, sand, sweat, and course debris can make your golf
            shoes and clubs look worn after just one round. G-SCRUB was
            created to make golf gear cleaning simple, portable, and part of
            the golfer&rsquo;s routine.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <Reveal key={card.title}>
              <div className="h-full rounded-[18px] border border-[rgba(17,17,17,0.09)] bg-white p-7 shadow-[0_20px_40px_-30px_rgba(17,17,17,0.4)]">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-bg-alt text-green-primary">
                  <card.Icon size={22} />
                </div>
                <h3 className="m-0 mb-2.5 font-heading text-[19px] font-extrabold text-ink">
                  {card.title}
                </h3>
                <p className="m-0 text-[15px] leading-[1.6] text-body-2">{card.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
