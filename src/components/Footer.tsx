import { Anchor } from "lucide-react";

import { WaveDivider } from "@/components/WaveDivider";

export function Footer() {
  return (
    <footer className="relative bg-bay-950 text-cream-50">
      <WaveDivider className="-mt-px text-cream-50" flip />
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-14 text-center sm:px-6">
        <p className="font-script text-4xl">Carmen's</p>
        <p className="flex items-center gap-2 text-sm tracking-widest text-bay-300 uppercase">
          <Anchor className="size-4" aria-hidden="true" />
          Sea Isle's original waterfront restaurant
          <Anchor className="size-4" aria-hidden="true" />
        </p>
        <p className="text-sm text-cream-100/70">
          343 43rd Place, Sea Isle City, NJ 08243 &middot;{" "}
          <a href="tel:+16092634300" className="underline-offset-2 hover:underline">
            Hostess 609-263-4300
          </a>{" "}
          &middot;{" "}
          <a href="tel:+16092633471" className="underline-offset-2 hover:underline">
            Takeout 609-263-3471
          </a>
        </p>
        <p className="text-xs text-cream-100/50">
          Family-run on the bay since 1943 &middot; carmenhascrabs.com
        </p>
      </div>
    </footer>
  );
}
