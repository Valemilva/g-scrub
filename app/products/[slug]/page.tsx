import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductGallery from "@/components/ProductGallery";
import {
  products,
  getProductBySlug,
  withAffiliateTag,
  AMAZON_RATING,
} from "@/lib/constants";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product | G-SCRUB" };
  return {
    title: `${product.name} | G-SCRUB`,
    description: product.longDescription ?? product.description,
    openGraph: {
      title: `${product.name} | G-SCRUB`,
      description: product.longDescription ?? product.description,
      images: product.images?.[0] ? [product.images[0]] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const available = product.status === "Available Now" && !!product.amazonUrl;
  const hasImages = (product.images?.length ?? 0) > 0;

  return (
    <>
      <Header />
      <main className="flex-1 bg-bg">
        <div className="mx-auto max-w-[1100px] px-6 py-[clamp(32px,5vw,64px)]">
          <p className="mb-6 text-[13px] text-body-2">
            <Link href="/#products" className="hover:text-green-primary">
              Products
            </Link>{" "}
            <span className="mx-1.5 text-[rgba(17,17,17,0.3)]">/</span>
            <span className="text-body">{product.name}</span>
          </p>

          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-14">
            {/* Gallery / visual */}
            {hasImages ? (
              <ProductGallery images={product.images!} alt={product.name} />
            ) : (
              <div className="flex aspect-square w-full items-center justify-center rounded-[18px] border border-dashed border-[rgba(17,17,17,0.18)] bg-bg-alt">
                <div className="text-center">
                  <Image
                    src="/images/gscrub-usa-badge.png"
                    alt=""
                    width={80}
                    height={80}
                    className="mx-auto mb-4 h-20 w-20 rounded-full opacity-90"
                  />
                  <p className="m-0 font-heading text-sm font-extrabold tracking-[0.12em] text-body-2 uppercase">
                    Product photos
                    <br />
                    coming soon
                  </p>
                </div>
              </div>
            )}

            {/* Buy box */}
            <div>
              <span
                className={`mb-4 inline-block rounded-full px-[11px] py-[5px] text-[11.5px] font-extrabold tracking-[0.1em] uppercase ${
                  available
                    ? "bg-[rgba(42,140,42,0.12)] text-green-primary"
                    : "bg-bg-alt text-ink"
                }`}
              >
                {product.status}
              </span>

              <h1 className="m-0 font-heading text-[clamp(26px,3.6vw,40px)] leading-[1.08] font-black tracking-[-0.02em] text-ink">
                {product.name}
              </h1>
              <p className="m-0 mt-2 font-heading text-lg font-bold text-green-primary">
                {product.tagline}
              </p>

              {available && (
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  {product.priceUSD && (
                    <span className="font-heading text-[26px] font-black text-ink">
                      ${product.priceUSD}
                    </span>
                  )}
                  <span className="text-green-primary" aria-hidden="true">
                    {"★".repeat(Math.round(AMAZON_RATING.stars))}
                  </span>
                  <span className="text-sm text-body-2">
                    {AMAZON_RATING.stars.toFixed(1)} ({AMAZON_RATING.reviewCount}{" "}
                    {AMAZON_RATING.reviewCount === 1 ? "review" : "reviews"})
                  </span>
                </div>
              )}

              <p className="mt-5 text-base leading-[1.7] text-body">
                {product.longDescription ?? product.description}
              </p>

              {product.whatsIncluded && product.whatsIncluded.length > 0 && (
                <div className="mt-6">
                  <h2 className="m-0 mb-2 font-heading text-sm font-extrabold tracking-[0.08em] text-ink uppercase">
                    What&rsquo;s included
                  </h2>
                  <ul className="m-0 list-disc pl-5 text-[15px] leading-[1.7] text-body">
                    {product.whatsIncluded.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="mt-7">
                {available ? (
                  <a
                    href={withAffiliateTag(product.amazonUrl!)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="anim-shine relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-green-primary px-8 py-[18px] font-heading text-[17px] font-extrabold text-white shadow-[0_16px_30px_-12px_rgba(42,140,42,0.55)] transition-colors hover:bg-green-primary-hover sm:w-auto"
                  >
                    Buy on Amazon →
                  </a>
                ) : (
                  <Link
                    href="/#launch"
                    className="inline-flex w-full items-center justify-center rounded-full bg-green-primary px-8 py-[18px] font-heading text-[17px] font-extrabold text-white transition-colors hover:bg-green-primary-hover sm:w-auto"
                  >
                    Join the Launch List
                  </Link>
                )}
                <p className="mt-3 text-[13px] text-body-2">
                  {available
                    ? "Sold and shipped by Amazon. Clicking Buy takes you to the Amazon listing to complete your order."
                    : "Not available yet — join the launch list and we’ll let you know the moment it goes live on Amazon."}
                </p>
              </div>

              {/* Trust row */}
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[rgba(17,17,17,0.08)] pt-5 text-[13px] font-semibold text-body">
                <span>🇺🇸 Made in USA</span>
                <span className="h-1 w-1 rounded-full bg-[rgba(17,17,17,0.3)]" />
                <span>Golf-specific care</span>
                {available && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-[rgba(17,17,17,0.3)]" />
                    <span>In stock on Amazon</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Features / About */}
          {product.features && product.features.length > 0 && (
            <section className="mt-[clamp(48px,7vw,84px)] border-t border-[rgba(17,17,17,0.09)] pt-12">
              <h2 className="m-0 mb-7 font-heading text-[clamp(22px,3vw,30px)] font-extrabold tracking-[-0.01em] text-ink">
                What makes it work
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {product.features.map((f) => {
                  const [head, ...rest] = f.split(" — ");
                  const body = rest.join(" — ");
                  return (
                    <div
                      key={f}
                      className="rounded-[14px] border border-[rgba(17,17,17,0.08)] bg-white p-5"
                    >
                      {body ? (
                        <>
                          <strong className="mb-1 block font-heading text-[15.5px] text-ink">
                            {head}
                          </strong>
                          <span className="text-[14.5px] leading-[1.6] text-body-2">
                            {body}
                          </span>
                        </>
                      ) : (
                        <span className="text-[14.5px] leading-[1.6] text-body-2">
                          {f}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <p className="mt-8 text-[15px] text-body-2">
                New to the routine?{" "}
                <Link
                  href="/how-to-use"
                  className="font-semibold text-green-primary hover:underline"
                >
                  See how to use G-SCRUB
                </Link>
                .
              </p>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
