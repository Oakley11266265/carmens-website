import { cn } from "@/lib/utils";

/** Hand-painted-style blue claw crab, drawn in currentColor. */
export function Crab({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 140" aria-hidden="true" className={cn("block", className)}>
      <g stroke="currentColor" strokeWidth="5" strokeLinecap="round" fill="none">
        {/* legs — three per side */}
        <path d="M62 92 Q34 108 22 128" />
        <path d="M58 78 Q26 86 10 100" />
        <path d="M60 64 Q30 60 14 68" />
        <path d="M138 92 Q166 108 178 128" />
        <path d="M142 78 Q174 86 190 100" />
        <path d="M140 64 Q170 60 186 68" />
        {/* claw arms */}
        <path d="M68 52 Q46 34 34 30" />
        <path d="M132 52 Q154 34 166 30" />
      </g>
      <g fill="currentColor">
        {/* pincers */}
        <path d="M34 30 Q18 16 30 8 Q44 2 46 18 L38 20 Q40 26 34 30 Z" />
        <path d="M166 30 Q182 16 170 8 Q156 2 154 18 L162 20 Q160 26 166 30 Z" />
        {/* body */}
        <ellipse cx="100" cy="80" rx="44" ry="30" />
        {/* eye stalks */}
        <path d="M86 52 L82 38 L90 38 L92 52 Z" />
        <path d="M114 52 L118 38 L110 38 L108 52 Z" />
        <circle cx="86" cy="36" r="6" />
        <circle cx="114" cy="36" r="6" />
      </g>
      {/* shell detail */}
      <path
        d="M74 76 Q100 62 126 76"
        stroke="var(--color-cream-50)"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}
