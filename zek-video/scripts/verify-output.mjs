/**
 * Verifies the rendered MP4s against what was promised.
 *
 * Checks: container, codecs, dimensions, frame rate, duration, audio track
 * presence and level, plus a scan for blank or frozen frames — the two
 * failures a still-frame QC pass will not catch.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";

const EXPECTED = [
  { file: "out/zek-reel-01-photos-into-film.mp4", seconds: 28.0 },
  { file: "out/zek-reel-02-use-what-you-have.mp4", seconds: 26.0 },
  { file: "out/zek-reel-03-opening-shot.mp4", seconds: 29.0 },
];

const probe = (args) =>
  execFileSync("npx", ["remotion", "ffprobe", "-v", "error", ...args], {
    encoding: "utf8",
  }).trim();

let failures = 0;
const fail = (m) => {
  console.log(`   ✗ ${m}`);
  failures++;
};
const pass = (m) => console.log(`   ✓ ${m}`);

for (const { file, seconds } of EXPECTED) {
  console.log(`\n${file}`);
  if (!existsSync(file)) {
    fail("file does not exist");
    continue;
  }

  const j = JSON.parse(
    probe(["-show_streams", "-show_format", "-print_format", "json", file]),
  );
  const v = j.streams.find((s) => s.codec_type === "video");
  const a = j.streams.find((s) => s.codec_type === "audio");

  v?.codec_name === "h264" ? pass("video codec h264") : fail(`video codec ${v?.codec_name}`);
  v?.pix_fmt === "yuv420p"
    ? pass("pixel format yuv420p")
    : fail(`pixel format ${v?.pix_fmt} (want yuv420p for broad compatibility)`);
  v?.width === 1080 && v?.height === 1920
    ? pass("1080x1920")
    : fail(`${v?.width}x${v?.height}`);
  v?.r_frame_rate === "30/1" ? pass("30 fps") : fail(`fps ${v?.r_frame_rate}`);

  if (!a) fail("NO AUDIO TRACK");
  else {
    a.codec_name === "aac" ? pass("audio codec aac") : fail(`audio codec ${a.codec_name}`);
    Number(a.channels) === 2 ? pass("stereo") : fail(`${a.channels} channel(s)`);
    Number(a.sample_rate) === 48000 ? pass("48 kHz") : fail(`${a.sample_rate} Hz`);
  }

  const dur = Number(j.format.duration);
  Math.abs(dur - seconds) < 0.15
    ? pass(`duration ${dur.toFixed(2)}s (expected ${seconds})`)
    : fail(`duration ${dur.toFixed(2)}s, expected ${seconds}`);
  dur >= 20 && dur <= 30
    ? pass("within the 20-30s brief")
    : fail("outside the 20-30s brief");

  // Audio level: proves the track is not silence.
  // Audio level, measured from decoded PCM. Remotion's bundled ffmpeg has no
  // `volumedetect` filter, so decode to WAV and measure it directly — this
  // also proves the track is real audio and not a silent placeholder.
  const wav = `out/.verify-audio-${Math.random().toString(36).slice(2)}.wav`;
  execFileSync(
    "npx",
    ["remotion", "ffmpeg", "-v", "error", "-y", "-i", file, "-vn",
     "-acodec", "pcm_s16le", "-ar", "48000", "-ac", "2", "-f", "wav", wav],
    { stdio: ["ignore", "ignore", "inherit"] },
  );
  const audio = JSON.parse(
    execFileSync("python3", ["scripts/audio_stats.py", wav], { encoding: "utf8" }),
  );
  rmSync(wav, { force: true });

  if (audio.peakDb < -50) fail(`audio is effectively silent (peak ${audio.peakDb} dB)`);
  else if (audio.peakDb > -0.2) fail(`audio may be clipping (peak ${audio.peakDb} dB)`);
  else pass(`audio peak ${audio.peakDb} dB, RMS ${audio.rmsDb} dB`);
  audio.silentTailSeconds < 1.5
    ? pass(`audio runs to the end (${audio.durationSeconds}s)`)
    : fail(`audio stops ${audio.silentTailSeconds}s before the end`);

  // Blank / frozen frame scan: 2 fps of thumbnails, checked for near-uniform
  // brightness (a blank frame) and for runs with no change at all (a freeze).
  const tmp = `out/.verify-${Math.random().toString(36).slice(2)}`;
  mkdirSync(tmp, { recursive: true });
  // -r/-s rather than a `-vf fps=..,scale=..` chain: the bundled ffmpeg's
  // filtergraph parser rejects the comma-chained form as passed through here.
  execFileSync(
    "npx",
    ["remotion", "ffmpeg", "-v", "error", "-y", "-i", file, "-r", "2", "-s", "96x171",
     `${tmp}/%04d.png`],
    { stdio: ["ignore", "ignore", "inherit"] },
  );
  const report = JSON.parse(
    execFileSync("python3", ["scripts/frame_stats.py", tmp], { encoding: "utf8" }),
  );
  report.blank === 0
    ? pass(`${report.count} sampled frames, none blank`)
    : fail(`${report.blank} of ${report.count} sampled frames are blank`);
  report.maxFreeze <= 8
    ? pass(`longest static hold ${(report.maxFreeze / 2).toFixed(1)}s`)
    : fail(`a ${(report.maxFreeze / 2).toFixed(1)}s stretch shows no movement at all`);
  console.log(`   · mean luma ${report.meanLuma.toFixed(1)}, ${report.changes} of ${report.count - 1} steps show movement`);
  rmSync(tmp, { recursive: true, force: true });
}

console.log(
  failures === 0 ? "\nAll checks passed.\n" : `\n${failures} check(s) FAILED.\n`,
);
process.exit(failures === 0 ? 0 : 1);
