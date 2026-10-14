# inane website

The site for **inane**, a one-person software outfit, featuring **Cherry**, a
lightweight desktop client for YouTube Music. Monochrome black-and-white, built
with React + React Router (SPA mode) + Tailwind v4 + shadcn/ui.

## Quick start

```bash
npm install
npm run dev       # dev server
npm run images    # regenerate optimized .webp images
npm run build     # static build → build/client
npm start         # preview the static build
```

`build/client` is deployed to Cloudflare as Workers static assets. See
**[DEPLOY.md](DEPLOY.md)** for a step-by-step guide (GitHub Actions or manual).
The SPA fallback for clean URLs is handled by `not_found_handling` in
`wrangler.toml`.

## Editing the content

Everything on the page lives in `app/data/site.ts`: the site identity, links,
nav, the about blurb, the projects list and Cherry's content (about, features,
FAQ and disclaimer). No component code needed.

Cherry currently features **v1.6.0 Shibetsu**, with Windows NSIS and Linux
Flatpak/AppImage download links, the refreshed icon, playlist management,
the optional queue sidebar and Windows playlist shortcuts. Keep the version
and all three download filenames in sync with the published GitHub release.

The page itself is `app/routes/home.tsx`, composed of:

- `app/components/layout/site-sidebar.tsx`: fixed left sidebar (bottom bar on
  mobile)
- `app/components/layout/dither-backdrop.tsx`: the Cherry section's dither
  backdrop
- `app/components/sections/apps-section.tsx`: the apps grid, kept out of the
  page for now (re-add `<AppsSection />` and the "Apps" nav item when there's
  more than one app)

Assets in `public/`:

- `inane.svg`: the wordmark
- `inane-favicon.svg`: favicon
- `og-inane.jpg`: Open Graph / embed card (1200x630)
- `screenshot.webp` / `screenshot-compact.webp`: Cherry screenshots
- `icons/cherry.webp`: Cherry icon

## Images

`npm run images` (uses `sharp`) generates the `.webp` versions the site serves
from a matching source (`screenshot*.png`, `icons/cherry.png`) and removes the
source. Drop a new source in `public/` and re-run it.

## Adding shadcn components

```bash
npx shadcn@latest add <component>
```

## Tech notes

- **SPA mode**: `ssr: false` in `react-router.config.ts`. Routing is
  client-side; Cloudflare's `not_found_handling = "single-page-application"`
  provides the static-hosting fallback.
- **Theme**: forced dark, monochrome tokens in `app/app.css` (white ink on a
  near-black base, no colour).
- **Fonts**: Gabarito Variable, self-hosted via
  `@fontsource-variable/gabarito` (the same font the app uses).
