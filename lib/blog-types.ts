// Blog content types. Kept in their own module so generated-posts.ts can import
// BlogPost without pulling in the rest of the blog module.

export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  /** ISO yyyy-mm-dd */
  date: string;
  readMins: number;
  tags: string[];
  body: BlogBlock[];
  /** Optional hero image, path under /public (e.g. "/images/gscrub-blog-grass-stains-hero.webp").
   * Also used as the article's og:image / twitter:image when present. Older posts without one
   * still render fine — the header/description just render without an image block. */
  image?: string;
};
