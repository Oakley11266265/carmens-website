# Delivery report

What was built, what was verified, and what genuinely could not be done.

---

## Delivered

| # | Deliverable | Where |
|---|---|---|
| 1 | Three finished vertical MP4 reels | `out/zek-reel-0{1,2,3}-*.mp4` |
| 2 | A cover image for each | `out/zek-reel-0{1,2,3}-*-cover.jpg` |
| 3 | An Instagram caption for each | [`docs/CAPTIONS.md`](CAPTIONS.md) |
| 4 | The complete editable Remotion project | this repo |
| 5 | The adapted 20-hook bank | [`docs/HOOK-BANK.md`](HOOK-BANK.md) + `src/config/hooks.ts` |
| 6 | Asset / source manifest | [`docs/ASSET-MANIFEST.md`](ASSET-MANIFEST.md) + `asset-manifest.json` |
| 7 | Swap-media-and-render instructions | [`docs/SWAPPING-MEDIA.md`](SWAPPING-MEDIA.md) |
| 8 | This report | you are reading it |

### The reels

| Composition | Output | Duration | Hook | Opening treatment |
|---|---|---|---|---|
| `Reel01-PhotosIntoFilm` | `zek-reel-01-photos-into-film.mp4` | 28.0 s | "This feels illegal to know." | Hard white frame, type only |
| `Reel02-UseWhatYouHave` | `zek-reel-02-use-what-you-have.mp4` | 26.0 s | "You might not agree with this." | Type on white, library sliding up beneath |
| `Reel03-OpeningShot` | `zek-reel-03-opening-shot.mp4` | 29.0 s | "Have you ever noticed how it opens?" | Blue block wiping off the frame |

All three: 1080 × 1920, 30 fps, H.264 (High) + AAC-LC 48 kHz stereo, MP4.

Plus two hook variants of Reel 01 (`-hookB`, `-hookC`) registered in Studio —
identical from second 3 onward, so a retention difference is attributable to
the opening and nothing else.

---

## Verified, not assumed

`scripts/verify-output.mjs` runs against the rendered files, not the source.
All checks pass on all three:

- Container, codecs, profile — H.264 + AAC in MP4
- 1080 × 1920, 30 fps, `yuv420p`
- Duration within 0.1 s of intent, and inside the 20–30 s brief
- An audio track exists, is stereo 48 kHz, peaks between −3.5 and −0.8 dBFS
  (no clipping, not silent), and runs to the last frame
- 54–60 frames sampled per reel: **no blank frames**
- No static stretch longer than 2.5 s

Also done by hand: 45 preview stills rendered at every scene boundary
(`scripts/qc-frames.mjs`), assembled into contact sheets, and inspected. That
pass found and fixed real defects:

- **Frame 0 of every reel was blank** — the hook animated in from frame 2. All
  hook lines now sit at rest on frame 0; the motion is a settle, not an
  entrance.
- **Captions were white-on-white** and unreadable over pale artwork. The scrim
  was rebuilt with eased multi-stop ramps that reach full strength where the
  caption band actually sits. Measured: caption band mean luminance 0.22.
- **Reel 3 hard-cut to a completely blank frame at 3.0 s** — the compare panels
  faded up from zero opacity across a cut. They are now present at frame 0.
- **The brand mark collided** with captions, with artwork, and with a compare
  label. Moved, and given an explicit z-index above scene content.
- **Plates were letterboxed** inside non-9:16 containers (compare panels, photo
  cards), shrinking artwork to a strip. Fixed with
  `preserveAspectRatio="xMidYMid slice"`.
- **A feature headline ran past the right safe margin.** Constrained.
- **Output was `yuvj420p`** (deprecated full-range, shifts levels on some
  players) because frames were rendered as JPEG. Switched to PNG frames — also
  removes JPEG banding on these flat gradients.
- **4-second stretches with zero pixel change** in the process and end-card
  sections. Added a continuous sub-perceptual drift.

### What I could not check

I cannot watch or listen to the rendered files — there is no playback in this
environment. Everything above is measured (stream metadata, decoded PCM levels,
per-frame luminance analysis) or inspected as still frames. Motion *timing* and
the feel of the cuts against the music are reasoned from the frame grid, not
observed. **Watch all three before posting.**

---

## Genuine limitations

### 1. There is no property imagery in these reels

The single biggest gap, and it is a network one, not a craft one.

- `zekagency.com` is **blocked by this environment's egress proxy** (403 on
  CONNECT). Blocked over HTTPS and through the fetch tool. So: no real logo, no
  sampled brand hex values, no portfolio stills, no finished walkthrough films,
  and no offer details.
- The image-generation tool **worked** — 7 illustrative property stills were
  generated — but the results are served from a CloudFront host that the same
  policy blocks, so the files could not be downloaded. I stopped there rather
  than spending more of your Higgsfield credits on video generation whose output
  lands on the same blocked host. **7 credits used, ~162 remaining.**
- Unsplash, Pixabay and Freesound are all blocked too.

So every media slot is filled by a **code-built graphic plate** — layered SVG
line drawings with parallax depth, which the brief names as the fallback. They
are deliberately drawn, not photographic: nothing here can be mistaken for a
real property.

**The consequence for you:** these three reels are complete, timed, scored and
rendered, but they are demonstrating the service with placeholder art. A promo
for cinematic property films that shows no property footage will not convert.
Put your real media in — one line per slot — and re-render. That is what the
system is built for, and `docs/SWAPPING-MEDIA.md` walks through it.
`docs/ASSET-MANIFEST.md` lists exactly which ten slots need what.

### 2. Brand colours are unverified

The palette implements the brief's written direction (clean white, bold black,
restrained blue) because the site's real values could not be sampled. One file:
`src/brand/tokens.ts`.

### 3. The wordmark is text, not your logo

The real logo could not be downloaded. `src/brand/Wordmark.tsx` is a clean text
wordmark. Drop a real file at `public/brand/logo.svg` when you have one.

### 4. No before/after uses real client work

Reel 02's matched before/after uses the same plate on both sides, graded
differently, with `demoTreatment: true` — an explicit, documented flag. With
real media, set it to `false`: the difference the viewer sees must be the real
difference. The component **throws** if the two sides have different scene IDs,
so it cannot silently pair unrelated rooms.

### 5. No voiceover

Supported (`audio.voiceover`, with automatic ducking) but not included. No TTS
was available and cloning a voice was not appropriate.

### 6. No performance data exists

Nothing in the reels or the captions claims a booking, an enquiry, a view
count, a conversion rate, a price, a turnaround time or a revision allowance.
None was supplied, the website that might have carried it was unreachable, and
none was invented. Six of the twenty hooks are marked `needs-evidence` and the
code refuses to build a reel on them — they assert an experiment, a history, a
reversal, an announcement or finished client work that has not been
established.

The hook-variant mechanism is in place so you can test openings once the reels
carry real footage. No variant is "the winner" — there is no data yet.

---

## Not done, deliberately

Per the brief: nothing was purchased, no website was deployed, no social post
was published, and no scheduled task was created or changed.
