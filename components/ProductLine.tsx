import Reveal from "./Reveal";
import SectionEyebrow from "./SectionEyebrow";
import { products, withAffiliateTag } from "@/lib/constants";

export default function ProductLine() {
  return (
    <section id="lineup" className="bg-bg-alt py-[clamp(60px,8vw,110px)]">
      <div className="mx-auto max-w-[1200px] px-6">
        <Reveal className="mx-auto mb-12 max-w-[640px] text-center">
          <SectionEyebrow>The Full System</SectionEyebrow>
          <h2 className="m-0 mb-3 font-heading text-[clamp(30px,4.5vw,50px)] leading-[1.04] font-extrabold tracking-[-0.015em] text-ink">
            The G-SCRUB Golf Cleaning System
          </h2>
          <p className="m-0 text-[17px] text-body">
            One brand. Complete golf gear care.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => {
            const available = p.status === "Available Now" && !!p.amazonUrl;
            const href = available ? withAffiliateTag(p.amazonUrl!) : "#launch";
            return (
              <Reveal key={p.name}>
                <div className="flex h-full flex-col rounded-[20px] border border-[rgba(17,17,17,0.09)] bg-white p-7 shadow-[0_20px_40px_-32px_rgba(17,17,17,0.45)]">
                  <span
                    className={`mb-4 self-start rounded-full px-[11px] py-[5px] text-[11.5px] font-extrabold tracking-[0.1em] uppercase ${
                      available
                        ? "bg-[rgba(42,140,42,0.12)] text-green-primary"
                        : "bg-[#EDEDED] text-[#111111]"
                    }`}
                  >
                    {p.status}
                  </span>
                  <h3 className="m-0 mb-1.5 font-heading text-[21px] leading-[1.15] font-extrabold text-ink">
                    {p.name}
                  </h3>
                  <p className="m-0 mb-3 font-heading text-sm font-bold text-green-primary">
                    {p.tagline}
                  </p>
                  <p className="m-0 mb-[22px] flex-1 text-[14.5px] leading-[1.6] text-body-2">
                    {p.description}
                  </p>
                  <a
                    href={href}
                    target={available ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className={`self-start rounded-full border px-5 py-[11px] font-heading text-sm font-extrabold no-underline ${
                      available
                        ? "border-green-primary bg-green-primary text-white hover:bg-green-primary-hover"
                        : "border-[rgba(17,17,17,0.25)] bg-transparent text-green-deep hover:border-green-primary hover:text-green-primary"
                    }`}
                  >
                    {p.cta}
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-14 rounded-[20px] border border-dashed border-[rgba(17,17,17,0.18)] bg-white/60 px-7 py-8 text-center">
          <span className="mb-2 inline-block font-heading text-xs font-extrabold tracking-[0.14em] text-[#6B6B6B] uppercase">
            Future Add-ons
          </span>
          <p className="m-0 text-[15px] leading-[1.6] text-body-2">
            The G-SCRUB system keeps growing. More additions to the golf gear
            cleaning lineup are on the way —{" "}
            <a
              href="#launch"
              className="font-bold text-green-primary underline-offset-2 hover:underline"
            >
              join the launch list
            </a>{" "}
            to hear about them first.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
