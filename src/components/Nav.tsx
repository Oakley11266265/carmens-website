import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Phone, UtensilsCrossed } from "lucide-react";

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

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 48));

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.4 }}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled ? "bg-bay-950/90 shadow-lifted backdrop-blur-md" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
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
        </div>
      </nav>
    </motion.header>
  );
}
