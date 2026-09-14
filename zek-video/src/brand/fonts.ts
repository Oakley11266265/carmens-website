/**
 * Fonts are loaded from `public/fonts` rather than the Google Fonts CDN so
 * that rendering never depends on network access. Inter is licensed under the
 * SIL Open Font License 1.1, which permits commercial use and embedding.
 */
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const FONT_FAMILY = "Inter ZEK";

loadFont({
  family: FONT_FAMILY,
  url: staticFile("fonts/Inter-Variable-latin.woff2"),
  format: "woff2",
  weight: "100 900",
  display: "block",
}).catch((err) => {
   
  console.error("Failed to load Inter", err);
});
