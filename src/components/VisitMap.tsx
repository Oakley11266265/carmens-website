import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Crab } from "@/components/svg/Crab";

const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=Carmen's+Seafood+Restaurant,+343+43rd+Place,+Sea+Isle+City,+NJ+08243";
const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=Carmen's+Seafood+Restaurant,+343+43rd+Place,+Sea+Isle+City,+NJ+08243";

/**
 * Hand-drawn harbor chart of the 43rd Place bayfront: the finger canal runs
 * between 42nd and 43rd Place out to the bay, with Carmen's on the canal's
 * south bank and the old lobster pool dock beside it.
 */
export function VisitMap() {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-cream-100 shadow-lifted">
      <div className="relative flex-1">
        <svg
          viewBox="0 0 520 360"
          role="img"
          aria-label="Stylized map showing Carmen's on the canal at 343 43rd Place, between 42nd Place and 43rd Place, west of Park Road and John F. Kennedy Boulevard, Sea Isle City"
          className="block h-full min-h-64 w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* paper */}
          <rect width="520" height="360" fill="var(--color-cream-100)" />

          {/* canal between 42nd Pl and 43rd Pl, opening to the bay at left */}
          <path
            d="M0 130 L438 56 Q460 62 448 80 L14 158 Q-4 148 0 130 Z"
            fill="var(--color-bay-300)"
            opacity="0.75"
          />
          <path
            d="M0 148 L440 70 L444 76 L6 156 Z"
            fill="var(--color-bay-500)"
            opacity="0.35"
          />
          {/* second canal peeking in at the bottom, below 44th St */}
          <path d="M0 340 L300 288 Q320 294 310 310 L8 360 L0 360 Z" fill="var(--color-bay-300)" opacity="0.6" />

          {/* wave ticks in the water */}
          <g stroke="var(--color-bay-700)" strokeWidth="2" strokeLinecap="round" opacity="0.5" fill="none">
            <path d="M40 132 q8 -6 16 0 q8 6 16 0" />
            <path d="M180 110 q8 -6 16 0 q8 6 16 0" />
            <path d="M320 84 q8 -6 16 0 q8 6 16 0" />
            <path d="M70 338 q8 -6 16 0 q8 6 16 0" />
          </g>
          <text
            x="30"
            y="120"
            fontFamily="Yellowtail, cursive"
            fontSize="22"
            fill="var(--color-bay-900)"
            opacity="0.8"
            transform="rotate(-10 30 120)"
          >
            to the bay
          </text>

          {/* streets, running diagonally like the island grid */}
          <g stroke="var(--color-wood-300)" strokeWidth="7" strokeLinecap="round" opacity="0.85">
            <path d="M60 18 L520 -40" />
            <path d="M0 100 L470 20" />
            <path d="M0 250 L520 160" />
            <path d="M0 332 L520 242" />
            {/* Park Rd */}
            <path d="M448 0 L470 360" />
            {/* JFK Blvd, heavier */}
            <path d="M400 0 L520 150" strokeWidth="10" />
          </g>

          <g fontFamily="Karla, sans-serif" fontSize="13" fontWeight="700" fill="var(--color-ink)" opacity="0.7">
            <text x="120" y="86" transform="rotate(-10 120 86)">42nd Pl</text>
            <text x="120" y="238" transform="rotate(-10 120 238)">43rd Pl</text>
            <text x="150" y="318" transform="rotate(-10 150 318)">44th St</text>
            <text x="472" y="200" transform="rotate(86 472 200)">Park Rd</text>
            <text x="418" y="34" transform="rotate(50 418 34)">JFK Blvd</text>
          </g>

          {/* Carmen's block on the canal bank, with dock fingers into the water */}
          <rect x="150" y="160" width="46" height="34" rx="3" transform="rotate(-10 173 177)" fill="var(--color-crab-100)" stroke="var(--color-wood-500)" strokeWidth="2" />
          <g stroke="var(--color-wood-700)" strokeWidth="3" strokeLinecap="round">
            <path d="M160 156 L154 134" />
            <path d="M176 153 L170 131" />
            <path d="M192 150 L186 128" />
          </g>
          <text
            x="212"
            y="148"
            fontFamily="Yellowtail, cursive"
            fontSize="17"
            fill="var(--color-teal-600)"
            transform="rotate(-10 212 148)"
          >
            the lobster pool dock
          </text>

          {/* compass rose */}
          <g transform="translate(60, 292)" stroke="var(--color-bay-900)" fill="var(--color-bay-900)" opacity="0.75">
            <circle r="20" fill="none" strokeWidth="2" />
            <path d="M0 -16 L4 0 L0 16 L-4 0 Z" />
            <path d="M-16 0 L0 -4 L16 0 L0 4 Z" fill="var(--color-crab-600)" stroke="var(--color-crab-600)" />
            <text y="-26" textAnchor="middle" fontSize="12" fontFamily="Karla, sans-serif" fontWeight="700" stroke="none">N</text>
          </g>
        </svg>

        {/* crab pin on Carmen's block */}
        <motion.div
          className="absolute top-[46%] left-[33%] -translate-x-1/2 -translate-y-full"
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="rounded-lg bg-crab-600 px-3 py-1.5 shadow-lifted">
            <div className="flex items-center gap-1.5">
              <Crab className="h-[17.5px] w-[25px] text-cream-50" />
              <span className="text-xs font-bold tracking-wide text-cream-50 whitespace-nowrap">Carmen's</span>
            </div>
          </div>
          <div aria-hidden="true" className="mx-auto h-3 w-3 -translate-y-1.5 rotate-45 bg-crab-600" />
        </motion.div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-cream-300/60 bg-cream-50 px-5 py-4">
        <p className="flex items-center gap-2 text-sm font-bold text-bay-900">
          <MapPin className="size-4 text-crab-600" aria-hidden="true" />
          343 43rd Place, Sea Isle City, NJ
        </p>
        <div className="flex gap-2">
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className={buttonVariants({ size: "sm" })}>
            <Navigation aria-hidden="true" />
            Get Directions
          </a>
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "bay", size: "sm" })}
          >
            Open in Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
