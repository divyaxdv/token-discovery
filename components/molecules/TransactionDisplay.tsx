"use client";

import { memo } from "react";
import { cn } from "@/lib/utils";

interface TransactionDisplayProps {
  total: number;
  buys: number;
  sells: number;
  className?: string;
}

/**
 * Displays transaction counts with buy/sell breakdown
 */
export const TransactionDisplay = memo(function TransactionDisplay({
  total,
  buys,
  sells,
  className,
}: TransactionDisplayProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="text-sm">{total}</span>
      <div className="flex gap-2 text-xs">
        <span className="text-[#2fe3ac]">{buys}</span>
        <span className="text-gray-500">/</span>
        <span className="text-[rgb(236,56,122)]">{sells}</span>
      </div>
    </div>
  );
});

