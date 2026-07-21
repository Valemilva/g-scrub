import { products, SITE_URL } from "@/lib/constants";

// Google Merchant Center product feed (Shopping RSS 2.0 + g: namespace).
//
// Category is 8033 = Home & Garden > Household Supplies > Shoe Care & Tools >
// Shoe Care Kits — an exact match for what we sell. It used to be 1933
// (Apparel & Accessories > Shoe Accessories), which put the feed under
// Google's APPAREL rules: those require color, size, age_group and gender for
// US traffic. The feed carried three of the four and never had `size`, which
// is a hard disapproval. With a non-apparel category none of them apply, so
// the placeholder color/age_group/gender attributes are gone too.
//
// Real GTINs must be sent when they exist — declaring identifier_exists=no on
// a product that has a UPC suppresses it in Shopping.
// The `link` for every item must point back to our own domain (Merchant
// Center policy) — the actual purchase happens via the "Buy on Amazon"
// button on that page, it is never an automatic redirect. Only products
// that are live ("Available Now" with a real price and photos) are
// included, so a new product appears here the same moment it goes live
// on the site — no separate feed edit needed.

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const base = SITE_URL.replace(/\/$/, "");

  const items = products
    .filter((p) => p.status === "Available Now" && p.priceUSD && p.images?.length)
    .map((p) => {
      const link = `${base}/products/${p.slug}`;
      const [primaryImage, ...rest] = p.images!;
      const additionalImages = rest
        .slice(0, 10)
        .map((img) => `      <g:additional_image_link>${base}${img}</g:additional_image_link>`)
        .join("\n");

      return `    <item>
      <g:id>${p.slug}</g:id>
      <title>${escapeXml(p.name)}</title>
      <description>${escapeXml(p.longDescription ?? p.description)}</description>
      <link>${link}</link>
      <g:image_link>${base}${primaryImage}</g:image_link>
${additionalImages}
      <g:condition>new</g:condition>
      <g:availability>in stock</g:availability>
      <g:price>${p.priceUSD} USD</g:price>
      <g:brand>G-SCRUB</g:brand>
      <g:google_product_category>8033</g:google_product_category>${
        p.gtin
          ? `\n      <g:gtin>${p.gtin}</g:gtin>`
          : `\n      <g:identifier_exists>no</g:identifier_exists>`
      }
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>G-SCRUB Product Catalog</title>
    <link>${base}</link>
    <description>G-SCRUB premium golf gear care system</description>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
