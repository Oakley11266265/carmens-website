import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS, TYPE } from "../brand/tokens";
import { FONT_FAMILY } from "../brand/fonts";
import { MediaFrame } from "../components/MediaFrame";
import { SafeArea, Scrim } from "../components/ui";
import type { Scene } from "../config/types";

type Props = Extract<Scene, { type: "featureCallout" }>;

/**
 * A property moment with the feature named. This is the component that does
 * the selling: it is the difference between "nice room" and "this is the thing
 * guests book for".
 */
export const FeatureCalloutScene: React.FC<Props> = ({ media, feature, note, anchor }) => {
  const frame = useCurrentFrame();

  const rule = interpolate(frame, [6, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      <MediaFrame media={media} move="driftLeft" />
      <Scrim from={anchor === "top" ? "top" : "bottom"} strength={0.9} />

      <SafeArea
        justify={anchor === "top" ? "flex-start" : "flex-end"}
        // Extra bottom room so the callout clears the brand bug.
        style={anchor === "top" ? undefined : { paddingBottom: 510 }}
      >
        <div
          style={{
            width: 120,
            height: 10,
            backgroundColor: COLORS.blue,
            borderRadius: 5,
            marginBottom: 24,
            transformOrigin: "left center",
            scale: `${rule} 1`,
          }}
        />
        <div
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: TYPE.headline,
            fontWeight: 900,
            letterSpacing: TYPE.trackTight,
            lineHeight: TYPE.lineTight,
            color: COLORS.onInk,
            // Without this the headline runs past the right safe margin.
            maxWidth: 820,
            translate: `0px ${interpolate(frame, [4, 20], [34, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            })}px`,
            opacity: interpolate(frame, [4, 16], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {feature}
        </div>
        {note ? (
          <div
            style={{
              marginTop: 18,
              fontFamily: FONT_FAMILY,
              fontSize: TYPE.body,
              fontWeight: 500,
              lineHeight: TYPE.lineBody,
              color: "rgba(255,255,255,0.86)",
              maxWidth: 780,
              opacity: interpolate(frame, [16, 28], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            {note}
          </div>
        ) : null}
      </SafeArea>
    </AbsoluteFill>
  );
};
