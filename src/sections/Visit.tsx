import { Anchor, Car, Clock, MapPin, PartyPopper, Phone, UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";

import { Reveal, SectionHeading, staggerChild, staggerParent } from "@/components/Reveal";
import { buttonVariants } from "@/components/ui/button";
import { WaveDivider } from "@/components/WaveDivider";

const details = [
  {
    icon: Clock,
    title: "Hours",
    lines: ["Breakfast & lunch: 8am – 3pm", "Dinner: from 4pm", "Seasonal — call ahead off-season"],
  },
  {
    icon: MapPin,
    title: "Find Us",
    lines: ["343 43rd Place", "Sea Isle City, NJ 08243", "Right on the canal"],
  },
  {
    icon: Car,
    title: "Free Valet Parking",
    lines: ["Pull up, hand over the keys,", "and go watch the boats."],
  },
  {
    icon: Anchor,
    title: "Arriving by Boat?",
    lines: ["Cruise up the canal and", "tie up right at our dock."],
  },
  {
    icon: PartyPopper,
    title: "Private Parties",
    lines: ["Rehearsal dinners & celebrations", "for groups big and small — 300", "seats on the water."],
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["Hostess: 609-263-4300", "Takeout: 609-263-3471"],
  },
];

export function Visit() {
  return (
    <section id="visit" className="relative bg-cream-50">
      <WaveDivider className="-mt-px text-bay-100" flip />
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <SectionHeading kicker="Come see us" title="Dinner on the Dock Awaits" />

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-6 sm:grid-cols-2"
          >
            {details.map((d) => (
              <motion.div key={d.title} variants={staggerChild} className="flex gap-4">
                <d.icon className="mt-1 size-6 shrink-0 text-crab-600" aria-hidden="true" />
                <div>
                  <h3 className="font-display text-lg text-bay-900">{d.title}</h3>
                  {d.lines.map((line) => (
                    <p key={line} className="text-sm leading-relaxed text-ink/75">
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <Reveal delay={0.15} className="overflow-hidden rounded-xl shadow-lifted">
            <iframe
              title="Map to Carmen's Seafood Restaurant, 343 43rd Place, Sea Isle City, NJ"
              src="https://www.google.com/maps?q=Carmen%27s%20Seafood%20Restaurant%2C%20343%2043rd%20Place%2C%20Sea%20Isle%20City%2C%20NJ%2008243&output=embed"
              className="h-80 w-full border-0 lg:h-full lg:min-h-96"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-16">
          <div className="signboard rounded-xl px-6 py-12 text-center sm:px-12">
            <p className="font-script text-3xl text-crab-600 sm:text-4xl">See you on the dock</p>
            <h3 className="mt-2 font-display text-3xl text-bay-900 text-balance sm:text-4xl">
              Golden hour is better with crab legs.
            </h3>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="tel:+16092634300" className={buttonVariants({ size: "lg" })}>
                <Phone aria-hidden="true" />
                Reserve: 609-263-4300
              </a>
              <a href="tel:+16092633471" className={buttonVariants({ variant: "bay", size: "lg" })}>
                <UtensilsCrossed aria-hidden="true" />
                Takeout: 609-263-3471
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
