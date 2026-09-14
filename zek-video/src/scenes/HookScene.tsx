import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS, TYPE } from "../brand/tokens";
import { Grain, Kicker, RiseLine, SafeArea, Scrim, Underline } from "../components/ui";
import { MediaFrame } from "../components/MediaFrame";
import type { Scene } from "../config/types";

type Props = Extract<Scene, { type: "hook" }>;

/**
 * 0-3s. The job here is one idea, legible in the first frame, plus a reason to
 * keep watching. Three treatments so reels sharing a brand still open
 * differently:
 *   stack — type only on white, the cleanest possible first frame
 *   wipe  — a blue block wipes off the frame to uncover the line
 *   split — type on white over a graphic that slides up from the bottom
 */
export const HookScene: React.FC<Props> = ({
  kicker,
  lines,
  emphasiseLine,
  backdrop,
  treatment,
}) => {
  const frame = useCurrentFrame();
  const onDark = treatment === "wipe";

  return (
    <AbsoluteFill style={{ backgroundColor: onDark ? COLORS.ink : COLORS.paper }}>
      {backdrop && treatment === "split" ? (
        <AbsoluteFill
          style={{
            top: "auto",
            height: 900,
            bottom: 0,
            overflow: "hidden",
            translate: `0px ${interpolate(frame, [4, 24], [900, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            })}px`,
          }}
        >
          <MediaFrame media={backdrop} move="push" />
          <Scrim from="top" strength={0.25} />
        </AbsoluteFill>
      ) : null}

      {treatment === "wipe" ? (
        <AbsoluteFill
          style={{
            backgroundColor: COLORS.blue,
            translate: `0px ${interpolate(frame, [6, 22], [0, -1920], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.76, 0, 0.24, 1),
            })}px`,
          }}
        />
      ) : null}

      {/*
        The whole hook block is present and readable on frame 0 — a reel that
        opens on an empty white frame has wasted the only moment it is
        guaranteed. The movement is a settle of the block, not an entrance of
        the words, so nothing is ever unreadable.
      */}
      <SafeArea
        justify={treatment === "split" ? "flex-start" : "center"}
        style={{
          scale: `${interpolate(frame, [0, 18], [0.972, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          })}`,
        }}
      >
        {kicker ? (
          <Kicker color={onDark ? COLORS.blueSoft : COLORS.blue} immediate>
            {kicker}
          </Kicker>
        ) : null}

        {lines.map((line, i) => (
          <React.Fragment key={i}>
            <RiseLine
              index={i}
              immediate
              delay={0}
              stagger={0}
              fontSize={lines.length > 2 ? TYPE.hook : TYPE.hookXL}
              weight={900}
              color={onDark ? COLORS.onInk : COLORS.ink}
            >
              {line}
            </RiseLine>
            {emphasiseLine === i ? (
              <Underline
                delay={8}
                height={16}
                width="58%"
                color={onDark ? COLORS.onInk : COLORS.blue}
              />
            ) : null}
          </React.Fragment>
        ))}
      </SafeArea>

      {!onDark ? <Grain /> : null}
    </AbsoluteFill>
  );
};
