import { useQuery } from "@tanstack/react-query";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setTokens } from "@/store/slices/tokenSlice";
import { Token } from "@/types/token";
import { useEffect, useMemo } from "react";

/**
 * Mock token data generator
 */
function generateMockTokens(): Token[] {
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
    
    // Calculate base price from market cap (simplified: assume supply ~1M)
    const estimatedSupply = 1000000;
    const basePrice = marketCap / estimatedSupply;
    
    // Generate realistic price changes using percentage-based volatility
    // Total 1h change: -10% to +10% range for more variation
    const basePriceChange1h = (Math.random() - 0.5) * 20; // -10% to +10%
    const trend = basePriceChange1h > 1 ? "up" : basePriceChange1h < -1 ? "down" : "neutral";

    // Generate different price changes for each time period (cumulative)
    const priceChange1h = basePriceChange1h;
    const priceChange30m = basePriceChange1h * 0.7;
    const priceChange5m = basePriceChange1h * 0.3;
    const priceChange1m = basePriceChange1h * 0.1;

    // Generate price history with percentage-based volatility
    // Each point represents a small percentage change from the previous price
    // Add token-specific volatility multiplier for variation - some tokens are extremely volatile
    const tokenVolatilityMultiplier = 1.0 + Math.random() * 4.0; // 1x to 5x volatility (very volatile)
    
    const generatePriceHistory = (
      points: number,
      minVolatilityPercent: number,
      maxVolatilityPercent: number
    ) => {
      const history: number[] = [];
      let currentPrice = basePrice;
      let momentum = 0; // Track price momentum for more realistic trends
      let reversalCounter = 0; // Track when to reverse trend
      
      for (let j = 0; j < points; j++) {
        // Generate percentage change within specified range, scaled by token volatility
        const baseVolatility = minVolatilityPercent + 
          Math.random() * (maxVolatilityPercent - minVolatilityPercent);
        const volatilityPercent = baseVolatility * tokenVolatilityMultiplier;
        
        // Add momentum effect but with frequent reversals
        const momentumFactor = momentum * 0.3; // Reduced to 30% to allow more reversals
        
        // Force reversals every few points to create up/down movement
        reversalCounter++;
        const shouldReverse = reversalCounter > 3 && Math.abs(momentum) > 2;
        
        // Apply percentage change: price * (1 + percentage/100)
        // Direction: random with momentum influence, but force reversals
        let direction;
        if (shouldReverse) {
          direction = momentum > 0 ? -1 : 1; // Reverse the trend
          reversalCounter = 0; // Reset counter
          momentum = 0; // Reset momentum on reversal
        } else {
          const randomDirection = Math.random() > 0.5 ? 1 : -1;
          direction = Math.abs(momentumFactor) > 0.5 ? (momentumFactor > 0 ? 1 : -1) : randomDirection;
        }
        
        // More frequent and larger moves (30% chance of 3x volatility, 10% chance of 5x)
        const moveRoll = Math.random();
        let moveMultiplier = 1;
        if (moveRoll < 0.1) {
          moveMultiplier = 5; // 10% chance of extreme move
        } else if (moveRoll < 0.3) {
          moveMultiplier = 3; // 20% chance of large move
        }
        const changePercent = direction * volatilityPercent * moveMultiplier;
        
        currentPrice = currentPrice * (1 + changePercent / 100);
        
        // Update momentum (faster decay to allow reversals)
        momentum = momentum * 0.6 + changePercent * 0.3;
        
        // Ensure price doesn't go below 10% of base price
        const minPrice = basePrice * 0.1;
        currentPrice = Math.max(minPrice, currentPrice);
        
        history.push(currentPrice);
      }
      
      return history;
    };

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
      paid: Math.random() > 0.4, // 60% chance of paid
      age: `${Math.floor(Math.random() * 60)}m`,
      top10Holders: 14 + Math.random() * 10, // 14% - 24%
      devHolders: Math.random() * 15, // 0% - 15%
      snipersHolders: Math.random() * 0.7, // 0% - 0.7%
      insiders: 2.5 + Math.random() * 13, // 2.5% - 15.5%
      bundlers: Math.random() * 0.7, // 0% - 0.7%
      otherCount: Math.floor(Math.random() * 530) + 100, // 100 - 630
      priceHistory: {
        // 1m: Small deviations (1.5% - 5% per point), 12 points - dramatic swings
        "1m": generatePriceHistory(12, 1.5, 5.0),
        // 5m: Moderate deviations (2% - 8% per point), 18 points - very volatile
        "5m": generatePriceHistory(18, 2.0, 8.0),
        // 30m: Larger deviations (3% - 12% per point), 20 points - extreme volatility
        "30m": generatePriceHistory(20, 3.0, 12.0),
        // 1h: Cumulative changes (2.5% - 10% per point), 20 points - dramatic price swings
        "1h": generatePriceHistory(20, 2.5, 10.0),
      },
      category: i < 7 ? "new" : i < 14 ? "final" : "migrated",
      trend,
    });
  }

  return tokens;
}

async function fetchTokens(): Promise<Token[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return generateMockTokens();
}

export function useTokens() {
  const dispatch = useAppDispatch();
  const { tokens, sortBy, sortOrder, filter } = useAppSelector((state) => state.tokens);

  const { data, isLoading, error } = useQuery({
    queryKey: ["tokens"],
    queryFn: fetchTokens,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  useEffect(() => {
    if (data) {
      dispatch(setTokens(data));
    }
  }, [data, dispatch]);

  const sortedAndFilteredTokens = useMemo(() => {
    let result = [...tokens];

    // Apply filter
    if (filter !== "all") {
      result = result.filter((token) => token.category === filter);
    }

    // Apply sorting
    if (sortBy) {
      result.sort((a, b) => {
        let aValue: number;
        let bValue: number;

        switch (sortBy) {
          case "marketCap":
            aValue = a.marketCap;
            bValue = b.marketCap;
            break;
          case "liquidity":
            aValue = a.liquidity;
            bValue = b.liquidity;
            break;
          case "volume":
            aValue = a.volume;
            bValue = b.volume;
            break;
          case "transactions":
            aValue = a.transactions.total;
            bValue = b.transactions.total;
            break;
          case "priceChange":
            aValue = a.priceChange["1h"];
            bValue = b.priceChange["1h"];
            break;
          default:
            return 0;
        }

        if (sortOrder === "asc") {
          return aValue - bValue;
        }
        return bValue - aValue;
      });
    }

    return result;
  }, [tokens, sortBy, sortOrder, filter]);

  return {
    tokens: sortedAndFilteredTokens,
    isLoading,
    error,
  };
}

