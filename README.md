# zarpstablecoin.com

ZARP Stablecoin marketing site and transparency pages, built with Astro + Tailwind.

## Stack

- Astro 5
- Tailwind CSS 4 (via `@tailwindcss/vite`)
- Static output (`dist/`) for deployment

## Local development

From repo root:

```sh
npm ci
npm run dev
```

Site runs at `http://localhost:4321`.

- `npm run dev` uses `--strictPort`, so it fails fast if `4321` is busy.
- For extra diagnostics locally, run `npm run dev:verbose`.

## Build and preview

```sh
npm run build
npm run preview
```

- Build output is generated in `dist/`.
- This branch is configured to build as a static site.

## Deployment (GitHub Pages)

- Hosting target is GitHub Pages.
- Root `CNAME` must remain present for custom domain mapping.
- Avoid introducing SSR-only routes or adapters unless deployment strategy changes.

## Project layout

```text
src/
  pages/
    index.astro
    get-zarp.astro
    transparency.astro
    api/stats.json.ts
  layouts/
    Layout.astro
  data/
    stats.json
  styles/
    global.css
public/
  img/
scripts/
  update-stats.js
old-site/
```

- `old-site/` contains the legacy pre-Astro implementation kept for reference.
- Current production pages live under `src/pages/`.

## Data model and updates

Primary metrics are sourced from `src/data/stats.json`.

`stats.json` stores both values and source health metadata (`sources.*`) so the UI can show clear degraded states (for example, CoinGecko temporarily unavailable) without breaking static rendering.

Homepage market data follows a progressive pattern:

- Render cached values from `stats.json` immediately (fast and resilient).
- Attempt an async browser refresh from CoinGecko.
- If CoinGecko fails, keep cached values and show an explicit degraded status message.

The script `scripts/update-stats.js` refreshes:

- transparency supply/reserves (scraped from the live transparency page)
- CoinGecko price
- 7-day chart points

Run manually:

```sh
node scripts/update-stats.js
```

## Automation

GitHub Actions workflow `.github/workflows/update-stats.yml` runs every 6 hours and commits updates to `src/data/stats.json` when values change.

## Notes for contributors

- Use `npm ci` for reproducible installs in CI/local.
- Keep route logic static-friendly unless explicitly moving to SSR with an Astro adapter.
- If you add new runtime/server routes, document deployment adapter requirements in this README.
- Run `npm run update:stats` to refresh market/transparency data and source statuses.
- Run `npm run check` before opening PRs.
- Use `npm run dev:verbose` during manual QA to surface Astro debug logs and Node warnings.
