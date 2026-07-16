import { MotionConfig } from "framer-motion";

import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Boats } from "@/sections/Boats";
import { Food } from "@/sections/Food";
import { Hero } from "@/sections/Hero";
import { Reviews } from "@/sections/Reviews";
import { Shirt } from "@/sections/Shirt";
import { Story } from "@/sections/Story";
import { Visit } from "@/sections/Visit";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#story"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-cream-50 focus:px-4 focus:py-2 focus:text-bay-900"
      >
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <Story />
        <Boats />
        <Food />
        <Shirt />
        <Reviews />
        <Visit />
      </main>
      <Footer />
      {/* sun-bleached film grain over everything */}
      <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-50 opacity-[0.05] mix-blend-multiply" />
    </MotionConfig>
  );
}
