import Image from "next/image";
import { FRESH_BRAND, freshProducts } from "@/lib/constants";

// G-SCRUB FRESH — a cross-line care category, rendered on BOTH /golf and
// /athletic from one source. `variant` only swaps the surface colors so it
// sits correctly on the light golf page and the dark athletic page.
//
// Built to grow: when FRESH becomes its own line, this same component and
// data move to a dedicated page without a rewrite.
export default function FreshSection({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const dark = variant === "dark";
  const green = FRESH_BRAND.color;

  return (
    <section
      id="fresh"
      className={`scroll-mt-20 py-[clamp(60px,8vw,110px)] ${
        dark ? "border-t border-white/[0.06] bg-[#0b0b0b]" : "bg-bg-alt"
      }`}
    >
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="mx-auto mb-10 max-w-[640px] text-center">
          <span
            className="inline-block rounded-full px-3.5 py-1.5 text-[11px] font-extrabold tracking-[0.24em] uppercase"
            style={{ color: green, border: `1px solid ${green}59` }}
          >
            {FRESH_BRAND.name}
          </span>
          <h2
            className={`m-0 mt-4 font-heading text-[clamp(28px,4vw,44px)] leading-[1.05] font-extrabold tracking-[-0.015em] ${
              dark ? "text-white" : "text-ink"
            }`}
          >
            {FRESH_BRAND.heading}
          </h2>
          <p
            className={`m-0 mt-4 text-base leading-[1.65] ${
              dark ? "text-white/65" : "text-body"
            }`}
          >
            {FRESH_BRAND.intro}
          </p>
        </div>

        <div className="mx-auto grid max-w-[760px] grid-cols-1 gap-5 sm:grid-cols-[minmax(0,300px)_1fr] sm:items-center">
          {freshProducts.map((product) => (
            <div key={product.slug} className="contents">
              <div
                className={`relative aspect-square overflow-hidden rounded-2xl border ${
                  dark ? "border-white/10 bg-white/[0.03]" : "border-[rgba(17,17,17,0.09)] bg-white"
                }`}
              >
                <Image
                  src={product.image}
                  alt={`${FRESH_BRAND.name} ${product.name}`}
                  fill
                  sizes="(min-width: 640px) 300px, 100vw"
                  className="object-cover"
                />
              </div>

              <div>
                <h3
                  className={`m-0 font-heading text-[22px] font-extrabold ${
                    dark ? "text-white" : "text-ink"
                  }`}
                >
                  {product.name}
                </h3>
                <p
                  className="m-0 mt-1 text-[12.5px] font-extrabold tracking-[0.16em] uppercase"
                  style={{ color: green }}
                >
                  {product.descriptor}
                </p>
                <p
                  className={`m-0 mt-3 text-[15px] leading-[1.65] ${
                    dark ? "text-white/70" : "text-body"
                  }`}
                >
                  {product.blurb}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span
                    className={`text-[13.5px] font-semibold ${
                      dark ? "text-white/55" : "text-body-2"
                    }`}
                  >
                    {product.size}
                  </span>
                  <span
                    className="rounded-full px-3 py-1 text-[11px] font-extrabold tracking-[0.2em] uppercase"
                    style={{ color: green, border: `1px solid ${green}59` }}
                  >
                    {product.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
