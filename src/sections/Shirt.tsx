import { motion } from "framer-motion";

import { Reveal } from "@/components/Reveal";
import { Crab } from "@/components/svg/Crab";

function VintageTee() {
  return (
    <svg viewBox="0 0 320 300" className="block w-full max-w-sm" role="img" aria-label="Vintage cream t-shirt printed with Carmen Has Crabs, Sea Isle City, N.J., est. 1971">
      <defs>
        <path id="tee-arc-top" d="M96 140 Q160 100 224 140" fill="none" />
        <path id="tee-arc-bottom" d="M96 200 Q160 240 224 200" fill="none" />
      </defs>
      {/* shirt body */}
      <path
        d="M112 22 Q160 44 208 22 L262 46 L242 100 L216 88 L216 262 Q160 276 104 262 L104 88 L78 100 L58 46 Z"
        fill="#f3ecdb"
        stroke="#ddd0b4"
        strokeWidth="3"
      />
      {/* collar */}
      <path d="M112 22 Q160 56 208 22 Q160 40 112 22 Z" fill="#ddd0b4" />
      {/* sleeve seams */}
      <path d="M104 88 L104 96 M216 88 L216 96" stroke="#ddd0b4" strokeWidth="2" />
      {/* the print */}
      <g fill="#b5432f">
        <text fontFamily="'Abril Fatface', Georgia, serif" fontSize="25" letterSpacing="2">
          <textPath href="#tee-arc-top" startOffset="50%" textAnchor="middle">
            CARMEN
          </textPath>
        </text>
        <text fontFamily="'Abril Fatface', Georgia, serif" fontSize="19" letterSpacing="1">
          <textPath href="#tee-arc-bottom" startOffset="50%" textAnchor="middle">
            HAS CRABS
          </textPath>
        </text>
      </g>
      <g transform="translate(125, 145) scale(0.35)">
        <Crab className="h-[140px] w-[200px] text-crab-600" />
      </g>
      <g
        fill="#8b6b4f"
        textAnchor="middle"
        fontFamily="Karla, sans-serif"
        fontWeight="700"
        letterSpacing="1"
      >
        <text x="160" y="244" fontSize="8.5">
          SEA ISLE CITY, N.J.
        </text>
        <text x="160" y="256" fontSize="8.5">
          EST. 1971
        </text>
      </g>
    </svg>
  );
}

export function Shirt() {
  return (
    <section id="shirt" className="planks relative overflow-hidden py-20 sm:py-28">
      <div className="mx-auto grid max-w-5xl items-center gap-12 px-4 sm:px-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, rotate: -10, y: 30 }}
          whileInView={{ opacity: 1, rotate: -3, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 140, damping: 16 }}
          whileHover={{ rotate: 0, scale: 1.03 }}
          className="mx-auto w-full max-w-sm cursor-pointer drop-shadow-2xl"
        >
          <VintageTee />
        </motion.div>

        <div className="text-cream-50">
          <Reveal>
            <p className="font-script text-3xl text-wood-300 sm:text-4xl">A true story, since 1971</p>
            <h2 className="mt-1 font-display text-4xl text-cream-50 text-balance sm:text-5xl">
              Yes, Carmen Has Crabs.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-5 leading-relaxed text-cream-100/90">
              Back in 1971, with the lobster market booming and crabs stacked to the rafters,
              somebody in the family had an idea for a t-shirt. Two words on the front, one
              slightly raised eyebrow, and a legend was born:{" "}
              <em className="font-bold not-italic text-wood-300">“Carmen has crabs.”</em>
            </p>
            <p className="mt-4 leading-relaxed text-cream-100/90">
              Half a century later, the joke still lands and the shirts still walk out the door
              every summer. Wear one off the island and don't be surprised when a stranger grins
              and asks how the blue claws are running.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
