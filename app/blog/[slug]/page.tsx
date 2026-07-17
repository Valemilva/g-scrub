import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EmailCapture from "@/components/EmailCapture";
import AmazonButton from "@/components/AmazonButton";
import { BLOG_POSTS, getPostBySlug, formatPostDate } from "@/lib/blog";
import type { BlogBlock } from "@/lib/blog";
import { SITE_URL } from "@/lib/constants";

const base = SITE_URL.replace(/\/$/, "");

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post | G-SCRUB" };

  const url = `${base}/blog/${post.slug}`;
  return {
    title: `${post.title} | G-SCRUB`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url,
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="m-0 mt-11 mb-3 font-heading text-[clamp(21px,2.8vw,27px)] leading-[1.25] font-extrabold tracking-[-0.01em] text-ink">
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p className="m-0 mt-5 text-[17px] leading-[1.75] text-body">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul className="m-0 mt-5 list-disc space-y-2 pl-6 text-[17px] leading-[1.7] text-body">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <aside className="mt-11 rounded-[16px] border border-[rgba(42,140,42,0.3)] bg-bg-alt p-7">
          <p className="m-0 text-[16.5px] leading-[1.7] text-body">
            {block.text}
          </p>
          <div className="mt-6">
            <AmazonButton>Buy on Amazon →</AmazonButton>
          </div>
        </aside>
      );
  }
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags.join(", "),
    mainEntityOfPage: { "@type": "WebPage", "@id": `${base}/blog/${post.slug}` },
    author: { "@type": "Organization", name: "G-SCRUB", url: base },
    publisher: {
      "@type": "Organization",
      name: "G-SCRUB",
      logo: {
        "@type": "ImageObject",
        url: `${base}/images/gscrub-hero-course.png`,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Header />
      <main className="flex-1 bg-bg">
        <article className="mx-auto max-w-[760px] px-6 pt-[clamp(40px,6vw,72px)] pb-[clamp(48px,7vw,88px)]">
          <p className="mb-6 text-[13px] text-body-2">
            <Link href="/blog" className="hover:text-green-primary">
              Blog
            </Link>
            <span className="mx-1.5 text-[rgba(17,17,17,0.3)]">/</span>
            <span className="text-body">{post.tags[0]}</span>
          </p>

          <h1 className="m-0 font-heading text-[clamp(28px,4.2vw,44px)] leading-[1.08] font-black tracking-[-0.02em] text-ink">
            {post.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[13.5px] text-body-2">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span className="h-1 w-1 rounded-full bg-[rgba(17,17,17,0.3)]" />
            <span>{post.readMins} min read</span>
          </div>

          <p className="mt-6 mb-0 border-l-[3px] border-green-primary pl-4 text-[17.5px] leading-[1.7] font-medium text-body">
            {post.description}
          </p>

          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}

          <div className="mt-12 flex flex-wrap gap-2 border-t border-[rgba(17,17,17,0.09)] pt-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-bg-alt px-[11px] py-[5px] text-[11.5px] font-extrabold tracking-[0.08em] text-body uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-8 text-[15px] text-body-2">
            <Link
              href="/blog"
              className="font-semibold text-green-primary hover:underline"
            >
              ← More from the G-SCRUB blog
            </Link>
          </p>
        </article>
      </main>
      <EmailCapture />
      <Footer />
    </>
  );
}
