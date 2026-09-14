# ZEK Agency — reel production system

A reusable Remotion project for ZEK Agency's cinematic property walkthrough
service: a component library, a data-driven config layer, an original score,
and three finished vertical reels.

Built with [Remotion](https://www.remotion.dev) 4.0.524 and the official
[Remotion Agent Skills](https://github.com/remotion-dev/skills) (installed at
`.agents/skills/`).

---

## ⚠️ Read this first

**The three rendered reels use code-built placeholder graphics, not property
photography or footage.** No real media could be obtained in the build
environment — `zekagency.com` and every stock/asset host are blocked by the
network egress policy, and generated images land on a blocked CDN. Details and
the exact list of what is missing: [`docs/ASSET-MANIFEST.md`](docs/ASSET-MANIFEST.md).

The system, the timing, the score and the edit are all real and finished. The
imagery is the part waiting on you. Swapping it is a one-line-per-slot edit:
[`docs/SWAPPING-MEDIA.md`](docs/SWAPPING-MEDIA.md).

Nothing in these reels may be presented as client work, a real property, or a
verified before/after.

---

## Quick start

```bash
npm install
npx remotion studio --no-open      # interactive preview
./scripts/render-all.sh            # render all three reels + covers to out/
```

## What's here

```
src/
  brand/          tokens.ts (colour, type scale, safe areas), fonts, Wordmark
  config/         the editable layer — one file per reel, plus the hook bank
  components/     MediaFrame (video|photo|plate behind one interface), ui primitives
  scenes/         the nine scene components
  placeholder/    code-built SVG property plates
  Reel.tsx        turns a ReelConfig into a video
  Root.tsx        composition registry
scripts/
  make_audio.py   synthesises the original music beds and SFX
  encode_audio.sh WAV → AAC
  qc-frames.mjs   renders stills at every scene boundary into out/qc/
  render-all.sh   final export
docs/             manifest, hook bank, captions, swap instructions
public/           fonts, audio (and your media, when you add it)
out/              rendered output
```

## The three reels

| Composition | Length | Hook | Payoff |
|---|---|---|---|
| `Reel01-PhotosIntoFilm` | 28.0 s | "This feels illegal to know." | A cinematic film can start from photos you already have |
| `Reel02-UseWhatYouHave` | 26.0 s | "You might not agree with this." | Your property may not need another photo shoot |
| `Reel03-OpeningShot` | 29.0 s | "Have you ever noticed how it opens?" | The opening shot sets the feeling of a property video |

All 1080 × 1920, 30 fps, H.264 + AAC. Each has a matching `-Cover` still and an
Instagram caption in [`docs/CAPTIONS.md`](docs/CAPTIONS.md).

Two hook variants of Reel 01 (`-hookB`, `-hookC`) are registered under
`Hook-variants` — same reel, different first three seconds, so retention
differences are attributable to the opening.

## How it's put together

**Reels are data.** A `ReelConfig` (see `src/config/types.ts`) holds the hook,
the scenes, brand overrides, the audio bed, the CTA and the output filename.
`src/Reel.tsx` renders it. Adding a reel means adding a config file.

**Cuts land on the music.** Every bed runs at 120 BPM — 15 frames per beat, 60
per bar at 30 fps. Scene lengths are written as `bars(n)` / `beats(n)`, and
`onGrid()` compensates for transition overlap so each scene *starts* exactly on
its grid frame.

**One media interface.** `MediaFrame` handles video, stills and code-built
plates identically, and owns the camera moves. Scenes are written once and keep
working when a plate is swapped for footage. Media is always `cover`-fitted —
cropped, never stretched.

**Honesty is enforced in code, not just in review.**
- `beforeAfter` throws if the two sides have different `sceneId`s — you cannot
  accidentally pair unrelated rooms.
- Hooks marked `needs-evidence` in `src/config/hooks.ts` throw if you try to
  build a reel on them.
- `demoTreatment` is opt-in and documented as placeholder-only.

**Every asset is accounted for** in `docs/asset-manifest.json` and
`docs/ASSET-MANIFEST.md`, including licence and whether it is original,
third-party, or illustrative.

## Audio

All music and SFX are original — synthesised from scratch by
`scripts/make_audio.py` (oscillators, envelopes, hand-written reverb; no
samples, no loops, no third-party recordings). ZEK Agency owns it outright and
it is cleared for commercial promotional use.

```bash
python3 scripts/make_audio.py && ./scripts/encode_audio.sh
```

Music beds peak at −1.5 dBFS (≈ −13 dBFS RMS), SFX at −3.0 dBFS. Nothing
clips. Voiceover is supported (`audio.voiceover`) and ducks the bed
automatically; none is included.

## QC

```bash
node scripts/qc-frames.mjs     # stills at every scene boundary → out/qc/
```

Check contrast, safe areas, spelling and timing there before a full render.

## Rendering on another machine

`remotion.config.ts` pins Chromium to `/opt/pw-browsers/...` because this build
machine cannot reach `remotion.media`. Elsewhere, delete that
`Config.setBrowserExecutable` block (or set `REMOTION_BROWSER`) and Remotion
will download the right browser itself.

## Licence notes

- **Inter** — SIL Open Font License 1.1, commercial use permitted. Bundled at
  `public/fonts/`.
- **Remotion** — free for teams up to 3 people; a company licence may be
  required otherwise. See <https://remotion.pro/license>. Nothing was purchased.
- **Audio and all graphics** — original work, owned by ZEK Agency.
