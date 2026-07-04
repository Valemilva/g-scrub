// Monoline icon set — single stroke weight, currentColor, consistent 24px
// grid. Replaces emoji throughout the site: emoji render differently on
// every OS and read as informal, which undercuts the premium positioning.

interface IconProps {
  size?: number;
  className?: string;
}

function base(size: number) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
}

export function IconShoe({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3 15.5v-.7c0-1 .6-1.9 1.5-2.3l3-1.3 1.7-2.7c.3-.5.9-.6 1.4-.3l1.9 1.3c1.1.7 2.4 1.1 3.7 1.1h1.3c1.9 0 3.5 1.6 3.5 3.5v1.4H3Z" />
      <path d="M5.5 18.5v1.2M9.5 18.5v1.2M13.5 18.5v1.2M17.5 18.5v1.2" />
    </svg>
  );
}

export function IconClub({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M17.5 3 9 13.2" />
      <path d="M9 13.2c-1.7 2.2-3.7 3.4-5 4-.7.3-.8 1.3-.2 1.8 1.4 1.1 3.6 1 5.2-.2 1.5-1.2 2.5-2.9 2.7-4.9" />
    </svg>
  );
}

export function IconBag({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="7" y="8" width="10" height="12.5" rx="2" />
      <path d="M9.5 8V3.5M12 8V4.5M14.5 8V3" />
      <path d="M7 12.5h10" />
    </svg>
  );
}

export function IconSparkle({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M11 4.5 12.4 9l4.6 1.5-4.6 1.5L11 16.5 9.6 12 5 10.5 9.6 9 11 4.5Z" />
      <path d="M18 15.5v4M16 17.5h4" />
    </svg>
  );
}

export function IconFoam({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 3.5c2.4 3 3.8 5.1 3.8 7a3.8 3.8 0 1 1-7.6 0c0-1.9 1.4-4 3.8-7Z" />
      <circle cx="6" cy="17.5" r="1.6" />
      <circle cx="17.5" cy="17.5" r="1.6" />
      <circle cx="11.8" cy="19.5" r="1.2" />
    </svg>
  );
}

export function IconBrush({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3.5" y="12.5" width="9.5" height="4.5" rx="1.5" />
      <path d="M5.5 17v2.2M8.2 17v2.2M11 17v2.2" />
      <path d="m13 13.2 6.9-7a1.8 1.8 0 0 0-2.6-2.6L10.5 10" />
    </svg>
  );
}

export function IconTowel({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="5.5" y="3.5" width="13" height="17" rx="2" />
      <path d="M9.5 3.5v17" />
    </svg>
  );
}

export function IconFlag({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M7.5 20.5V4" />
      <path d="M7.5 4.5 16.5 7l-9 2.5" />
      <path d="M4 20.5c1-1 2.2-1.5 3.5-1.5s2.5.5 3.5 1.5" />
    </svg>
  );
}

export function IconChevrons({ size = 24, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M9.5 8.5 6 12l3.5 3.5" />
      <path d="M14.5 8.5 18 12l-3.5 3.5" />
    </svg>
  );
}
