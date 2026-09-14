import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, TYPE } from "../brand/tokens";
import { FONT_FAMILY } from "../brand/fonts";
import { MediaFrame } from "../components/MediaFrame";
import { Scrim } from "../components/ui";
import type { Scene } from "../config/types";

type Props = Extract<Scene, { type: "beforeAfter" }>;

const Tag: React.FC<{ text: string; side: "left" | "right"; dark?: boolean }> = ({
  text,
  side,
  dark,
}) => (
  <div
    style={{
      position: "absolute",
      top: 300,
      [side]: 96,
      backgroundColor: dark ? COLORS.ink : COLORS.paper,
      color: dark ? COLORS.onInk : COLORS.ink,
      fontFamily: FONT_FAMILY,
      fontSize: TYPE.label,
      fontWeight: 800,
      letterSpacing: TYPE.trackWide,
      padding: "16px 26px",
      borderRadius: 4,
    }}
  >
    {text}
  </div>
);

/**
 * Matched before / after.
 *
 * A hard guard: `before` and `after` must carry the same `sceneId`. Pairing two
 * different rooms would misrepresent the work, so the component refuses to
 * render rather than quietly producing a dishonest comparison.
 *
 * The wipe is a vertical edge travelling left to right with a blue seam, so the
 * viewer sees the same framing in both states.
 */
export const BeforeAfterScene: React.FC<Props> = ({
  before,
  after,
  beforeLabel,
  afterLabel,
  switchAtFrame,
  demoTreatment,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  if (before.sceneId !== after.sceneId) {
    throw new Error(
      `beforeAfter requires the same property and scene on both sides. ` +
        `Got before.sceneId="${before.sceneId}" and after.sceneId="${after.sceneId}". ` +
        `Pairing unrelated imagery would misrepresent the work.`,
    );
  }

  const start = switchAtFrame ?? Math.round(durationInFrames * 0.42);
  const wipe = interpolate(frame, [start, start + 26], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.72, 0, 0.16, 1),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
      {/* BEFORE — the still, held perfectly static so the contrast is motion. */}
      <AbsoluteFill>
        <MediaFrame media={before} move="still" grade={demoTreatment ? "flat" : "none"} />
      </AbsoluteFill>

      {/* AFTER — revealed by the wipe, and moving. */}
      <AbsoluteFill style={{ clipPath: `inset(0 0 0 ${100 - wipe}%)` }}>
        <MediaFrame media={after} move="push" grade={demoTreatment ? "graded" : "none"} />
      </AbsoluteFill>

      {/* the seam */}
      {wipe > 0.5 && wipe < 99.5 ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${100 - wipe}%`,
            width: 8,
            backgroundColor: COLORS.blue,
            boxShadow: "0 0 60px rgba(29,78,216,0.8)",
          }}
        />
      ) : null}

      <Scrim from="both" strength={0.55} />

      <Tag
        text={beforeLabel}
        side="left"
        dark={false}
      />
      <div
        style={{
          opacity: interpolate(frame, [start + 8, start + 20], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Tag text={afterLabel} side="right" dark />
      </div>
    </AbsoluteFill>
  );
};
