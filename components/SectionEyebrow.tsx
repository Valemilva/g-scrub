interface SectionEyebrowProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionEyebrow({ children, className = "" }: SectionEyebrowProps) {
  return (
    <p
      className={`mb-3.5 text-[13px] font-extrabold tracking-[0.18em] text-green-primary uppercase ${className}`}
    >
      {children}
    </p>
  );
}
