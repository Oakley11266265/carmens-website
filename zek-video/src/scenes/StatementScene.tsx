import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, TYPE } from "../brand/tokens";
import { Grain, Kicker, RiseLine, SafeArea, Underline } from "../components/ui";
import type { Scene } from "../config/types";

type Props = Extract<Scene, { type: "statement" }>;

/** A held type card. Used to state the benefit in the viewer's own terms. */
export const StatementScene: React.FC<Props> = ({ lines, kicker, invert, emphasiseLine }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  return (
  <AbsoluteFill style={{ backgroundColor: invert ? COLORS.inkBg : COLORS.paper }}>
    <SafeArea
      justify="center"
      style={{
        translate: `0px ${interpolate(frame, [0, durationInFrames - 1], [8, -6], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })}px`,
      }}
    >
      {kicker ? (
        <Kicker color={invert ? COLORS.blueSoft : COLORS.blue}>{kicker}</Kicker>
      ) : null}
      {lines.map((line, i) => (
        <React.Fragment key={i}>
          <RiseLine
            index={i}
            delay={kicker ? 6 : 2}
            stagger={6}
            fontSize={TYPE.headline}
            weight={900}
            color={invert ? COLORS.onInk : COLORS.ink}
          >
            {line}
          </RiseLine>
          {emphasiseLine === i ? (
            <Underline
              delay={(kicker ? 6 : 2) + i * 6 + 10}
              width="52%"
              color={invert ? COLORS.onInk : COLORS.blue}
            />
          ) : null}
        </React.Fragment>
      ))}
    </SafeArea>
    {!invert ? <Grain /> : null}
  </AbsoluteFill>
  );
};
