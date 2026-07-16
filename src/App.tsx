import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";

import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { MenuPage } from "@/pages/MenuPage";
import { Boats } from "@/sections/Boats";
import { Food } from "@/sections/Food";
import { Gallery } from "@/sections/Gallery";
import { Hero } from "@/sections/Hero";
import { Reviews } from "@/sections/Reviews";
import { Shirt } from "@/sections/Shirt";
import { Story } from "@/sections/Story";
import { Visit } from "@/sections/Visit";

function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHashRoute();
  const route = hash.startsWith("#/menu") ? "menu" : "home";

  // returning from the menu page: the section anchors don't exist until the
  // home page re-renders, so resolve the scroll manually
  useEffect(() => {
    if (route !== "home") return;
    if (hash && hash !== "#top") {
      document.querySelector(hash)?.scrollIntoView();
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [route, hash]);

  useEffect(() => {
    document.title =
      route === "menu"
        ? "The Menu — Carmen's Seafood Restaurant, Sea Isle City, NJ"
        : "Carmen's Seafood Restaurant — Sea Isle's Original Waterfront Restaurant";
  }, [route]);

  if (route === "menu") {
    return (
      <MotionConfig reducedMotion="user">
        <MenuPage />
        <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-50 opacity-[0.05] mix-blend-multiply" />
      </MotionConfig>
    );
  }

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
        <Gallery />
      </main>
      <Footer />
      {/* sun-bleached film grain over everything */}
      <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-50 opacity-[0.05] mix-blend-multiply" />
    </MotionConfig>
  );
}
