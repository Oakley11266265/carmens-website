# Cowork handoff prompt

Paste everything below the line into a new Cowork chat as the first message.
It assumes the new session knows nothing. After pasting it, just talk normally.

---

You are taking over an in-progress video production project for ZEK Agency.
Everything you need is in a GitHub repo. Read this whole message before acting.

## 0. First moves, in order

1. Clone the repo and check out the working branch:

   ```bash
   git clone https://github.com/Oakley11266265/carmens-website.git
   cd carmens-website
   git checkout claude/zek-agency-video-system-n2fy4j
   cd zek-video
   npm install
   ```

   **If the clone fails with a 404 or a permissions error**, do not improvise.
   Tell me, and I will download the repo as a ZIP from GitHub and drop it into
   this chat instead. The GitHub account that owns it is `Oakley11266265`,
   which may not be the account this session is connected to.

2. Open `zek-video/remotion.config.ts` and **delete the
   `Config.setBrowserExecutable(...)` block**. It pins Chromium to
   `/opt/pw-browsers/...`, which only exists on the machine the project was
   built on. With that block gone, Remotion downloads the right browser itself.

3. Confirm the project builds before touching anything:

   ```bash
   npx remotion compositions
   ```

   You should see 8 compositions. If you do, you are ready.

4. Read these three files. They are the real documentation:
   - `zek-video/README.md` — architecture
   - `zek-video/docs/SWAPPING-MEDIA.md` — how to put media in
   - `zek-video/public/media/DROP-MEDIA-HERE.md` — what media goes where

## 1. Who this is for

- **Brand:** ZEK Agency. **Owner:** Connor (that's me, the person typing).
- **Website:** zekagency.com
- **Service:** I turn property photos clients already have into cinematic
  walkthrough videos. No on-site filming visit is required.
- **Audience:** Airbnb and vacation-rental hosts, property managers,
  real-estate agents, boutique hospitality.
- **My process:** client sends photos and names the key features → I make the
  film → they review → they post it.

## 2. What already exists

A complete, working Remotion 4.0.524 project at `zek-video/`, plus three
finished vertical reels already rendered to `zek-video/out/`:

| Composition | Output file | Length | Hook |
|---|---|---|---|
| `Reel01-PhotosIntoFilm` | `zek-reel-01-photos-into-film.mp4` | 28.0s | "This feels illegal to know." |
| `Reel02-UseWhatYouHave` | `zek-reel-02-use-what-you-have.mp4` | 26.0s | "You might not agree with this." |
| `Reel03-OpeningShot` | `zek-reel-03-opening-shot.mp4` | 29.0s | "Have you ever noticed how it opens?" |

All 1080×1920, 30fps, H.264 + AAC, each with a `-cover.jpg`. Watch them first —
they show you exactly the edit you are preserving.

**How the system works.** Reels are data, not hand-built timelines. A
`ReelConfig` (see `src/config/types.ts`) holds the hook, the scenes, brand
overrides, audio and CTA. `src/Reel.tsx` renders it. To change a reel you edit
its config file in `src/config/`, not a component.

Nine scene types exist: `hook`, `photoReveal`, `beforeAfter`, `footage`,
`featureCallout`, `photoStack`, `compare`, `statement`, `endCard`.

`src/components/MediaFrame.tsx` puts video, stills and code-built graphics
behind one interface and owns all camera moves. Media is always `cover`-fitted:
cropped to fill, never stretched.

**Timing is locked to the music.** Every music bed runs at 120 BPM — 15 frames
per beat, 60 per bar at 30fps. Scene lengths are written as `bars(n)` /
`beats(n)`, and `onGrid()` compensates for transition overlap so each scene
*starts* exactly on its grid frame. Keep using `bars()` and `beats()` and cuts
keep landing on the beat.

**Audio is original and owned by me.** `scripts/make_audio.py` synthesises
three music beds and six SFX from scratch. Already rendered to
`public/audio/*.m4a`. Don't replace it with anything you haven't confirmed is
licensed for commercial use.

## 3. The one thing missing — and it's the whole job

**The reels currently use code-built placeholder graphics, not real property
media.** The machine that built them had no network access to my website or any
stock source, so every media slot is filled by an SVG line drawing.

**Your job is to replace those placeholders with my real photos and video
clips, then re-render.** That's it. Do not redesign the reels. The edit,
timing, typography and music are done and approved.

## 4. How I hand you media

I drop files into these folders:

```
zek-video/public/media/photos/   ← original client stills (the "before")
zek-video/public/media/clips/    ← segments of my finished films (the "after")
```

In Cowork I can drag files straight in. If a file lands somewhere else, move it
into the right folder rather than pointing configs at a stray path.

**The moment new files arrive, run:**

```bash
node scripts/check-media.mjs
```

It reports every file's real dimensions, duration and codec, flags clips too
short for the slot they'd fill or photos under 1080px, and lists what's still
missing. Run it before editing any config — it catches problems that otherwise
only surface halfway through a seven-minute render.

### Minimum media set — one property, 4 photos, 5 clips

| File | What it is |
|---|---|
| `photos/reel02-stack-1.jpg` | An original client photo |
| `photos/reel02-stack-2.jpg` | Another |
| `photos/reel02-stack-3.jpg` | Another — this one is the before/after "before" |
| `photos/reel02-stack-4.jpg` | Another |
| `clips/reel02-after.mp4` | **The finished clip of the exact same room as `reel02-stack-3.jpg`** |
| `clips/reel03-opening-a.mp4` | An ordinary opening — hallway, entry, kitchen |
| `clips/reel03-opening-b.mp4` | The standout — the view, the pool, the reason people book |
| `clips/hero-feature.mp4` | The best feature, moving |
| `clips/hero-room.mp4` | One more strong room |

Optional second property, so Reels 01 and 02 show different houses:
`photos/reel01-hero.jpg` plus `clips/reel01-hero.mp4` (same room as that
photo), `clips/reel01-feature.mp4`, `clips/reel01-room.mp4`.

I may not name files correctly. If I say "this is the kitchen", rename it
yourself to whatever slot fits and tell me what you did.

## 5. How to wire media in

In the relevant `src/config/reel-0*.ts`, replace a placeholder entry:

```ts
media: { kind: "plate", plate: "ridgeline-living", sceneId: "ridgeline/living" },
```

with a real one:

```ts
media: {
  kind: "video",
  src: "media/clips/hero-feature.mp4",
  durationInSeconds: 7,
  startFromSeconds: 1.5,        // skip into the file to find the best moment
  sceneId: "oakhill/living",    // property/room — see the rule below
},
```

or for a still:

```ts
media: { kind: "photo", src: "media/photos/reel02-stack-3.jpg", sceneId: "oakhill/living" },
```

Paths are relative to `public/`. Use `startFromSeconds` to pick the strongest
moment inside a longer clip rather than re-cutting the file.

When you put real media into the `beforeAfter` scene in Reel 02, also set:

```ts
demoTreatment: false,
```

That flag grades the two halves differently so placeholder graphics read as
"photo" vs "film". With real assets the difference the viewer sees must be the
real difference, not a filter.

## 6. Rendering and checking

```bash
npx remotion studio --no-open        # interactive preview
node scripts/qc-frames.mjs           # stills at every scene boundary → out/qc/
./scripts/render-all.sh              # all three reels + covers → out/
./scripts/render-all.sh Reel01-PhotosIntoFilm   # just one
node scripts/verify-output.mjs       # verify the rendered MP4s
```

A full render takes several minutes per reel. **Always run `qc-frames.mjs` and
actually look at the stills before committing to a full render.** Check for:
text clipping or running past the safe margins, white text landing on a light
part of a photo, a stretched or badly cropped frame, and any blank frame at a
scene boundary. Those are the exact defects that bit the first build.

`verify-output.mjs` checks codecs, dimensions, duration, decoded audio levels
and per-frame luminance on the finished files. It must pass before you tell me
a reel is done.

## 7. Hard rules — do not break these

These are guardrails I asked for deliberately. Some are enforced in code.

1. **Before/after pairs must be the same property and the same room.** The
   `beforeAfter` component throws if the two sides have different `sceneId`s.
   Do not defeat that check. If no matched pair exists, tell me and reshape
   those seconds around what we do have.
2. **Never present anything as a client result, a verified before/after, or
   real client work unless it genuinely is.**
3. **Never invent a price, turnaround time, revision count, testimonial,
   booking, view count or conversion rate.** None exist in this project. If a
   scene seems to need one, ask me.
4. **Six of the twenty hooks in `src/config/hooks.ts` are marked
   `needs-evidence`** because they assert an experiment, a personal history or
   finished client work that hasn't been established. The builder throws if you
   try to use one. Don't flip the status without asking me.
5. **The CTA wording is fixed:**
   - Primary: `Want this for your property?` → `DM "FILM"`
   - Secondary: `Follow, or you might never see this post again.`
   The word "might" is load-bearing. Never change it into a guarantee about
   what Instagram will show anyone.
6. **Don't redesign.** Fill the media slots. If you think something should
   change, say so in a sentence and let me decide.

## 8. Brand facts

- Clean white backgrounds, bold black type, restrained blue accent.
- Tokens in `src/brand/tokens.ts`: paper `#FFFFFF`, ink `#0B0B0C`, blue
  `#1D4ED8`. **These are unverified** — zekagency.com was unreachable, so the
  real site hexes were never sampled. If I give you the real values, update
  that one file and everything follows.
- Type is Inter (SIL OFL, commercial use fine), bundled at `public/fonts/`.
- The logo is a **text wordmark** in `src/brand/Wordmark.tsx` because the real
  logo couldn't be downloaded. If I give you a logo file, put it at
  `public/brand/logo.svg`.
- Safe areas: 96px side gutters, 260px top, 430px bottom — tuned to clear
  Instagram's interface. Keep important text inside them.

## 9. How I work

Be direct and do the work. Make reasonable creative calls without asking me to
approve each one. If something is genuinely ambiguous or you hit a real
blocker, say so in a sentence or two and keep going on everything else. Tell me
plainly when something failed — don't claim a render succeeded unless it did.

Start by cloning the repo, confirming `npx remotion compositions` works, and
watching the three existing MP4s. Then tell me you're ready for media.
