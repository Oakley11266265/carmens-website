import { cn } from "@/lib/utils";

export function WaveDivider({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("block h-12 w-full sm:h-20", flip && "rotate-180", className)}
    >
      <path
        d="M0,52 C180,86 360,14 560,42 C760,70 920,20 1120,44 C1260,61 1360,38 1440,52 L1440,90 L0,90 Z"
        fill="currentColor"
      />
    </svg>
  );
}
