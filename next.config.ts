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
    ];
  },
};

export default nextConfig;
