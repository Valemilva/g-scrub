import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import { CONTACT_EMAIL, LEGAL_EFFECTIVE_DATE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms of Service | G-SCRUB",
  description:
    "The terms for using the G-SCRUB website. Purchases are made on Amazon under Amazon's terms.",
};

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms of Service"
      lastUpdated={LEGAL_EFFECTIVE_DATE}
      intro="By visiting this website, you agree to these terms. This site presents the G-SCRUB brand and links to our products on Amazon; it is not a checkout or store."
    >
      <h2>Using this website</h2>
      <p>
        You agree to use this website only for lawful purposes and not to misuse
        it, interfere with it, or attempt to access it in any unauthorized way.
        You confirm you are of legal age in your place of residence, or have a
        parent or guardian&rsquo;s consent, to use the site.
      </p>

      <h2>Purchases are made on Amazon</h2>
      <p>
        G-SCRUB products are sold through Amazon. When you click a
        &ldquo;Buy on Amazon&rdquo; link, your purchase is completed on Amazon
        and is governed by Amazon&rsquo;s terms, pricing, and policies — not by
        this website. Availability and price shown on Amazon control.
      </p>

      <h2>Product information and pricing</h2>
      <p>
        We work to keep product descriptions, images, and details accurate, but
        we can&rsquo;t guarantee that all content on this website is always
        complete, current, or error-free. Product claims are limited to routine
        cleaning and gear care; G-SCRUB products are not represented to improve
        performance, scores, or equipment beyond cleaning.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The G-SCRUB name, logo, text, images, and design on this website are the
        property of G-SCRUB and may not be copied or used without permission.
      </p>

      <h2>Disclaimer and limitation of liability</h2>
      <p>
        This website is provided &ldquo;as is.&rdquo; To the extent permitted by
        law, G-SCRUB is not liable for any indirect or incidental damages
        arising from your use of the website. Always follow the care
        instructions for your specific shoes, clubs, and equipment, and test any
        cleaning product on a small area first.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. Continued use of the
        website after changes means you accept the updated terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </PageShell>
  );
}
