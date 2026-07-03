// Central place for brand constants and content-driven data.

export const AMAZON_URL = "https://www.amazon.com/dp/B0FJ7NJDZ6";

// Amazon Associates tracking tag — leave empty until confirmed for G-SCRUB.
// (A tag exists for the CLAUDIO/author-books project, valentinlop0f-20, but
// it is reused from another project and was flagged "AssociateNotEligible"
// as of the last check — confirm eligibility before reusing it here.)
export const AMAZON_ASSOCIATE_TAG = "";

// Appends the Amazon Associates tag to a product URL when one is set, so
// every "Buy on Amazon" link starts earning commission the moment
// AMAZON_ASSOCIATE_TAG is filled in — no other code needs to change.
export function withAffiliateTag(url: string): string {
  if (!AMAZON_ASSOCIATE_TAG) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}tag=${AMAZON_ASSOCIATE_TAG}`;
}

// Real Amazon listing data for the Shoe Cleaner Kit (ASIN B0FJ7NJDZ6),
// confirmed from the live product page. Update these numbers as reviews
// grow — never round up or invent a count. With only 1 review so far, keep
// this modest rather than a loud "X stars!" badge.
export const AMAZON_RATING = {
  stars: 5.0,
  reviewCount: 1,
};

// Placeholder — replace with the real production domain when available.
export const SITE_URL = "https://www.gscrub.com/";

// Placeholder — replace with the real wholesale / contact inbox.
export const CONTACT_EMAIL = "info@gscrub.com";

// Full brand tagline (hero, page title, OG/Twitter). The product-level
// tagline "Clean Shoes. Better Game." (used on the Shoe Cleaner Kit itself)
// is separate and stays as-is.
export const BRAND_TAGLINE =
  "Clean Shoes. Clean Clubs. Fresh Gear. Better Game.";

export type ProductStatus = "Available Now" | "Coming Soon";

export interface Product {
  name: string;
  status: ProductStatus;
  tagline: string;
  description: string;
  cta: string;
}

// The 7 core products of the G-SCRUB system. Only the Shoe Cleaner Kit is
// live on Amazon today (the kit + brush illustration) — everything else is
// "Coming Soon" until real products/links are ready. More may be added
// later; keep new entries "Coming Soon" by default.
export const products: Product[] = [
  {
    name: "G-SCRUB Shoe Cleaner Kit",
    status: "Available Now",
    tagline: "Clean Shoes. Better Game.",
    description:
      "Foaming golf shoe cleaner kit designed to help remove dirt, grass, and course debris.",
    cta: "Buy on Amazon",
  },
  {
    name: "G-SCRUB Club Brush Cleaner",
    status: "Coming Soon",
    tagline: "Clean Clubs. Cleaner Contact.",
    description:
      "A refillable bottle brush designed to help clean clubfaces and grooves during or after the round.",
    cta: "Join Launch List",
  },
  {
    name: "G-SCRUB Club Cleaner Refill",
    status: "Coming Soon",
    tagline: "Refill. Scrub. Play.",
    description:
      "A larger refill bottle designed to keep the club brush cleaner ready for multiple rounds.",
    cta: "Join Launch List",
  },
  {
    name: "G-SCRUB Shoe Deodorizer Spray",
    status: "Coming Soon",
    tagline: "Fresh Gear, Every Round.",
    description:
      "A quick spray designed to help keep golf shoes smelling fresh between cleanings.",
    cta: "Join Launch List",
  },
  {
    name: "G-SCRUB Shoe Deodorizer Refill",
    status: "Coming Soon",
    tagline: "Refill. Spray. Stay Fresh.",
    description:
      "A refill bottle designed to keep the Shoe Deodorizer Spray topped off round after round.",
    cta: "Join Launch List",
  },
  {
    name: "G-SCRUB Golf Microfiber Towel",
    status: "Coming Soon",
    tagline: "Wipe Clean. Stay Ready.",
    description:
      "A microfiber golf towel designed to pair with the full G-SCRUB cleaning system.",
    cta: "Join Launch List",
  },
  {
    name: "G-SCRUB Complete Golf Cleaning Kit",
    status: "Coming Soon",
    tagline: "The Full Clean Gear System.",
    description:
      "A complete golf cleaning kit combining shoe cleaner, club cleaner, refill, deodorizer, and towel.",
    cta: "Join Launch List",
  },
];

export const heroRotatingWords = ["MUD.", "GRASS.", "SAND.", "SWEAT."];

export const navLinks = [
  { href: "#products", label: "Products" },
  { href: "#how", label: "How It Works" },
  { href: "#story", label: "Story" },
  { href: "#lineup", label: "Coming Soon" },
  { href: "#wholesale", label: "Wholesale" },
];

export const faqItems = [
  {
    question: "Is G-SCRUB safe for golf shoes?",
    answer:
      "G-SCRUB uses a foaming formula made for routine cleaning. Always test on a small area first and follow your shoe's care instructions.",
  },
  {
    question: "What is included in the Shoe Cleaner Kit?",
    answer:
      "A foaming cleaner, a brush to scrub soles and textured areas, and a microfiber towel to finish the clean.",
  },
  {
    question: "How do I use G-SCRUB?",
    answer:
      "Foam, scrub, wipe, play. Apply the foam to the dirty area, scrub with the brush, wipe with the towel, and get back to the game.",
  },
  {
    question: "Where can I buy G-SCRUB?",
    answer:
      "The G-SCRUB Shoe Cleaner Kit is available now on Amazon. Join the launch list for the upcoming club cleaner, refill, towel, and complete bundle.",
  },
];
