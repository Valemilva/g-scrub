// Central place for brand constants and content-driven data.

export const AMAZON_URL = "https://www.amazon.com/dp/B0FJ7NJDZ6";

// Amazon "Your Orders" — where customers track, return, or get help with an
// order. All order/purchase support is handled by Amazon, not by us.
export const AMAZON_ORDERS_URL = "https://www.amazon.com/gp/css/order-history";

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

// Production domain (real brand domain, with hyphen). Being transferred to
// Vercel — if the primary ends up as www, change this to the www form and
// keep it consistent with the Vercel primary-domain setting.
export const SITE_URL = "https://g-scrub.com/";

// For now everything routes to the working Gmail inbox — the @g-scrub.com
// addresses (e.g. sales@g-scrub.com) aren't active yet while the domain is
// mid-transfer. Once domain email is live, point WHOLESALE_EMAIL at
// sales@g-scrub.com.
export const CONTACT_EMAIL = "gscrubstore@gmail.com";
export const WHOLESALE_EMAIL = "gscrubstore@gmail.com";

// Full brand tagline (hero, page title, OG/Twitter). The product-level
// tagline "Clean Shoes. Better Game." (used on the Shoe Cleaner Kit itself)
// is separate and stays as-is.
export const BRAND_TAGLINE = "Clean Shoes. Clean Clubs. Better Game.";

export type ProductStatus = "Available Now" | "Coming Soon";

export interface Product {
  // Stable URL slug for the product page: /products/<slug>
  slug: string;
  name: string;
  status: ProductStatus;
  tagline: string;
  // Short line used on product cards.
  description: string;
  cta: string;
  // Each product gets its own Amazon listing as it launches. To take a
  // product live: set amazonUrl to its listing and flip status to
  // "Available Now" — nothing else on the site needs to change.
  amazonUrl?: string;
  // --- Product-detail-page fields (optional; filled in as products ship) ---
  // Gallery images (first is the primary/card image). Omit for products with
  // no real photos yet — the page shows a branded placeholder instead.
  images?: string[];
  // Display price, e.g. "23.99". Shown on the detail page buy box. Prices are
  // set on Amazon and can change — keep this in sync with the live listing.
  priceUSD?: string;
  // Longer body copy for the detail page.
  longDescription?: string;
  // Feature bullets (from the Amazon listing for live products).
  features?: string[];
  // "What's included" list.
  whatsIncluded?: string[];
}

// The 7 core products of the G-SCRUB system. Only the Shoe Cleaner Kit is
// live on Amazon today — everything else is "Coming Soon" until its listing
// exists. G-SCRUB is a multi-product golf gear care brand (shoe care, club
// care, deodorizers, towels, bundles), not a single-product store.
export const products: Product[] = [
  {
    slug: "shoe-cleaner-kit",
    name: "G-SCRUB Shoe Cleaner Kit",
    status: "Available Now",
    tagline: "Clean Shoes. Better Game.",
    description:
      "Foaming golf shoe cleaner kit designed to help remove dirt, grass, and course debris.",
    cta: "Buy on Amazon",
    amazonUrl: AMAZON_URL,
    priceUSD: "23.99",
    images: [
      "/images/gscrub-kit-packshot.png",
      "/images/gscrub-hero-course.png",
      "/images/gscrub-howto-foam.png",
      "/images/gscrub-howto-scrub.png",
      "/images/gscrub-howto-wipe.png",
      "/images/gscrub-before-after-same-shoe.png",
    ],
    longDescription:
      "The original G-SCRUB Shoe Cleaner Kit — the first product in the growing G-SCRUB system — was created for golfers who want to keep their shoes looking fresh from the course to the clubhouse. The foaming cleaner lifts dirt, grass, and course debris, and the included brush and simple foam-scrub-wipe routine make cleanup quick enough to do right at the cart.",
    features: [
      "Powerful foaming formula — removes dirt, grass stains, and sweat without damaging leather, mesh, or synthetic materials.",
      "Gentle yet effective brush — ergonomic design with soft, durable bristles for tough spots while protecting your shoes.",
      "Safe for all shoe types — alcohol-free, ammonia-free, eco-friendly, and biodegradable.",
      "Quick 3-step process — apply, scrub, and wipe clean in minutes.",
      "Compact & travel-ready — 4 oz bottle fits in any golf bag for pre- or post-round care.",
    ],
    whatsIncluded: [
      "One 4 oz G-SCRUB foaming cleaner bottle",
      "One ergonomic cleaning brush",
    ],
  },
  {
    slug: "club-brush-cleaner",
    name: "G-SCRUB Club Brush Cleaner",
    status: "Coming Soon",
    tagline: "Clean Clubs. Cleaner Contact.",
    description:
      "A refillable bottle brush designed to help clean clubfaces and grooves during or after the round.",
    cta: "Join Launch List",
    longDescription:
      "The next G-SCRUB product is a refillable bottle brush built to help clean clubfaces and grooves during or after the round — cleaning solution and scrubbing power together in one golf-bag-friendly tool. For cleaning only; it does not sharpen, modify, or alter club grooves.",
  },
  {
    slug: "club-cleaner-refill",
    name: "G-SCRUB Club Cleaner Refill",
    status: "Coming Soon",
    tagline: "Refill. Scrub. Play.",
    description:
      "A larger refill bottle designed to keep the club brush cleaner ready for multiple rounds.",
    cta: "Join Launch List",
    longDescription:
      "A larger refill bottle designed to keep the G-SCRUB Club Brush Cleaner topped up across multiple rounds. Buy the brush bottle once, then keep it filled.",
  },
  {
    slug: "shoe-deodorizer-spray",
    name: "G-SCRUB Shoe Deodorizer Spray",
    status: "Coming Soon",
    tagline: "Fresh Gear, Every Round.",
    description:
      "A quick spray designed to help keep golf shoes smelling fresh between cleanings.",
    cta: "Join Launch List",
    longDescription:
      "A quick spray designed to help keep golf shoes smelling fresh between cleanings — a light finish to the G-SCRUB routine so your gear stays course-ready.",
  },
  {
    slug: "shoe-deodorizer-refill",
    name: "G-SCRUB Shoe Deodorizer Refill",
    status: "Coming Soon",
    tagline: "Refill. Spray. Stay Fresh.",
    description:
      "A refill bottle designed to keep the Shoe Deodorizer Spray topped off round after round.",
    cta: "Join Launch List",
    longDescription:
      "A refill bottle designed to keep the G-SCRUB Shoe Deodorizer Spray topped off round after round.",
  },
  {
    slug: "golf-microfiber-towel",
    name: "G-SCRUB Golf Microfiber Towel",
    status: "Coming Soon",
    tagline: "Wipe Clean. Stay Ready.",
    description:
      "A microfiber golf towel designed to pair with the full G-SCRUB cleaning system.",
    cta: "Join Launch List",
    longDescription:
      "A microfiber golf towel designed to pair with the full G-SCRUB cleaning system — wipe away loosened dirt and finish the clean.",
  },
  {
    slug: "complete-golf-cleaning-kit",
    name: "G-SCRUB Complete Golf Cleaning Kit",
    status: "Coming Soon",
    tagline: "The Full Clean Gear System.",
    description:
      "A complete golf cleaning kit combining shoe cleaner, club cleaner, refill, deodorizer, and towel.",
    cta: "Join Launch List",
    longDescription:
      "The complete G-SCRUB bundle brings together shoe cleaner, club cleaner, refill, deodorizer, and towel into one full golf gear cleaning solution — great for golfers, gifts, tournaments, and pro shops.",
  },
];

// Look up a product by slug (used by the product detail route).
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

// Nav anchors use the "/#id" form so they work from subpages (legal pages,
// etc.) — clicking returns to the home page and scrolls to the section.
export const navLinks = [
  { href: "/#products", label: "Products" },
  { href: "/#how", label: "How It Works" },
  { href: "/#story", label: "Story" },
  { href: "/#lineup", label: "Coming Soon" },
  { href: "/#wholesale", label: "Wholesale" },
];

// Effective date shown on the legal pages. Update when the policies change.
export const LEGAL_EFFECTIVE_DATE = "July 5, 2026";

// Real FAQ recovered from the previous G-SCRUB storefront (10 questions),
// lightly adapted for consistency with what's actually live today (the Club
// Brush Cleaner is "Coming Soon" here, not shipped yet, so Q3 reflects that;
// Q6 uses "apply" instead of "spray" to match the foaming-pump-action
// language used everywhere else on the site; Q10 points to the on-site
// Wholesale section rather than hardcoding an email until the real domain
// is confirmed and wired in).
export const faqItems = [
  {
    question: "What is G-SCRUB?",
    answer:
      "G-SCRUB is a premium golf gear care system — shoe care, club care, deodorizers, towels, and bundles — designed by golfers, for golfers. The first product, the Shoe Cleaner Kit, is available now on Amazon, with the rest of the line on the way.",
  },
  {
    question: "Is G-SCRUB safe for all golf shoe materials?",
    answer:
      "Yes. G-SCRUB is safe for leather, synthetic, mesh, and rubber materials commonly used in golf shoes.",
  },
  {
    question: "Can I use the shoe cleaner on golf clubs?",
    answer:
      "We do not recommend using the shoe cleaner on golf clubs. We're developing a dedicated club cleaning product designed to safely and effectively clean club heads and grips — join the launch list to hear when it's ready.",
  },
  {
    question: "Where is G-SCRUB made?",
    answer:
      "Proudly made in the USA, with carefully selected ingredients and strict quality control.",
  },
  {
    question: "What makes G-SCRUB different from regular shoe cleaners?",
    answer:
      "Unlike general-purpose cleaners, G-SCRUB was created with golf conditions in mind — tackling mud, sand, grass, and water stains commonly found on the course.",
  },
  {
    question: "How do I use the product?",
    answer:
      "Apply G-SCRUB directly to the dirty area, scrub gently with the included brush, and wipe clean with a towel. Let your shoes air dry.",
  },
  {
    question: "How long does one bottle last?",
    answer:
      "Each bottle lasts approximately 15-25 full cleanings, depending on how much product you use per session.",
  },
  {
    question: "Is it safe to carry in my golf bag?",
    answer:
      "Yes. The bottle is leak-resistant and compact, making it easy to keep in your bag for quick post-round cleanups.",
  },
  {
    question: "Can I use it on other types of shoes?",
    answer:
      "Yes. While it's optimized for golf shoes, G-SCRUB can also be used on sneakers, athletic shoes, and casual footwear.",
  },
  {
    question: "Do you offer wholesale or bulk orders?",
    answer:
      "We do. Send us your business information through the Wholesale section below to get started.",
  },
];
