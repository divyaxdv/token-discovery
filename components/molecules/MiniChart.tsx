"use client";

import { memo } from "react";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
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

  // Use vibrant teal/green color for the line and area
  const lineColor = "#2fe3ac";
  const areaColor = "#2fe3ac";

  return (
    <div className={cn("h-10 w-20", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={`gradient-${token.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={areaColor} stopOpacity={0.3} />
              <stop offset="100%" stopColor={areaColor} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={lineColor}
            strokeWidth={2}
            fill={`url(#gradient-${token.id})`}
            dot={false}
            isAnimationActive={true}
            animationDuration={300}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});

