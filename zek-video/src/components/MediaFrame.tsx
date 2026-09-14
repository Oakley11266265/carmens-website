/**
 * The one place that turns a `Media` config entry into pixels.
 *
 * Handles three sources — real footage, a still photo, and a code-built plate —
 * behind one interface, so every scene component is written once and keeps
 * working when a plate is swapped for footage.
 *
 * Camera moves are applied here rather than in the scenes, so the motion
 * language stays consistent across the whole system.
 */
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Easing,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Img,
} from "remotion";
import { Video } from "@remotion/media";
import type { Media } from "../config/types";
import { getPlate, PLATE_VIEWBOX } from "../placeholder/plates";
import { COLORS } from "../brand/tokens";

export type CameraMove = "push" | "pull" | "driftLeft" | "driftRight" | "still";

/** Scale + offset for a move, as a function of progress 0..1. */
const cameraFor = (move: CameraMove, p: number) => {
  switch (move) {
    // Amplitudes are deliberately small. A big push crops the frame hard, and
    // these compositions are built to be seen whole.
    case "push":
      return { scale: 1.0 + 0.09 * p, x: 0, y: -14 * p };
    case "pull":
      return { scale: 1.09 - 0.09 * p, x: 0, y: 10 * p };
    case "driftLeft":
      return { scale: 1.06, x: 32 - 64 * p, y: 0 };
    case "driftRight":
      return { scale: 1.06, x: -32 + 64 * p, y: 0 };
    case "still":
    default:
      return { scale: 1.0, x: 0, y: 0 };
  }
};

/**
 * Plates are drawn as layered SVG so a camera move can separate the layers.
 * Layer `z` scales how far that layer travels, which is what reads as depth.
 */
const PlateRender: React.FC<{ plateId: string; move: CameraMove; progress: number }> = ({
  plateId,
  move,
  progress,
}) => {
  const plate = getPlate(plateId);
  const cam = cameraFor(move, progress);

  const dusk = plate.mood === "dusk";

  return (
    <AbsoluteFill style={{ backgroundColor: dusk ? "#070C18" : COLORS.paper }}>
      {plate.layers.map((layer, i) => {
        // Deeper layers move less; near layers move more.
        const travel = 0.35 + layer.z * 0.9;
        return (
          <AbsoluteFill
            key={i}
            style={{
              scale: 1 + (cam.scale - 1) * travel,
              translate: `${cam.x * travel}px ${cam.y * travel}px`,
            }}
          >
            <svg
              viewBox={`0 0 ${PLATE_VIEWBOX.W} ${PLATE_VIEWBOX.H}`}
              width="100%"
              height="100%"
              // "slice" is the SVG equivalent of objectFit: cover. Without it a
              // plate dropped into a container that is not 9:16 (a compare
              // panel, a photo card) is letterboxed instead of filling, and the
              // artwork shrinks to a strip in the middle. Aspect ratio is
              // preserved either way, so nothing is ever stretched.
              preserveAspectRatio="xMidYMid slice"
              style={{ display: "block" }}
            >
              {layer.children}
            </svg>
          </AbsoluteFill>
        );
      })}

      {/*
        A grade pass over the whole plate. Flat vector fills read as an
        infographic; a vignette plus a warm/cool wash is most of what separates
        that from something that reads as a frame of film. Applied here rather
        than per-plate so every plate gets it.
      */}
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          backgroundImage: dusk
            ? "radial-gradient(120% 78% at 50% 42%, rgba(255,214,150,0.10) 0%, rgba(8,14,28,0) 44%, rgba(4,7,16,0.78) 100%)"
            : "radial-gradient(118% 76% at 50% 40%, rgba(255,246,226,0.30) 0%, rgba(255,255,255,0) 40%, rgba(24,32,52,0.30) 100%)",
        }}
      />
      <AbsoluteFill
        style={{
          pointerEvents: "none",
          backgroundImage: dusk
            ? "linear-gradient(to bottom, rgba(24,54,110,0.30) 0%, rgba(0,0,0,0) 46%)"
            : "linear-gradient(to bottom, rgba(255,241,214,0.22) 0%, rgba(0,0,0,0) 38%, rgba(21,32,56,0.14) 100%)",
          mixBlendMode: "multiply",
        }}
      />
    </AbsoluteFill>
  );
};

export const MediaFrame: React.FC<{
  media: Media;
  move?: CameraMove;
  /** Override progress (0..1). Defaults to this sequence's own progress. */
  progress?: number;
  style?: React.CSSProperties;
  /** Muted by default: the reels carry their own music bed. */
  muted?: boolean;
  /**
   * Colour treatment. "flat" is a deliberately un-graded, snapshot-looking
   * pass; "graded" is the finished look. See BeforeAfterScene for the one
   * place this is used and why it must be switched off for real client media.
   */
  grade?: "none" | "flat" | "graded";
}> = ({ media, move = "push", progress, style, muted = true, grade = "none" }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const p =
    progress ??
    interpolate(frame, [0, Math.max(1, durationInFrames - 1)], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.33, 0, 0.2, 1),
    });

  const cam = cameraFor(move, p);

  const filter =
    grade === "flat"
      ? "saturate(0.5) contrast(0.9) brightness(1.06)"
      : grade === "graded"
        ? "saturate(1.1) contrast(1.1)"
        : undefined;

  if (media.kind === "plate") {
    return (
      <AbsoluteFill style={{ filter, ...style }}>
        <PlateRender plateId={media.plate} move={move} progress={p} />
      </AbsoluteFill>
    );
  }

  if (media.kind === "photo") {
    return (
      <AbsoluteFill style={{ backgroundColor: COLORS.ink, filter, ...style }}>
        <Img
          src={staticFile(media.src)}
          style={{
            width: "100%",
            height: "100%",
            // `cover` keeps aspect ratio: media is cropped, never stretched.
            objectFit: "cover",
            scale: cam.scale,
            translate: `${cam.x}px ${cam.y}px`,
          }}
        />
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.ink, filter, ...style }}>
      <Video
        src={staticFile(media.src)}
        trimBefore={Math.round((media.startFromSeconds ?? 0) * fps)}
        volume={() => (muted ? 0 : 1)}
        // objectFit must be a prop on <Video>; passed via `style` it is
        // ignored, and footage that is not 9:16 would be stretched.
        objectFit="cover"
        style={{
          width: "100%",
          height: "100%",
          scale: cam.scale,
          translate: `${cam.x}px ${cam.y}px`,
        }}
      />
    </AbsoluteFill>
  );
};

/** Label shown by QC tooling and the manifest. */
export const mediaLabel = (media: Media): string => {
  if (media.kind === "plate") return `plate:${media.plate}`;
  return `${media.kind}:${media.src}`;
};
