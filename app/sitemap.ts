import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

// SITE_URL ends with a trailing slash; join carefully to avoid double slashes.
const base = SITE_URL.replace(/\/$/, "");

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "", // home
    "/how-to-use",
    "/shipping-returns",
    "/contact",
    "/privacy",
    "/terms",
  ];

  return routes.map((path) => ({
    url: `${base}${path}`,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.6,
  }));
}
