import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, Phone, UtensilsCrossed, X } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { href: "#story", label: "Our Story" },
  { href: "#boats", label: "The Boats" },
  { href: "#/menu", label: "Menu" },
  { href: "#visit", label: "Visit" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 48));

  // close the drawer when following a link or resizing up to desktop
  useEffect(() => {
    if (!open) return;
    const onHash = () => setOpen(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [open]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.4 }}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled || open ? "bg-bay-950/90 shadow-lifted backdrop-blur-md" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:px-6">
        <a href="#top" className="font-script text-3xl text-cream-50 drop-shadow-sm">
          Carmen's
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-bold tracking-wider text-cream-50/90 uppercase transition-colors duration-200 hover:text-cream-50"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="tel:+16092633471"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "hidden sm:inline-flex")}
          >
            <UtensilsCrossed aria-hidden="true" />
            Takeout
          </a>
          <a href="tel:+16092634300" className={buttonVariants({ size: "sm" })}>
            <Phone aria-hidden="true" />
            Reserve a Table
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close navigation" : "Open navigation"}
            className="cursor-pointer rounded-md p-2 text-cream-50 transition-colors hover:bg-cream-50/10 md:hidden"
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="overflow-hidden border-t border-cream-50/10 md:hidden"
          >
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
              className="flex flex-col gap-1 px-4 py-4"
            >
              {links.map((l) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  variants={{ hidden: { opacity: 0, x: -14 }, show: { opacity: 1, x: 0 } }}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-bold tracking-wider text-cream-50/90 uppercase transition-colors hover:bg-cream-50/10 hover:text-cream-50"
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="tel:+16092633471"
                variants={{ hidden: { opacity: 0, x: -14 }, show: { opacity: 1, x: 0 } }}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-bold tracking-wider text-cream-50/90 uppercase transition-colors hover:bg-cream-50/10 hover:text-cream-50"
              >
                Takeout &middot; 609-263-3471
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
