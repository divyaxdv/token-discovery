import { useMemo } from "react";
import { useAppSelector } from "@/store/hooks";

/**
 * Hook to get sorted and filtered tokens from Redux store
 * Memoized to prevent unnecessary re-renders
 */
export function useSortedTokens() {
  const { tokens, sortBy, sortOrder, filter } = useAppSelector(
    (state) => state.tokens
  );

  return useMemo(() => {
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
}

