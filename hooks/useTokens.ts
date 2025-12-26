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
    const basePriceChange = (Math.random() - 0.5) * 20;
    const trend = basePriceChange > 0 ? "up" : basePriceChange < -2 ? "down" : "neutral";

    // Generate different price changes for each time period
    const priceChange1h = basePriceChange;
    const priceChange30m = basePriceChange * 0.7;
    const priceChange5m = basePriceChange * 0.3;
    const priceChange1m = basePriceChange * 0.1;

    // Generate different price history arrays for each time period
    const basePrice = 50 + Math.random() * 50;
    const generatePriceHistory = (points: number, volatility: number) => {
      const history: number[] = [];
      let currentPrice = basePrice;
      for (let j = 0; j < points; j++) {
        currentPrice += (Math.random() - 0.5) * volatility;
        history.push(Math.max(10, currentPrice));
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
      holders: Math.floor(Math.random() * 1000) + 100,
      paid: Math.random() > 0.5,
      age: `${Math.floor(Math.random() * 60)}m`,
      priceHistory: {
        "1m": generatePriceHistory(10, 2), // More volatile, fewer points
        "5m": generatePriceHistory(15, 3),
        "30m": generatePriceHistory(20, 5),
        "1h": generatePriceHistory(20, 8), // Less volatile, more points
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

