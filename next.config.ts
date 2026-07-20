import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        // There's no dedicated About page — that content lives on the
        // homepage.
        source: "/about",
        destination: "/",
        permanent: true,
      },
      {
        source: "/pages/about",
        destination: "/",
        permanent: true,
      },
      {
        // Some crawlers/backlinks guess the Shopify-style "/pages/<slug>" path
        // for static pages; our routes live at the root instead.
        source: "/pages/:slug*",
        destination: "/:slug*",
        permanent: true,
      },
      {
        // Retired SKU: the golf deodorizer became the branded G-SCRUB FRESH
        // Shoe Odor Spray, which lives in the cross-line FRESH section.
        source: "/products/shoe-deodorizer-spray",
        destination: "/golf#fresh",
        permanent: true,
      },
      {
        // Refill SKUs are on hold until their packaging is defined.
        source: "/products/shoe-deodorizer-refill",
        destination: "/golf#fresh",
        permanent: true,
      },
      {
        source: "/products/club-cleaner-refill",
        destination: "/golf#products",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
