import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const springUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 180, damping: 24 },
  },
};

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={springUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 220, damping: 22 },
  },
};

export function SectionHeading({
  kicker,
  title,
  light,
  className,
}: {
  kicker: string;
  title: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={cn("text-center", className)}>
      <p
        className={cn(
          "font-script text-3xl sm:text-4xl",
          light ? "text-bay-300" : "text-crab-600",
        )}
      >
        {kicker}
      </p>
      <h2
        className={cn(
          "mt-1 font-display text-4xl tracking-wide text-balance sm:text-5xl",
          light ? "text-cream-50" : "text-bay-900",
        )}
      >
        {title}
      </h2>
    </Reveal>
  );
}
