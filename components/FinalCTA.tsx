import Reveal from "./Reveal";
import AmazonButton from "./AmazonButton";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-green-deep py-[clamp(72px,10vw,130px)] text-center text-white">
      <Reveal className="relative mx-auto max-w-[720px] px-6">
        <div className="mx-auto mb-7 h-[3px] w-14 rounded-full bg-green-primary" />
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
