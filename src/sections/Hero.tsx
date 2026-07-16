import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ChevronDown, Phone, UtensilsCrossed } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Boat } from "@/components/svg/Boat";
import { cn } from "@/lib/utils";

function WaveBand({
  y,
  drift,
  className,
  duration,
  reduce,
}: {
  y: MotionValue<number> | number;
  drift: number;
  className: string;
  duration: number;
  reduce: boolean;
}) {
  return (
    <motion.div style={{ y }} className={cn("absolute inset-x-0", className)}>
      <motion.svg
        viewBox="0 0 2880 120"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="block h-full w-[200%]"
        animate={reduce ? undefined : { x: [0, -drift] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        <path
          d="M0,60 C120,30 240,90 360,60 C480,30 600,90 720,60 C840,30 960,90 1080,60 C1200,30 1320,90 1440,60 C1560,30 1680,90 1800,60 C1920,30 2040,90 2160,60 C2280,30 2400,90 2520,60 C2640,30 2760,90 2880,60 L2880,120 L0,120 Z"
          fill="currentColor"
        />
      </motion.svg>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const skyY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const sunY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 220]);
  const farWaterY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const boatX = useTransform(scrollYProgress, [0, 0.9], ["-18%", reduce ? "-18%" : "78%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.6], [0, reduce ? 0 : -60]);

  return (
    <section ref={ref} id="top" className="relative h-svh min-h-[560px] overflow-hidden">
      {/* golden-hour sky */}
      <motion.div
        style={{ y: skyY }}
        className="absolute inset-0 bg-[linear-gradient(to_bottom,#1d3c57_0%,#3a5a74_28%,#a26a58_52%,#d99a63_68%,#f0bd74_80%,#f6d68e_92%)]"
      />

      {/* setting sun and its glow */}
      <motion.div style={{ y: sunY }} className="absolute inset-0">
        <div className="absolute top-[56%] left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(255_236_180/0.7)_0%,transparent_65%)]" />
        <div className="absolute top-[56%] left-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ffe9b0] shadow-[0_0_60px_20px_rgb(255_220_150/0.55)]" />
      </motion.div>

      {/* far shoreline silhouette */}
      <motion.div style={{ y: farWaterY }} className="absolute inset-x-0 top-[60%]">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true" className="block h-10 w-full text-bay-900/80 sm:h-14">
          <path
            d="M0,60 L0,38 L120,38 L128,26 L136,38 L300,38 L306,30 L330,30 L330,20 L336,20 L336,30 L360,30 L366,38 L560,38 L570,28 L640,28 L648,38 L900,38 L910,24 L918,24 L918,16 L924,16 L924,24 L980,24 L988,38 L1200,38 L1210,30 L1290,30 L1300,38 L1440,38 L1440,60 Z"
            fill="currentColor"
          />
        </svg>
      </motion.div>

      {/* bay water */}
      <motion.div style={{ y: farWaterY }} className="absolute inset-x-0 top-[62%] bottom-0 bg-gradient-to-b from-[#b06a4d] via-bay-700 to-bay-900" />

      {/* drifting boat silhouette */}
      <motion.div style={{ x: boatX }} className="absolute top-[54%] left-0 w-36 sm:w-48">
        <motion.div
          animate={reduce ? undefined : { y: [0, -5, 0], rotate: [0, -1, 0, 1, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <Boat className="w-full text-bay-950/90" />
        </motion.div>
      </motion.div>

      <WaveBand y={farWaterY} drift={720} duration={22} reduce={reduce} className="top-[66%] h-16 text-bay-700/70 sm:h-24" />
      <WaveBand y={0} drift={720} duration={16} reduce={reduce} className="top-[74%] h-20 text-bay-800/80 sm:h-28" />
      <WaveBand y={0} drift={720} duration={12} reduce={reduce} className="top-[84%] h-24 text-bay-900 sm:h-32" />

      {/* soft vignette for text legibility */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(12_31_45/0.42)_0%,rgb(12_31_45/0.18)_45%,transparent_75%)]" />

      {/* headline */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
          className="font-script text-4xl text-cream-100 drop-shadow-md sm:text-5xl"
        >
          Carmen's Seafood Restaurant
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
          className="mt-3 max-w-3xl font-display text-4xl leading-tight text-cream-50 text-balance drop-shadow-lg sm:text-6xl md:text-7xl"
        >
          Sea Isle's Original Waterfront Restaurant
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7, ease: "easeOut" }}
          className="mt-5 max-w-xl text-base font-medium text-cream-100/95 drop-shadow sm:text-lg"
        >
          Family-run on the bay since 1943 &middot; From our boat to your plate &middot; Sea Isle
          City, New Jersey
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95, duration: 0.7, ease: "easeOut" }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a href="tel:+16092634300" className={buttonVariants({ size: "lg" })}>
            <Phone aria-hidden="true" />
            Reserve a Table
          </a>
          <a href="tel:+16092633471" className={buttonVariants({ variant: "outline", size: "lg" })}>
            <UtensilsCrossed aria-hidden="true" />
            Order Takeout
          </a>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#story"
        aria-label="Scroll to our story"
        style={{ opacity: contentOpacity }}
        className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 cursor-pointer text-cream-50/90 transition-colors hover:text-cream-50"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="size-8" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
