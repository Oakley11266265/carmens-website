import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, TYPE } from "../brand/tokens";
import { FONT_FAMILY } from "../brand/fonts";
import { Grain, Kicker, SafeArea } from "../components/ui";
import type { Scene } from "../config/types";

type Props = Extract<Scene, { type: "process" }>;

/**
 * 17-23s. Three short steps, each one landing on its own beat (12 frames
 * apart at 30fps), with a blue number that fills as the step arrives.
 * Deliberately on white: after the footage section it reads as a breath.
 */
export const ProcessScene: React.FC<Props> = ({ title, steps, footnote }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.paper }}>
      <SafeArea
        justify="center"
        style={{
          // A continuous 18px rise over the scene. Small enough not to read as
          // an animation, large enough that the frame is never truly static.
          translate: `0px ${interpolate(frame, [0, durationInFrames - 1], [10, -8], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px`,
        }}
      >
        {title ? <Kicker delay={0}>{title}</Kicker> : null}

        <div style={{ display: "flex", flexDirection: "column", gap: 44, width: "100%" }}>
          {steps.map((step, i) => {
            const at = 6 + i * 12;
            const appear = interpolate(frame, [at, at + 14], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            });
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 34,
                  opacity: appear,
                  translate: `${interpolate(appear, [0, 1], [-40, 0])}px 0px`,
                }}
              >
                <div
                  style={{
                    flexShrink: 0,
                    width: 84,
                    height: 84,
                    borderRadius: "50%",
                    backgroundColor: COLORS.blue,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: FONT_FAMILY,
                    fontSize: 42,
                    fontWeight: 800,
                    color: COLORS.onInk,
                    scale: `${interpolate(appear, [0, 1], [0.5, 1])}`,
                  }}
                >
                  {i + 1}
                </div>
                <div
                  style={{
                    fontFamily: FONT_FAMILY,
                    fontSize: TYPE.subhead,
                    fontWeight: 800,
                    letterSpacing: TYPE.trackTight,
                    lineHeight: TYPE.lineSnug,
                    color: COLORS.ink,
                  }}
                >
                  {step}
                </div>
              </div>
            );
          })}
        </div>

        {footnote ? (
          <div
            style={{
              marginTop: 56,
              paddingTop: 30,
              borderTop: `4px solid ${COLORS.paperEdge}`,
              width: "100%",
              fontFamily: FONT_FAMILY,
              fontSize: TYPE.body,
              fontWeight: 700,
              lineHeight: TYPE.lineBody,
              color: COLORS.blue,
              opacity: interpolate(frame, [6 + steps.length * 12, 6 + steps.length * 12 + 14], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            {footnote}
          </div>
        ) : null}
      </SafeArea>
      <Grain />
    </AbsoluteFill>
  );
};
