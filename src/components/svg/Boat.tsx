import { cn } from "@/lib/utils";

/** Stylized bayman's trawler silhouette, drawn in currentColor. */
export function Boat({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 120" aria-hidden="true" className={cn("block", className)}>
      <g fill="currentColor">
        {/* hull */}
        <path d="M14 84 L226 84 L204 112 Q120 120 42 112 Z" />
        {/* cabin */}
        <path d="M88 50 L150 50 L150 84 L80 84 Z" />
        <rect x="96" y="58" width="12" height="10" rx="1" fill="var(--color-cream-50)" opacity="0.85" />
        <rect x="116" y="58" width="12" height="10" rx="1" fill="var(--color-cream-50)" opacity="0.85" />
        {/* wheelhouse roof + exhaust */}
        <path d="M84 50 L154 50 L150 42 L88 42 Z" />
        <rect x="138" y="26" width="7" height="18" rx="1" />
        {/* mast and outrigger booms */}
        <rect x="62" y="8" width="4" height="76" />
        <path d="M64 14 L118 46 L116 50 L62 20 Z" />
        <path d="M64 14 L22 60 L25 63 L66 20 Z" />
        {/* rigging lines */}
        <path d="M63 10 L40 84 L42.5 84 L65.5 12 Z" opacity="0.7" />
        <path d="M65 10 L182 84 L179 84 L63.5 13 Z" opacity="0.7" />
        {/* bow light */}
        <circle cx="220" cy="78" r="3" />
      </g>
    </svg>
  );
}
