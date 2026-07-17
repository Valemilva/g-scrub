import type { MetadataRoute } from "next";
import { SITE_URL, products } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog";

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

  // The blog index is only worth submitting once it has something on it, and
  // each post joins the sitemap the moment `npm run blog:ingest` picks it up.
  const blogRoutes =
    BLOG_POSTS.length === 0
      ? []
      : [
          {
            url: `${base}/blog`,
            changeFrequency: "weekly" as const,
            priority: 0.7,
          },
          ...BLOG_POSTS.map((p) => ({
            url: `${base}/blog/${p.slug}`,
            lastModified: p.date,
            changeFrequency: "monthly" as const,
            priority: 0.6,
          })),
        ];

  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
