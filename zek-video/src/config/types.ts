/**
 * The editable layer of the ZEK reel system.
 *
 * A reel is data: a hook, a list of scenes, brand overrides, an audio bed and
 * an output filename. `src/Reel.tsx` turns that data into a video. To make a
 * new reel you write one config file — you should not need to touch a
 * component.
 */
import { z } from "zod";

/* ------------------------------------------------------------------ media */

/**
 * A media slot. Three kinds:
 *  - `video`  real footage from public/ (this is what a finished reel should use)
 *  - `photo`  a still from public/
 *  - `plate`  a code-built graphic stand-in, used when no footage is available
 *
 * `plate` exists so the whole reel can be built, timed and rendered before the
 * real assets arrive. Swapping a plate for footage is a two-line edit.
 */
export const mediaSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("video"),
    /** Path inside public/, e.g. "media/clips/ridgeline-living.mp4" */
    src: z.string(),
    /** Natural duration of the file in seconds. */
    durationInSeconds: z.number().optional(),
    /** Start this many seconds into the file. */
    startFromSeconds: z.number().default(0),
    /** Which property / scene this shows. Used for continuity checks. */
    sceneId: z.string(),
  }),
  z.object({
    kind: z.literal("photo"),
    src: z.string(),
    sceneId: z.string(),
  }),
  z.object({
    kind: z.literal("plate"),
    /** Key into src/placeholder/plates.ts */
    plate: z.string(),
    sceneId: z.string(),
  }),
]);
export type Media = z.infer<typeof mediaSchema>;

/* ----------------------------------------------------------------- scenes */

const base = {
  /** Length of this scene in frames, before any transition overlap. */
  durationInFrames: z.number().int().positive(),
  /** Optional sound effect fired on the scene's first frame. */
  sfx: z.string().optional(),
};

export const sceneSchema = z.discriminatedUnion("type", [
  /** 0-3s. One idea, one line, one strong frame. */
  z.object({
    type: z.literal("hook"),
    ...base,
    kicker: z.string().optional(),
    /** Up to three short lines. Each lands on its own beat. */
    lines: z.array(z.string()).min(1).max(3),
    /** Which line gets the blue underline. */
    emphasiseLine: z.number().int().optional(),
    /** Optional graphic behind the type. */
    backdrop: mediaSchema.optional(),
    treatment: z.enum(["stack", "wipe", "split"]).default("stack"),
  }),

  /** A still lifting off a white page and becoming a moving frame. */
  z.object({
    type: z.literal("photoReveal"),
    ...base,
    media: mediaSchema,
    caption: z.string().optional(),
    label: z.string().optional(),
  }),

  /**
   * Matched before/after. `before` and `after` MUST be the same property and
   * the same scene — the runtime throws if their sceneIds differ.
   */
  z.object({
    type: z.literal("beforeAfter"),
    ...base,
    before: mediaSchema,
    after: mediaSchema,
    beforeLabel: z.string().default("THE PHOTO"),
    afterLabel: z.string().default("THE FILM"),
    /** Frame (relative to scene start) where the wipe crosses the frame. */
    switchAtFrame: z.number().int().optional(),
    /**
     * Grades the "before" side flat and the "after" side finished, so the two
     * halves read differently even in a paused frame.
     *
     * ONLY for plate-based demos. With real client media this MUST stay false:
     * the difference the viewer sees has to be the real difference between the
     * photo and the finished clip, not a filter applied to make a point.
     */
    demoTreatment: z.boolean().default(false),
  }),

  /** Full-bleed footage with an optional single line of type. */
  z.object({
    type: z.literal("footage"),
    ...base,
    media: mediaSchema,
    caption: z.string().optional(),
    /** Slow push / pull applied on top of the media. */
    move: z.enum(["push", "pull", "driftLeft", "driftRight", "still"]).default("push"),
  }),

  /** A property moment with a named feature pinned to it. */
  z.object({
    type: z.literal("featureCallout"),
    ...base,
    media: mediaSchema,
    feature: z.string(),
    note: z.string().optional(),
    anchor: z.enum(["top", "bottom"]).default("bottom"),
  }),

  /** The three-step process block. */
  z.object({
    type: z.literal("process"),
    ...base,
    title: z.string().optional(),
    steps: z.array(z.string()).min(2).max(4),
    footnote: z.string().optional(),
  }),

  /** Two options presented side by side, then one is chosen. */
  z.object({
    type: z.literal("compare"),
    ...base,
    title: z.string().optional(),
    optionALabel: z.string(),
    optionBLabel: z.string(),
    optionA: mediaSchema,
    optionB: mediaSchema,
    verdict: z.string().optional(),
    /** 0 = A wins, 1 = B wins, null = no verdict. */
    winner: z.union([z.literal(0), z.literal(1)]).nullable().default(null),
  }),

  /** A statement card. Bold type on white or on black. */
  z.object({
    type: z.literal("statement"),
    ...base,
    lines: z.array(z.string()).min(1).max(3),
    kicker: z.string().optional(),
    invert: z.boolean().default(false),
    emphasiseLine: z.number().int().optional(),
  }),

  /** A stack of stills dealt onto the page, then one is chosen. */
  z.object({
    type: z.literal("photoStack"),
    ...base,
    title: z.string().optional(),
    kicker: z.string().optional(),
    /** 3-5 stills. They should all belong to the same property. */
    photos: z.array(mediaSchema).min(2).max(5),
    /** Index of the photo that stays and grows. */
    pick: z.number().int().default(0),
    caption: z.string().optional(),
  }),

  /** 23-30s. CTA plus the secondary follow line. */
  z.object({
    type: z.literal("endCard"),
    ...base,
    question: z.string(),
    /** The dominant instruction. */
    cta: z.string(),
    /** Smaller line under the CTA. */
    secondary: z.string(),
    handle: z.string().optional(),
  }),
]);
export type Scene = z.infer<typeof sceneSchema>;

/* ------------------------------------------------------------ transitions */

export const transitionSchema = z.object({
  presentation: z.enum(["fade", "slideUp", "slideLeft", "wipeUp", "cut"]),
  durationInFrames: z.number().int().nonnegative(),
});
export type Transition = z.infer<typeof transitionSchema>;

/* ------------------------------------------------------------------ audio */

export const audioSchema = z.object({
  /** Path inside public/, e.g. "audio/music-reveal.m4a". Empty = silent. */
  music: z.string(),
  musicVolume: z.number().min(0).max(1).default(0.62),
  /** Frames over which the bed fades out at the end. */
  fadeOutFrames: z.number().int().default(45),
  sfxVolume: z.number().min(0).max(1).default(0.5),
  /** Optional voiceover file. Music ducks under it automatically. */
  voiceover: z.string().optional(),
  voiceoverVolume: z.number().min(0).max(1).default(1),
  /** How far the bed drops while the voiceover plays. */
  duckTo: z.number().min(0).max(1).default(0.28),
});
export type AudioConfig = z.infer<typeof audioSchema>;

/* ------------------------------------------------------------------ brand */

export const brandSchema = z.object({
  /** Path inside public/ to a logo file. Falls back to the text wordmark. */
  logo: z.string().optional(),
  paper: z.string().optional(),
  ink: z.string().optional(),
  accent: z.string().optional(),
  handle: z.string().default("@zekagency"),
  site: z.string().default("zekagency.com"),
});
export type BrandConfig = z.infer<typeof brandSchema>;

/* ------------------------------------------------------------------- reel */

export const reelSchema = z.object({
  id: z.string(),
  title: z.string(),
  /** id of the entry in src/config/hooks.ts this reel's hook came from. */
  hookId: z.string(),
  /** What the reel must actually prove. Kept next to the hook on purpose. */
  payoff: z.string(),
  outputFileName: z.string(),
  brand: brandSchema,
  audio: audioSchema,
  scenes: z.array(sceneSchema).min(1),
  /** transitions[i] sits between scenes[i] and scenes[i+1]. */
  transitions: z.array(transitionSchema),
  /** Frame used for the cover image. */
  coverFrame: z.number().int().default(0),
});
export type ReelConfig = z.infer<typeof reelSchema>;

/**
 * Total length of a reel. Transitions overlap their neighbours, so they are
 * subtracted from the sum of the scene durations.
 */
export const totalFrames = (reel: ReelConfig): number => {
  const scenes = reel.scenes.reduce((a, s) => a + s.durationInFrames, 0);
  const overlap = reel.transitions.reduce((a, t) => a + t.durationInFrames, 0);
  return scenes - overlap;
};

/** Frame at which each scene starts, accounting for transition overlap. */
export const sceneStarts = (reel: ReelConfig): number[] => {
  const out: number[] = [];
  let cursor = 0;
  reel.scenes.forEach((scene, i) => {
    out.push(cursor);
    cursor += scene.durationInFrames - (reel.transitions[i]?.durationInFrames ?? 0);
  });
  return out;
};

/**
 * Music-locked timing helper.
 *
 * A transition overlaps its two neighbours, which drags every later scene
 * earlier and breaks sync with the music bed. `onGrid` takes scene durations
 * written on the musical grid (bars and beats) and lengthens each scene by the
 * transition that follows it, so the *start* of every scene stays exactly where
 * the grid put it and the reel's total length is simply the sum of the grid
 * values.
 *
 * Write grid values in the config; let this do the arithmetic.
 */
export const onGrid = (
  scenes: Scene[],
  transitions: Transition[],
): { scenes: Scene[]; transitions: Transition[] } => ({
  scenes: scenes.map((scene, i) => ({
    ...scene,
    durationInFrames: scene.durationInFrames + (transitions[i]?.durationInFrames ?? 0),
  })),
  transitions,
});
