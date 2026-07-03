import type { Metadata, Viewport } from "next";
import { Archivo, Manrope } from "next/font/google";
import { SITE_URL, BRAND_TAGLINE } from "@/lib/constants";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

// NOTE: SITE_URL ("https://www.gscrub.com/") is a placeholder — replace with
// the real production domain once it is registered/deployed.
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
    images: ["/images/gscrub-kit.png"],
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `G-SCRUB | ${BRAND_TAGLINE}`,
    description:
      "Premium golf cleaning system. Shop the Shoe Cleaner Kit on Amazon.",
    images: ["/images/gscrub-kit.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0F4429",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "G-SCRUB",
  slogan: "Clean Gear. Better Game.",
  description: "Premium golf cleaning system for shoes, clubs, and gear.",
  url: SITE_URL,
  logo: `${SITE_URL}images/gscrub-kit.png`,
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "G-SCRUB Shoe Cleaner Kit",
  brand: { "@type": "Brand", name: "G-SCRUB" },
  description:
    "Premium foaming golf shoe cleaner kit with brush and towel that helps remove dirt, grass, and course debris. Clean Shoes. Better Game.",
  category: "Golf gear care",
  image: `${SITE_URL}images/gscrub-kit.png`,
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://www.amazon.com/dp/B0FJ7NJDZ6",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is G-SCRUB safe for golf shoes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "G-SCRUB uses a foaming formula made for routine cleaning. Always test on a small area first and follow your shoe's care instructions.",
      },
    },
    {
      "@type": "Question",
      name: "What is included in the G-SCRUB Shoe Cleaner Kit?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A foaming cleaner, a brush to scrub soles and textured areas, and a microfiber towel to finish the clean.",
      },
    },
    {
      "@type": "Question",
      name: "How do I use G-SCRUB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Foam, scrub, wipe, play. Apply the foam to the dirty area, scrub with the brush, wipe with the towel, and get back to the game.",
      },
    },
    {
      "@type": "Question",
      name: "Where can I buy G-SCRUB?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The G-SCRUB Shoe Cleaner Kit is available now on Amazon. Join the launch list for the upcoming club cleaner, refill, deodorizer, towel, and complete kit.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${manrope.variable}`}>
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
