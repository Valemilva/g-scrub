import Image from "next/image";
import Reveal from "./Reveal";
import SectionEyebrow from "./SectionEyebrow";
import { IconFoam, IconBrush, IconTowel, IconFlag } from "./icons";

const steps = [
  {
    Icon: IconFoam,
    step: "STEP 01",
    title: "Foam",
    copy: "Apply the foaming cleaner to the dirty area of the golf shoe.",
    dark: false,
  },
  {
    Icon: IconBrush,
    step: "STEP 02",
    title: "Scrub",
    copy: "Use the brush to loosen dirt, grass, and course debris.",
    dark: false,
  },
  {
    Icon: IconTowel,
    step: "STEP 03",
    title: "Wipe",
    copy: "Finish with the microfiber towel for a clean look.",
    dark: false,
  },
  {
    Icon: IconFlag,
    step: "STEP 04",
    title: "Play",
    copy: "Keep your gear ready for the next round.",
    dark: true,
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="bg-bg py-[clamp(60px,8vw,110px)]">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal className="mx-auto mb-10 max-w-[620px] text-center">
          <SectionEyebrow>How It Works</SectionEyebrow>
          <h2 className="m-0 font-heading text-[clamp(30px,4.5vw,50px)] leading-[1.04] font-extrabold tracking-[-0.015em] text-ink">
            Foam. Scrub. Wipe. Play.
          </h2>
        </Reveal>

        <Reveal className="mx-auto mb-12 max-w-[880px]">
          <Image
            src="/images/gscrub-action-scrub.png"
            alt="Scrubbing a golf shoe with the G-SCRUB brush on the golf course, foam visible on the sole"
            width={1448}
            height={1086}
            className="block w-full rounded-[18px] shadow-[0_30px_60px_-30px_rgba(17,17,17,0.4)]"
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <Reveal key={s.title}>
              <div
                className={`h-full rounded-[18px] border p-[30px] ${
                  s.dark
                    ? "border-green-deep bg-green-deep shadow-[0_20px_40px_-26px_rgba(17,17,17,0.6)]"
                    : "border-[rgba(17,17,17,0.09)] bg-white shadow-[0_20px_40px_-30px_rgba(17,17,17,0.4)]"
                }`}
              >
                <div
                  className={`mb-[18px] flex h-12 w-12 items-center justify-center rounded-[14px] ${
                    s.dark ? "bg-[rgba(42,140,42,0.2)] text-green-primary" : "bg-bg-alt text-green-primary"
                  }`}
                >
                  <s.Icon size={24} />
                </div>
                <div className="mb-1 font-heading text-[13px] font-black tracking-[0.1em] text-green-primary">
                  {s.step}
                </div>
                <h3
                  className={`m-0 mb-2 font-heading text-xl font-extrabold ${
                    s.dark ? "text-white" : "text-ink"
                  }`}
                >
                  {s.title}
                </h3>
                <p
                  className={`m-0 text-[15px] leading-[1.6] ${
                    s.dark ? "text-muted-on-dark" : "text-body-2"
                  }`}
                >
                  {s.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-[26px] text-center text-[13.5px] text-[#6B6B6B]">
            Always test on a small area first and follow care instructions
            for your specific shoe material.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
