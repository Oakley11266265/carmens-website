# Swapping media and rendering another reel

The system is data-driven. To change what a reel shows you edit one config
file; you should never need to touch a component.

---

## 1. Drop the files in

Put media under `public/`:

```
public/media/clips/ridgeline-living.mp4      ← finished walkthrough clips
public/media/photos/ridgeline-living.jpg     ← the client's original photos
```

Specs that keep everything sharp and correctly framed:

| | Recommended |
|---|---|
| Clips | 1080 × 1920 (9:16), H.264 MP4, 30 fps, ≥ 6 s each |
| Photos | ≥ 1080 px on the short edge, JPG or PNG, any aspect |

Anything not 9:16 is **cropped, never stretched** — `MediaFrame` uses
`objectFit: cover` for photos and video and `preserveAspectRatio="slice"` for
plates. If a shot has something important near the edge, crop it to 9:16
yourself first.

## 2. Point the config at it

Open the reel's config, e.g. `src/config/reel-01-photos-into-film.ts`, and
change the `media` entry. Replace this:

```ts
media: { kind: "plate", plate: "ridgeline-living", sceneId: "ridgeline/living" },
```

with this:

```ts
media: {
  kind: "video",
  src: "media/clips/ridgeline-living.mp4",
  durationInSeconds: 8,
  startFromSeconds: 1.5,   // skip the first 1.5s of the file
  sceneId: "ridgeline/living",
},
```

or, for a still:

```ts
media: { kind: "photo", src: "media/photos/ridgeline-living.jpg", sceneId: "ridgeline/living" },
```

`sceneId` is not decoration — see §4.

## 3. Render

```bash
./scripts/render-all.sh                        # all three reels + covers
./scripts/render-all.sh Reel01-PhotosIntoFilm  # just one
```

Output lands in `out/` as H.264 + AAC MP4 with a matching `-cover.jpg`.

To see it before committing to a render:

```bash
npx remotion studio --no-open
```

## 4. The before/after rule

`beforeAfter` throws at render time if `before.sceneId !== after.sceneId`. That
is deliberate: pairing an original photo of one room with a finished clip of a
different room would misrepresent the work. Use the same property and the same
scene on both sides.

Also, when you put real matched media into a `beforeAfter`, set:

```ts
demoTreatment: false,
```

`demoTreatment: true` grades the two halves differently so the placeholder
plates read as "photo" vs "film". With real assets the difference the viewer
sees must be the real difference, not a filter.

## 5. Making a whole new reel

Copy a config, change the data, register it:

```bash
cp src/config/reel-01-photos-into-film.ts src/config/reel-04-my-new-reel.ts
```

Then in `src/Root.tsx`:

```ts
import { reel04 } from "./config/reel-04-my-new-reel";
const REELS: ReelConfig[] = [reel01, reel02, reel03, reel04];
```

It appears in Studio, in `npx remotion compositions`, and in the render script.

### Timing

Scene lengths are written on the musical grid — `bars(n)` and `beats(n)` from
`src/brand/tokens.ts`. At 120 BPM and 30 fps a beat is 15 frames and a bar is
60. `onGrid(scenes, transitions)` then lengthens each scene by the transition
after it, so every scene *starts* exactly on its grid frame and the reel's
total length is just the sum of the grid values. Keep using `bars()`/`beats()`
and cuts will keep landing on the music.

### Scenes available

| `type` | What it does |
|---|---|
| `hook` | 0–3 s opener. `treatment: "stack" \| "wipe" \| "split"` |
| `photoReveal` | A print on white that grows to full frame |
| `beforeAfter` | Matched still/moving wipe, same scene enforced |
| `footage` | Full-bleed clip with one caption |
| `featureCallout` | Clip with a named feature |
| `photoStack` | Photos dealt onto the page, one picked |
| `compare` | Two options stacked, one marked |
| `statement` | A held type card, `invert: true` for black |
| `process` | Numbered steps |
| `endCard` | Question, dominant CTA, secondary line |

## 6. Swapping just the hook

The whole point of the hook variants: change the first three seconds, keep
everything after identical, and any difference in retention is attributable to
the opening.

`src/config/hook-variants.ts` already does this for Reel 01 — it produces
`Reel01-PhotosIntoFilm-hookB` and `-hookC`. Add another:

```ts
export const reel01HookD = withHook(
  reel01,
  "h13-instantly-improve",
  { kicker: "Hosts", lines: ["How to improve", "your listing", "without a shoot."], emphasiseLine: 2, treatment: "stack" },
  "hookD",
);
```

then add it to `HOOK_VARIANTS`. `withHook` refuses any hook in the bank marked
`status: "needs-evidence"` — those assert something that has not been
established yet.

## 7. Rebranding

- Colours and type scale: `src/brand/tokens.ts`
- Wordmark: `src/brand/Wordmark.tsx`, or drop a real logo at
  `public/brand/logo.svg` and set `brand.logo` in a config
- Safe areas: `SAFE` in `src/brand/tokens.ts` (`gutter` 96, `top` 260,
  `bottom` 430 — tuned to clear Instagram's chrome)

## 8. Audio

Regenerate the original beds and SFX:

```bash
python3 scripts/make_audio.py && ./scripts/encode_audio.sh
```

To use different music, drop a file in `public/audio/` and set `audio.music` in
the config. Check it is actually cleared for commercial use first — do not
assume a popular track is.

To add a voiceover, set `audio.voiceover`. The music bed ducks to
`audio.duckTo` (default 0.28) automatically for the whole reel.

For a silent version, set `music: ""` and remove the `sfx` keys.

## 9. Rendering elsewhere

`remotion.config.ts` pins the browser to `/opt/pw-browsers/...` because this
build machine cannot reach `remotion.media` to download Remotion's own Chrome.
On a normal machine, delete that `Config.setBrowserExecutable` block (or set
`REMOTION_BROWSER`) and Remotion will fetch the right browser itself.
