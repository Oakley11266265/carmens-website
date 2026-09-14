# Drop your photos and clips in here

Two folders next to this file:

- `photos/` — the **original stills** the client sent (the "before")
- `clips/`  — segments of the **finished walkthrough films** (the "after")

Use the exact filenames below. Anything named correctly gets wired into the
reels automatically; anything extra is ignored, so sending more than the list
is fine.

Run `node scripts/check-media.mjs` at any point to see what has landed, what is
missing, and each file's real dimensions and duration.

---

## Minimum set — one property, 4 photos, 5 clips

This is enough to fill all three reels. Start here.

### `photos/`

| Filename | What it should be |
|---|---|
| `reel02-stack-1.jpg` | An original photo from the property's existing library |
| `reel02-stack-2.jpg` | Another |
| `reel02-stack-3.jpg` | Another |
| `reel02-stack-4.jpg` | Another |

### `clips/`

| Filename | What it should be |
|---|---|
| `reel02-after.mp4` | **The finished clip of the exact same room as `photos/reel02-stack-3.jpg`.** This is the matched before/after — it must be the same room and roughly the same angle. |
| `reel03-opening-a.mp4` | An ordinary opening shot — a hallway, a kitchen, an entry |
| `reel03-opening-b.mp4` | The standout shot — the view, the pool, the thing people book it for |
| `hero-feature.mp4` | The property's best feature, moving |
| `hero-room.mp4` | One more strong room |

`reel03-opening-a` and `-b` must be **the same property** — the whole point of
Reel 03 is that the house is identical and only the opening changed.

---

## Full set — better, if you have it

Everything above, plus a second property so Reels 01 and 02 aren't showing the
same house:

### `photos/`

| Filename | What it should be |
|---|---|
| `reel01-hero.jpg` | An original photo from a **second** property |

### `clips/`

| Filename | What it should be |
|---|---|
| `reel01-hero.mp4` | **Finished clip of the same room as `photos/reel01-hero.jpg`** |
| `reel01-feature.mp4` | That property's standout feature |
| `reel01-room.mp4` | One more room from that property |

---

## Specs

**Clips**

- Trim them to **5–8 seconds** before sending. I only use a short segment of
  each, and a whole film is mostly bytes I throw away. If you'd rather send the
  full film and let me pick the moment, that works too — say so, and send it as
  `full-<property>-<n>.mp4`.
- 1080 × 1920 (9:16) is ideal. 4K or landscape is fine — anything not 9:16 gets
  **cropped to fill, never stretched** — but if something important sits near
  the edge, crop it yourself first.
- MP4 (H.264) is ideal. `.MOV` straight off an iPhone is fine; I'll transcode.
- No burnt-in text, logos or captions. All type is added in Remotion so it
  stays editable and correctly spelled.
- Audio doesn't matter — the reels carry their own music bed and clip audio is
  muted.

**Photos**

- JPG or PNG. `.HEIC` from an iPhone is fine; I'll convert.
- At least 1080px on the short edge.
- These should be the client's **actual originals** — the unedited photos they
  sent you. That is what makes the before/after honest.

---

## The one rule that matters

For the before/after pairs — `photos/reel02-stack-3.jpg` ↔ `clips/reel02-after.mp4`,
and `photos/reel01-hero.jpg` ↔ `clips/reel01-hero.mp4` — the two files **must be
the same property and the same room**. The build throws an error rather than
render a mismatched pair, because pairing two different rooms would
misrepresent the work.

If a matched pair doesn't exist yet, send the photos and clips anyway and tell
me — I'll drop the before/after scene and reshape those seconds around what you
do have.
