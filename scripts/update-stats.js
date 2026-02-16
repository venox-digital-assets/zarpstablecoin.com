import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
// Script runs from repo_root/scripts/update-stats.js
// Data file is at repo_root/src/data/stats.json
const STATS_PATH = path.join(__dirname, '../src/data/stats.json');

const TRANSPARENCY_URL = 'https://www.zarpstablecoin.com/transparency.html';
const COINGECKO_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=zarp-stablecoin&vs_currencies=usd,zar';
const COINGECKO_CHART_URL = 'https://api.coingecko.com/api/v3/coins/zarp-stablecoin/market_chart?vs_currency=usd&days=7';

// Baseline transactions (EVM + Solana estimated historical)
// TODO: Hook up real Explorer APIs (Etherscan, Solscan) here when keys are available
const BASELINE_TRANSACTIONS = 150000;

async function fetchStats() {
  console.log('Fetching ZARP stats...');
  
  const newStats = {
    transactions: BASELINE_TRANSACTIONS,
    supply: 0,
    reserves: 0,
    price_usd: 0,
    chart: [], // [timestamp, price] array
    lastUpdated: new Date().toISOString()
  };

  try {
    // 1. Fetch Transparency Page (Source of Truth for Reserves/Supply)
    console.log(`Fetching ${TRANSPARENCY_URL}...`);
    const transparencyRes = await fetch(TRANSPARENCY_URL);
    const transparencyHtml = await transparencyRes.text();

    // Regex to extract numbers (looking for "R 85,819,720.70" format)
    const supplyMatch = transparencyHtml.match(/Circulating token supply[\s\S]*?([\d,]+\.\d{2})/);
    const reservesMatch = transparencyHtml.match(/Treasury Reserves[\s\S]*?R\s*([\d,]+\.\d{2})/);

    if (supplyMatch) {
      newStats.supply = parseFloat(supplyMatch[1].replace(/,/g, ''));
      console.log(`Supply: ${newStats.supply}`);
    }
    
    if (reservesMatch) {
      newStats.reserves = parseFloat(reservesMatch[1].replace(/,/g, ''));
      console.log(`Reserves: ${newStats.reserves}`);
    }

    // 2. Fetch CoinGecko (Price)
    console.log(`Fetching CoinGecko...`);
    const geckoRes = await fetch(COINGECKO_URL);
    const geckoData = await geckoRes.json();
    
    if (geckoData['zarp-stablecoin']) {
      newStats.price_usd = geckoData['zarp-stablecoin'].usd;
      console.log(`Price (USD): ${newStats.price_usd}`);
    }

    // 3. Fetch CoinGecko Chart (7 days)
    console.log(`Fetching Chart Data...`);
    const chartRes = await fetch(COINGECKO_CHART_URL);
    const chartData = await chartRes.json();
    
    if (chartData.prices) {
      // Downsample to ~50 points to keep file size small
      const prices = chartData.prices;
      const downsampleRate = Math.ceil(prices.length / 50);
      newStats.chart = prices.filter((_, i) => i % downsampleRate === 0);
      console.log(`Chart points: ${newStats.chart.length}`);
    }

    // 4. Write to JSON
    console.log(`Writing to ${STATS_PATH}...`);
    await fs.writeFile(STATS_PATH, JSON.stringify(newStats, null, 2));
    console.log('Done!');

  } catch (error) {
    console.error('Error updating stats:', error);
    process.exit(1);
  }
}

fetchStats();
