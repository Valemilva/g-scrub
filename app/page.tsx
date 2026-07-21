import type { Metadata } from "next";
import Link from "next/link";
import BrandGateway from "@/components/BrandGateway";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/constants";

// The front page is the brand gateway: one immersive split hero where the
// visitor chooses between the Golf line and the Athletic Care line. The
// golf-line content itself lives at /golf; Athletic Care at /athletic.
export const metadata: Metadata = {
  title: "G-SCRUB | Golf & Athletic Shoe Cleaning Systems",
  description:
    "G-SCRUB makes premium shoe and gear cleaning systems for two games: the Golf line (Clean Shoes. Better Game.) and the Athletic Care line (Built for Performance). Choose your side.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    siteName: "G-SCRUB",
    title: "G-SCRUB | Golf & Athletic Shoe Cleaning Systems",
    description:
      "Premium shoe and gear cleaning systems for golf and sport. Choose your side: Golf or Athletic Care.",
    images: ["/images/gateway-hero.webp"],
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "G-SCRUB | Golf & Athletic Shoe Cleaning Systems",
    description:
      "Premium shoe and gear cleaning systems for golf and sport. Choose your side.",
    images: ["/images/gateway-hero.webp"],
  },
};

export default function Home() {
  return (
    <>
      <BrandGateway />

      {/*
        Everything below the fold exists for one reason: this is the page
        Google crawls for g-scrub.com, and the gateway on its own is a
        two-link splash screen.

        On 2026-07-18 the home page was the full golf storefront and Merchant
        Center approved the account. On 07-20 we replaced it with the gateway
        (399 characters, 2 links, no footer). On 07-21 Google flagged the
        account for Misrepresentation and blocked every product in the US.

        So the split hero keeps the first screen, and the storefront's
        identity — who we are, where we are, how to reach us, how buying
        actually works, and the policy pages — lives right underneath it.
        Do not remove this without replacing it with something equivalent.
      */}
      <section className="bg-[#06090c] px-6 py-16 text-muted-on-dark">
        <div className="mx-auto max-w-[900px]">
          <h2 className="m-0 font-heading text-[22px] font-black text-white">
            About G-SCRUB
          </h2>
          <p className="mt-4 max-w-[680px] text-[15px] leading-[1.75]">
            G-SCRUB makes cleaning systems for the gear you actually play in.
            The Golf line covers shoes, clubs, and course gear; Athletic Care
            covers court, turf, and training footwear. We formulate for the
            materials on modern athletic shoes — mesh, knit, synthetics, and
            rubber — and keep the routine short enough to do at the cart or in
            the parking lot.
          </p>
          <p className="mt-4 max-w-[680px] text-[15px] leading-[1.75]">
            Our products are sold and shipped through Amazon. That means orders,
            tracking, returns, and refunds are handled by Amazon under their
            policies — we do not take payments on this site. Everything else,
            including wholesale and pro shop enquiries, comes straight to us.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[14.5px]">
            <Link href="/golf" className="text-white no-underline hover:underline">
              Golf line
            </Link>
            <Link href="/athletic" className="text-white no-underline hover:underline">
              Athletic Care
            </Link>
            <Link href="/how-to-use" className="text-white no-underline hover:underline">
              How to use
            </Link>
            <Link href="/blog" className="text-white no-underline hover:underline">
              Blog
            </Link>
            <Link href="/contact" className="text-white no-underline hover:underline">
              Contact
            </Link>
            <Link
              href="/shipping-returns"
              className="text-white no-underline hover:underline"
            >
              Shipping &amp; Returns
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
