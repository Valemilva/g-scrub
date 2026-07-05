import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";
import SectionEyebrow from "./SectionEyebrow";
import { products } from "@/lib/constants";

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
            const image = p.images?.[0];
            return (
              <Reveal key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-[rgba(17,17,17,0.09)] bg-white no-underline shadow-[0_20px_40px_-32px_rgba(17,17,17,0.45)] transition-shadow hover:shadow-[0_28px_50px_-30px_rgba(17,17,17,0.5)]"
                >
                  {/* Visual */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-bg-alt">
                    {image ? (
                      <Image
                        src={image}
                        alt={p.name}
                        width={600}
                        height={450}
                        className="block h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <span className="font-heading text-xs font-extrabold tracking-[0.14em] text-body-2 uppercase">
                          Photos coming soon
                        </span>
                      </div>
                    )}
                    <span
                      className={`absolute top-3 left-3 rounded-full px-[11px] py-[5px] text-[11px] font-extrabold tracking-[0.09em] uppercase ${
                        available
                          ? "bg-green-primary text-white"
                          : "bg-[rgba(17,17,17,0.75)] text-white"
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="m-0 mb-1 font-heading text-[19px] leading-[1.15] font-extrabold text-ink">
                      {p.name}
                    </h3>
                    <p className="m-0 mb-2.5 font-heading text-[13.5px] font-bold text-green-primary">
                      {p.tagline}
                    </p>
                    <p className="m-0 mb-4 flex-1 text-[14px] leading-[1.6] text-body-2">
                      {p.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-[17px] font-black text-ink">
                        {available && p.priceUSD ? `$${p.priceUSD}` : " "}
                      </span>
                      <span className="font-heading text-sm font-extrabold text-green-primary group-hover:underline">
                        View details →
                      </span>
                    </div>
                  </div>
                </Link>
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
            <Link
              href="/#launch"
              className="font-bold text-green-primary underline-offset-2 hover:underline"
            >
              join the launch list
            </Link>{" "}
            to hear about them first.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
