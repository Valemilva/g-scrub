import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Montserrat } from "next/font/google";
import { SITE_URL, BRAND_TAGLINE, GA_MEASUREMENT_ID } from "@/lib/constants";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

// SITE_URL is set to the real brand domain (g-scrub.com) in lib/constants.
// If the Vercel primary domain ends up as www, update SITE_URL to match.
// Global defaults — pages override with their own line-specific metadata
// (gateway at /, golf at /golf, athletic at /athletic).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "G-SCRUB | Golf & Athletic Shoe Cleaning Systems",
  description:
    "G-SCRUB makes premium shoe and gear cleaning systems for two games: the Golf line and the Athletic Care line. Shop the Shoe Cleaner Kit on Amazon.",
  keywords: [
    "golf shoe cleaner",
    "golf club cleaner",
    "golf cleaning kit",
    "athletic shoe cleaner",
    "sneaker cleaner",
    "shoe cleaning kit",
    "golf accessories",
    "golf gear cleaner",
    "G-SCRUB",
  ],
  openGraph: {
    type: "website",
    siteName: "G-SCRUB",
    title: `G-SCRUB | ${BRAND_TAGLINE}`,
    description:
      "Premium shoe and gear cleaning systems for golf and sport. Shop the Shoe Cleaner Kit on Amazon.",
    images: ["/images/gateway-hero.webp"],
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `G-SCRUB | ${BRAND_TAGLINE}`,
    description:
      "Premium shoe and gear cleaning systems for golf and sport. Shop the Shoe Cleaner Kit on Amazon.",
    images: ["/images/gateway-hero.webp"],
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

// Product and FAQ structured data moved to app/golf/page.tsx with the golf
// content; only the brand-wide Organization schema stays global.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "G-SCRUB",
  slogan: "Clean Gear. Better Game.",
  description:
    "Premium shoe and gear cleaning systems for golf and sport — the Golf line and the Athletic Care line.",
  url: SITE_URL,
  logo: `${SITE_URL}images/gscrub-logo-new.webp`,
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
      </head>
      <body className="flex min-h-full flex-col antialiased">
        {children}

        {/* Google Analytics 4. Enhanced measurement handles SPA route
            changes (History API) and outbound "Buy on Amazon" clicks. */}
        {GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
