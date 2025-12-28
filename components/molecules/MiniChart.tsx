"use client";

import { memo, useState } from "react";
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Get price history for the selected time period
  const priceHistory = token.priceHistory[timePeriod] || [];
  const data = priceHistory.map((price, index) => ({
    value: price,
    index,
  }));

  // Determine color based on price change for the selected time period
  const priceChange = token.priceChange[timePeriod] || 0;
  const lineColor = priceChange > 0 ? "#2fe3ac" : priceChange < 0 ? "#a92d5b" : "#9ca3af";
  const areaColor = priceChange > 0 ? "#2fe3ac" : priceChange < 0 ? "#a92d5b" : "#9ca3af";

  const CustomDot = (props: any) => {
    const { cx, cy, index } = props;
    if (activeIndex === index) {
      return (
        <circle
          cx={cx}
          cy={cy}
          r={4}
          fill="none"
          stroke={lineColor}
          strokeWidth={2}
        />
      );
    }
    return null;
  };

  return (
    <div 
      className={cn("h-10 w-20", className)}
      onMouseLeave={() => setActiveIndex(null)}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart 
          data={data} 
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          onMouseMove={(state) => {
            if (state && state.activeTooltipIndex !== undefined) {
              setActiveIndex(state.activeTooltipIndex);
            }
          }}
        >
          <defs>
            <linearGradient id={`gradient-${token.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={areaColor} stopOpacity={0.5} />
              <stop offset="100%" stopColor={areaColor} stopOpacity={0.15} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={lineColor}
            strokeWidth={1.5}
            fill={`url(#gradient-${token.id})`}
            dot={<CustomDot />}
            activeDot={false}
            isAnimationActive={true}
            animationDuration={300}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});

