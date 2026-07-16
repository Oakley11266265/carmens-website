import { useEffect, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Phone } from "lucide-react";

import { menuPages } from "@/data/menu";
import { cn } from "@/lib/utils";

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

function OrnamentRule() {
  return (
    <div aria-hidden="true" className="my-2 flex items-center justify-center gap-2 text-crab-600">
      <span className="h-px w-16 bg-current opacity-60" />
      <span className="rotate-45 border border-current p-0.5" />
      <span className="h-px w-16 bg-current opacity-60" />
    </div>
  );
}

const swipeThreshold = 60;

export function MenuPage() {
  const [[index, direction], setPage] = useState([0, 0]);
  const page = menuPages[index];

  const paginate = (dir: number) =>
    setPage(([i]) => [(i + dir + menuPages.length) % menuPages.length, dir]);

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
      {/* menu header bar */}
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

      {/* pager controls + page */}
      <div className="mx-auto mt-8 flex max-w-6xl items-stretch gap-2 px-2 sm:gap-4 sm:px-6">
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
            <motion.article
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
              className="grain cursor-grab rounded-sm border-4 border-double border-bay-900 bg-cream-50 px-5 py-8 shadow-lifted active:cursor-grabbing sm:px-10 sm:py-10"
            >
              <h2 className="text-center font-display text-2xl text-bay-900 sm:text-3xl">
                {page.title}
              </h2>
              <OrnamentRule />

              <div className="mt-6 gap-x-10 md:columns-2">
                {page.sections.map((section) => (
                  <section key={section.title} className="mb-8 break-inside-avoid">
                    <h3 className="text-center font-display text-xl tracking-wide text-crab-700 sm:text-2xl">
                      {section.title}
                    </h3>
                    <OrnamentRule />
                    {section.intro && (
                      <p className="mb-3 text-center text-sm text-ink/70 italic">{section.intro}</p>
                    )}
                    <ul className="space-y-2.5">
                      {section.items.map((item) => (
                        <li key={item.name}>
                          <p className="leading-snug font-bold text-bay-900">{item.name}</p>
                          {item.note && (
                            <p className="text-sm leading-snug text-ink/70">{item.note}</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            </motion.article>
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

      {/* page dots + mobile hint */}
      <div className="mt-6 flex flex-col items-center gap-2">
        <div className="flex items-center gap-3" role="tablist" aria-label="Menu pages">
          {menuPages.map((p, i) => (
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
          Page {index + 1} of {menuPages.length}
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
