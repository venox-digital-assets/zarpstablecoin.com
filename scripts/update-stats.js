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
const REQUEST_TIMEOUT_MS = 15000;

// Baseline transactions (EVM + Solana estimated historical)
// TODO: Hook up real Explorer APIs (Etherscan, Solscan) here when keys are available
const BASELINE_TRANSACTIONS = 150000;
const FALLBACK_SUPPLY = 67365368.31;
const FALLBACK_RESERVES = 85819720.70;
const IS_DEV = process.env.NODE_ENV !== 'production';

function logInfo(message, details) {
  if (details !== undefined) {
    console.log(`[update-stats] ${message}`, details);
    return;
  }
  console.log(`[update-stats] ${message}`);
}

function logWarn(message, details) {
  if (details !== undefined) {
    console.warn(`[update-stats] ${message}`, details);
    return;
  }
  console.warn(`[update-stats] ${message}`);
}

function isFinitePositiveNumber(value) {
  return Number.isFinite(value) && value > 0;
}

function parseAmount(value) {
  if (typeof value !== 'string') return null;
  const parsed = Number.parseFloat(value.replace(/,/g, ''));
  return isFinitePositiveNumber(parsed) ? parsed : null;
}

function normalizeChartPoints(prices) {
  if (!Array.isArray(prices) || prices.length === 0) return [];

  const validPoints = prices.filter((point) => (
    Array.isArray(point)
    && point.length >= 2
    && Number.isFinite(point[0])
    && Number.isFinite(point[1])
    && point[1] > 0
  ));

  if (validPoints.length === 0) return [];

  const downsampleRate = Math.max(1, Math.ceil(validPoints.length / 50));
  return validPoints.filter((_, index) => index % downsampleRate === 0);
}

async function fetchWithTimeout(url, options = {}, timeoutMs = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function readExistingStats() {
  try {
    const raw = await fs.readFile(STATS_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

async function fetchStats() {
  logInfo('Fetching ZARP stats...');

  const existingStats = await readExistingStats();
  const now = new Date().toISOString();
  let hasSuccessfulSource = false;

  const newStats = {
    transactions: existingStats?.transactions ?? BASELINE_TRANSACTIONS,
    supply: existingStats?.supply ?? FALLBACK_SUPPLY,
    reserves: existingStats?.reserves ?? FALLBACK_RESERVES,
    price_usd: existingStats?.price_usd ?? 0,
    chart: Array.isArray(existingStats?.chart) ? existingStats.chart : [],
    lastUpdated: existingStats?.lastUpdated ?? now,
    lastAttemptedAt: now,
    sources: {
      transparency: {
        status: 'error',
        checkedAt: now,
        message: 'Not attempted yet'
      },
      coingecko: {
        status: 'error',
        checkedAt: now,
        message: 'Not attempted yet'
      },
      chart: {
        status: 'error',
        checkedAt: now,
        message: 'Not attempted yet'
      }
    }
  };

  try {
    logInfo(`Fetching ${TRANSPARENCY_URL}...`);
    try {
      const transparencyRes = await fetchWithTimeout(TRANSPARENCY_URL);
      if (!transparencyRes.ok) {
        throw new Error(`HTTP ${transparencyRes.status}`);
      }

      const transparencyHtml = await transparencyRes.text();
      const supplyMatch = transparencyHtml.match(/Circulating token supply[\s\S]*?([\d,]+\.\d{2})/);
      const reservesMatch = transparencyHtml.match(/Treasury Reserves[\s\S]*?R\s*([\d,]+\.\d{2})/);

      const parsedSupply = parseAmount(supplyMatch?.[1]);
      const parsedReserves = parseAmount(reservesMatch?.[1]);

      if (parsedSupply && parsedReserves) {
        newStats.supply = parsedSupply;
        newStats.reserves = parsedReserves;
        newStats.sources.transparency = {
          status: 'ok',
          checkedAt: now,
          message: 'Transparency page parsed successfully'
        };
        hasSuccessfulSource = true;
        logInfo(`Supply: ${newStats.supply}`);
        logInfo(`Reserves: ${newStats.reserves}`);
      } else {
        newStats.sources.transparency = {
          status: 'error',
          checkedAt: now,
          message: 'Unable to parse supply/reserves from transparency page'
        };
      }
    } catch (error) {
      newStats.sources.transparency = {
        status: 'error',
        checkedAt: now,
        message: error instanceof Error ? error.message : 'Unknown transparency error'
      };
      logWarn('Transparency source failed', newStats.sources.transparency.message);
    }

    logInfo('Fetching CoinGecko price...');
    try {
      const geckoRes = await fetchWithTimeout(COINGECKO_URL);
      if (!geckoRes.ok) {
        throw new Error(`HTTP ${geckoRes.status}`);
      }

      const geckoData = await geckoRes.json();
      const usdPrice = geckoData?.['zarp-stablecoin']?.usd;

      if (isFinitePositiveNumber(usdPrice)) {
        newStats.price_usd = usdPrice;
        newStats.sources.coingecko = {
          status: 'ok',
          checkedAt: now,
          message: 'CoinGecko price fetched successfully'
        };
        hasSuccessfulSource = true;
        logInfo(`Price (USD): ${newStats.price_usd}`);
      } else {
        newStats.sources.coingecko = {
          status: 'error',
          checkedAt: now,
          message: 'CoinGecko response missing valid USD price'
        };
      }
    } catch (error) {
      newStats.sources.coingecko = {
        status: 'error',
        checkedAt: now,
        message: error instanceof Error ? error.message : 'Unknown CoinGecko error'
      };
      logWarn('CoinGecko price source failed', newStats.sources.coingecko.message);
    }

    logInfo('Fetching CoinGecko chart...');
    try {
      const chartRes = await fetchWithTimeout(COINGECKO_CHART_URL);
      if (!chartRes.ok) {
        throw new Error(`HTTP ${chartRes.status}`);
      }

      const chartData = await chartRes.json();
      const normalizedChart = normalizeChartPoints(chartData?.prices);

      if (normalizedChart.length > 0) {
        newStats.chart = normalizedChart;
        newStats.sources.chart = {
          status: 'ok',
          checkedAt: now,
          message: `Chart updated with ${normalizedChart.length} points`
        };
        hasSuccessfulSource = true;
        logInfo(`Chart points: ${newStats.chart.length}`);
      } else {
        newStats.sources.chart = {
          status: 'error',
          checkedAt: now,
          message: 'CoinGecko chart response missing valid price points'
        };
      }
    } catch (error) {
      newStats.sources.chart = {
        status: 'error',
        checkedAt: now,
        message: error instanceof Error ? error.message : 'Unknown chart error'
      };
      logWarn('CoinGecko chart source failed', newStats.sources.chart.message);
    }

    if (hasSuccessfulSource) {
      newStats.lastUpdated = now;
    } else {
      logWarn('All upstream sources failed; keeping last successful snapshot values.');
    }

    if (IS_DEV) {
      const failedSources = Object.entries(newStats.sources)
        .filter(([, source]) => source.status === 'error')
        .map(([name, source]) => `${name}: ${source.message}`);
      if (failedSources.length > 0) {
        logWarn('Source health warnings', failedSources);
      }
    }

    logInfo(`Writing to ${STATS_PATH}...`);
    await fs.writeFile(STATS_PATH, JSON.stringify(newStats, null, 2));
    logInfo('Done!');

  } catch (error) {
    console.error('Error updating stats:', error);
    process.exit(1);
  }
}

fetchStats();
