/**
 * ZEK Agency brand tokens.
 *
 * Single source of truth for colour, type scale, rhythm and platform-safe
 * areas. Every component reads from here, so a rebrand is one file.
 *
 * NOTE ON COLOUR: zekagency.com could not be reached from this environment
 * (the egress proxy denies the host), so the exact site hexes could not be
 * sampled. These values implement the brief's written direction — clean white,
 * bold black, restrained blue — and are safe to overwrite with the real
 * values once the site is reachable.
 */

export const COLORS = {
  /** Page background. Very slightly warm so pure-white UI chrome reads apart. */
  paper: "#FFFFFF",
  paperSoft: "#F4F5F7",
  paperEdge: "#E6E8EC",

  /** Typography. */
  ink: "#0B0B0C",
  inkSoft: "#3A3D42",
  inkMuted: "#6B7280",

  /** The single accent. Used sparingly: underlines, dots, one CTA block. */
  blue: "#1D4ED8",
  blueDeep: "#12309C",
  blueSoft: "#DCE6FF",

  /** Inverted sections. */
  inkBg: "#0B0B0C",
  onInk: "#FFFFFF",
} as const;

/**
 * Type scale for a 1080 x 1920 frame.
 * Minimums follow the Remotion video-layout rule: headline >= 84px,
 * important supporting text >= 44px at 1080px wide.
 */
export const TYPE = {
  hookXL: 128,
  hook: 108,
  headline: 92,
  subhead: 64,
  body: 46,
  label: 34,
  micro: 28,
  lineTight: 1.02,
  lineSnug: 1.1,
  lineBody: 1.32,
  trackTight: "-0.035em",
  trackNormal: "-0.02em",
  trackWide: "0.18em",
} as const;

/**
 * Safe areas for a 1080 x 1920 vertical post.
 * `gutter` is the horizontal margin for all copy.
 * `top` clears the Instagram/TikTok account row and top chrome.
 * `bottom` clears the caption, action rail and progress bar.
 */
export const SAFE = {
  gutter: 96,
  top: 260,
  bottom: 430,
} as const;

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

/** 120 BPM: 15 frames per beat, 60 frames per bar. Cuts land on these. */
export const BEAT = 15;
export const BAR = 60;

export const beats = (n: number) => n * BEAT;
export const bars = (n: number) => n * BAR;
export const seconds = (n: number) => Math.round(n * FPS);
