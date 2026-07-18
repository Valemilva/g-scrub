import type { Metadata } from "next";
import BrandGateway from "@/components/BrandGateway";
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
  return <BrandGateway />;
}
