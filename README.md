# Carmen's Seafood Restaurant — carmenhascrabs.com

One-page scrollytelling site for Carmen's Seafood Restaurant, Sea Isle City, NJ.
Family-run on the bay since 1943 — the site tells that story on scroll.

## Stack

- [Vite](https://vitejs.dev) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) (theme tokens in `src/index.css`)
- [Framer Motion](https://www.framer.com/motion/) for all animation
- shadcn-style components in `src/components/ui` (`.mcp.json` registers the shadcn MCP server for adding more)
- Lucide icons; all artwork is hand-drawn inline SVG (no image assets)

## Design system

Generated with the ui-ux-pro-max skill, tuned for old-school Jersey Shore bayfront:

- **Palette** — deep bay blue (`bay-*`), sandy cream (`cream-*`), faded crab red (`crab-*`), driftwood (`wood-*`)
- **Type** — Abril Fatface (display) / Yellowtail (hand-painted script accents) / Karla (body)
- **Motion** — scroll-triggered `whileInView` reveals, parallax hero layers, spring physics, count-up dates; `prefers-reduced-motion` respected via `MotionConfig` + `useReducedMotion`

## Develop

```sh
npm install
npm run dev      # local dev server
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
```
