"use client";

import { memo } from "react";
import { Token } from "@/types/token";
import { formatPercentage } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface TokenInfoProps {
  token: Token;
  className?: string;
}

/**
 * Displays comprehensive token information metrics
 */
export const TokenInfo = memo(function TokenInfo({ token, className }: TokenInfoProps) {
  return (
    <div className={cn("flex flex-wrap gap-2 text-xs", className)}>
      <span className={cn("flex items-center gap-1", token.priceChange["1h"] >= 0 ? "text-green-400" : "text-red-400")}>
        <span>{formatPercentage(token.priceChange["1h"])}</span>
        {token.priceChange["1h"] >= 0 ? "↑" : "↓"}
      </span>
      <span className={cn("flex items-center gap-1", token.priceChange["5m"] >= 0 ? "text-green-400" : "text-red-400")}>
        <span>{formatPercentage(token.priceChange["5m"])}</span>
        {token.priceChange["5m"] >= 0 ? "↑" : "↓"}
      </span>
      <span className="text-green-400">
        Snipers {formatPercentage(token.snipers)}
      </span>
      <span className="text-gray-400">{token.holders}</span>
      <span className={cn("flex items-center gap-1", token.paid ? "text-green-400" : "text-red-400")}>
        {token.paid ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
        {token.paid ? "Paid" : "Unpaid"}
      </span>
    </div>
  );
});

