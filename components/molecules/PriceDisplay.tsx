"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";
import { formatCurrency, formatPercentage } from "@/lib/utils";

interface PriceDisplayProps {
  value: number;
  change?: number;
  className?: string;
}

/**
 * Displays price with color-coded change indicator
 * Uses smooth transitions for real-time updates
 */
export const PriceDisplay = memo(function PriceDisplay({
  value,
  change,
  className,
}: PriceDisplayProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className={cn("flex flex-col", className)}>
      <span className="text-sm font-medium">{formatCurrency(value)}</span>
      {change !== undefined && (
        <span
          className={cn("text-xs transition-colors duration-300", {
            "text-[#2fe3ac]": isPositive,
            "text-[rgb(236,56,122)]": !isPositive,
          })}
        >
          {formatPercentage(change)}
        </span>
      )}
    </div>
  );
});

