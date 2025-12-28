export interface Token {
  id: string;
  name: string;
  symbol: string;
  image: string;
  marketCap: number;
  liquidity: number;
  volume: number;
  transactions: {
    total: number;
    buys: number;
    sells: number;
  };
  priceChange: {
    "1m": number;
    "5m": number;
    "30m": number;
    "1h": number;
  };
  snipers: number;
  holders: number;
  paid: boolean;
  age: string;
  top10Holders: number; // Top 10 Holders percentage
  devHolders: number; // Dev Holders percentage
  snipersHolders: number; // Snipers Holders percentage
  insiders: number; // Insiders percentage
  bundlers: number; // Bundlers percentage
  otherCount: number; // Additional count (candlestick icon)
  priceHistory: {
    "1m": number[];
    "5m": number[];
    "30m": number[];
    "1h": number[];
  };
  category: "new" | "final" | "migrated";
  trend: "up" | "down" | "neutral";
}

export type SortField = "marketCap" | "liquidity" | "volume" | "transactions" | "priceChange";

