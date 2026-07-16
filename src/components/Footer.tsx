import { motion, useReducedMotion } from "framer-motion";
import { Anchor, Facebook } from "lucide-react";

import { LifeRing } from "@/components/svg/LifeRing";
import { WaveDivider } from "@/components/WaveDivider";

export function Footer() {
  const reduce = useReducedMotion() ?? false;

  return (
    <footer className="relative bg-bay-950 text-cream-50">
      <WaveDivider className="-mt-px text-cream-100" flip />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-14 text-center sm:px-6">
        <p className="font-script text-4xl">Carmen's</p>
        <p className="flex items-center gap-2 text-sm tracking-widest text-bay-300 uppercase">
          <Anchor className="size-4" aria-hidden="true" />
          Sea Isle's original waterfront restaurant
          <Anchor className="size-4" aria-hidden="true" />
        </p>

        {/* life-ring thrown to our Facebook page */}
        <motion.a
          href="https://www.facebook.com/carmensrestaurant/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Follow Carmen's on Facebook (opens in a new tab)"
          whileHover={{ scale: 1.08, rotate: 0 }}
          whileTap={{ scale: 0.96 }}
          className="group my-3 flex cursor-pointer flex-col items-center gap-2"
        >
          <motion.span
            animate={reduce ? undefined : { y: [0, -7, 0], rotate: [-4, 4, -4] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative block"
          >
            <LifeRing className="size-24 drop-shadow-lg sm:size-28" />
            <Facebook
              aria-hidden="true"
              className="absolute top-1/2 left-1/2 size-7 -translate-x-1/2 -translate-y-1/2 text-cream-50 transition-transform duration-300 group-hover:scale-110 sm:size-8"
            />
          </motion.span>
          <span className="font-script text-2xl text-bay-300 transition-colors duration-200 group-hover:text-cream-50">
            Toss us a follow on Facebook
          </span>
        </motion.a>

        <p className="text-sm text-cream-100/70">
          343 43rd Place, Sea Isle City, NJ 08243 &middot;{" "}
          <a href="tel:+16092634300" className="underline-offset-2 hover:underline">
            Hostess 609-263-4300
          </a>{" "}
          &middot;{" "}
          <a href="tel:+16092633471" className="underline-offset-2 hover:underline">
            Takeout 609-263-3471
          </a>
        </p>
        <p className="text-xs text-cream-100/50">
          Family-run on the bay since 1943 &middot; carmenhascrabs.com
        </p>
      </div>
    </footer>
  );
}
