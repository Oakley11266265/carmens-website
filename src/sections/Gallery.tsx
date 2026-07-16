import { motion, useReducedMotion } from "framer-motion";

import { Reveal } from "@/components/Reveal";
import { Boat } from "@/components/svg/Boat";
import { Crab } from "@/components/svg/Crab";
import { cn } from "@/lib/utils";

/**
 * Drop photos into src/assets/gallery/ (jpg/jpeg/png/webp) and they are
 * picked up here automatically, sorted by filename.
 */
const photos = Object.entries(
  import.meta.glob("../assets/gallery/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
  }),
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src]) => src as string);

function Placeholder({ index }: { index: number }) {
  const Art = index % 2 === 0 ? Boat : Crab;
  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center",
        index % 2 === 0 ? "bg-bay-800 text-bay-300" : "bg-cream-200 text-crab-600",
      )}
    >
      <Art className="w-24 opacity-70" />
    </div>
  );
}

function Snapshot({ src, index }: { src: string | null; index: number }) {
  return (
    <figure
      className={cn(
        "mx-3 w-60 shrink-0 rotate-1 rounded-sm bg-cream-50 p-2 pb-3 shadow-lifted sm:w-72",
        index % 2 === 1 && "-rotate-1",
      )}
    >
      <div className="aspect-4/3 overflow-hidden rounded-xs">
        {src ? (
          <img
            src={src}
            alt={`Carmen's Seafood Restaurant — photo ${index + 1}`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <Placeholder index={index} />
        )}
      </div>
    </figure>
  );
}

export function Gallery() {
  const reduce = useReducedMotion() ?? false;
  const items: (string | null)[] = photos.length > 0 ? photos : Array.from({ length: 8 }, () => null);
  // continuous marquee: track holds the list twice and loops at exactly -50%
  const track = [...items, ...items];

  return (
    <section id="gallery" aria-label="Photo gallery" className="bg-cream-100 py-16 sm:py-20">
      <Reveal className="text-center">
        <p className="font-script text-3xl text-crab-600 sm:text-4xl">Snapshots from the dock</p>
      </Reveal>

      <div className="relative mt-10 overflow-hidden">
        {/* soft fade at the edges */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-cream-100 to-transparent sm:w-24"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-cream-100 to-transparent sm:w-24"
        />

        {reduce ? (
          <div className="flex overflow-x-auto px-4 py-4">
            {items.map((src, i) => (
              <Snapshot key={i} src={src} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            className="flex w-max py-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: Math.max(items.length, 6) * 5, repeat: Infinity, ease: "linear" }}
          >
            {track.map((src, i) => (
              <Snapshot key={i} src={src} index={i % items.length} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
