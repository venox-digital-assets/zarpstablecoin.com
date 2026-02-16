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

## Build and preview

```sh
npm run build
npm run preview
```

- Build output is generated in `dist/`.
- This branch is configured to build as a static site.

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
