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

      // Use percentage-based price changes with extreme volatility
      // Most updates are moderate (1% - 3%), frequent larger moves (3% - 8%), occasional extreme (8% - 15%)
      const moveRoll = Math.random();
      let minChange, maxChange;
      if (moveRoll < 0.1) {
        // 10% chance of extreme move
        minChange = 8.0;
        maxChange = 15.0;
      } else if (moveRoll < 0.4) {
        // 30% chance of large move
        minChange = 3.0;
        maxChange = 8.0;
      } else {
        // 60% chance of moderate move
        minChange = 1.0;
        maxChange = 3.0;
      }
      
      const priceChangePercent = minChange + Math.random() * (maxChange - minChange);
      const direction = Math.random() > 0.5 ? 1 : -1;
      const priceChange1h = direction * priceChangePercent;
      
      const volumeChange = Math.random() * 1000;
      const currentVolume = randomToken.volume || 0;

      // Get current price from 1h history (most recent)
      const currentPrice = randomToken.priceHistory["1h"]?.[randomToken.priceHistory["1h"].length - 1];
      if (!currentPrice) return;

      // Calculate new price using percentage-based change
      // Ensure price doesn't drop below 10% of original, but allow full range of movement
      const minPrice = currentPrice * 0.1;
      const maxPrice = currentPrice * 2.0; // Allow up to 2x increase
      let newPrice = currentPrice * (1 + priceChange1h / 100);
      newPrice = Math.max(minPrice, Math.min(maxPrice, newPrice)); // Clamp between min and max

      // Update price history for all time periods with percentage-based increments
      const updatePriceHistory = (
        history: number[],
        newValue: number,
        timePeriod: "1m" | "5m" | "30m" | "1h"
      ) => {
        const updated = [...history];
        
        // Calculate incremental change based on time period
        // Shorter periods get smaller changes
        let incrementalChange = priceChange1h;
        if (timePeriod === "1m") incrementalChange = priceChange1h * 0.1;
        else if (timePeriod === "5m") incrementalChange = priceChange1h * 0.3;
        else if (timePeriod === "30m") incrementalChange = priceChange1h * 0.7;
        
        // Get last price in this period's history
        const lastPrice = history.length > 0 ? history[history.length - 1] : currentPrice;
        const periodNewPrice = Math.max(minPrice, lastPrice * (1 + incrementalChange / 100));
        
        updated.push(periodNewPrice);
        return updated.slice(-20); // Keep last 20 points
      };

      dispatch(
        updateToken({
          id: randomToken.id,
          updates: {
            priceChange: {
              "1m": priceChange1h * 0.1,
              "5m": priceChange1h * 0.3,
              "30m": priceChange1h * 0.7,
              "1h": priceChange1h,
            },
            priceHistory: {
              "1m": updatePriceHistory(randomToken.priceHistory["1m"] || [], newPrice, "1m"),
              "5m": updatePriceHistory(randomToken.priceHistory["5m"] || [], newPrice, "5m"),
              "30m": updatePriceHistory(randomToken.priceHistory["30m"] || [], newPrice, "30m"),
              "1h": updatePriceHistory(randomToken.priceHistory["1h"] || [], newPrice, "1h"),
            },
            volume: Math.max(0, currentVolume + volumeChange - Math.random() * 500),
            trend: priceChange1h > 0.3 ? "up" : priceChange1h < -0.3 ? "down" : "neutral",
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

