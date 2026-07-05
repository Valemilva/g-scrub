import type { MetadataRoute } from "next";
import { SITE_URL, products } from "@/lib/constants";

// SITE_URL ends with a trailing slash; join carefully to avoid double slashes.
const base = SITE_URL.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "", // home
    "/how-to-use",
    "/shipping-returns",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: (path === "" ? "weekly" : "monthly") as
      | "weekly"
      | "monthly",
    priority: path === "" ? 1 : 0.6,
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: p.status === "Available Now" ? 0.9 : 0.5,
  }));

  return [...staticRoutes, ...productRoutes];
}
