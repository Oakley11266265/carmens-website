import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { Reel } from "./Reel";
import type { ReelConfig } from "./config/types";
import { totalFrames } from "./config/types";

/**
 * The cover image (Instagram's grid thumbnail) is just the reel held at a
 * chosen frame, so the cover can never drift out of sync with the video.
 * Pick the frame with `coverFrame` in the reel config.
 */
export const Cover: React.FC<{ reel: ReelConfig }> = ({ reel }) => (
  <AbsoluteFill>
    <Sequence
      from={-reel.coverFrame}
      durationInFrames={totalFrames(reel) + reel.coverFrame}
      layout="none"
    >
      <Reel reel={reel} />
    </Sequence>
  </AbsoluteFill>
);
