# Wesworld Frontend

The public website for wesworld.org — a Next.js app that pulls all its
content (frameworks, posts, courses, services, site settings, home/about
copy) live from the [Wesworld CMS](../wesworld-cms) via its REST API.

## Local setup

```bash
cp .env.example .env
# set PAYLOAD_API_URL to your running CMS, e.g.:
# PAYLOAD_API_URL=https://wesworld-cms-production.up.railway.app

npm install
npm run dev   # http://localhost:3001 (or whatever port Next picks)
```

Nothing renders until `PAYLOAD_API_URL` points at a real, reachable CMS —
point it at your Railway deployment to see live content locally.

## How pages map to CMS content

| Page                          | Pulls from                                      |
|--------------------------------|--------------------------------------------------|
| `/`                            | `home-page` global + `frameworks` collection      |
| `/frameworks`                  | `frameworks` collection                           |
| `/frameworks/[slug]`           | One framework + its linked `posts`                |
| `/frameworks/[slug]/[postSlug]`| One post's full content                           |
| `/academy`                     | `courses`, `services`, `site-settings.community`  |
| `/about`                       | `about-page` global (vision/mission/objectives/founder) |
| `/privacy-policy`, `/terms`    | Static placeholder content — edit directly in code |

The header nav and footer links pull from the `site-settings` global, so
editing those in the CMS updates every page automatically.

Content refreshes every 60 seconds (see `revalidate` in each page) — so
after editing something in the CMS, allow up to a minute for it to appear
on the live site without needing a redeploy.

## Deploying to Cloudflare Pages

This project is set up to build for Cloudflare Pages using
`@cloudflare/next-on-pages`, which converts the Next.js build into
Cloudflare's edge runtime format.

1. Install Wrangler and log in (skip if you already did this for the CMS):
   ```bash
   npm install -g wrangler
   wrangler login
   ```

2. Build and deploy:
   ```bash
   npm run deploy
   ```
   This runs `next build`, converts it via `@cloudflare/next-on-pages`, and
   pushes it live with `wrangler pages deploy`.

3. In the Cloudflare dashboard, go to your Pages project → **Settings** →
   **Environment variables**, and add:
   ```
   PAYLOAD_API_URL = https://wesworld-cms-production.up.railway.app
   ```
   (or wherever your CMS actually lives)

4. **Connect your domain** — Pages project → **Custom domains** → add
   `wesworld.org` (and `www.wesworld.org` if you use it). Cloudflare will
   walk you through the DNS record it needs, which it can usually add
   automatically since your domain's likely already on Cloudflare.

## Ongoing deploys

For continuous deployment instead of manually running `npm run deploy`
each time, connect this repo to Cloudflare Pages via **Workers & Pages** →
**Create application** → **Pages** → **Connect to Git**, pointing at your
GitHub repo (same pattern as the CMS on Railway). Set the build command to
`npm run pages:build` and the output directory to `.vercel/output/static`.
