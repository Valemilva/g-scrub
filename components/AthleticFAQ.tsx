import { athleticFaqItems } from "@/lib/constants";

// Dark, cyan-accented FAQ for the Athletic Care page — the athletic mirror of
// the golf FAQ component.
export default function AthleticFAQ() {
  return (
    <section
      id="faq"
      className="scroll-mt-20 border-t border-white/[0.06] bg-[#0b0b0b] py-[clamp(60px,8vw,110px)]"
    >
      <div className="mx-auto max-w-[820px] px-6">
        <div className="mb-10 text-center">
          <p className="m-0 text-[12px] font-extrabold tracking-[0.3em] text-[#4fc7ec] uppercase">
            FAQ
          </p>
          <h2 className="m-0 mt-3 font-heading text-[clamp(28px,4vw,44px)] leading-[1.05] font-extrabold tracking-[-0.015em] text-white">
            Common questions
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {athleticFaqItems.map((item) => (
            <details
              key={item.question}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-[22px] py-1.5"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 font-heading text-[17px] font-extrabold text-white">
                {item.question}
                <span className="text-[22px] text-[#18b7e6]">+</span>
              </summary>
              <p className="m-0 mb-4 text-[15px] leading-[1.65] text-white/70">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
