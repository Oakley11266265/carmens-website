import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS, TYPE } from "../brand/tokens";
import { FONT_FAMILY } from "../brand/fonts";
import { MediaFrame } from "../components/MediaFrame";
import { Grain, Kicker } from "../components/ui";
import type { Scene } from "../config/types";

type Props = Extract<Scene, { type: "photoStack" }>;

/**
 * The library the owner already has: stills dealt onto the page one beat
 * apart, then the picked one lifts clear of the pile.
 *
 * This is the visual argument behind "you may not need another shoot" — the
 * viewer sees the raw material before they are told what it is for.
 */
export const PhotoStackScene: React.FC<Props> = ({ title, kicker, photos, pick, caption }) => {
  const frame = useCurrentFrame();

  const CARD_W = 450;
  const CARD_H = 620;
  /** Push the pile below the title block so it never covers the copy. */
  const STACK_OFFSET_Y = 130;

  // Fanned resting positions, in card index order.
  const rest = [
    { x: -150, y: 40, r: -8 },
    { x: 130, y: -50, r: 6 },
    { x: -60, y: -180, r: -3 },
    { x: 165, y: 150, r: 9 },
    { x: -180, y: 220, r: -11 },
  ];

  const lift = interpolate(frame, [photos.length * 9 + 22, photos.length * 9 + 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.paper,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {photos.map((photo, i) => {
        const at = i * 9;
        const deal = interpolate(frame, [at, at + 16], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        });
        const slot = rest[i % rest.length];
        const isPick = i === pick;

        // The picked card centres, squares up and grows; the rest slide away.
        const x = interpolate(lift, [0, 1], [slot.x, isPick ? 0 : slot.x * 2.1]);
        const y = interpolate(lift, [0, 1], [slot.y, isPick ? 0 : slot.y * 2.1]);
        const r = interpolate(lift, [0, 1], [slot.r, isPick ? 0 : slot.r * 1.8]);
        const w = interpolate(lift, [0, 1], [CARD_W, isPick ? 660 : CARD_W]);
        const h = interpolate(lift, [0, 1], [CARD_H, isPick ? 910 : CARD_H]);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              width: w,
              height: h,
              backgroundColor: COLORS.paper,
              padding: 16,
              paddingBottom: 54,
              boxShadow: "0 34px 70px rgba(11,11,12,0.20), 0 4px 14px rgba(11,11,12,0.10)",
              translate: `${x}px ${
                interpolate(deal, [0, 1], [y + 420, y]) + STACK_OFFSET_Y
              }px`,
              rotate: `${r}deg`,
              opacity: deal * (isPick ? 1 : interpolate(lift, [0, 1], [1, 0])),
              zIndex: isPick ? 10 : i,
            }}
          >
            <div style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
              <MediaFrame media={photo} move="still" />
            </div>
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          top: 260,
          left: 96,
          right: 96,
          opacity: interpolate(frame, [2, 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {kicker ? <Kicker delay={2}>{kicker}</Kicker> : null}
        {title ? (
          <div
            style={{
              fontFamily: FONT_FAMILY,
              fontSize: TYPE.subhead,
              fontWeight: 900,
              letterSpacing: TYPE.trackTight,
              lineHeight: TYPE.lineSnug,
              color: COLORS.ink,
            }}
          >
            {title}
          </div>
        ) : null}

        {/* Sits directly under the title rather than at the foot of the frame:
            the cards occupy the bottom half, and type over them is unreadable. */}
        {caption ? (
          <div
            style={{
              marginTop: 16,
              fontFamily: FONT_FAMILY,
              fontSize: TYPE.body,
              fontWeight: 800,
              lineHeight: TYPE.lineBody,
              color: COLORS.blue,
              opacity: lift,
            }}
          >
            {caption}
          </div>
        ) : null}
      </div>


      <Grain />
    </AbsoluteFill>
  );
};
