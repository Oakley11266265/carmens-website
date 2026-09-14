import React from "react";
import { Composition, Folder, Still } from "remotion";
import { FPS, HEIGHT, WIDTH } from "./brand/tokens";
import { Reel } from "./Reel";
import { Cover } from "./Cover";
import { totalFrames, type ReelConfig } from "./config/types";
import { reel01 } from "./config/reel-01-photos-into-film";
import { reel02 } from "./config/reel-02-use-what-you-have";
import { reel03 } from "./config/reel-03-opening-shot";
import { HOOK_VARIANTS } from "./config/hook-variants";
import "./brand/fonts";

const REELS: ReelConfig[] = [reel01, reel02, reel03];

const reelComposition = (reel: ReelConfig) => (
  <Composition
    key={reel.id}
    id={reel.id}
    component={Reel}
    durationInFrames={totalFrames(reel)}
    fps={FPS}
    width={WIDTH}
    height={HEIGHT}
    defaultProps={{ reel }}
  />
);

const coverStill = (reel: ReelConfig) => (
  <Still
    key={`${reel.id}-Cover`}
    id={`${reel.id}-Cover`}
    component={Cover}
    width={WIDTH}
    height={HEIGHT}
    defaultProps={{ reel }}
  />
);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {REELS.map(reelComposition)}

      <Folder name="Covers">{REELS.map(coverStill)}</Folder>

      {/* Same reel, different first three seconds. See config/hook-variants.ts */}
      <Folder name="Hook-variants">{HOOK_VARIANTS.map(reelComposition)}</Folder>
    </>
  );
};
