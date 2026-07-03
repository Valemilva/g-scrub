import { AMAZON_URL, withAffiliateTag } from "@/lib/constants";

interface AmazonButtonProps {
  children: React.ReactNode;
  className?: string;
  pulse?: boolean;
}

/**
 * Primary "Buy on Amazon" CTA. Always opens AMAZON_URL in a new tab.
 * Includes the diagonal shine sweep animation; optionally the hero pulse ring.
 */
export default function AmazonButton({
  children,
  className = "",
  pulse = false,
}: AmazonButtonProps) {
  return (
    <a
      href={withAffiliateTag(AMAZON_URL)}
      target="_blank"
      rel="noopener noreferrer"
      className={`anim-shine relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-green-primary px-8 py-4 font-heading text-[16.5px] font-extrabold text-white shadow-[0_16px_30px_-12px_rgba(42,140,42,0.7)] transition-colors hover:bg-green-primary-hover ${
        pulse ? "anim-pulse" : ""
      } ${className}`}
    >
      {children}
    </a>
  );
}
