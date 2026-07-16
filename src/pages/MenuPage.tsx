import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Phone } from "lucide-react";

import menuPage1 from "@/assets/menu/menu-page-1.webp";
import menuPage2 from "@/assets/menu/menu-page-2.webp";
import menuPage3 from "@/assets/menu/menu-page-3.webp";
import menuPage4 from "@/assets/menu/menu-page-4.webp";
import { cn } from "@/lib/utils";

const pages = [
  {
    src: menuPage1,
    title: "Cover",
    alt: "Carmen's menu cover — Dock Dining, est. 1970. Serving breakfast, lunch and dinner. Sea Isle City's original waterfront dining at its best.",
  },
  {
    src: menuPage2,
    title: "Appetizers & Fried",
    alt: "Menu page one: appetizers, soups and salads, dinner accompaniments, golden fried seafood entrées, and specialties.",
  },
  {
    src: menuPage3,
    title: "Crabs & Entrées",
    alt: "Menu page two: Carmen Has Crabs, lobsters, from the sauté pan, broiled entrées, from the grill, pasta and parms, steaks and such.",
  },
  {
    src: menuPage4,
    title: "Kids & Desserts",
    alt: "Menu page three: children's menu, desserts, beverages, and restaurant information — 343 43rd Street and Bay, Sea Isle City, NJ.",
  },
];

const flip: Variants = {
  enter: (dir: number) => ({
    opacity: 0,
    rotateY: dir >= 0 ? 60 : -60,
    x: dir >= 0 ? 80 : -80,
  }),
  center: {
    opacity: 1,
    rotateY: 0,
    x: 0,
    transition: { type: "spring", stiffness: 160, damping: 22 },
  },
  exit: (dir: number) => ({
    opacity: 0,
    rotateY: dir >= 0 ? -60 : 60,
    x: dir >= 0 ? -80 : 80,
    transition: { duration: 0.25, ease: "easeIn" },
  }),
};

const swipeThreshold = 60;

export function MenuPage() {
  const [[index, direction], setPage] = useState([0, 0]);
  const page = pages[index];

  const paginate = (dir: number) =>
    setPage(([i]) => [(i + dir + pages.length) % pages.length, dir]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [index]);

  return (
    <div className="min-h-svh bg-bay-950 pb-16">
      <header className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <a
          href="#top"
          className="inline-flex cursor-pointer items-center gap-2 text-sm font-bold tracking-wide text-cream-50/90 transition-colors hover:text-cream-50"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Back to the dock
        </a>
        <a
          href="tel:+16092633471"
          className="inline-flex items-center gap-2 text-sm font-bold text-cream-50/90 transition-colors hover:text-cream-50"
        >
          <Phone className="size-4" aria-hidden="true" />
          Takeout: 609-263-3471
        </a>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-5xl px-2 text-center sm:px-6"
      >
        <p className="font-script text-4xl text-bay-300 sm:text-5xl">Carmen's</p>
        <h1 className="mt-1 font-display text-3xl tracking-wide text-cream-50 sm:text-4xl">
          The Menu
        </h1>
        <p className="mt-2 text-sm tracking-widest text-cream-100/70 uppercase">
          Dock dining &middot; Est. 1970 &middot; To life on the seas
        </p>
      </motion.div>

      <div className="mx-auto mt-8 flex max-w-4xl items-stretch gap-2 px-2 sm:gap-4 sm:px-6">
        <button
          type="button"
          onClick={() => paginate(-1)}
          aria-label="Previous menu page"
          className="hidden shrink-0 cursor-pointer items-center self-center rounded-full border-2 border-cream-50/30 p-3 text-cream-50 transition-colors duration-200 hover:border-cream-50 hover:bg-cream-50/10 md:flex"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </button>

        <div className="min-w-0 flex-1" style={{ perspective: 1600 }}>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.figure
              key={index}
              custom={direction}
              variants={flip}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={(_, info) => {
                if (info.offset.x < -swipeThreshold) paginate(1);
                else if (info.offset.x > swipeThreshold) paginate(-1);
              }}
              style={{ transformStyle: "preserve-3d" }}
              className="cursor-grab active:cursor-grabbing"
            >
              <img
                src={page.src}
                alt={page.alt}
                draggable={false}
                className="mx-auto w-full max-w-2xl rounded-sm shadow-lifted select-none"
              />
            </motion.figure>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={() => paginate(1)}
          aria-label="Next menu page"
          className="hidden shrink-0 cursor-pointer items-center self-center rounded-full border-2 border-cream-50/30 p-3 text-cream-50 transition-colors duration-200 hover:border-cream-50 hover:bg-cream-50/10 md:flex"
        >
          <ChevronRight className="size-6" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-6 flex flex-col items-center gap-2">
        <div className="flex items-center gap-3" role="tablist" aria-label="Menu pages">
          {pages.map((p, i) => (
            <button
              key={p.title}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Menu page ${i + 1}: ${p.title}`}
              onClick={() => setPage([i, i > index ? 1 : -1])}
              className={cn(
                "size-3 cursor-pointer rounded-full transition-all duration-300",
                i === index ? "w-8 bg-crab-500" : "bg-cream-50/30 hover:bg-cream-50/60",
              )}
            />
          ))}
        </div>
        <p className="text-xs tracking-wide text-cream-100/60">
          {page.title} &middot; page {index + 1} of {pages.length}
          <span className="md:hidden"> &middot; swipe the page to turn</span>
          <span className="hidden md:inline"> &middot; use the arrows or your keyboard</span>
        </p>
      </div>

      <p className="mx-auto mt-10 max-w-xl px-4 text-center text-sm text-cream-100/70">
        343 43rd Street & Bay &middot; Sea Isle City, NJ 08243 &middot; Hostess{" "}
        <a href="tel:+16092634300" className="underline underline-offset-2">
          609-263-4300
        </a>
      </p>
    </div>
  );
}
