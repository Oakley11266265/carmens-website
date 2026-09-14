/**
 * The renderer. Takes a ReelConfig and plays it.
 *
 * Nothing about any individual reel lives here — add a config file and it
 * renders. Adding a new *kind* of scene means adding a case to `renderScene`
 * and a variant to the schema; everything else is data.
 */
import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";

import type { ReelConfig, Scene, Transition } from "./config/types";
import { sceneStarts, totalFrames } from "./config/types";
import { COLORS } from "./brand/tokens";
import { CornerMark, ProgressRail } from "./components/ui";
import { Wordmark } from "./brand/Wordmark";
import "./brand/fonts";

import { HookScene } from "./scenes/HookScene";
import { PhotoRevealScene } from "./scenes/PhotoRevealScene";
import { BeforeAfterScene } from "./scenes/BeforeAfterScene";
import { FootageScene } from "./scenes/FootageScene";
import { FeatureCalloutScene } from "./scenes/FeatureCalloutScene";
import { ProcessScene } from "./scenes/ProcessScene";
import { CompareScene } from "./scenes/CompareScene";
import { StatementScene } from "./scenes/StatementScene";
import { PhotoStackScene } from "./scenes/PhotoStackScene";
import { EndCardScene } from "./scenes/EndCardScene";

const renderScene = (scene: Scene): React.ReactNode => {
  switch (scene.type) {
    case "hook":
      return <HookScene {...scene} />;
    case "photoReveal":
      return <PhotoRevealScene {...scene} />;
    case "beforeAfter":
      return <BeforeAfterScene {...scene} />;
    case "footage":
      return <FootageScene {...scene} />;
    case "featureCallout":
      return <FeatureCalloutScene {...scene} />;
    case "process":
      return <ProcessScene {...scene} />;
    case "compare":
      return <CompareScene {...scene} />;
    case "statement":
      return <StatementScene {...scene} />;
    case "photoStack":
      return <PhotoStackScene {...scene} />;
    case "endCard":
      return <EndCardScene {...scene} />;
  }
};

/**
 * Builds the transition element. Written as a switch that returns a finished
 * element per branch so each presentation keeps its own prop type — a shared
 * `presentation` variable would widen to a union TypeScript cannot accept.
 */
const transitionElement = (t: Transition, key: string): React.ReactNode => {
  const frames = t.durationInFrames;
  const spring = springTiming({ config: { damping: 200 }, durationInFrames: frames });
  const linear = linearTiming({ durationInFrames: frames });

  switch (t.presentation) {
    case "slideUp":
      return (
        <TransitionSeries.Transition
          key={key}
          presentation={slide({ direction: "from-bottom" })}
          timing={spring}
        />
      );
    case "slideLeft":
      return (
        <TransitionSeries.Transition
          key={key}
          presentation={slide({ direction: "from-right" })}
          timing={spring}
        />
      );
    case "wipeUp":
      return (
        <TransitionSeries.Transition
          key={key}
          presentation={wipe({ direction: "from-bottom" })}
          timing={linear}
        />
      );
    case "fade":
    case "cut":
    default:
      return <TransitionSeries.Transition key={key} presentation={fade()} timing={linear} />;
  }
};

/** Scenes that sit on white and therefore need the dark brand bug. */
const LIGHT_SCENES: Scene["type"][] = [
  "hook",
  "process",
  "statement",
  "endCard",
  "compare",
  "photoStack",
];

const Bug: React.FC<{ reel: ReelConfig }> = ({ reel }) => {
  const frame = useCurrentFrame();
  const starts = sceneStarts(reel);
  // Find the scene under the playhead so the bug can pick its colour.
  let idx = 0;
  for (let i = 0; i < starts.length; i++) {
    if (frame >= starts[i]) idx = i;
  }
  const scene = reel.scenes[idx];
  const onLight = LIGHT_SCENES.includes(scene.type) && !(scene.type === "statement" && scene.invert);
  // Hidden on the end card (which carries the full wordmark) and on compare
  // scenes (where the split panels leave no corner that reliably holds it).
  if (scene.type === "endCard" || scene.type === "compare") return null;
  return (
    <CornerMark invert={!onLight}>
      <Wordmark
        size={26}
        color={onLight ? COLORS.ink : COLORS.onInk}
        accent={onLight ? COLORS.blue : COLORS.blueSoft}
      />
    </CornerMark>
  );
};

/** Music bed with a tail fade, plus optional voiceover ducking. */
const Soundtrack: React.FC<{ reel: ReelConfig }> = ({ reel }) => {
  const { durationInFrames } = useVideoConfig();
  const { audio } = reel;
  if (!audio.music && !audio.voiceover) return null;

  const fadeStart = durationInFrames - audio.fadeOutFrames;

  return (
    <>
      {audio.music ? (
        <Audio
          src={staticFile(audio.music)}
          volume={(f) => {
            const tail = interpolate(f, [fadeStart, durationInFrames - 1], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const intro = interpolate(f, [0, 12], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            // Duck the bed for the whole voiceover if one is present.
            const duck = audio.voiceover ? audio.duckTo : 1;
            return audio.musicVolume * tail * intro * duck;
          }}
        />
      ) : null}
      {audio.voiceover ? (
        <Audio src={staticFile(audio.voiceover)} volume={() => audio.voiceoverVolume} />
      ) : null}
    </>
  );
};

/** Sound effects, fired on the first frame of the scenes that declare one. */
const SoundEffects: React.FC<{ reel: ReelConfig }> = ({ reel }) => {
  const starts = sceneStarts(reel);
  return (
    <>
      {reel.scenes.map((scene, i) =>
        scene.sfx ? (
          <Sequence key={i} from={starts[i]} layout="none" name={`sfx-${i}`}>
            <Audio src={staticFile(scene.sfx)} volume={() => reel.audio.sfxVolume} />
          </Sequence>
        ) : null,
      )}
    </>
  );
};

export const Reel: React.FC<{ reel: ReelConfig }> = ({ reel }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: reel.brand.paper ?? COLORS.paper }}>
      <TransitionSeries>
        {reel.scenes.flatMap((scene, i) => {
          const nodes: React.ReactNode[] = [
            <TransitionSeries.Sequence
              key={`s-${i}`}
              durationInFrames={scene.durationInFrames}
              name={`${i + 1}. ${scene.type}`}
            >
              {renderScene(scene)}
            </TransitionSeries.Sequence>,
          ];
          const t = reel.transitions[i];
          if (t && t.durationInFrames > 0) {
            nodes.push(transitionElement(t, `t-${i}`));
          }
          return nodes;
        })}
      </TransitionSeries>

      <ProgressRail total={totalFrames(reel)} />
      <Bug reel={reel} />
      <Soundtrack reel={reel} />
      <SoundEffects reel={reel} />
    </AbsoluteFill>
  );
};

export { totalFrames };
