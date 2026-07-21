import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { AMAZON_ORDERS_URL, CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact | G-SCRUB",
  description:
    "Reach G-SCRUB for wholesale, pro-shop, and general brand questions. Order support is handled by Amazon.",
};

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Get in touch"
      title="Contact G-SCRUB"
      intro="Here's the fastest way to get help, depending on what you need."
    >
      <h2>Order help, tracking &amp; returns</h2>
      <p>
        G-SCRUB products are sold and fulfilled by Amazon, so all order support
        &mdash; tracking, returns, refunds, and delivery issues &mdash; is
        handled through Amazon. Manage everything from{" "}
        <a href={AMAZON_ORDERS_URL} target="_blank" rel="noopener noreferrer">Your
        Orders on Amazon</a>. See our{" "}
        <Link href="/shipping-returns">Shipping &amp; Returns</Link> page for
        details.
      </p>

      <h2>Wholesale, pro shops &amp; events</h2>
      <p>
        Interested in carrying G-SCRUB, or using it for a tournament, outing, or
        corporate gift? Head to the{" "}
        <Link href="/golf#wholesale">wholesale inquiry form</Link> on our home page,
        or email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with
        your name, business, and what you&rsquo;re looking for.
      </p>

      <h2>Launch updates</h2>
      <p>
        Want to hear when new products go live?{" "}
        <Link href="/golf#launch">Join the launch list</Link> and we&rsquo;ll keep
        you posted on the upcoming club cleaner, refills, deodorizer, towel, and
        complete bundle.
      </p>
    </PageShell>
  );
}
