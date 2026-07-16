import { cn } from "@/lib/utils";

/** Red-and-cream life preserver ring with a rope wrap. */
export function LifeRing({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={cn("block", className)}>
      {/* rope wrap */}
      <circle
        cx="50"
        cy="50"
        r="44"
        fill="none"
        stroke="var(--color-wood-300)"
        strokeWidth="2.5"
        strokeDasharray="5 7"
      />
      {/* ring base */}
      <circle cx="50" cy="50" r="34" fill="none" stroke="var(--color-cream-100)" strokeWidth="16" />
      {/* four red segments */}
      <circle
        cx="50"
        cy="50"
        r="34"
        fill="none"
        stroke="var(--color-crab-600)"
        strokeWidth="16"
        strokeDasharray="26.7 26.7"
        strokeDashoffset="13.35"
      />
      {/* inner + outer edge lines */}
      <circle cx="50" cy="50" r="26" fill="none" stroke="var(--color-bay-950)" strokeWidth="1.5" opacity="0.35" />
      <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-bay-950)" strokeWidth="1.5" opacity="0.35" />
    </svg>
  );
}
