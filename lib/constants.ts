// Central place for brand constants and content-driven data.

export const AMAZON_URL = "https://www.amazon.com/dp/B0FJ7NJDZ6";

// Placeholder — replace with the real production domain when available.
export const SITE_URL = "https://www.gscrub.com/";

// Placeholder — replace with the real wholesale / contact inbox.
export const CONTACT_EMAIL = "info@gscrub.com";

export type ProductStatus = "Available Now" | "Coming Soon";

export interface Product {
  name: string;
  status: ProductStatus;
  tagline: string;
  description: string;
  cta: string;
}

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
      "A refillable bottle brush designed to clean clubfaces and grooves during or after the round.",
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
    name: "G-SCRUB Golf Towel",
    status: "Coming Soon",
    tagline: "Wipe Clean. Stay Ready.",
    description:
      "A microfiber golf towel designed to pair with the full G-SCRUB cleaning system.",
    cta: "Join Launch List",
  },
  {
    name: "G-SCRUB Complete Golf Cleaning Bundle",
    status: "Coming Soon",
    tagline: "The full clean gear system.",
    description:
      "A complete golf cleaning bundle combining shoe cleaner, club cleaner, refill, and towel.",
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
