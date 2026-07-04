import Reveal from "./Reveal";
import AmazonButton from "./AmazonButton";

export default function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center py-[clamp(88px,12vw,150px)] text-center text-white"
      style={{ backgroundImage: "url(/images/gscrub-payoff-bag.png)" }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(10,15,10,0.9)_0%,rgba(10,15,10,0.72)_45%,rgba(10,15,10,0.45)_100%)]" />

      <Reveal className="relative mx-auto max-w-[720px] px-6">
        <div className="mx-auto mb-7 h-[3px] w-14 rounded-full bg-green-primary" />
        <h2 className="m-0 mb-[18px] font-heading text-[clamp(32px,5vw,58px)] leading-[1.02] font-black tracking-[-0.025em]">
          Ready to clean up your game?
        </h2>
        <p className="m-0 mb-8 text-lg leading-[1.6] text-white/80">
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
