/**
 * Reel 01 — "Photos into film"
 *
 * Hook:    h04 "This feels illegal to know…"
 * Payoff:  a cinematic property film can start from photos the owner already has.
 * Opening: hard white frame, type only. The cleanest first frame of the three.
 *
 * Scene lengths are written on the 120 BPM musical grid (15 frames per beat,
 * 60 per bar). `onGrid` lengthens each scene by the transition that follows
 * it, so every scene STARTS on its grid frame and the reel's total length is
 * exactly the sum of the grid values below: 840 frames = 28.0s.
 */
import { onGrid, type ReelConfig } from "./types";
import { BRAND, CTA, PROCESS_STEPS, SFX, audioBed } from "./shared";
import { bars } from "../brand/tokens";

const { scenes, transitions } = onGrid(
  [
    /* 0.0 – 3.0s  HOOK */
    {
      type: "hook",
      durationInFrames: bars(1.5),
      kicker: "Property owners",
      lines: ["This feels", "illegal", "to know."],
      emphasiseLine: 2,
      treatment: "stack",
      sfx: SFX.tick,
    },

    /* 3.0 – 8.0s  PROOF — the photo becomes the film */
    {
      type: "photoReveal",
      durationInFrames: bars(2.5),
      media: { kind: "plate", plate: "ridgeline-living", sceneId: "ridgeline/living" },
      label: "A photo you already have",
      caption: "Nothing here was filmed on site.",
      sfx: SFX.impact,
    },

    /* 8.0 – 12.0s  VALUE 1 */
    {
      type: "featureCallout",
      durationInFrames: bars(2),
      media: { kind: "plate", plate: "ridgeline-terrace", sceneId: "ridgeline/terrace" },
      feature: "The view at dusk",
      note: "The moment a guest pictures themselves in.",
      anchor: "bottom",
      sfx: SFX.whoosh,
    },

    /* 12.0 – 15.0s  VALUE 2 */
    {
      type: "footage",
      durationInFrames: bars(1.5),
      media: { kind: "plate", plate: "ridgeline-kitchen", sceneId: "ridgeline/kitchen" },
      caption: "Every room gets a reason to be there.",
      move: "push",
      sfx: SFX.swipe,
    },

    /* 15.0 – 17.0s  VALUE 3 — the claim, in words */
    {
      type: "statement",
      durationInFrames: bars(1),
      kicker: "What you get",
      lines: ["A film from", "the library", "you own."],
      emphasiseLine: 2,
      invert: false,
    },

    /* 17.0 – 23.0s  PROCESS */
    {
      type: "process",
      durationInFrames: bars(3),
      title: "How it works",
      steps: PROCESS_STEPS,
      footnote: "You send the photos. That is the whole ask.",
      sfx: SFX.tick,
    },

    /* 23.0 – 28.0s  CTA */
    {
      type: "endCard",
      durationInFrames: bars(2.5),
      question: CTA.question,
      cta: CTA.cta,
      secondary: CTA.secondary,
      handle: BRAND.handle,
      sfx: SFX.impact,
    },
  ],
  // transitions[i] sits between scenes[i] and scenes[i+1]. 0 = hard cut.
  [
    { presentation: "cut", durationInFrames: 0 },
    { presentation: "fade", durationInFrames: 6 },
    { presentation: "slideLeft", durationInFrames: 8 },
    { presentation: "fade", durationInFrames: 6 },
    { presentation: "wipeUp", durationInFrames: 8 },
    { presentation: "fade", durationInFrames: 6 },
  ],
);

export const reel01: ReelConfig = {
  id: "Reel01-PhotosIntoFilm",
  title: "Photos into film",
  hookId: "h04-feels-illegal",
  payoff:
    "A cinematic property film can be made from photos the owner already has, with no filming visit.",
  outputFileName: "zek-reel-01-photos-into-film.mp4",
  brand: BRAND,
  audio: audioBed("audio/music-reveal.m4a"),
  coverFrame: 40,
  scenes,
  transitions,
};
