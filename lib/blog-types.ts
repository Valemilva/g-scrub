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
};
