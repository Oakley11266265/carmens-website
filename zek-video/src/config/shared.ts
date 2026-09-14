import type { AudioConfig, BrandConfig } from "./types";

/**
 * Everything the three reels hold in common. One ZEK identity, three
 * different openings — that is the whole strategy of this set.
 */
export const BRAND: BrandConfig = {
  handle: "@zekagency",
  site: "zekagency.com",
};

export const audioBed = (music: string, over?: Partial<AudioConfig>): AudioConfig => ({
  music,
  musicVolume: 0.6,
  fadeOutFrames: 45,
  sfxVolume: 0.42,
  voiceoverVolume: 1,
  duckTo: 0.28,
  ...over,
});

/**
 * The CTA block, identical across the set so it becomes recognisable.
 * "might" is load-bearing: it is a statement about how feeds work, not a
 * promise about what Instagram will show anyone.
 */
export const CTA = {
  question: "Want this for your property?",
  cta: "DM “FILM”",
  secondary: "Follow, or you might never see this post again.",
} as const;

/** The three process lines, worded exactly as briefed. */
export const PROCESS_STEPS = [
  "Send your photos.",
  "I create the film.",
  "No filming visit needed.",
];

export const SFX = {
  whoosh: "audio/sfx-whoosh.m4a",
  swipe: "audio/sfx-swipe.m4a",
  impact: "audio/sfx-impact.m4a",
  tick: "audio/sfx-tick.m4a",
  shutter: "audio/sfx-shutter.m4a",
  riser: "audio/sfx-riser.m4a",
} as const;
