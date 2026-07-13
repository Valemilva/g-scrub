import { products, SITE_URL } from "@/lib/constants";

// Google Merchant Center product feed (Shopping RSS 2.0 + g: namespace).
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
      <g:google_product_category>1933</g:google_product_category>
      <g:identifier_exists>no</g:identifier_exists>
      <g:age_group>adult</g:age_group>
      <g:gender>unisex</g:gender>
      <g:color>White</g:color>
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
