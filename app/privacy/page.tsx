import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { CONTACT_EMAIL, LEGAL_EFFECTIVE_DATE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy | G-SCRUB",
  description:
    "How G-SCRUB collects, uses, and protects your information. We only collect what you give us — like your email for launch updates.",
};

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      lastUpdated={LEGAL_EFFECTIVE_DATE}
      intro="At G-SCRUB, we value your privacy. This page explains what information we collect on this website, how we use it, and the choices you have. This website promotes our products and links to Amazon — it does not process purchases directly."
    >
      <h2>Information we collect</h2>
      <p>
        We keep data collection to a minimum. We only collect information you
        choose to give us, plus basic technical data your browser sends
        automatically:
      </p>
      <ul>
        <li>
          <strong>Email address</strong> — if you join our launch list or send
          a wholesale inquiry, we collect the email (and any details you type
          into the wholesale form) so we can reply and send updates.
        </li>
        <li>
          <strong>Basic device information</strong> — like your browser type,
          approximate location, and which pages you view, collected through
          standard web technology to help us understand how the site is used.
        </li>
      </ul>
      <p>
        We <strong>do not</strong> collect payment details, card numbers, or
        shipping addresses on this website. Purchases happen on Amazon, which
        handles that information under its own privacy policy.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To send you product launch and availability updates you asked for.</li>
        <li>To respond to wholesale, pro-shop, and general inquiries.</li>
        <li>To maintain, protect, and improve the website.</li>
      </ul>

      <h2>Sharing your information</h2>
      <p>
        We do not sell your personal information. We may share limited data with
        service providers that help us run the site (for example, our website
        host) and only as needed to operate it. When you click a &ldquo;Buy on
        Amazon&rdquo; link, you leave our site and Amazon&rsquo;s privacy policy
        applies.
      </p>

      <h2>Your choices</h2>
      <p>
        You can unsubscribe from launch updates at any time, or email us to ask
        what information we hold or to request deletion. We&rsquo;ll do our best
        to honor reasonable requests promptly.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy or your information? Email us at{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </PageShell>
  );
}
