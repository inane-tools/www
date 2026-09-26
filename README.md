# Cherry website

A small site for **Cherry**, a lightweight desktop client for YouTube Music.
Dark and cherry-tinted, built with React + React Router (SPA mode) + Tailwind v4
+ shadcn/ui.

## Quick start

```bash
npm install
npm run dev       # dev server
npm run build     # static build → build/client
npm start         # preview the static build
```

`build/client` is deployed to Cloudflare as Workers static assets. See
**[DEPLOY.md](DEPLOY.md)** for a step-by-step guide (GitHub Actions or manual).
The SPA fallback for clean URLs is handled by `not_found_handling` in
`wrangler.toml`.

## Editing the content

Everything on the page (name, tagline, intro, links, features, the Q&A, the
song highlight and the footer blurb) lives in `app/data/site.ts`. No component
code needed.

The page itself is `app/routes/home.tsx`, composed of:

- `app/components/layout/site-header.tsx`: sticky top nav
- `app/components/layout/hero-dither.tsx`: the ReactBits Dither hero backdrop
- `app/components/layout/site-footer.tsx`

Assets in `public/`:

- `icons/cherry.png`: the app icon (also the favicon)
- `inane.svg`: the inane wordmark
- `metal_pipe.jpg`: the song-highlight art
- `screenshot.png`: the hero screenshot

## Adding shadcn components

```bash
npx shadcn@latest add <component>
```

## Tech notes

- **SPA mode**: `ssr: false` in `react-router.config.ts`. Routing is
  client-side; Cloudflare's `not_found_handling = "single-page-application"`
  provides the static-hosting fallback.
- **Theme**: forced dark, cherry-tinted tokens in `app/app.css`
  (`--cherry: #ff4d5e`, `--ember: #ff8a5c` on a near-black base).
- **Fonts**: Zalando Sans Variable, self-hosted via
  `@fontsource-variable/zalando-sans` (the same font the app uses).
- **Animations**: ReactBits `Dither`
  (`app/components/backgrounds/dither.tsx`, via `@react-three/fiber` and
  `postprocessing`) in the hero, plus `FadeContent` for scroll reveals.
