import Reveal from "./Reveal";
import AmazonButton from "./AmazonButton";

const GRASS_SVG_LIGHT =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='30' viewBox='0 0 120 30'%3E%3Cpath d='M0 30 L8 6 L16 30 L26 10 L34 30 L44 2 L54 30 L64 8 L74 30 L84 12 L94 30 L104 4 L112 30 L120 10 L120 30 Z' fill='%232A8C2A'/%3E%3C/svg%3E";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-green-deep py-[clamp(72px,10vw,130px)] text-center text-white">
      <div
        className="absolute right-0 bottom-0 left-0 h-[30px] bg-repeat-x opacity-50"
        style={{
          backgroundSize: "120px 30px",
          backgroundImage: `url("${GRASS_SVG_LIGHT}")`,
        }}
      />
      <Reveal className="relative mx-auto max-w-[720px] px-6">
        <div className="anim-float mb-2 text-4xl">⛳</div>
        <h2 className="m-0 mb-[18px] font-heading text-[clamp(32px,5vw,58px)] leading-[1.02] font-black tracking-[-0.025em]">
          Ready to clean up your game?
        </h2>
        <p className="m-0 mb-8 text-lg leading-[1.6] text-muted-on-dark-2">
          Start with the original G-SCRUB Shoe Cleaner Kit, available now on
          Amazon.
        </p>
        <AmazonButton className="!bg-white !text-black !shadow-[0_20px_40px_-16px_rgba(0,0,0,0.5)] hover:!bg-[#EDEDED]">
          Buy on Amazon →
        </AmazonButton>
      </Reveal>
    </section>
  );
}
