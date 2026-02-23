# ZARP Stablecoin Website

The official website for [ZARP Stablecoin](https://zarpstablecoin.com), the fully collateralized and audited Rand stablecoin.

Built with modern web standards to ensure performance, reliability, and transparency.

## ⚡ Tech Stack

- **Framework**: [Astro v5](https://astro.build) (Static Site Generation)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Deployment**: GitHub Pages
- **Automation**: GitHub Actions (Data fetching)

## 🚀 Getting Started

### Prerequisites
- Node.js v20+
- npm

### Installation

```bash
git clone https://github.com/venox-digital-assets/zarpstablecoin.com.git
cd zarpstablecoin.com
npm ci
```

### Local Development

Start the development server:

```bash
npm run dev
```
Visit `http://localhost:4321`.

### Building for Production

Generate the static output (`dist/`):

```bash
npm run build
```

Preview the build locally:

```bash
npm run preview
```

## 📊 Data & Automation

The site relies on a hybrid data approach to ensure speed and freshness:

1.  **Static Data (`src/data/stats.json`)**:
    - Contains circulating supply, treasury reserves, transaction counts, and cached price data.
    - Updated automatically every 6 hours via GitHub Actions (`.github/workflows/update-stats.yml`).
    - Script: `scripts/update-stats.js`.

2.  **Live Price Data**:
    - The client-side browser fetches real-time ZARP/USD price data from CoinGecko to overlay on the static content.
    - If the API is unreachable, it gracefully falls back to the static build data.

To manually update stats locally:
```bash
npm run update:stats
```

## 🎨 Design & Content Guidelines

### Brand Colors
- **ZARP Green**: `#009A35`
- **Dark Green**: `#00493D`
- **Slate**: `slate-900` (Text/Headings), `slate-50` (Backgrounds)

### Copywriting Rules (Compliance)
- **DO**: Use "Rand stablecoin", "Rand value", "ZARP tokens".
- **DO NOT**: Use "Digital Rand" or imply it is legal tender issued by the SARB.
- **Tone**: Trusted, transparent, technical but accessible.

## 📂 Project Structure

- `src/pages/`:
  - `index.astro`: Homepage (Market snapshot, use cases).
  - `get-zarp.astro`: Ecosystem directory (Exchanges, Wallets, Partners).
  - `transparency.astro`: Live transparency dashboard (Audits, Proof of Reserves).
  - `terms.astro`: Terms of Service (Native HTML version).
- `src/data/`: Static JSON data files.
- `public/`: Static assets (Logos, PDFs, Favicons).
- `scripts/`: Node.js maintenance scripts.

## 🤝 Contributing

1.  Create a feature branch (`git checkout -b feature/amazing-feature`).
2.  Commit your changes (`git commit -m 'feat: Add amazing feature'`).
3.  Push to the branch (`git push origin feature/amazing-feature`).
4.  Open a Pull Request.

---

&copy; 2026 ZARP Stablecoin (Pty) Ltd. All rights reserved.
