/**
 * Swappable openings.
 *
 * The point of this file: the first three seconds are the only part that
 * changes. Everything from the reveal onward is byte-identical to the parent
 * reel, so if one opening outperforms another you know it was the opening.
 *
 * Add a variant here, it appears in Studio and in `npx remotion compositions`
 * automatically. Do NOT read anything into which variant "wins" until real
 * numbers exist — there are none yet.
 */
import type { ReelConfig, Scene } from "./types";
import { getHook } from "./hooks";
import { reel01 } from "./reel-01-photos-into-film";

/** Replaces scene 0 (which must be the hook) and nothing else. */
const withHook = (
  base: ReelConfig,
  hookId: string,
  overrides: Partial<Extract<Scene, { type: "hook" }>>,
  idSuffix: string,
): ReelConfig => {
  const first = base.scenes[0];
  if (first.type !== "hook") {
    throw new Error(`${base.id}: scene 0 must be the hook to swap it.`);
  }
  const hook = getHook(hookId);
  if (hook.status !== "ready") {
    throw new Error(
      `Hook "${hookId}" is marked ${hook.status}. It needs: ${hook.evidenceRequired}`,
    );
  }
  return {
    ...base,
    id: `${base.id}-${idSuffix}`,
    hookId,
    outputFileName: base.outputFileName.replace(/\.mp4$/, `-${idSuffix}.mp4`),
    scenes: [{ ...first, ...overrides }, ...base.scenes.slice(1)],
  };
};

/** Reel 01, opened with hook 20 instead of hook 04. */
export const reel01HookB = withHook(
  reel01,
  "h20-this-vs-that",
  {
    kicker: "Property owners",
    lines: ["This is the", "photo.", "This is the film."],
    emphasiseLine: 2,
    treatment: "stack",
  },
  "hookB",
);

/** Reel 01, opened with hook 19. */
export const reel01HookC = withHook(
  reel01,
  "h19-need-to-talk",
  {
    kicker: "Hosts and managers",
    lines: ["We need to", "talk about", "your camera roll."],
    emphasiseLine: 2,
    treatment: "wipe",
  },
  "hookC",
);

export const HOOK_VARIANTS: ReelConfig[] = [reel01HookB, reel01HookC];
