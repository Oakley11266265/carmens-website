/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";
import { enableTailwind } from '@remotion/tailwind-v4';

Config.setRspack(true);

/**
 * This machine has no outbound access to remotion.media, so Remotion cannot
 * download its own Chrome Headless Shell. Point it at the Chromium that is
 * already installed instead. Override with the REMOTION_BROWSER env var, or
 * delete this block on a machine with normal network access.
 */
Config.setBrowserExecutable(
  process.env.REMOTION_BROWSER ??
    "/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell",
);

// Chromium runs as root in this container, which it refuses to do unsandboxed.
Config.setChromiumOpenGlRenderer("swangle");
/**
 * PNG rather than JPEG frames. Two reasons:
 *  - JPEG frames make x264 emit `yuvj420p` (deprecated full-range), which some
 *    players render with shifted levels. PNG gives a clean `yuv420p`.
 *  - These compositions are flat vector fills and soft gradients, exactly the
 *    content JPEG bands on.
 */
Config.setVideoImageFormat("png");
Config.setOverwriteOutput(true);
Config.overrideBundlerConfig(enableTailwind);
