import Link from "next/link";
import {
  AMAZON_URL,
  BUSINESS_INFO,
  CONTACT_EMAIL,
  withAffiliateTag,
} from "@/lib/constants";

const linkClass =
  "text-[14.5px] text-muted-on-dark-2 no-underline hover:text-white";

export default function Footer() {
  return (
    <footer className="bg-footer-bg py-[52px] pb-[34px] text-muted-on-dark">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          {/* Official lockup: standalone green G (no box) + white wordmark
              on the dark footer, single line. */}
          <div className="mb-3 flex items-center gap-2">
            <span className="font-heading text-[28px] leading-none font-black text-green-primary">
              G
            </span>
            <span className="font-heading text-xl font-black whitespace-nowrap text-white">
              G-SCRUB
            </span>
          </div>
          <p className="m-0 font-heading text-[15px] font-bold text-green-primary">
            Clean Gear. Better Game.
          </p>
        </div>

        <div className="flex flex-col gap-2.5">
          <span className="mb-0.5 text-xs font-extrabold tracking-[0.12em] text-muted-on-dark uppercase">
            Explore
          </span>
          <Link href="/golf#products" className={linkClass}>
            Products
          </Link>
          <Link href="/golf#how" className={linkClass}>
            How It Works
          </Link>
          <Link href="/golf#story" className={linkClass}>
            Story
          </Link>
          <Link href="/athletic" className={linkClass}>
            Athletic Care
          </Link>
          <Link href="/blog" className={linkClass}>
            Blog
          </Link>
          <a
            href={withAffiliateTag(AMAZON_URL)}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            Shop on Amazon
          </a>
        </div>

        <div className="flex flex-col gap-2.5">
          <span className="mb-0.5 text-xs font-extrabold tracking-[0.12em] text-muted-on-dark uppercase">
            Support
          </span>
          <Link href="/how-to-use" className={linkClass}>
            How to Use
          </Link>
          <Link href="/shipping-returns" className={linkClass}>
            Shipping &amp; Returns
          </Link>
          <Link href="/contact" className={linkClass}>
            Contact
          </Link>
          <Link href="/golf#wholesale" className={linkClass}>
            Wholesale
          </Link>
        </div>

        <div className="flex flex-col gap-2.5">
          <span className="mb-0.5 text-xs font-extrabold tracking-[0.12em] text-muted-on-dark uppercase">
            Legal
          </span>
          <Link href="/privacy" className={linkClass}>
            Privacy Policy
          </Link>
          <Link href="/terms" className={linkClass}>
            Terms of Service
          </Link>
        </div>
      </div>

      {/* Business identity. Google's Misrepresentation check looks for a
          storefront that says plainly who runs it, where it is, how to reach
          it, and how the purchase actually works — and cross-checks that
          against the Merchant Center profile. Keep this in sync with
          BUSINESS_INFO / CONTACT_EMAIL. */}
      <div className="mx-auto mt-[38px] max-w-[1200px] px-6">
        <div className="grid max-w-[900px] grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2">
          <address className="m-0 text-[13px] leading-[1.7] text-muted-on-dark not-italic">
            <span className="block font-bold text-muted-on-dark-2">
              {BUSINESS_INFO.legalName}
            </span>
            {BUSINESS_INFO.addressLine}
            <br />
            {BUSINESS_INFO.cityStateZip}, {BUSINESS_INFO.country}
            <br />
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-muted-on-dark-2 no-underline hover:text-white"
            >
              {CONTACT_EMAIL}
            </a>
          </address>

          <p className="m-0 text-[13px] leading-[1.7] text-muted-on-dark">
            G-SCRUB is a golf and athletic gear care brand. Our products are
            sold and shipped through Amazon, so orders, tracking, returns, and
            refunds are handled there — see{" "}
            <Link
              href="/shipping-returns"
              className="text-muted-on-dark-2 no-underline hover:text-white"
            >
              Shipping &amp; Returns
            </Link>
            . For anything else, email us and a person will reply.
          </p>
        </div>

        <p className="m-0 mt-6 max-w-[560px] text-[13px] leading-[1.6] text-muted-on-dark">
          G-SCRUB products are designed for routine cleaning and gear care.
          Always follow the manufacturer&rsquo;s care instructions for your
          shoes, clubs, and equipment.
        </p>
      </div>

      <div className="mx-auto mt-[34px] max-w-[1200px] border-t border-[rgba(255,255,255,0.08)] px-6 pt-5">
        <p className="m-0 text-[13px] text-muted-on-dark">
          © 2026 G-SCRUB. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
