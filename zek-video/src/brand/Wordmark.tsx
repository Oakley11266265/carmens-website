import React from "react";
import { COLORS, TYPE } from "./tokens";
import { FONT_FAMILY } from "./fonts";

/**
 * ZEK Agency wordmark.
 *
 * The real logo file could not be downloaded (zekagency.com is blocked by this
 * environment's egress policy), so this is a clean text wordmark built to the
 * brand direction. Drop a real logo into `public/brand/logo.svg` and set
 * `brand.logo` in a reel config to use it instead — see `src/components/Logo.tsx`.
 */
export const Wordmark: React.FC<{
  size?: number;
  color?: string;
  accent?: string;
  showDot?: boolean;
}> = ({
  size = 44,
  color = COLORS.ink,
  accent = COLORS.blue,
  showDot = true,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: size * 0.42,
        fontFamily: FONT_FAMILY,
      }}
    >
      <span
        style={{
          fontSize: size,
          fontWeight: 800,
          letterSpacing: TYPE.trackWide,
          color,
          lineHeight: 1,
        }}
      >
        ZEK
      </span>
      {showDot ? (
        <span
          style={{
            width: size * 0.2,
            height: size * 0.2,
            borderRadius: "50%",
            backgroundColor: accent,
          }}
        />
      ) : null}
      <span
        style={{
          fontSize: size,
          fontWeight: 400,
          letterSpacing: TYPE.trackWide,
          color,
          lineHeight: 1,
        }}
      >
        AGENCY
      </span>
    </div>
  );
};
