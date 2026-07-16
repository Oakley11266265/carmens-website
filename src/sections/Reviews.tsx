import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

import { SectionHeading } from "@/components/Reveal";
import { cn } from "@/lib/utils";

const reviews = [
  {
    quote:
      "You can't beat eating seafood this fresh right on the water. We watched the boats come up the canal the whole meal — the sunset views are gorgeous.",
    who: "Summer regular since the '90s",
  },
  {
    quote:
      "The crabs are the best anywhere on the island, and the staff treats you like you've been coming for years. Because most people have.",
    who: "Shore local",
  },
  {
    quote:
      "Old-school Jersey Shore exactly the way it's supposed to feel. No pretense, just great seafood on the dock. We're back every single August.",
    who: "Philly family, annual pilgrimage",
  },
  {
    quote:
      "The fishing boat pulled up to the dock while we were eating lunch. It genuinely does not get any fresher than this place.",
    who: "First-timer, now a believer",
  },
  {
    quote:
      "Whatever you order, save room for the coconut cream pie. Trust me on this one.",
    who: "Voice of experience",
  },
];

const swipeThreshold = 60;

const slide: Variants = {
  enter: (dir: number) => ({ opacity: 0, x: dir >= 0 ? 280 : -280, scale: 0.9 }),
  center: { opacity: 1, x: 0, scale: 1 },
  exit: (dir: number) => ({ opacity: 0, x: dir >= 0 ? -280 : 280, scale: 0.9 }),
};

export function Reviews() {
  const [[index, direction], setPage] = useState([0, 0]);

  const paginate = (dir: number) =>
    setPage(([i]) => [(i + dir + reviews.length) % reviews.length, dir]);

  const review = reviews[index];

  return (
    <section id="reviews" className="relative overflow-hidden bg-bay-100 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading kicker="Word on the dock" title="What Folks Say" />

        <div className="relative mt-12 flex min-h-72 items-center sm:min-h-64">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.figure
              key={index}
              custom={direction}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 240, damping: 26 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(_, info) => {
                if (info.offset.x < -swipeThreshold) paginate(1);
                else if (info.offset.x > swipeThreshold) paginate(-1);
              }}
              className="w-full cursor-grab rounded-xl bg-cream-50 p-8 text-center shadow-lifted active:cursor-grabbing sm:p-10"
            >
              <Quote className="mx-auto size-8 rotate-180 text-crab-600" aria-hidden="true" />
              <blockquote className="mt-4 font-display text-xl leading-relaxed text-balance text-bay-900 sm:text-2xl">
                {review.quote}
              </blockquote>
              <figcaption className="mt-5 font-script text-2xl text-teal-600">
                — {review.who}
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Previous review"
            className="cursor-pointer rounded-full border-2 border-bay-900/20 p-2 text-bay-900 transition-colors duration-200 hover:border-bay-900 hover:bg-bay-900 hover:text-cream-50"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <div className="flex gap-2" role="tablist" aria-label="Reviews">
            {reviews.map((r, i) => (
              <button
                key={r.who}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Review ${i + 1}`}
                onClick={() => setPage([i, i > index ? 1 : -1])}
                className={cn(
                  "size-2.5 cursor-pointer rounded-full transition-all duration-300",
                  i === index ? "w-6 bg-crab-600" : "bg-bay-900/25 hover:bg-bay-900/50",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => paginate(1)}
            aria-label="Next review"
            className="cursor-pointer rounded-full border-2 border-bay-900/20 p-2 text-bay-900 transition-colors duration-200 hover:border-bay-900 hover:bg-bay-900 hover:text-cream-50"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
