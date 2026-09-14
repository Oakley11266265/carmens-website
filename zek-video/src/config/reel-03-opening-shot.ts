/**
 * Reel 03 — "The opening shot"
 *
 * Hook:    h08 "Have you ever noticed how…"
 * Payoff:  the opening shot sets the feeling of a property video.
 * Opening: a blue block wipes off the frame — the most graphic open of the
 *          three, and the only one that starts on colour.
 *
 * This reel is an EDITORIAL DEMONSTRATION. It compares two openings cut from
 * the same property and argues for one on craft grounds. It does not claim the
 * choice produces more bookings, enquiries or views, because no such data
 * exists. Grid total: 870 frames = 29.0s.
 */
import { onGrid, type ReelConfig } from "./types";
import { BRAND, CTA, PROCESS_STEPS, SFX, audioBed } from "./shared";
import { bars, beats } from "../brand/tokens";

const { scenes, transitions } = onGrid(
  [
    /* 0.0 – 3.0s  HOOK */
    {
      type: "hook",
      durationInFrames: bars(1.5),
      kicker: "The opening shot",
      lines: ["Have you", "ever noticed", "how it opens?"],
      emphasiseLine: 2,
      treatment: "wipe",
      sfx: SFX.riser,
    },

    /* 3.0 – 9.0s  THE DEMONSTRATION — two openings, one property */
    {
      type: "compare",
      durationInFrames: bars(3),
      title: "Same property. Two openings.",
      optionA: { kind: "plate", plate: "ridgeline-kitchen", sceneId: "ridgeline/kitchen" },
      optionB: { kind: "plate", plate: "ridgeline-terrace", sceneId: "ridgeline/terrace" },
      optionALabel: "OPENS ON THE KITCHEN",
      optionBLabel: "OPENS ON THE VIEW",
      winner: 1,
      verdict: "Both are the same house. Only one of them makes you keep watching.",
      sfx: SFX.impact,
    },

    /* 9.0 – 11.0s  THE LESSON */
    {
      type: "statement",
      durationInFrames: bars(1),
      kicker: "The edit",
      lines: ["Lead with the", "reason they", "book."],
      emphasiseLine: 2,
      invert: true,
      sfx: SFX.swipe,
    },

    /* 11.0 – 15.0s  VALUE 1 — the standout feature, led with */
    {
      type: "featureCallout",
      durationInFrames: bars(2),
      media: { kind: "plate", plate: "ridgeline-terrace", sceneId: "ridgeline/terrace" },
      feature: "Open on the view",
      note: "Then earn the rest of the house.",
      anchor: "bottom",
      sfx: SFX.whoosh,
    },

    /* 15.0 – 18.0s  VALUE 2 */
    {
      type: "footage",
      durationInFrames: bars(1.5),
      media: { kind: "plate", plate: "ridgeline-living", sceneId: "ridgeline/living" },
      caption: "Every cut after that has a job.",
      move: "push",
      sfx: SFX.swipe,
    },

    /* 18.0 – 23.0s  PROCESS */
    {
      type: "process",
      durationInFrames: beats(10),
      title: "How it works",
      steps: PROCESS_STEPS,
      footnote: "I choose the opening. You send the photos.",
      sfx: SFX.tick,
    },

    /* 23.0 – 29.0s  CTA */
    {
      type: "endCard",
      durationInFrames: bars(3),
      question: CTA.question,
      cta: CTA.cta,
      secondary: CTA.secondary,
      handle: BRAND.handle,
      sfx: SFX.impact,
    },
  ],
  [
    { presentation: "cut", durationInFrames: 0 },
    { presentation: "fade", durationInFrames: 6 },
    { presentation: "fade", durationInFrames: 6 },
    { presentation: "slideLeft", durationInFrames: 8 },
    { presentation: "wipeUp", durationInFrames: 8 },
    { presentation: "fade", durationInFrames: 6 },
  ],
);

export const reel03: ReelConfig = {
  id: "Reel03-OpeningShot",
  title: "The opening shot",
  hookId: "h08-ever-noticed",
  payoff: "The opening shot sets the feeling of a property video.",
  outputFileName: "zek-reel-03-opening-shot.mp4",
  brand: BRAND,
  audio: audioBed("audio/music-focus.m4a"),
  // The hook card after the blue block has wiped off: white type on black,
  // which reads at thumbnail size and sits distinctly against Reel 01's white
  // cover in a profile grid.
  coverFrame: 50,
  scenes,
  transitions,
};
