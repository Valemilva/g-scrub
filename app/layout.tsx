import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import { SITE_URL, BRAND_TAGLINE, faqItems } from "@/lib/constants";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// SITE_URL is set to the real brand domain (g-scrub.com) in lib/constants.
// If the Vercel primary domain ends up as www, update SITE_URL to match.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "G-SCRUB Golf Cleaning System | Golf Shoe Cleaner & Golf Gear Care",
  description:
    "G-SCRUB is a premium golf cleaning system designed to keep your shoes, clubs, and gear course-ready. Shop the G-SCRUB Shoe Cleaner Kit on Amazon and join the launch list for upcoming golf cleaning products.",
  keywords: [
    "golf shoe cleaner",
    "golf club cleaner",
    "golf cleaning kit",
    "golf accessories",
    "golf gifts",
    "golf towel",
    "golf brush cleaner",
    "golf gear cleaner",
    "G-SCRUB",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    siteName: "G-SCRUB",
    title: `G-SCRUB | ${BRAND_TAGLINE}`,
    description:
      "A premium golf cleaning system to keep your shoes, clubs, and gear course-ready. Shop the Shoe Cleaner Kit on Amazon.",
    images: ["/images/gscrub-hero-course.png"],
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `G-SCRUB | ${BRAND_TAGLINE}`,
    description:
      "Premium golf cleaning system. Shop the Shoe Cleaner Kit on Amazon.",
    images: ["/images/gscrub-hero-course.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    other: {
      "google-site-verification": "MCBU-ptz3yVnCr1R2A89xNG180Y8EFzXdSBLQ80LFyk",
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "G-SCRUB",
  slogan: "Clean Gear. Better Game.",
  description: "Premium golf cleaning system for shoes, clubs, and gear.",
  url: SITE_URL,
  logo: `${SITE_URL}images/gscrub-hero-course.png`,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserrat.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col antialiased">{children}</body>
    </html>
  );
}
