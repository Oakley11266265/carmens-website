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
import { Wordmark } from "../brand/Wordmark";
import { Grain, SafeArea } from "../components/ui";
import type { Scene } from "../config/types";

type Props = Extract<Scene, { type: "endCard" }>;

/**
 * 23-30s. One primary action, stated once, made physically dominant.
 *
 * Layout order is deliberate: the question sets up the ask, the DM block is
 * the largest object on screen, and the follow line sits underneath at a size
 * that is still comfortably readable on a phone. Both lines are on screen
 * together for the rest of the reel so there is time to read them.
 */
export const EndCardScene: React.FC<Props> = ({ question, cta, secondary, handle }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const block = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // A slow, single pulse on the CTA block. One beat of movement, not a loop.
  const pulse = interpolate(frame, [44, 52, 60], [1, 1.022, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.4, 1),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.paper }}>
      <SafeArea
        justify="center"
        style={{
          // A continuous, almost imperceptible push. The CTA needs to be held
          // long enough to read twice; it should not look like a still image
          // while it is.
          scale: `${interpolate(frame, [0, durationInFrames - 1], [1, 1.018], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}`,
        }}
      >
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: TYPE.subhead,
            fontWeight: 800,
            letterSpacing: TYPE.trackTight,
            lineHeight: TYPE.lineSnug,
            color: COLORS.ink,
            marginBottom: 40,
            opacity: interpolate(frame, [2, 14], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: `0px ${interpolate(frame, [2, 16], [22, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            })}px`,
          }}
        >
          {question}
        </div>

        {/* The dominant object on screen. */}
        <div
          style={{
            width: "100%",
            backgroundColor: COLORS.blue,
            borderRadius: 10,
            padding: "56px 48px",
            scale: `${interpolate(block, [0, 1], [0.94, 1]) * pulse}`,
            opacity: block,
          }}
        >
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: TYPE.hook,
              fontWeight: 900,
              letterSpacing: TYPE.trackTight,
              lineHeight: TYPE.lineTight,
              color: COLORS.onInk,
              textAlign: "center",
            }}
          >
            {cta}
          </div>
        </div>

        <div
          style={{
            marginTop: 44,
            fontFamily: FONT_FAMILY,
            fontSize: TYPE.body,
            fontWeight: 700,
            lineHeight: TYPE.lineBody,
            color: COLORS.inkSoft,
            textAlign: "center",
            width: "100%",
            opacity: interpolate(frame, [34, 48], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {secondary}
        </div>
      </SafeArea>

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 300,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          opacity: interpolate(frame, [44, 58], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Wordmark size={38} />
        {handle ? (
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: TYPE.micro,
              fontWeight: 600,
              letterSpacing: TYPE.trackWide,
              color: COLORS.inkMuted,
            }}
          >
            {handle}
          </div>
        ) : null}
      </div>

      <Grain />
    </AbsoluteFill>
  );
};
