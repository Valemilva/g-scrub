// Blog data access. Posts are not hand-written here: they come from
// content/blog-drafts/*.json and are compiled into generated-posts.ts by
// `npm run blog:ingest`, which also enforces the brand's claim rules.
// See content/blog-drafts/README.md for the draft schema.

import { GENERATED_POSTS } from "./generated-posts";
import type { BlogPost } from "./blog-types";

export type { BlogPost, BlogBlock } from "./blog-types";

/** Every published post, newest first. */
export const BLOG_POSTS: BlogPost[] = [...GENERATED_POSTS].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

/** Formats an ISO date as "July 17, 2026" without pulling in a date library. */
export function formatPostDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
