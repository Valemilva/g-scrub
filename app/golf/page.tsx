import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CommercialVideo from "@/components/CommercialVideo";
import Marquee from "@/components/Marquee";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorks from "@/components/HowItWorks";
import ProductShowcase from "@/components/ProductShowcase";
import BrandStory from "@/components/BrandStory";
import ProductLine from "@/components/ProductLine";
import ClubCleanerPreview from "@/components/ClubCleanerPreview";
import FreshSection from "@/components/FreshSection";
import BundleSection from "@/components/BundleSection";
import TrustSection from "@/components/TrustSection";
import FAQ from "@/components/FAQ";
import EmailCapture from "@/components/EmailCapture";
import WholesaleSection from "@/components/WholesaleSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import StickyCTABar from "@/components/StickyCTABar";
import { SITE_URL, BRAND_TAGLINE, faqItems } from "@/lib/constants";

// The golf line's home. This page carries the golf-focused SEO that used to
// live at `/` before the front page became the two-line brand gateway.
export const metadata: Metadata = {
  title: "G-SCRUB Golf Cleaning System | Golf Shoe Cleaner & Golf Gear Care",
  description:
    "G-SCRUB is a premium golf cleaning system designed to keep your shoes, clubs, and gear course-ready. Shop the G-SCRUB Shoe Cleaner Kit on Amazon and join the launch list for upcoming golf cleaning products.",
  alternates: {
    canonical: `${SITE_URL}golf`,
  },
  openGraph: {
    type: "website",
    siteName: "G-SCRUB",
    title: `G-SCRUB Golf | ${BRAND_TAGLINE}`,
    description:
      "A premium golf cleaning system to keep your shoes, clubs, and gear course-ready. Shop the Shoe Cleaner Kit on Amazon.",
    images: ["/images/gscrub-hero-course.png"],
    url: `${SITE_URL}golf`,
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "G-SCRUB Shoe Cleaner Kit",
  brand: { "@type": "Brand", name: "G-SCRUB" },
  description:
    "Premium foaming golf shoe cleaner kit with brush and towel that helps remove dirt, grass, and course debris. Clean Shoes. Better Game.",
  category: "Golf gear care",
  image: `${SITE_URL}images/gscrub-hero-course.png`,
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://www.amazon.com/dp/B0FJ7NJDZ6",
  },
};

// Generated from faqItems so the structured data always matches what's
// actually rendered in the FAQ section — no risk of the two drifting apart.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function GolfHome() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <Hero />
        <CommercialVideo />
        <Marquee />
        <ProblemSection />
        <SolutionSection />
        {/* The full 7-product system comes BEFORE the single available kit,
            so the page reads as a brand/system home — not a one-product
            landing. As more products go live on Amazon, they light up here
            first. */}
        <ProductLine />
        <HowItWorks />
        <ProductShowcase />
        <BrandStory />
        <ClubCleanerPreview />
        {/* G-SCRUB FRESH — cross-line odor category, same module as /athletic.
            Sits where the refill section used to: refills are on hold until
            their packaging is defined. */}
        <FreshSection variant="light" />
        <BundleSection />
        <TrustSection />
        <FAQ />
        <EmailCapture />
        <WholesaleSection />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTABar />
    </>
  );
}
