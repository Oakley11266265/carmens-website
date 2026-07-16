import { motion, useReducedMotion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Crab } from "@/components/svg/Crab";

const directionsUrl =
  "https://www.google.com/maps/dir/?api=1&destination=Carmen's+Seafood+Restaurant,+343+43rd+Place,+Sea+Isle+City,+NJ+08243";
const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=Carmen's+Seafood+Restaurant,+343+43rd+Place,+Sea+Isle+City,+NJ+08243";

/** Hand-drawn harbor chart standing in for a live map embed. */
export function VisitMap() {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-cream-100 shadow-lifted">
      <div className="relative flex-1">
        <svg
          viewBox="0 0 520 360"
          role="img"
          aria-label="Stylized map of Sea Isle City showing Carmen's at the bay end of 43rd Place, west of Landis Avenue"
          className="block h-full min-h-64 w-full"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* paper */}
          <rect width="520" height="360" fill="var(--color-cream-100)" />
          {/* bay water */}
          <path d="M0 0 L200 0 Q170 90 190 180 Q205 260 175 360 L0 360 Z" fill="var(--color-bay-300)" opacity="0.55" />
          <path d="M0 0 L150 0 Q130 90 145 190 Q155 270 130 360 L0 360 Z" fill="var(--color-bay-500)" opacity="0.45" />
          {/* wave ticks on the water */}
          <g stroke="var(--color-bay-700)" strokeWidth="2" strokeLinecap="round" opacity="0.5" fill="none">
            <path d="M40 70 q8 -6 16 0 q8 6 16 0" />
            <path d="M60 150 q8 -6 16 0 q8 6 16 0" />
            <path d="M35 235 q8 -6 16 0 q8 6 16 0" />
            <path d="M70 310 q8 -6 16 0 q8 6 16 0" />
          </g>
          <text x="52" y="45" fontFamily="Yellowtail, cursive" fontSize="24" fill="var(--color-bay-900)" opacity="0.8">Ludlam Bay</text>

          {/* street grid */}
          <g stroke="var(--color-wood-300)" strokeWidth="6" strokeLinecap="round" opacity="0.8">
            <path d="M205 60 L520 55" />
            <path d="M210 150 L520 148" />
            <path d="M212 240 L520 242" />
            <path d="M208 330 L520 334" />
            <path d="M300 0 L306 360" />
            <path d="M430 0 L436 360" />
          </g>
          <g fontFamily="Karla, sans-serif" fontSize="13" fontWeight="700" fill="var(--color-ink)" opacity="0.65">
            <text x="330" y="45">42nd St</text>
            <text x="330" y="138">43rd Pl</text>
            <text x="330" y="230">44th St</text>
            <text x="330" y="322">45th St</text>
            <text x="316" y="90" transform="rotate(90 316 90)">Landis Ave</text>
            <text x="446" y="80" transform="rotate(90 446 80)">Central Ave</text>
          </g>

          {/* the dock road to Carmen's */}
          <path d="M210 150 L160 152" stroke="var(--color-wood-500)" strokeWidth="8" strokeLinecap="round" />
          {/* dock planks */}
          <g stroke="var(--color-wood-700)" strokeWidth="3" strokeLinecap="round">
            <path d="M150 138 L150 166" />
            <path d="M140 139 L140 165" />
            <path d="M130 141 L130 163" />
          </g>

          {/* compass rose */}
          <g transform="translate(465, 300)" stroke="var(--color-bay-900)" fill="var(--color-bay-900)" opacity="0.75">
            <circle r="20" fill="none" strokeWidth="2" />
            <path d="M0 -16 L4 0 L0 16 L-4 0 Z" />
            <path d="M-16 0 L0 -4 L16 0 L0 4 Z" fill="var(--color-crab-600)" stroke="var(--color-crab-600)" />
            <text y="-26" textAnchor="middle" fontSize="12" fontFamily="Karla, sans-serif" fontWeight="700" stroke="none">N</text>
          </g>
        </svg>

        {/* crab pin at the dock */}
        <motion.div
          className="absolute top-[34%] left-[22%] -translate-x-1/2 -translate-y-full"
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
