import type { MetadataRoute } from "next";
import { SITE_URL, products } from "@/lib/constants";
import { BLOG_POSTS } from "@/lib/blog";

// SITE_URL ends with a trailing slash; join carefully to avoid double slashes.
const base = SITE_URL.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "", // brand gateway
    "/golf",
    "/athletic",
    "/how-to-use",
    "/shipping-returns",
    "/contact",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${base}${path}`,
    changeFrequency: (path === "" || path === "/golf" || path === "/athletic"
      ? "weekly"
      : "monthly") as "weekly" | "monthly",
    priority: path === "" ? 1 : path === "/golf" || path === "/athletic" ? 0.9 : 0.6,
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: p.status === "Available Now" ? 0.9 : 0.5,
  }));

  // /blog is a permanent site section, so it's always in the sitemap. Each
  // post joins the moment `npm run blog:ingest` picks it up.
  const blogRoutes = [
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
