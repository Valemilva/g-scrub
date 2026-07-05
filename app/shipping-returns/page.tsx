import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { CONTACT_EMAIL, LEGAL_EFFECTIVE_DATE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Shipping & Returns | G-SCRUB",
  description:
    "How G-SCRUB orders ship and how returns work. Orders are placed and fulfilled through Amazon.",
};

export default function ShippingReturnsPage() {
  return (
    <PageShell
      eyebrow="Support"
      title="Shipping & Returns"
      lastUpdated={LEGAL_EFFECTIVE_DATE}
      intro="G-SCRUB products are sold and fulfilled through Amazon, so shipping and returns follow Amazon's process for your order. Here's what to expect."
    >
      <h2>Shipping</h2>
      <p>
        Orders are placed on Amazon and shipped according to the delivery
        options and timeframe shown on the product listing at checkout. G-SCRUB
        currently sells within the United States. You&rsquo;ll receive tracking
        through your Amazon account once your order ships.
      </p>

      <h2>Returns &amp; refunds</h2>
      <p>
        Because orders are completed on Amazon, returns and refunds are handled
        through Amazon&rsquo;s returns process — the fastest way to start one is
        from <strong>Your Orders</strong> in your Amazon account. Amazon&rsquo;s
        return window and conditions apply.
      </p>
      <p>
        For hygiene and safety reasons, opened or used cleaning products may not
        be eligible for return. Please review the return details on your order
        before requesting one.
      </p>

      <h2>Damaged or incorrect items</h2>
      <p>
        Inspect your order when it arrives. If an item shows up damaged or
        you received the wrong product, start a claim through Amazon right away —
        or reach out to us and we&rsquo;ll help make it right.
      </p>

      <h2>Need help with an order?</h2>
      <p>
        Email us at <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> with
        your order number and a short description, and we&rsquo;ll point you in
        the right direction.
      </p>
    </PageShell>
  );
}
