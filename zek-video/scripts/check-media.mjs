/**
 * Reports what media has landed in public/media, what is still missing, and
 * whether each file is actually usable (real dimensions, duration, codec).
 *
 *   node scripts/check-media.mjs
 *
 * Run this the moment new files arrive. It catches the things that otherwise
 * only surface halfway through a 7-minute render: a clip that is 3 seconds
 * when the scene needs 5, a photo that is 600px wide, a .MOV in a codec the
 * renderer cannot decode.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const PHOTOS = "public/media/photos";
const CLIPS = "public/media/clips";

/** filename → { slot, minSeconds, pairedWith } */
const WANTED_CLIPS = {
  "reel02-after.mp4": { slot: "Reel 02 · before/after (the 'after')", min: 4, pair: "reel02-stack-3" },
  "reel03-opening-a.mp4": { slot: "Reel 03 · compare, ordinary opening", min: 6 },
  "reel03-opening-b.mp4": { slot: "Reel 03 · compare, standout opening", min: 6 },
  "hero-feature.mp4": { slot: "Reels 02+03 · feature callout", min: 4 },
  "hero-room.mp4": { slot: "Reels 02+03 · full-bleed room", min: 3 },
  "reel01-hero.mp4": { slot: "Reel 01 · photo reveal (the 'after')", min: 5, pair: "reel01-hero", optional: true },
  "reel01-feature.mp4": { slot: "Reel 01 · feature callout", min: 4, optional: true },
  "reel01-room.mp4": { slot: "Reel 01 · full-bleed room", min: 3, optional: true },
};

const WANTED_PHOTOS = {
  "reel02-stack-1": { slot: "Reel 02 · photo stack 1" },
  "reel02-stack-2": { slot: "Reel 02 · photo stack 2" },
  "reel02-stack-3": { slot: "Reel 02 · photo stack 3 (before/after 'before')", pair: "reel02-after.mp4" },
  "reel02-stack-4": { slot: "Reel 02 · photo stack 4" },
  "reel01-hero": { slot: "Reel 01 · photo reveal ('before')", pair: "reel01-hero.mp4", optional: true },
};

const IMG_EXT = [".jpg", ".jpeg", ".png", ".heic", ".heif", ".webp"];
const VID_EXT = [".mp4", ".mov", ".m4v", ".webm"];

const ffprobe = (file, entries) => {
  try {
    return execFileSync(
      "npx",
      ["remotion", "ffprobe", "-v", "error", "-select_streams", "v:0",
       "-show_entries", entries, "-of", "default=nw=1:nk=1", file],
      { encoding: "utf8" },
    ).trim().split("\n");
  } catch {
    return null;
  }
};

const mb = (p) => (statSync(p).size / 1024 / 1024).toFixed(1);

const listing = (dir, exts) =>
  existsSync(dir)
    ? readdirSync(dir).filter((f) => exts.includes(extname(f).toLowerCase()))
    : [];

let problems = 0;
const note = (m) => {
  console.log(`      ! ${m}`);
  problems++;
};

console.log("\n─── CLIPS ───");
const clips = listing(CLIPS, VID_EXT);
if (clips.length === 0) console.log("  (none yet)");
for (const f of clips) {
  const path = join(CLIPS, f);
  const info = ffprobe(path, "stream=width,height,codec_name:format=duration");
  const base = f.replace(extname(f), "") + ".mp4";
  const want = WANTED_CLIPS[base];
  console.log(`\n  ${f}  (${mb(path)} MB)`);
  console.log(`      ${want ? want.slot : "unrecognised name — will not be wired in automatically"}`);
  if (!info) {
    note("could not be read — file may be corrupt or in an unsupported codec");
    continue;
  }
  const [w, h, codec, dur] = info;
  const seconds = Number(dur);
  console.log(`      ${w}x${h}  ${codec}  ${seconds.toFixed(2)}s`);
  if (want && seconds < want.min) {
    note(`only ${seconds.toFixed(1)}s — this slot needs at least ${want.min}s`);
  }
  if (Number(w) / Number(h) > 1) {
    console.log(`      · landscape — will be centre-cropped to 9:16, not stretched`);
  }
  if (Number(h) < 1080) note(`only ${h}px tall — will look soft at 1080x1920`);
  if (codec !== "h264" && codec !== "hevc") note(`codec ${codec} — may need transcoding`);
  if (extname(f).toLowerCase() !== ".mp4") {
    console.log(`      · ${extname(f)} — will be transcoded to MP4`);
  }
}

console.log("\n─── PHOTOS ───");
const photos = listing(PHOTOS, IMG_EXT);
if (photos.length === 0) console.log("  (none yet)");
for (const f of photos) {
  const path = join(PHOTOS, f);
  const stem = f.replace(extname(f), "");
  const want = WANTED_PHOTOS[stem];
  const info = ffprobe(path, "stream=width,height");
  console.log(`\n  ${f}  (${mb(path)} MB)`);
  console.log(`      ${want ? want.slot : "unrecognised name — will not be wired in automatically"}`);
  if (!info) {
    note("could not be read");
    continue;
  }
  const [w, h] = info;
  console.log(`      ${w}x${h}`);
  if (Math.min(Number(w), Number(h)) < 1080) {
    note(`short edge is ${Math.min(Number(w), Number(h))}px — under 1080, will look soft`);
  }
  if ([".heic", ".heif"].includes(extname(f).toLowerCase())) {
    console.log(`      · HEIC — will be converted to JPG`);
  }
}

console.log("\n─── STILL MISSING ───");
const haveClip = (n) => clips.some((f) => f.replace(extname(f), "") === n.replace(".mp4", ""));
const havePhoto = (n) => photos.some((f) => f.replace(extname(f), "") === n);

let missingRequired = 0;
for (const [name, w] of Object.entries(WANTED_CLIPS)) {
  if (!haveClip(name)) {
    console.log(`  ${w.optional ? "(optional)" : "REQUIRED "} clips/${name}  — ${w.slot}`);
    if (!w.optional) missingRequired++;
  }
}
for (const [name, w] of Object.entries(WANTED_PHOTOS)) {
  if (!havePhoto(name)) {
    console.log(`  ${w.optional ? "(optional)" : "REQUIRED "} photos/${name}.jpg — ${w.slot}`);
    if (!w.optional) missingRequired++;
  }
}
if (missingRequired === 0) console.log("  Nothing required is missing.");

console.log("\n─── PAIRING (before/after must be the same room) ───");
for (const [name, w] of Object.entries(WANTED_PHOTOS)) {
  if (!w.pair) continue;
  const both = havePhoto(name) && haveClip(w.pair);
  console.log(
    `  photos/${name} ↔ clips/${w.pair}: ${both ? "both present — CONFIRM they are the same room" : "incomplete"}`,
  );
}

console.log(
  `\n${missingRequired} required file(s) missing, ${problems} problem(s) flagged.\n`,
);
