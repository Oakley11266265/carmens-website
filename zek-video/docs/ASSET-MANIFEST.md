# Asset & source manifest — ZEK Agency reel system

Every asset used in the three reels, where it came from, and what it is
allowed to be used for. Machine-readable twin: `docs/asset-manifest.json`.

Generated during the build on 2026-09-14.

---

## 1. What could NOT be collected, and why

This is recorded first because it is the most important thing in this file.

| Wanted | Source | Result |
|---|---|---|
| ZEK logo, brand colours, site copy, portfolio stills and finished walkthrough films | `zekagency.com` / `www.zekagency.com` | **Blocked.** The egress proxy on this machine denies the host (`CONNECT` → `403`, logged as `connect_rejected … zekagency.com:443`). Blocked over plain HTTPS *and* through the fetch tool. Nothing from the site was retrieved — no logo, no hex values, no footage, no photography, no offer details. |
| Illustrative property stills (generated) | Higgsfield `gpt_image_2_5` | **Generated but unretrievable.** 7 images rendered successfully. Results are served from `d8j0ntlcm91z4.cloudfront.net`, which the same egress policy denies (`403`). The files could not be downloaded into the project. Video generation was then *not* attempted, because those results land on the same blocked CDN and would have spent credits on files that could not be collected. |
| Stock / openly-licensed photography and footage | `images.unsplash.com`, `pixabay.com`, `cdn.pixabay.com` | **Blocked** (`403`). |
| Licensed music and SFX | `freesound.org` | **Blocked** (`403`). |
| Remotion's own Chrome Headless Shell | `remotion.media` | **Blocked** (`403`). Worked around legitimately: rendering uses the Chromium already installed at `/opt/pw-browsers` (see `remotion.config.ts`). |

**Consequence.** There is no property photography and no walkthrough footage in
these reels. Every media slot is filled by a code-built graphic plate. The
reels are complete, timed, scored and rendered — but the imagery is
placeholder, and swapping it is the first thing to do with real assets. See
`docs/SWAPPING-MEDIA.md`.

**Precisely what is missing**, per reel:

| Reel | Slot | Needs |
|---|---|---|
| 01 | `photoReveal` | One original listing photo **and** the finished clip of that same room. |
| 01 | `featureCallout`, `footage` | Two more finished clips from the same property. |
| 02 | `photoStack` | 4 original photos from one property's existing library. |
| 02 | `beforeAfter` | One original photo **and** the finished clip of **that same scene**. Set `demoTreatment: false` when you do. |
| 02 | `featureCallout`, `footage` | Two more finished clips, same property. |
| 03 | `compare` | Two different opening shots cut from **one** property. |
| 03 | `featureCallout`, `footage` | Two more finished clips, same property. |

---

## 2. Fonts

| File | Source URL | Type | Licence | Commercial use |
|---|---|---|---|---|
| `public/fonts/Inter-Variable-latin.woff2` | `https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7.woff2` (via `https://fonts.googleapis.com/css2?family=Inter`) | Variable font, woff2, latin subset, weights 100–900 | SIL Open Font License 1.1 | **Yes.** OFL permits commercial use and embedding. |

Downloaded rather than linked so that rendering never depends on the network.

## 3. Audio — all original

Every audio file was synthesised from scratch by `scripts/make_audio.py`
(oscillators, envelopes and a hand-written reverb — no samples, no loops, no
third-party recordings). **ZEK Agency owns this audio outright and it is
cleared for commercial promotional use.** Regenerate with
`python3 scripts/make_audio.py && ./scripts/encode_audio.sh`.

All beds run at 120 BPM (15 frames per beat, 60 per bar at 30 fps) so cuts land
on the music.

| File | Type | Duration | Format | Used by |
|---|---|---|---|---|
| `public/audio/music-reveal.m4a` | Music bed — sparse open, impact at 3 s, break at 17 s | 32.00 s | AAC 192 kbps, 48 kHz, stereo | Reel 01 |
| `public/audio/music-warm.m4a` | Music bed — softer, later groove | 32.00 s | AAC 192 kbps, 48 kHz, stereo | Reel 02 |
| `public/audio/music-focus.m4a` | Music bed — tighter, more rhythmic | 32.00 s | AAC 192 kbps, 48 kHz, stereo | Reel 03 |
| `public/audio/sfx-whoosh.m4a` | SFX — filtered noise sweep | 0.55 s | AAC, 48 kHz, stereo | All reels |
| `public/audio/sfx-swipe.m4a` | SFX — short reverse sweep | 0.34 s | AAC, 48 kHz, stereo | All reels |
| `public/audio/sfx-impact.m4a` | SFX — low sine drop + air | 1.50 s | AAC, 48 kHz, stereo | All reels |
| `public/audio/sfx-tick.m4a` | SFX — transient tick | 0.06 s | AAC, 48 kHz, stereo | All reels |
| `public/audio/sfx-shutter.m4a` | SFX — two-part shutter | 0.12 s | AAC, 48 kHz, stereo | Reel 02 |
| `public/audio/sfx-riser.m4a` | SFX — noise riser | 1.40 s | AAC, 48 kHz, stereo | Reel 03 |

Mastering: music beds peak at −1.5 dBFS, ≈ −13 dBFS RMS. SFX peak at −3.0 dBFS
and are mixed at 0.42 of full scale. No clipping; nothing is limited into
distortion.

## 4. Visual assets — all code-built

There are **no image files** in this project. Every visual is drawn in code.

| Asset | Where | Type | Dimensions | Represents | Nature |
|---|---|---|---|---|---|
| `ridgeline-living` | `src/placeholder/plates.tsx` | Layered SVG plate, 5 depth layers | 1080 × 1920 | "Ridgeline" demo property — living room | **Illustrative graphic.** Not a real property. |
| `ridgeline-kitchen` | `src/placeholder/plates.tsx` | Layered SVG plate, 5 layers | 1080 × 1920 | "Ridgeline" — kitchen | Illustrative graphic |
| `ridgeline-terrace` | `src/placeholder/plates.tsx` | Layered SVG plate, 5 layers | 1080 × 1920 | "Ridgeline" — terrace and pool at dusk | Illustrative graphic |
| `shoreline-bedroom` | `src/placeholder/plates.tsx` | Layered SVG plate, 5 layers | 1080 × 1920 | "Shoreline" demo property — bedroom | Illustrative graphic |
| `shoreline-bath` | `src/placeholder/plates.tsx` | Layered SVG plate, 5 layers | 1080 × 1920 | "Shoreline" — bathroom | Illustrative graphic |
| `shoreline-living` | `src/placeholder/plates.tsx` | Layered SVG plate, 5 layers | 1080 × 1920 | "Shoreline" — living room | Illustrative graphic |
| ZEK wordmark | `src/brand/Wordmark.tsx` | Live text | scales | ZEK Agency | Text wordmark, **not the real logo** — the real one could not be downloaded |
| Grain, scrims, progress rail | `src/components/ui.tsx` | CSS / inline SVG | — | — | Generated |

"Ridgeline" and "Shoreline" are invented names for two demo properties. They
are **not clients, not real addresses, and not real listings.** Neither
property, nor any frame of these reels, may be described as client work, as a
verified before/after, or as a real result.

## 5. Brand colours — unverified

`zekagency.com` was unreachable, so the site's real hex values could not be
sampled. The palette in `src/brand/tokens.ts` implements the brief's written
direction (clean white, bold black, restrained blue) and is a **placeholder for
the real values**:

| Token | Value | Role |
|---|---|---|
| `paper` | `#FFFFFF` | Background |
| `ink` | `#0B0B0C` | Typography |
| `blue` | `#1D4ED8` | The single accent |
| `blueDeep` | `#12309C` | Accent, pressed |
| `blueSoft` | `#DCE6FF` | Accent on dark |
| `inkMuted` | `#6B7280` | Secondary text |

Replace these with the site's real values and every reel updates.

## 6. Offer details deliberately absent

No price, turnaround time, revision count, client result, testimonial,
view count, booking figure or conversion rate appears anywhere in these reels.
None were supplied, and the website that might have carried them could not be
reached, so none were invented. The only claims made are the ones stated in
the brief: photos become a cinematic film, and no filming visit is required.
