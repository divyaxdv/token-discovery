import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateToken } from "@/store/slices/tokenSlice";
import { Token } from "@/types/token";

/**
 * Mock WebSocket hook for real-time updates
 * Updates ALL tokens every 1 second with price, volume, transactions, and token info changes
 */
export function useWebSocket(tokens: Token[]) {
  const dispatch = useAppDispatch();
  const allTokens = useAppSelector((state) => state.tokens.tokens);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (tokens.length === 0) return;

    // Simulate WebSocket updates every 1 second - ALL tokens update
    intervalRef.current = setInterval(() => {
      // Update ALL tokens, not just one random one
      allTokens.forEach((token) => {
        if (!token) return;

        // Price change calculation (1% - 15% volatility) - unique per token
        const moveRoll = Math.random();
        let minChange, maxChange;
        if (moveRoll < 0.1) {
          minChange = 8.0;
          maxChange = 15.0;
        } else if (moveRoll < 0.4) {
          minChange = 3.0;
          maxChange = 8.0;
        } else {
          minChange = 1.0;
          maxChange = 3.0;
        }
        
        const priceChangePercent = minChange + Math.random() * (maxChange - minChange);
        const direction = Math.random() > 0.5 ? 1 : -1;
        const priceChange1h = direction * priceChangePercent;

        // Market Cap change (follows price change direction)
        const currentMarketCap = token.marketCap || 50000;
        const marketCapChange = currentMarketCap * (priceChange1h / 100);
        const newMarketCap = Math.max(10000, currentMarketCap + marketCapChange);

        // Volume change
        const volumeChange = Math.random() * 1000;
        const currentVolume = token.volume || 0;
        const newVolume = Math.max(0, currentVolume + volumeChange - Math.random() * 500);

        // Liquidity change (smaller fluctuations)
        const currentLiquidity = token.liquidity || 10000;
        const liquidityChange = currentLiquidity * ((Math.random() - 0.5) * 0.02); // ±1%
        const newLiquidity = Math.max(1000, currentLiquidity + liquidityChange);

        // Transaction updates
        const currentTxns = token.transactions || { total: 50, buys: 30, sells: 20 };
        const newBuys = Math.random() > 0.4 ? 1 : 0; // 60% chance of new buy
        const newSells = Math.random() > 0.5 ? 1 : 0; // 50% chance of new sell
        const newTransactions = {
          total: currentTxns.total + newBuys + newSells,
          buys: currentTxns.buys + newBuys,
          sells: currentTxns.sells + newSells,
        };

        // Holders update (slow growth)
        const currentHolders = token.holders || 300;
        const holderChange = Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0;
        const newHolders = currentHolders + holderChange;

        // Token info updates (small fluctuations)
        const fluctuate = (value: number, maxDelta: number) => {
          const delta = (Math.random() - 0.5) * maxDelta;
          return Math.max(0, Math.min(100, value + delta));
        };

        const newTop10Holders = fluctuate(token.top10Holders || 18, 0.5);
        const newDevHolders = fluctuate(token.devHolders || 5, 0.3);
        const newSnipersHolders = fluctuate(token.snipersHolders || 0.3, 0.1);
        const newInsiders = fluctuate(token.insiders || 8, 0.4);
        const newBundlers = fluctuate(token.bundlers || 0.3, 0.1);

        // Price history update
        const currentPrice = token.priceHistory["1h"]?.[token.priceHistory["1h"].length - 1];
        if (!currentPrice) return;

        const minPrice = currentPrice * 0.1;
        const maxPrice = currentPrice * 2.0;
        let newPrice = currentPrice * (1 + priceChange1h / 100);
        newPrice = Math.max(minPrice, Math.min(maxPrice, newPrice));

        const updatePriceHistory = (
          history: number[],
          timePeriod: "1m" | "5m" | "30m" | "1h"
        ) => {
          const updated = [...history];
          let incrementalChange = priceChange1h;
          if (timePeriod === "1m") incrementalChange = priceChange1h * 0.1;
          else if (timePeriod === "5m") incrementalChange = priceChange1h * 0.3;
          else if (timePeriod === "30m") incrementalChange = priceChange1h * 0.7;
          
          const lastPrice = history.length > 0 ? history[history.length - 1] : currentPrice;
          const periodNewPrice = Math.max(minPrice, lastPrice * (1 + incrementalChange / 100));
          
          updated.push(periodNewPrice);
          return updated.slice(-20);
        };

        dispatch(
          updateToken({
            id: token.id,
            updates: {
              // Price changes
              priceChange: {
                "1m": priceChange1h * 0.1,
                "5m": priceChange1h * 0.3,
                "30m": priceChange1h * 0.7,
                "1h": priceChange1h,
              },
              priceHistory: {
                "1m": updatePriceHistory(token.priceHistory["1m"] || [], "1m"),
                "5m": updatePriceHistory(token.priceHistory["5m"] || [], "5m"),
                "30m": updatePriceHistory(token.priceHistory["30m"] || [], "30m"),
                "1h": updatePriceHistory(token.priceHistory["1h"] || [], "1h"),
              },
              
              // Market Cap & Volume
              marketCap: newMarketCap,
              volume: newVolume,
              liquidity: newLiquidity,
              
              // Transactions
              transactions: newTransactions,
              
              // Token Info
              holders: newHolders,
              top10Holders: newTop10Holders,
              devHolders: newDevHolders,
              snipersHolders: newSnipersHolders,
              insiders: newInsiders,
              bundlers: newBundlers,
              
              // Trend
              trend: priceChange1h > 0.3 ? "up" : priceChange1h < -0.3 ? "down" : "neutral",
            },
          })
        );
      });
    }, 1000); // Update every 1 second

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [tokens.length, allTokens, dispatch]);
}
