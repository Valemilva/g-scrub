import { AMAZON_URL, CONTACT_EMAIL } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-footer-bg py-[52px] pb-[34px] text-muted-on-dark">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-7 px-6 sm:grid-cols-2 lg:grid-cols-3">
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
          <a href="#products" className="text-[14.5px] text-muted-on-dark-2 no-underline hover:text-white">
            Products
          </a>
          <a
            href={AMAZON_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[14.5px] text-muted-on-dark-2 no-underline hover:text-white"
          >
            Amazon
          </a>
          <a href="#wholesale" className="text-[14.5px] text-muted-on-dark-2 no-underline hover:text-white">
            Wholesale
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-[14.5px] text-muted-on-dark-2 no-underline hover:text-white"
          >
            Contact
          </a>
          <a href="#top" className="text-[14.5px] text-muted-on-dark-2 no-underline hover:text-white">
            Privacy
          </a>
        </div>

        <div className="max-w-[360px]">
          <p className="m-0 text-[13px] leading-[1.6] text-muted-on-dark">
            G-SCRUB products are designed for routine cleaning and gear care.
            Always follow the manufacturer&rsquo;s care instructions for your
            shoes, clubs, and equipment.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-[34px] max-w-[1200px] border-t border-[rgba(255,255,255,0.08)] px-6 pt-5">
        <p className="m-0 text-[13px] text-muted-on-dark">
          © 2026 G-SCRUB. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
