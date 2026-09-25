# Deploying to Cloudflare

This site is a static React Router SPA. `npm run build` outputs everything to
`build/client`, which is uploaded as Cloudflare Workers static assets.

> **Note:** Cloudflare Pages has been deprecated (2026). New projects are
> Workers with static assets. This repo deploys with `wrangler deploy` using
> `wrangler.toml`, not `wrangler pages deploy`.

## Prerequisites

- The GitHub repository [`inane-tools/www`](https://github.com/inane-tools/www)
  containing this code.
- A Cloudflare account.
- Node.js `>= 22.12` (the repo pins `22` via `.nvmrc`).

## Option A — GitHub Actions (automated CI)

The repo includes `.github/workflows/deploy.yml`, which builds and deploys via
`cloudflare/wrangler-action` on every push to `main`.

1. Create an API token in Cloudflare (**My Profile → API Tokens**) with the
   **Workers Scripts: Edit** permission (add **Account: Read** if your token
   cannot resolve the account).
2. In your GitHub repo go to **Settings → Secrets and variables → Actions → New
   repository secret** and add:

   | Secret | Value |
   | --- | --- |
   | `CLOUDFLARE_API_TOKEN` | the API token from step 1 |
   | `CLOUDFLARE_ACCOUNT_ID` | your Cloudflare account ID (dashboard homepage) |

3. Push to `main` — the workflow installs, builds (`npm run build`), and runs
   `wrangler deploy`. The first deploy creates the `www` Worker
   automatically; no pre-created project is needed.

   The Worker name comes from `name` in `wrangler.toml`. If you change it,
   update `wrangler.toml`; the workflow does not hardcode a name.

## Option B — Deploy manually

```bash
npm ci
npm run build
npx wrangler deploy
```

This requires `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in your
environment (or run `npx wrangler login` first).

## Why there are no routing changes

The SPA needs any unknown path (for example `/apps/vibepad`) to return
`index.html`. That is handled by Cloudflare's built-in SPA fallback:

```toml
[assets]
not_found_handling = "single-page-application"
```

Do **not** also add a `_redirects` file with `/* /index.html 200` — combining it
with `not_found_handling` causes an infinite redirect loop.

## Custom domain (optional)

In **Workers & Pages → your Worker → Settings → Domains & Routes**, add your
domain and follow Cloudflare's DNS instructions. No code changes required.

## Troubleshooting

- **Build fails with "engine node" / module errors** → confirm `NODE_VERSION=22`
  is set (or the `.nvmrc`/workflow is used).
- **"Project not found" / code 8000007** → you are on the old Pages flow. Use
  `wrangler deploy` with the `[assets]` config (see above), not
  `wrangler pages deploy`.
- **Blank page or 404 on a deep link** → make sure `not_found_handling` is set
  to `single-page-application` in `wrangler.toml`.
- **Preview vs production**: pushing to branches other than `main` creates a
  version; the workflow above deploys only `main`.
