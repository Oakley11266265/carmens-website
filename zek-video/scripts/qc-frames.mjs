/**
 * Renders a still at the start, middle and end of every scene in every reel,
 * plus a few extra frames at animation landing points, into out/qc/.
 *
 * These are the frames to actually look at before exporting: if type clips,
 * contrast fails or a scene is blank, it shows up here for a fraction of the
 * cost of a full render.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const reels = {
  "Reel01-PhotosIntoFilm": [0, 90, 150, 240, 300, 360, 390, 450, 510, 570, 630, 690, 750, 810, 839],
  "Reel02-UseWhatYouHave": [0, 60, 90, 150, 210, 260, 300, 330, 390, 420, 480, 555, 620, 690, 779],
  "Reel03-OpeningShot": [0, 30, 90, 180, 240, 270, 330, 390, 450, 510, 540, 630, 690, 780, 869],
};

mkdirSync("out/qc", { recursive: true });

for (const [id, frames] of Object.entries(reels)) {
  for (const frame of frames) {
    const out = `out/qc/${id}-f${String(frame).padStart(4, "0")}.png`;
    process.stdout.write(`${out} … `);
    execFileSync(
      "npx",
      ["remotion", "still", id, out, `--frame=${frame}`, "--image-format=png", "--log=error"],
      { stdio: ["ignore", "ignore", "inherit"] },
    );
    process.stdout.write("ok\n");
  }
}
