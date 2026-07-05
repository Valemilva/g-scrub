import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { AMAZON_ORDERS_URL, LEGAL_EFFECTIVE_DATE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Shipping & Returns | G-SCRUB",
  description:
    "G-SCRUB orders are sold, shipped, and returned through Amazon. Manage your order in your Amazon account.",
};

export default function ShippingReturnsPage() {
  return (
    <PageShell
      eyebrow="Support"
      title="Shipping & Returns"
      lastUpdated={LEGAL_EFFECTIVE_DATE}
      intro="G-SCRUB products are sold and fulfilled by Amazon. Shipping, tracking, returns, and refunds are all handled through Amazon — the fastest place to manage anything about your order is your Amazon account."
    >
      <h2>Shipping</h2>
      <p>
        Orders are placed on Amazon and shipped according to the delivery
        options and timeframe shown on the product listing at checkout. G-SCRUB
        currently sells within the United States. Tracking is available in your
        Amazon account once your order ships.
      </p>

      <h2>Returns &amp; refunds</h2>
      <p>
        Returns and refunds are managed entirely through Amazon. To start one,
        go to <a href={AMAZON_ORDERS_URL} target="_blank" rel="noopener noreferrer">Your
        Orders</a> in your Amazon account and follow Amazon&rsquo;s return
        process. Amazon&rsquo;s return window and conditions apply.
      </p>
      <p>
        For hygiene and safety reasons, opened or used cleaning products may not
        be eligible for return — check the return details on your Amazon order.
      </p>

      <h2>Damaged, wrong, or missing items</h2>
      <p>
        If an item arrives damaged, incorrect, or doesn&rsquo;t show up, please
        contact Amazon directly through{" "}
        <a href={AMAZON_ORDERS_URL} target="_blank" rel="noopener noreferrer">Your
        Orders</a>. Because Amazon fulfills and ships every order, they can
        resolve delivery and order issues fastest.
      </p>

      <h2>Where order support lives</h2>
      <p>
        All order support — tracking, returns, refunds, and delivery problems —
        is handled by Amazon, not by G-SCRUB. Manage everything from{" "}
        <a href={AMAZON_ORDERS_URL} target="_blank" rel="noopener noreferrer">Your
        Orders on Amazon</a>.
      </p>
    </PageShell>
  );
}
