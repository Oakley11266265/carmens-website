/**
 * Reel 02 — "Use what you have"
 *
 * Hook:    h06 "You might not agree with this, but…"
 * Payoff:  your property may not need another photo shoot.
 * Opening: type on white with the photo library sliding up underneath — a
 *          softer, warmer open than Reel 01's hard type card.
 *
 * Deliberately hedged: "may not need". The claim is that the existing library
 * is usually enough to work from, not that photography is never worth
 * commissioning. Grid total: 780 frames = 26.0s.
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
      kicker: "Hosts and agents",
      lines: ["You might not", "agree with", "this."],
      emphasiseLine: 2,
      treatment: "split",
      backdrop: { kind: "plate", plate: "shoreline-living", sceneId: "shoreline/living" },
      sfx: SFX.swipe,
    },

    /* 3.0 – 7.0s  PROOF — the library already exists */
    {
      type: "photoStack",
      durationInFrames: bars(2),
      kicker: "Your camera roll",
      title: "You already own the raw material.",
      photos: [
        { kind: "plate", plate: "shoreline-living", sceneId: "shoreline/living" },
        { kind: "plate", plate: "shoreline-bath", sceneId: "shoreline/bath" },
        { kind: "plate", plate: "shoreline-bedroom", sceneId: "shoreline/bedroom" },
        { kind: "plate", plate: "ridgeline-kitchen", sceneId: "ridgeline/kitchen" },
      ],
      pick: 2,
      caption: "It just isn’t moving yet.",
      sfx: SFX.shutter,
    },

    /* 7.0 – 11.0s  THE REVEAL — same room, still vs film */
    {
      type: "beforeAfter",
      durationInFrames: bars(2),
      before: { kind: "plate", plate: "shoreline-bedroom", sceneId: "shoreline/bedroom" },
      after: { kind: "plate", plate: "shoreline-bedroom", sceneId: "shoreline/bedroom" },
      beforeLabel: "THE PHOTO",
      afterLabel: "THE FILM",
      switchAtFrame: beats(3),
      // These are code-built plates, not a real photo and its real clip, so
      // the two halves are graded differently to make the point legible.
      // Set this to false the moment real matched media goes in.
      demoTreatment: true,
      sfx: SFX.impact,
    },

    /* 11.0 – 14.0s  VALUE 1 */
    {
      type: "featureCallout",
      durationInFrames: bars(1.5),
      media: { kind: "plate", plate: "shoreline-bath", sceneId: "shoreline/bath" },
      feature: "The tub under the window",
      note: "The detail that sells the stay.",
      anchor: "bottom",
      sfx: SFX.whoosh,
    },

    /* 14.0 – 17.0s  VALUE 2 */
    {
      type: "footage",
      durationInFrames: bars(1.5),
      media: { kind: "plate", plate: "shoreline-living", sceneId: "shoreline/living" },
      caption: "Same photos. Given somewhere to go.",
      move: "pull",
      sfx: SFX.swipe,
    },

    /* 17.0 – 21.5s  PROCESS */
    {
      type: "process",
      durationInFrames: beats(9),
      title: "How it works",
      steps: PROCESS_STEPS,
      footnote: "No reshoot. No access. No site visit.",
      sfx: SFX.tick,
    },

    /* 21.5 – 26.0s  CTA */
    {
      type: "endCard",
      durationInFrames: beats(9),
      question: CTA.question,
      cta: CTA.cta,
      secondary: CTA.secondary,
      handle: BRAND.handle,
      sfx: SFX.impact,
    },
  ],
  [
    { presentation: "fade", durationInFrames: 6 },
    { presentation: "cut", durationInFrames: 0 },
    { presentation: "fade", durationInFrames: 6 },
    { presentation: "slideLeft", durationInFrames: 8 },
    { presentation: "wipeUp", durationInFrames: 8 },
    { presentation: "fade", durationInFrames: 6 },
  ],
);

export const reel02: ReelConfig = {
  id: "Reel02-UseWhatYouHave",
  title: "Use what you have",
  hookId: "h06-might-not-agree",
  payoff: "Your property may not need another photo shoot.",
  outputFileName: "zek-reel-02-use-what-you-have.mp4",
  brand: BRAND,
  audio: audioBed("audio/music-warm.m4a", { musicVolume: 0.56 }),
  coverFrame: 150,
  scenes,
  transitions,
};
