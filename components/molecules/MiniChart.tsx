"use client";

import { memo } from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { Token } from "@/types/token";
import { cn } from "@/lib/utils";

interface MiniChartProps {
  token: Token;
  timePeriod: "1m" | "5m" | "30m" | "1h";
  className?: string;
}

/**
 * Mini sparkline chart for token price history
 * Updates based on selected time period
 */
export const MiniChart = memo(function MiniChart({ token, timePeriod, className }: MiniChartProps) {
  // Get price history for the selected time period
  const priceHistory = token.priceHistory[timePeriod] || [];
  const data = priceHistory.map((price, index) => ({
    value: price,
    index,
  }));

  // Determine color based on price change for the selected time period
  const priceChange = token.priceChange[timePeriod] || 0;
  const color = priceChange > 0 ? "#4ade80" : priceChange < 0 ? "#f87171" : "#9ca3af";

  return (
    <div className={cn("h-10 w-20", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
            animationDuration={300}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});

