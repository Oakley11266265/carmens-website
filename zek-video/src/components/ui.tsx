/**
 * Small shared pieces: safe area, type, the blue underline, grain, and the
 * scene-progress ticks. Keeping them here is what makes the three reels feel
 * like one brand rather than three separate videos.
 */
import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
} from "remotion";
import { COLORS, SAFE, TYPE } from "../brand/tokens";
import { FONT_FAMILY } from "../brand/fonts";

/** Everything important lives inside this box — clear of platform chrome. */
export const SafeArea: React.FC<{
  children: React.ReactNode;
  justify?: React.CSSProperties["justifyContent"];
  align?: React.CSSProperties["alignItems"];
  style?: React.CSSProperties;
}> = ({ children, justify = "center", align = "flex-start", style }) => (
  <AbsoluteFill
    style={{
      paddingLeft: SAFE.gutter,
      paddingRight: SAFE.gutter,
      paddingTop: SAFE.top,
      paddingBottom: SAFE.bottom,
      display: "flex",
      flexDirection: "column",
      justifyContent: justify,
      alignItems: align,
      fontFamily: FONT_FAMILY,
      ...style,
    }}
  >
    {children}
  </AbsoluteFill>
);

/** Small uppercase label above a headline. */
export const Kicker: React.FC<{
  children: React.ReactNode;
  color?: string;
  delay?: number;
  immediate?: boolean;
}> = ({ children, color = COLORS.blue, delay = 0, immediate = false }) => {
  const frame = useCurrentFrame();
  if (immediate) {
    return (
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize: TYPE.label,
          fontWeight: 700,
          letterSpacing: TYPE.trackWide,
          textTransform: "uppercase",
          color,
          marginBottom: 28,
        }}
      >
        {children}
      </div>
    );
  }
  return (
    <div
      style={{
        fontFamily: FONT_FAMILY,
        fontSize: TYPE.label,
        fontWeight: 700,
        letterSpacing: TYPE.trackWide,
        textTransform: "uppercase",
        color,
        marginBottom: 28,
        opacity: interpolate(frame, [delay, delay + 8], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: `0px ${interpolate(frame, [delay, delay + 12], [14, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        })}px`,
      }}
    >
      {children}
    </div>
  );
};

/**
 * A headline line that rises into place behind a clipping mask.
 * `index` staggers each line by one eighth of a beat-ish so the block reads
 * as one movement rather than four separate animations.
 */
export const RiseLine: React.FC<{
  children: React.ReactNode;
  index?: number;
  delay?: number;
  fontSize?: number;
  color?: string;
  weight?: number;
  stagger?: number;
  /**
   * Skip the entry animation and sit at rest from frame 0. Used for the first
   * line of a hook: the opening frame has to be readable the instant it
   * appears, not one beat later.
   */
  immediate?: boolean;
}> = ({
  children,
  index = 0,
  delay = 0,
  fontSize = TYPE.headline,
  color = COLORS.ink,
  weight = 800,
  stagger = 5,
  immediate = false,
}) => {
  const frame = useCurrentFrame();
  const start = delay + index * stagger;
  return (
    <div style={{ overflow: "hidden", paddingBottom: fontSize * 0.08 }}>
      <div
        style={{
          fontFamily: FONT_FAMILY,
          fontSize,
          fontWeight: weight,
          letterSpacing: TYPE.trackTight,
          lineHeight: TYPE.lineTight,
          color,
          translate: immediate
            ? "0px 0px"
            : `0px ${interpolate(frame, [start, start + 14], [fontSize * 1.05, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              })}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

/** The restrained blue accent: one sweeping underline, drawn left to right. */
export const Underline: React.FC<{
  delay?: number;
  duration?: number;
  height?: number;
  color?: string;
  width?: string | number;
}> = ({ delay = 0, duration = 14, height = 14, color = COLORS.blue, width = "100%" }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ width, height, marginTop: 18 }}>
      <div
        style={{
          height,
          backgroundColor: color,
          borderRadius: height / 2,
          transformOrigin: "left center",
          scale: `${interpolate(frame, [delay, delay + duration], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })} 1`,
        }}
      />
    </div>
  );
};

/** A quiet paper texture. Keeps large white areas from looking like a bug. */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.035 }) => (
  <AbsoluteFill style={{ opacity, pointerEvents: "none", mixBlendMode: "multiply" }}>
    <svg width="100%" height="100%" style={{ display: "block" }}>
      <filter id="zek-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" />
      </filter>
      <rect width="100%" height="100%" filter="url(#zek-grain)" />
    </svg>
  </AbsoluteFill>
);

/** A soft vignette so full-bleed media holds white type. */
export const Scrim: React.FC<{
  from?: "top" | "bottom" | "both";
  strength?: number;
}> = ({ from = "bottom", strength = 0.72 }) => {
  const s = strength;
  // Eased ramps. A linear fade to 0.78 leaves light artwork sitting at mid
  // grey, which white type cannot hold. These reach near-black well before the
  // bottom edge, so captions always have something to sit on.
  const stops =
    from === "both"
      ? `rgba(0,0,0,${s}) 0%, rgba(0,0,0,${s * 0.4}) 16%, rgba(0,0,0,0) 32%, ` +
        `rgba(0,0,0,0) 54%, rgba(0,0,0,${s * 0.45}) 76%, rgba(0,0,0,${s}) 100%`
      : from === "top"
        ? `rgba(0,0,0,${s}) 0%, rgba(0,0,0,${s * 0.45}) 18%, rgba(0,0,0,0) 46%`
        : // Reaches near-full strength by ~80% height, which is where the
        // caption band sits. An earlier version only got there at the very
        // bottom edge, leaving white captions on mid-grey over pale artwork.
        `rgba(0,0,0,0) 30%, rgba(0,0,0,${s * 0.3}) 50%, ` +
          `rgba(0,0,0,${s * 0.75}) 66%, rgba(0,0,0,${s}) 82%, rgba(0,0,0,${s}) 100%`;
  return (
    <AbsoluteFill
      style={{ backgroundImage: `linear-gradient(to bottom, ${stops})`, pointerEvents: "none" }}
    />
  );
};

/** Persistent brand bug, bottom-left, above the caption safe line. */
export const CornerMark: React.FC<{ children: React.ReactNode; invert?: boolean }> = ({
  children,
  invert = false,
}) => (
  <div
    style={{
      position: "absolute",
      left: SAFE.gutter,
      // Sits just inside the bottom safe line, below the caption band, so it
      // never lands on top of copy or on a busy part of the artwork.
      bottom: SAFE.bottom - 40,
      opacity: invert ? 0.92 : 0.8,
      // Scene content can raise its own z-index (the photo stack does), so the
      // persistent chrome has to sit explicitly above it.
      zIndex: 50,
    }}
  >
    {children}
  </div>
);

/**
 * A thin progress rail along the top of the safe area. Gives the viewer a
 * reason to stay: they can see how little is left.
 */
export const ProgressRail: React.FC<{
  /**
   * The reel's full length in frames. Passed in rather than read from
   * `useVideoConfig()` because the cover Stills reuse this component, and a
   * Still reports a duration of 1 — which pinned the rail to 100% on every
   * cover image.
   */
  total: number;
  color?: string;
  track?: string;
}> = ({ total, color = COLORS.blue, track = COLORS.paperEdge }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        top: SAFE.top - 78,
        left: SAFE.gutter,
        right: SAFE.gutter,
        height: 6,
        borderRadius: 3,
        backgroundColor: track,
        overflow: "hidden",
        zIndex: 50,
      }}
    >
      <div
        style={{
          height: "100%",
          backgroundColor: color,
          transformOrigin: "left center",
          scale: `${interpolate(frame, [0, Math.max(1, total - 1)], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })} 1`,
        }}
      />
    </div>
  );
};

/** Paper-coloured card used for "this is a photograph" moments. */
export const PhotoCard: React.FC<{
  children: React.ReactNode;
  width: number;
  height: number;
  rotate?: number;
  style?: React.CSSProperties;
}> = ({ children, width, height, rotate = 0, style }) => (
  <div
    style={{
      width,
      height,
      backgroundColor: COLORS.paper,
      padding: 22,
      paddingBottom: 74,
      boxShadow: "0 44px 90px rgba(11,11,12,0.22), 0 6px 18px rgba(11,11,12,0.10)",
      rotate: `${rotate}deg`,
      ...style,
    }}
  >
    <div style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
      {children}
    </div>
  </div>
);


/**
 * Bottom caption for media scenes. One place so the offset that clears the
 * brand bug, the max width that keeps it off the right edge, and the shadow
 * that guarantees contrast are all consistent.
 */
export const MediaCaption: React.FC<{
  children: React.ReactNode;
  delay?: number;
  color?: string;
  size?: number;
}> = ({ children, delay = 2, color = COLORS.onInk, size = TYPE.subhead }) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        left: SAFE.gutter,
        right: SAFE.gutter,
        bottom: SAFE.bottom + 80,
        maxWidth: 830,
        fontFamily: FONT_FAMILY,
        fontSize: size,
        fontWeight: 800,
        letterSpacing: TYPE.trackTight,
        lineHeight: TYPE.lineSnug,
        color,
        textShadow: "0 6px 40px rgba(0,0,0,0.55)",
        opacity: interpolate(frame, [delay, delay + 12], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: `0px ${interpolate(frame, [delay, delay + 16], [26, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        })}px`,
      }}
    >
      {children}
    </div>
  );
};
