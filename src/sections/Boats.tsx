import { motion, useReducedMotion } from "framer-motion";
import { Anchor } from "lucide-react";

import { Reveal, SectionHeading, staggerChild, staggerParent } from "@/components/Reveal";
import { WaveDivider } from "@/components/WaveDivider";
import { Boat } from "@/components/svg/Boat";

const fleet = [
  {
    name: "The Rufus",
    detail: "Tied up right at the restaurant dock. If she's in, tonight's catch came off her deck this morning.",
  },
  {
    name: "The Rufus II",
    detail: "Working the waters just down the canal — the second boat in a family fleet that's never stopped fishing.",
  },
];

export function Boats() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="boats" className="relative bg-bay-900 text-cream-50">
      <WaveDivider className="-mt-px text-cream-50" flip />
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading light kicker="From our boat to your plate" title="The Family Still Fishes" />

        <Reveal className="mx-auto mt-6 max-w-2xl text-center" delay={0.1}>
          <p className="leading-relaxed text-bay-100/90">
            Most seafood restaurants buy their fish. Ours comes up the canal. The same family
            that seats you still runs its own boats, the same way it has for eighty years — so
            what lands on your plate was swimming in these waters, not sitting on a truck.
          </p>
        </Reveal>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 grid gap-8 sm:grid-cols-2"
        >
          {fleet.map((boat, i) => (
            <motion.article
              key={boat.name}
              variants={staggerChild}
              className="rounded-xl border border-bay-700 bg-bay-800/60 p-6 text-center shadow-soft"
            >
              <motion.div
                animate={reduce ? undefined : { y: [0, -6, 0], rotate: [0, -1.4, 0, 1.4, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 1.6 }}
                className="mx-auto w-40 sm:w-48"
              >
                <Boat className="w-full text-bay-300" />
              </motion.div>
              {/* water under the hull */}
              <div aria-hidden="true" className="mx-auto -mt-2 h-1.5 w-44 rounded-full bg-bay-700/80 sm:w-52" />
              <h3 className="mt-5 font-display text-2xl">{boat.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-bay-100/85">{boat.detail}</p>
            </motion.article>
          ))}
        </motion.div>

        <Reveal className="mt-12 text-center" delay={0.15}>
          <p className="inline-flex items-center gap-2 font-script text-3xl text-bay-300 sm:text-4xl">
            <Anchor className="size-6 text-crab-500" aria-hidden="true" />
            From our boat to your plate.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
