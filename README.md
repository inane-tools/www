# INANE

A black & white, mobile-first site for vibe-coded tools. React + React Router (SPA mode) + Tailwind v4 + shadcn/ui, with ReactBits animations and a custom framer-motion coverflow.

## Quick start

```bash
npm install
npm run dev       # dev server
npm run build     # static build → build/client
npm start         # preview the static build
```

`build/client` is deployed to Cloudflare as Workers static assets. See **[DEPLOY.md](DEPLOY.md)** for a step-by-step guide (GitHub Actions or manual). The SPA fallback for clean URLs is handled by `not_found_handling` in `wrangler.toml`.

## Adding or editing an app

Open `app/data/apps.ts` and push an object to the `apps` array:

```ts
{
  slug: "my-tool",                          // URL: /apps/my-tool
  name: "My Tool",
  tagline: "One-line hook",
  blurb: "Short pitch shown on the app page.",
  description: "Longer description.",
  screenshot: "/screenshots/my-tool.png",   // drop the file in public/screenshots/
  version: "1.0.0",
  downloads: {
    windows: "https://...",                 // omit a platform to hide its button
    mac: "https://...",
    linux: "https://...",
  },
}
```

The coverflow on the home page and the app's `/apps/:slug` page are generated automatically from this file.

## Editing site info, FAQ and links

Everything else — site name, tagline, about text, social links and the Q&A section — lives in `app/data/site.ts`. No component code needed.

## Adding shadcn components

```bash
npx shadcn@latest add <component>
```

## Tech notes

- **SPA mode**: `ssr: false` in `react-router.config.ts`. Routing is client-side; Cloudflare's `not_found_handling = "single-page-application"` provides the static-hosting fallback.
- **Theme**: black & white via OKLCH tokens in `app/app.css`; dark/light toggle in the bottom nav (persisted, respects system preference).
- **Font**: Syne from Google Fonts (see `app/app.css`).
- **Animations**: ReactBits `BlurText` + `FadeContent` (in `app/components/react-bits/`), custom coverflow in `app/components/home/coverflow.tsx`.