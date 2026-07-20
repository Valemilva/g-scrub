import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AthleticHeader from "@/components/AthleticHeader";
import AthleticVideo from "@/components/AthleticVideo";
import AthleticFAQ from "@/components/AthleticFAQ";
import AthleticNotify from "@/components/AthleticNotify";
import Footer from "@/components/Footer";
import { SITE_URL, athleticFaqItems } from "@/lib/constants";

// G-SCRUB Athletic Care — Cyan Technical identity (#18b7e6 on near-black).
// The line is in development: this page presents it and captures launch
// interest. No prices, no availability promises, no performance claims.
export const metadata: Metadata = {
  title: "G-SCRUB Athletic Care | All-Sport Shoe Cleaning — Launching Soon",
  description:
    "G-SCRUB Athletic Care is the all-sport shoe cleaning line: foam cleaner, all-sport brush, odor control, and more. Built for Performance. Join the list to hear when it launches.",
  alternates: {
    canonical: `${SITE_URL}athletic`,
  },
  openGraph: {
    type: "website",
    siteName: "G-SCRUB",
    title: "G-SCRUB Athletic Care | Built for Performance",
    description:
      "The all-sport shoe cleaning line from G-SCRUB. Launching soon — join the list.",
    images: ["/images/gateway-athletic-half.webp"],
    url: `${SITE_URL}athletic`,
  },
};

// Names match the real packaging so the site says exactly what the customer
// will receive at launch. Images are the product concept renders.
const LINEUP = [
  {
    image: "/images/athletic-01-foam-cleaner.webp",
    name: "Athletic Shoe Foam Cleaner",
    blurb: "Foaming cleaner made for sneakers, trainers, and mesh uppers.",
  },
  {
    image: "/images/athletic-02-brush.webp",
    name: "All-Sport Shoe Brush",
    blurb: "Premium bristle brush for soles, sidewalls, and stubborn dirt.",
  },
  {
    image: "/images/athletic-03-athletic-clean.webp",
    name: "Athletic Clean",
    blurb: "Direct-apply cleaner for fast, targeted spot cleaning.",
  },
  {
    image: "/images/athletic-04-odor-care.webp",
    name: "Shoe Odor Care",
    blurb: "Herbal mint spray that neutralizes odor between games.",
  },
  {
    image: "/images/athletic-05-traction-clean.webp",
    name: "Traction Clean",
    blurb: "Outsole spray that lifts dirt and helps restore grip.",
  },
  {
    image: "/images/athletic-06-shield-spray.webp",
    name: "Shield Spray",
    blurb: "Water and stain protection that repels moisture.",
  },
];

// FAQ structured data — generated from athleticFaqItems so the schema always
// matches what's rendered.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: athleticFaqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function AthleticPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <AthleticHeader />

      <main className="flex-1 bg-[#0b0b0b]">
        {/* ===== Hero ===== */}
        <section className="relative flex min-h-[86dvh] items-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/gateway-athletic-half.webp"
              alt=""
              fill
              priority
              placeholder="blur"
              blurDataURL="data:image/webp;base64,UklGRlgBAABXRUJQVlA4IEwBAADwBgCdASocACcAPu1qrVEppaQipWzJMB2JQBdgtySpk4CV9ZS38IXaKSOBp85xOv9gHemxbLklaIfXIWbdGToAAP71fTBNrpfckVFMwKb3m4nO8iC7CspaL+stIHE0/105hD5s637CJh2cW30use9tp+RjhfqYcbg/sjQ98qvzkzFcBUnIOB8NVMVSMhvEAkXq8NspIp3hd3SbNHGvvrGixlkf9xF0u2L9ALNgLY8+8GKBNeQPBuKUUeFiIoy+HVsKDz8OUcRbzFk5LJW4iqjAsFIPaFxHaV3iNSGvojqUlZc20i3V/4rWQdplbpKvPPMBstli4Mjar2atvBxIDkfUQwXtRJ4E6WzEARTeCGU9HB7Ma8g36Tk+ARsFb/dKJ0iXetpQwFoVVJ2rQ1omxWy+v4PhPplkw+JSAO6I606U2K4whJr8W3tEl4AAAA=="
              sizes="100vw"
              className="object-cover object-[70%_center]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06090c]/95 via-[#06090c]/60 to-[#06090c]/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-transparent to-black/30" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-24">
            <div className="max-w-[640px]">
              <p className="gw-rise m-0 flex items-center gap-3 text-[12px] font-extrabold tracking-[0.32em] text-[#4fc7ec] uppercase">
                <span className="h-px w-9 bg-[#18b7e6]" />
                G-SCRUB Athletic Care
              </p>
              <h1
                className="gw-rise m-0 mt-4 font-heading text-[clamp(38px,6vw,68px)] leading-[1.02] font-black tracking-[-0.02em] text-white"
                style={{ animationDelay: "0.15s" }}
              >
                Built for
                <br />
                <span className="text-[#18b7e6]">Performance.</span>
              </h1>
              <p
                className="gw-rise m-0 mt-5 max-w-[480px] text-[clamp(15px,1.4vw,18px)] leading-[1.65] text-white/75"
                style={{ animationDelay: "0.3s" }}
              >
                The all-sport shoe care line from G-SCRUB — engineered for
                sneakers, cleats, and trainers that live on courts, turf, and
                pavement.
              </p>
              <div
                className="gw-rise mt-8 flex flex-wrap items-center gap-4"
                style={{ animationDelay: "0.45s" }}
              >
                <a
                  href="#notify"
                  className="gw-pulse rounded-full bg-[#18b7e6] px-7 py-3.5 font-heading text-[15px] font-extrabold text-[#04121a] no-underline hover:bg-[#3cc6ef]"
                >
                  Get Launch Updates
                </a>
                <span className="rounded-full border border-[rgba(24,183,230,0.5)] px-4 py-2 text-[11.5px] font-extrabold tracking-[0.22em] text-[#4fc7ec] uppercase">
                  Launching Soon
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== Brand film ===== */}
        <AthleticVideo />

        {/* ===== Line-up ===== */}
        <section
          id="lineup"
          className="athletic-grid scroll-mt-20 border-t border-white/[0.06] py-[clamp(60px,8vw,110px)]"
        >
          <div className="mx-auto max-w-[1100px] px-6">
            <p className="m-0 text-center text-[12px] font-extrabold tracking-[0.3em] text-[#4fc7ec] uppercase">
              The Line-Up
            </p>
            <h2 className="m-0 mt-3 text-center font-heading text-[clamp(28px,4vw,44px)] leading-[1.05] font-extrabold tracking-[-0.015em] text-white">
              One system for every sport.
            </h2>
            <p className="mx-auto m-0 mt-4 max-w-[560px] text-center text-base leading-[1.65] text-white/65">
              Six pieces, one job: shoes that look ready to play. Every product
              is in final development now.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {LINEUP.map((item) => (
                <div
                  key={item.name}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(24,183,230,0.55)] hover:bg-white/[0.05]"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={item.image}
                      alt={`G-SCRUB ${item.name}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="m-0 font-heading text-[17px] font-extrabold text-white">
                      {item.name}
                    </h3>
                    <p className="m-0 mt-1.5 text-[14px] leading-[1.6] text-white/60">
                      {item.blurb}
                    </p>
                    <p className="m-0 mt-4 text-[11px] font-extrabold tracking-[0.24em] text-[#4fc7ec] uppercase">
                      Coming Soon
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Cross-link to Golf ===== */}
        <section className="border-t border-white/[0.06] py-[clamp(50px,6vw,80px)]">
          <div className="mx-auto max-w-[1100px] px-6">
            <Link
              href="/golf"
              className="group flex flex-col items-center justify-between gap-5 rounded-2xl border border-white/10 bg-gradient-to-r from-[rgba(42,140,42,0.14)] to-transparent p-8 no-underline transition-all duration-300 hover:border-[rgba(96,200,96,0.5)] sm:flex-row"
            >
              <div>
                <p className="m-0 text-[11.5px] font-extrabold tracking-[0.3em] text-[#7fd47f] uppercase">
                  One brand. Two games.
                </p>
                <p className="m-0 mt-2 font-heading text-[clamp(20px,2.4vw,28px)] font-black text-white">
                  Play golf too? The original G-SCRUB line is live.
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-green-primary px-6 py-3 font-heading text-[14.5px] font-extrabold text-white transition-colors group-hover:bg-green-primary-hover">
                Explore the Golf Line →
              </span>
            </Link>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <AthleticFAQ />

        {/* ===== Launch list ===== */}
        <section
          id="notify"
          className="scroll-mt-20 border-t border-white/[0.06] py-[clamp(60px,8vw,110px)]"
        >
          <div className="mx-auto max-w-[640px] px-6 text-center">
            <p className="m-0 text-[12px] font-extrabold tracking-[0.3em] text-[#4fc7ec] uppercase">
              Launch List
            </p>
            <h2 className="m-0 mt-3 mb-3.5 font-heading text-[clamp(28px,4vw,44px)] leading-[1.05] font-extrabold tracking-[-0.015em] text-white">
              Be first when it drops.
            </h2>
            <p className="m-0 mb-[30px] text-base leading-[1.65] text-white/65">
              Join the Athletic Care launch list — one email when the line goes
              live, plus early access to launch pricing. No spam.
            </p>
            <AthleticNotify />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
