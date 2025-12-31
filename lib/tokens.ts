import { Token } from "@/types/token";

/**
 * Generate price history with percentage-based volatility
 * Runs on the SERVER - no browser CPU cost
 */
function generatePriceHistory(
  basePrice: number,
  points: number,
  minVolatilityPercent: number,
  maxVolatilityPercent: number,
  tokenVolatilityMultiplier: number
): number[] {
  const history: number[] = [];
  let currentPrice = basePrice;
  let momentum = 0;
  let reversalCounter = 0;

  for (let j = 0; j < points; j++) {
    const baseVolatility =
      minVolatilityPercent +
      Math.random() * (maxVolatilityPercent - minVolatilityPercent);
    const volatilityPercent = baseVolatility * tokenVolatilityMultiplier;

    const momentumFactor = momentum * 0.3;

    reversalCounter++;
    const shouldReverse = reversalCounter > 3 && Math.abs(momentum) > 2;

    let direction;
    if (shouldReverse) {
      direction = momentum > 0 ? -1 : 1;
      reversalCounter = 0;
      momentum = 0;
    } else {
      const randomDirection = Math.random() > 0.5 ? 1 : -1;
      direction =
        Math.abs(momentumFactor) > 0.5
          ? momentumFactor > 0
            ? 1
            : -1
          : randomDirection;
    }

    const moveRoll = Math.random();
    let moveMultiplier = 1;
    if (moveRoll < 0.1) {
      moveMultiplier = 5;
    } else if (moveRoll < 0.3) {
      moveMultiplier = 3;
    }
    const changePercent = direction * volatilityPercent * moveMultiplier;

    currentPrice = currentPrice * (1 + changePercent / 100);

    momentum = momentum * 0.6 + changePercent * 0.3;

    const minPrice = basePrice * 0.1;
    currentPrice = Math.max(minPrice, currentPrice);

    history.push(currentPrice);
  }

  return history;
}

/**
 * Server-side mock token data generator
 * This runs on the SERVER during SSR - no client JavaScript cost
 */
export function generateMockTokens(): Token[] {
  const tokens: Token[] = [];
  const names = [
    "Krill The Krill",
    "Lilly Save Lilly",
    "Chonky Chonky",
    "Aiko Aiko by Eliza",
    "hollo Hollo",
    "Q1 The New Beginn",
  ];

  for (let i = 0; i < 20; i++) {
    const name = names[i % names.length];
    const marketCap = Math.random() * 200000 + 10000;

    const estimatedSupply = 1000000;
    const basePrice = marketCap / estimatedSupply;

    const basePriceChange1h = (Math.random() - 0.5) * 20;
    const trend =
      basePriceChange1h > 1 ? "up" : basePriceChange1h < -1 ? "down" : "neutral";

    const priceChange1h = basePriceChange1h;
    const priceChange30m = basePriceChange1h * 0.7;
    const priceChange5m = basePriceChange1h * 0.3;
    const priceChange1m = basePriceChange1h * 0.1;

    const tokenVolatilityMultiplier = 1.0 + Math.random() * 4.0;

    tokens.push({
      id: `token-${i}`,
      name: `${name} ${i > 5 ? i : ""}`,
      symbol: name.split(" ")[0].toUpperCase().substring(0, 4),
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
      marketCap,
      liquidity: marketCap * 0.2 + Math.random() * 20000,
      volume: Math.random() * 10000,
      transactions: {
        total: Math.floor(Math.random() * 100) + 10,
        buys: Math.floor(Math.random() * 60) + 5,
        sells: Math.floor(Math.random() * 40) + 5,
      },
      priceChange: {
        "1m": priceChange1m,
        "5m": priceChange5m,
        "30m": priceChange30m,
        "1h": priceChange1h,
      },
      snipers: Math.random() * 30,
      holders: Math.floor(Math.random() * 2400) + 200,
      paid: Math.random() > 0.4,
      age: `${Math.floor(Math.random() * 60)}m`,
      top10Holders: 14 + Math.random() * 10,
      devHolders: Math.random() * 15,
      snipersHolders: Math.random() * 0.7,
      insiders: 2.5 + Math.random() * 13,
      bundlers: Math.random() * 0.7,
      otherCount: Math.floor(Math.random() * 530) + 100,
      priceHistory: {
        "1m": generatePriceHistory(basePrice, 12, 1.5, 5.0, tokenVolatilityMultiplier),
        "5m": generatePriceHistory(basePrice, 18, 2.0, 8.0, tokenVolatilityMultiplier),
        "30m": generatePriceHistory(basePrice, 20, 3.0, 12.0, tokenVolatilityMultiplier),
        "1h": generatePriceHistory(basePrice, 20, 2.5, 10.0, tokenVolatilityMultiplier),
      },
      category: i < 7 ? "new" : i < 14 ? "final" : "migrated",
      trend,
    });
  }

  return tokens;
}

/**
 * Server-side data fetching function
 * Can be replaced with real API call later
 */
export async function getTokens(): Promise<Token[]> {
  // In production, this would be: return fetch('/api/tokens').then(r => r.json())
  return generateMockTokens();
}

