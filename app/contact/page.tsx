import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { CONTACT_EMAIL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact | G-SCRUB",
  description:
    "Get in touch with G-SCRUB — general questions, order help, and wholesale or pro-shop inquiries.",
};

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Get in touch"
      title="Contact G-SCRUB"
      intro="Have a question about G-SCRUB, an order, or carrying us in your shop? We're happy to help."
    >
      <h2>General questions &amp; order help</h2>
      <p>
        Email us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. For
        help with an order, include your order number, name, and a short
        description of the issue so we can assist you faster. We do our best to
        reply within 24&ndash;48 business hours.
      </p>

      <h2>Wholesale, pro shops &amp; events</h2>
      <p>
        Interested in carrying G-SCRUB, or using it for a tournament, outing, or
        corporate gift? Head to the{" "}
        <Link href="/#wholesale">wholesale inquiry form</Link> on our home page,
        or email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with
        your name, business, and what you&rsquo;re looking for.
      </p>

      <h2>Launch updates</h2>
      <p>
        Want to hear when new products go live?{" "}
        <Link href="/#launch">Join the launch list</Link> and we&rsquo;ll keep
        you posted on the upcoming club cleaner, refills, deodorizer, towel, and
        complete bundle.
      </p>
    </PageShell>
  );
}
