import { AMAZON_URL, withAffiliateTag } from "@/lib/constants";

interface AmazonButtonProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Primary "Buy on Amazon" CTA. Always opens AMAZON_URL in a new tab.
 * The diagonal shine sweep runs on hover only (see .anim-shine in
 * globals.css) — restrained by design.
 */
export default function AmazonButton({
  children,
  className = "",
}: AmazonButtonProps) {
  return (
    <a
      href={withAffiliateTag(AMAZON_URL)}
      target="_blank"
      rel="noopener noreferrer"
      className={`anim-shine relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-green-primary px-8 py-4 font-heading text-[16.5px] font-extrabold text-white shadow-[0_16px_30px_-12px_rgba(42,140,42,0.55)] transition-colors hover:bg-green-primary-hover ${className}`}
    >
      {children}
    </a>
  );
}
