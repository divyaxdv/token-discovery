import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateToken } from "@/store/slices/tokenSlice";
import { Token } from "@/types/token";

/**
 * Mock WebSocket hook for real-time price updates
 * Simulates price changes with smooth transitions
 */
export function useWebSocket(tokens: Token[]) {
  const dispatch = useAppDispatch();
  const allTokens = useAppSelector((state) => state.tokens.tokens);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (tokens.length === 0) return;

    // Simulate WebSocket updates every 2 seconds
    intervalRef.current = setInterval(() => {
      const randomToken = allTokens[Math.floor(Math.random() * allTokens.length)];
      if (!randomToken) return;

      const priceChange = (Math.random() - 0.5) * 10; // Random change between -5% and +5%
      const volumeChange = Math.random() * 1000;
      const currentVolume = randomToken.volume || 0;

      // Update price history for all time periods
      const updatePriceHistory = (history: number[], newValue: number) => {
        const updated = [...history];
        updated.push(newValue);
        return updated.slice(-20); // Keep last 20 points
      };

      const currentPrice = randomToken.priceHistory["1h"]?.[randomToken.priceHistory["1h"].length - 1] || 50;
      const newPrice = Math.max(10, currentPrice + (Math.random() - 0.5) * 5);

      dispatch(
        updateToken({
          id: randomToken.id,
          updates: {
            priceChange: {
              "1m": priceChange * 0.1,
              "5m": priceChange * 0.3,
              "30m": priceChange * 0.7,
              "1h": priceChange,
            },
            priceHistory: {
              "1m": updatePriceHistory(randomToken.priceHistory["1m"] || [], newPrice),
              "5m": updatePriceHistory(randomToken.priceHistory["5m"] || [], newPrice),
              "30m": updatePriceHistory(randomToken.priceHistory["30m"] || [], newPrice),
              "1h": updatePriceHistory(randomToken.priceHistory["1h"] || [], newPrice),
            },
            volume: Math.max(0, currentVolume + volumeChange - Math.random() * 500),
            trend: priceChange > 0 ? "up" : priceChange < -2 ? "down" : "neutral",
          },
        })
      );
    }, 2000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [tokens.length, allTokens, dispatch]);
}

