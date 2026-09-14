import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS, TYPE } from "../brand/tokens";
import { FONT_FAMILY } from "../brand/fonts";
import { Grain, MediaCaption, PhotoCard, Scrim } from "../components/ui";
import { MediaFrame } from "../components/MediaFrame";
import type { Scene } from "../config/types";

type Props = Extract<Scene, { type: "photoReveal" }>;

/**
 * A still sitting on the page as a physical print, which then lifts, scales up
 * and fills the frame — the literal visual argument of the service: the photo
 * you already have becomes the film.
 */
export const PhotoRevealScene: React.FC<Props> = ({ media, caption, label }) => {
  const frame = useCurrentFrame();

  // 0-26: the print sits on white. 26-52: it grows to full bleed.
  const grow = interpolate(frame, [24, 54], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.65, 0, 0.2, 1),
  });

  const cardW = interpolate(grow, [0, 1], [620, 1080]);
  const cardH = interpolate(grow, [0, 1], [860, 1920]);
  const pad = interpolate(grow, [0, 1], [22, 0]);
  const padBottom = interpolate(grow, [0, 1], [74, 0]);
  const rotate = interpolate(grow, [0, 1], [-2.4, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.paper,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: cardW,
          height: cardH,
          backgroundColor: COLORS.paper,
          padding: pad,
          paddingBottom: padBottom,
          rotate: `${rotate}deg`,
          boxShadow:
            grow < 0.98
              ? "0 44px 90px rgba(11,11,12,0.22), 0 6px 18px rgba(11,11,12,0.10)"
              : "none",
        }}
      >
        <div style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
          <MediaFrame media={media} move={grow > 0.5 ? "push" : "still"} />
        </div>
      </div>

      {label ? (
        <div
          style={{
            position: "absolute",
            top: 300,
            fontFamily: FONT_FAMILY,
            fontSize: TYPE.label,
            fontWeight: 700,
            letterSpacing: TYPE.trackWide,
            textTransform: "uppercase",
            color: COLORS.blue,
            opacity: interpolate(frame, [2, 12, 26, 34], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {label}
        </div>
      ) : null}

      {/* The caption only appears once the print has filled the frame, and it
          gets its own scrim: these plates are pale, and white type on pale
          artwork is unreadable. */}
      {caption ? (
        <>
          <AbsoluteFill style={{ opacity: grow }}>
            <Scrim from="bottom" strength={0.88} />
          </AbsoluteFill>
          <MediaCaption delay={54}>{caption}</MediaCaption>
        </>
      ) : null}

      <Grain opacity={0.03 * (1 - grow)} />
    </AbsoluteFill>
  );
};

export { PhotoCard };
