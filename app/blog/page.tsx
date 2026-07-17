import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmailCapture from "@/components/EmailCapture";
import { BLOG_POSTS, formatPostDate } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";

const TITLE = "Golf Gear Care Blog | G-SCRUB";
const DESCRIPTION =
  "Practical guides on keeping golf shoes, clubs, and gear course-ready — what actually works, from the team behind G-SCRUB.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL.replace(/\/$/, "")}/blog` },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL.replace(/\/$/, "")}/blog`,
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export default function BlogIndexPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-bg">
        <section className="mx-auto max-w-[860px] px-6 pt-[clamp(48px,7vw,92px)] pb-[clamp(40px,6vw,72px)]">
          <p className="mb-3 text-xs font-extrabold tracking-[0.16em] text-green-primary uppercase">
            Golf Gear Care
          </p>
          <h1 className="m-0 font-heading text-[clamp(30px,4.5vw,46px)] leading-[1.05] font-black tracking-[-0.02em] text-ink">
            The G-SCRUB Blog
          </h1>
          <p className="mt-6 mb-0 max-w-[640px] text-[17px] leading-[1.7] text-body">
            {DESCRIPTION}
          </p>

          {BLOG_POSTS.length === 0 ? (
            <p className="mt-12 rounded-[14px] border border-dashed border-[rgba(17,17,17,0.18)] bg-bg-alt px-6 py-10 text-center text-[15px] text-body-2">
              First articles are on the way. Join the launch list below and
              we&rsquo;ll send them as they land.
            </p>
          ) : (
            <ul className="m-0 mt-11 list-none space-y-4 p-0">
              {BLOG_POSTS.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block rounded-[14px] border border-[rgba(17,17,17,0.09)] bg-white p-6 no-underline transition-colors hover:border-[rgba(42,140,42,0.35)]"
                  >
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13px] text-body-2">
                      <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                      <span className="h-1 w-1 rounded-full bg-[rgba(17,17,17,0.3)]" />
                      <span>{post.readMins} min read</span>
                    </div>
                    <h2 className="m-0 mt-2 font-heading text-[clamp(19px,2.4vw,23px)] leading-[1.25] font-extrabold tracking-[-0.01em] text-ink group-hover:text-green-primary">
                      {post.title}
                    </h2>
                    <p className="m-0 mt-2.5 text-[15px] leading-[1.65] text-body-2">
                      {post.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-bg-alt px-[11px] py-[5px] text-[11.5px] font-extrabold tracking-[0.08em] text-body uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
      <EmailCapture />
      <Footer />
    </>
  );
}
