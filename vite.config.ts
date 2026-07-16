import path from "node:path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // INLINE_ASSETS=1 produces a fully self-contained bundle (used for the
    // hosted single-file preview); normal builds emit separate asset files
    assetsInlineLimit: process.env.INLINE_ASSETS ? Number.MAX_SAFE_INTEGER : undefined,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
