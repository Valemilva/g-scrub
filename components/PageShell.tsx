import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface PageShellProps {
  eyebrow: string;
  title: string;
  intro?: string;
  lastUpdated?: string;
  children: ReactNode;
}

// Shared shell for content/legal subpages (Privacy, Terms, Shipping,
// Contact, How to Use). Header + Footer for navigation, a centered prose
// column for the content. No hero/marketing sections.
export default function PageShell({
  eyebrow,
  title,
  intro,
  lastUpdated,
  children,
}: PageShellProps) {
  return (
    <>
      <Header />
      <main className="flex-1 bg-bg">
        <section className="mx-auto max-w-[760px] px-6 py-[clamp(48px,7vw,92px)]">
          <p className="mb-3 text-xs font-extrabold tracking-[0.16em] text-green-primary uppercase">
            {eyebrow}
          </p>
          <h1 className="m-0 font-heading text-[clamp(30px,4.5vw,46px)] leading-[1.05] font-black tracking-[-0.02em] text-ink">
            {title}
          </h1>
          {lastUpdated && (
            <p className="mt-3 mb-0 text-[13.5px] text-body-2">
              Last updated: {lastUpdated}
            </p>
          )}
          {intro && (
            <p className="mt-6 mb-0 text-[17px] leading-[1.7] text-body">
              {intro}
            </p>
          )}
          <div className="legal-prose mt-9">{children}</div>
        </section>
      </main>
      <Footer />
    </>
  );
}
