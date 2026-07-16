import { motion, useReducedMotion } from "framer-motion";

/**
 * Hand-painted wooden sign hanging from ropes — the standout link to the
 * full menu page. Swings gently like it's hanging on the dock.
 */
export function MenuSign() {
  const reduce = useReducedMotion() ?? false;

  return (
    <div className="flex justify-center overflow-visible pt-2 pb-6" style={{ perspective: 900 }}>
      <motion.a
        href="#/menu"
        aria-label="See the full menu"
        initial={{ opacity: 0, y: -30, rotate: -6 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ type: "spring", stiffness: 90, damping: 9 }}
        whileHover={{ scale: 1.04, rotate: 0 }}
        whileTap={{ scale: 0.98 }}
        className="group relative block cursor-pointer origin-top"
      >
        <motion.div
          animate={reduce ? undefined : { rotate: [-1.6, 1.6, -1.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="origin-top"
        >
          {/* ropes */}
          <div aria-hidden="true" className="flex justify-center gap-32 sm:gap-44">
            <span className="h-10 w-1 rotate-12 rounded-full bg-wood-300 sm:h-12" />
            <span className="h-10 w-1 -rotate-12 rounded-full bg-wood-300 sm:h-12" />
          </div>
          {/* plank */}
          <div className="planks relative -mt-1 rounded-lg border-2 border-wood-800/60 px-8 py-5 text-center shadow-lifted transition-shadow duration-300 group-hover:shadow-[0_10px_50px_rgb(20_50_74/0.35)] sm:px-14 sm:py-6">
            {/* nail heads */}
            <span aria-hidden="true" className="absolute top-2 left-2 size-1.5 rounded-full bg-wood-800/80" />
            <span aria-hidden="true" className="absolute top-2 right-2 size-1.5 rounded-full bg-wood-800/80" />
            <span aria-hidden="true" className="absolute bottom-2 left-2 size-1.5 rounded-full bg-wood-800/80" />
            <span aria-hidden="true" className="absolute right-2 bottom-2 size-1.5 rounded-full bg-wood-800/80" />

            <p className="font-script text-2xl text-cream-100/90 sm:text-3xl">Hungry?</p>
            <p className="font-display text-2xl tracking-wide text-cream-50 drop-shadow-sm sm:text-4xl">
              SEE THE FULL MENU
            </p>
            <p className="mt-1 text-xs font-bold tracking-[0.25em] text-wood-300 uppercase">
              Painted fresh daily &middot; est. 1970
            </p>
          </div>
        </motion.div>
      </motion.a>
    </div>
  );
}
