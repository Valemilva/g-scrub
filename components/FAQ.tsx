import Reveal from "./Reveal";
import SectionEyebrow from "./SectionEyebrow";
import { faqItems } from "@/lib/constants";

export default function FAQ() {
  return (
    <section className="bg-bg-alt py-[clamp(60px,8vw,110px)]">
      <div className="mx-auto max-w-[820px] px-6">
        <Reveal className="mb-10 text-center">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="m-0 font-heading text-[clamp(28px,4vw,44px)] leading-[1.05] font-extrabold tracking-[-0.015em] text-ink">
            Common questions
          </h2>
        </Reveal>

        <Reveal className="flex flex-col gap-3">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="rounded-2xl border border-[rgba(15,68,41,0.09)] bg-white px-[22px] py-1.5"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4 py-4 font-heading text-[17px] font-extrabold text-ink">
                {item.question}
                <span className="text-[22px] text-green-primary">+</span>
              </summary>
              <p className="m-0 mb-4 text-[15px] leading-[1.65] text-body">
                {item.answer}
              </p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
