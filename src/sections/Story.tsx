import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

import { SectionHeading } from "@/components/Reveal";
import { cn } from "@/lib/utils";

type Era = {
  date: string;
  countTo?: number;
  title: string;
  body: string;
};

const eras: Era[] = [
  {
    date: "1943",
    countTo: 1943,
    title: "A $250 Lot on the Bay",
    body: "Fresh off the boat from Italy, the Conti family puts down $250 for a patch of bayfront in Sea Isle City. It doesn't look like much — but it's theirs, and it's on the water.",
  },
  {
    date: "1944",
    countTo: 1944,
    title: "The First Fish Shack",
    body: "One year later, the family raises a little fish shack on the lot by hand. Locals start coming by for whatever came off the boat that morning.",
  },
  {
    date: "Age 14",
    title: "A Boy and the Bay",
    body: "Young Carmen leaves school at fourteen to fish alongside his father. The classroom's loss is the bay's gain — nobody learns these waters like a kid who grew up on them.",
  },
  {
    date: "The Shop Years",
    title: "A Hand-Nailed Sign",
    body: "For years the lot runs as a mechanic shop, but the fishing never stops. One day Carmen nails up a hand-painted sign with just one word on it: “Carmen's.” It's still the only name the place has ever needed.",
  },
  {
    date: "1970",
    countTo: 1970,
    title: "The Lobster Market",
    body: "The family opens a lobster market on the dock. Word gets around fast — the line for fresh lobster stretches down the block on summer Saturdays.",
  },
  {
    date: "1981",
    countTo: 1981,
    title: "The Restaurant Opens",
    body: "Carmen's Seafood Restaurant opens its doors — same family, same dock, same boats. Now you can sit down at the water's edge and eat the catch where it landed.",
  },
  {
    date: "Today",
    title: "300 Seats on the Dock",
    body: "Three generations later, Carmen's seats 300 on the dock overlooking the canal. The boats still come in. The family's still here. Pull up a chair and stay for the sunset.",
  },
];

function CountUpDate({ label, countTo }: { label: string; countTo?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(countTo ? countTo - 31 : 0);

  useEffect(() => {
    if (!inView || !countTo) return;
    if (reduce) {
      setValue(countTo);
      return;
    }
    const controls = animate(countTo - 31, countTo, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, countTo, reduce]);

  return <span ref={ref}>{countTo ? value : label}</span>;
}

export function Story() {
  return (
    <section id="story" className="relative bg-cream-50 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading kicker="Since 1943" title="Eighty Years on This Dock" />

        <div className="relative mt-16">
          {/* rope line */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-4 w-0 border-l-2 border-dashed border-wood-300 md:left-1/2"
          />

          <ol className="space-y-14 sm:space-y-16">
            {eras.map((era, i) => {
              const left = i % 2 === 0;
              return (
                <li key={era.date} className="relative">
                  {/* knot on the rope */}
                  <motion.span
                    aria-hidden="true"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="absolute top-2 left-4 z-10 block size-4 -translate-x-1/2 rounded-full border-3 border-cream-50 bg-crab-600 shadow-soft md:left-1/2"
                  />
                  <motion.div
                    initial={{ opacity: 0, x: left ? -36 : 36, y: 16 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 160, damping: 24 }}
                    className={cn(
                      "ml-10 md:ml-0 md:w-[calc(50%-2.5rem)]",
                      left ? "md:mr-auto md:text-right" : "md:ml-auto",
                    )}
                  >
                    <p className="font-display text-4xl text-crab-600 tabular-nums sm:text-5xl">
                      <CountUpDate label={era.date} countTo={era.countTo} />
                    </p>
                    <h3 className="mt-2 font-display text-xl text-bay-900 sm:text-2xl">
                      {era.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-ink/80">{era.body}</p>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
