import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS, TYPE } from "../brand/tokens";
import { FONT_FAMILY } from "../brand/fonts";
import { MediaFrame } from "../components/MediaFrame";
import { Grain } from "../components/ui";
import type { Scene } from "../config/types";

type Props = Extract<Scene, { type: "compare" }>;

/**
 * Two options stacked, then one is marked. Used for "this is what X looks
 * like, and this is what Y looks like" — an editorial demonstration, so the
 * verdict line should describe a craft choice, never a claimed business result.
 */
export const CompareScene: React.FC<Props> = ({
  title,
  optionA,
  optionB,
  optionALabel,
  optionBLabel,
  verdict,
  winner,
}) => {
  const frame = useCurrentFrame();

  const panel = (
    media: Props["optionA"],
    label: string,
    index: number,
    isWinner: boolean,
  ) => {
    // This scene is entered on a hard cut, so the panels must already be on
    // screen at frame 0. Only their settle is animated, never their presence:
    // fading them up from zero left a blank white frame mid-reel.
    const at = index * 8;
    const rise = interpolate(frame, [at, at + 18], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
    const mark = interpolate(frame, [64, 78], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });
    const dim = winner === null ? 1 : isWinner ? 1 : interpolate(mark, [0, 1], [1, 0.34]);

    return (
      <div
        style={{
          position: "relative",
          flex: 1,
          overflow: "hidden",
          opacity: dim,
          translate: `0px ${interpolate(rise, [0, 1], [index === 0 ? -46 : 46, 0])}px`,
        }}
      >
        <MediaFrame media={media} move={index === 0 ? "still" : "push"} />
        <div
          style={{
            position: "absolute",
            left: 96,
            top: 40,
            backgroundColor: isWinner && winner !== null ? COLORS.blue : COLORS.paper,
            color: isWinner && winner !== null ? COLORS.onInk : COLORS.ink,
            fontFamily: FONT_FAMILY,
            fontSize: TYPE.label,
            fontWeight: 800,
            letterSpacing: TYPE.trackWide,
            padding: "16px 26px",
            borderRadius: 4,
          }}
        >
          {label}
        </div>
        {isWinner && winner !== null ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              border: `${interpolate(mark, [0, 1], [0, 12])}px solid ${COLORS.blue}`,
            }}
          />
        ) : null}
      </div>
    );
  };

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.paper, display: "flex", flexDirection: "column" }}>
      {title ? (
        <div
          style={{
            paddingTop: 210,
            paddingLeft: 96,
            paddingRight: 96,
            paddingBottom: 26,
            fontFamily: FONT_FAMILY,
            fontSize: TYPE.subhead,
            fontWeight: 900,
            letterSpacing: TYPE.trackTight,
            lineHeight: TYPE.lineSnug,
            color: COLORS.ink,
            backgroundColor: COLORS.paper,
            zIndex: 2,
          }}
        >
          {title}
        </div>
      ) : null}

      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        {panel(optionA, optionALabel, 0, winner === 0)}
        {panel(optionB, optionBLabel, 1, winner === 1)}
      </div>

      <div
        style={{
          backgroundColor: COLORS.paper,
          paddingLeft: 96,
          paddingRight: 96,
          paddingTop: 30,
          height: 330,
          zIndex: 2,
        }}
      >
        {verdict ? (
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: TYPE.body,
              fontWeight: 700,
              lineHeight: TYPE.lineBody,
              color: COLORS.ink,
              opacity: interpolate(frame, [70, 84], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            {verdict}
          </div>
        ) : null}
      </div>
      <Grain opacity={0.02} />
    </AbsoluteFill>
  );
};
