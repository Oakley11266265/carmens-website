import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../brand/tokens";
import { MediaFrame } from "../components/MediaFrame";
import { MediaCaption, Scrim } from "../components/ui";
import type { Scene } from "../config/types";

type Props = Extract<Scene, { type: "footage" }>;

/** Full-bleed property moment with at most one line of type over it. */
export const FootageScene: React.FC<Props> = ({ media, caption, move }) => (
  <AbsoluteFill style={{ backgroundColor: COLORS.ink }}>
    <MediaFrame media={media} move={move} />
    {/* The scrim is unconditional: it also gives the brand bug in the
        bottom-left something to sit on. */}
    <Scrim from="bottom" strength={0.88} />
    {caption ? <MediaCaption>{caption}</MediaCaption> : null}
  </AbsoluteFill>
);
