"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Token } from "@/types/token";
import { Pill } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TokenImageProps {
  token: Token;
  size?: number;
  className?: string;
}

// Only yellow or green border colors
const BORDER_COLORS = {
  green: "#2fe3ac", // Green for positive/up trend
  yellow: "#FFD700", // Yellow/gold for neutral/down trend
};

/**
 * Get border color based on token trend - only yellow or green
 */
function getBorderColor(token: Token): string {
  // Green for positive trend, yellow for neutral/negative
  if (token.trend === "up" || (token.priceChange?.["1h"] ?? 0) > 0) {
    return BORDER_COLORS.green;
  }
  return BORDER_COLORS.yellow;
}

/**
 * Generate mock similar token based on current token
 */
function getSimilarToken(token: Token) {
  const names = ["FIRST", "MOON", "DOGE", "PEPE", "SHIB", "BONK"];
  const ages = ["1y", "6m", "3m", "2y", "8m"];

  // Use token id to generate consistent similar token
  let hash = 0;
  for (let i = 0; i < token.id.length; i++) {
    hash = token.id.charCodeAt(i) + ((hash << 5) - hash);
  }

  return {
    name: names[Math.abs(hash) % names.length],
    age: ages[Math.abs(hash >> 4) % ages.length],
    marketCap: `${Math.floor(100 + (Math.abs(hash) % 900))}K`,
    image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.abs(hash)}`,
  };
}

/**
 * Token image with trend indicator badge and hover preview
 */
export const TokenImage = memo(function TokenImage({
  token,
  size = 40,
  className,
}: TokenImageProps) {
  // Get border color based on trend - only yellow or green
  const borderColor = useMemo(() => getBorderColor(token), [token]);
  const similarToken = useMemo(() => getSimilarToken(token), [token]);

  return (
    <div className={cn("relative w-full h-full", className)}>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <div
            className="rounded border p-0.5 w-full h-full cursor-pointer"
            style={{ borderColor: borderColor }}
          >
            <Image
              src={token.image}
              alt={token.name}
              width={size}
              height={size}
              loading="lazy"
              fetchPriority="low"
              decoding="async"
              unoptimized
              className="rounded w-full h-full object-cover"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          sideOffset={8}
          collisionPadding={20}
          className="p-0 bg-[#1a1a1a] border border-gray-700/50 shadow-2xl shadow-black/50 w-[280px]"
        >
          {/* Large token image */}
          <div className="p-2">
            <Image
              src={token.image}
              alt={`${token.name} preview`}
              width={260}
              height={260}
              unoptimized
              className="rounded-lg object-cover w-full"
            />
          </div>

          {/* Similar Tokens section */}
          <div className="px-3 pb-3">
            <p className="text-gray-400 text-sm mb-2">Similar Tokens</p>

            {/* Similar token row */}
            <div className="flex items-center gap-2 p-2 rounded-lg bg-[#252525] border border-gray-700/30">
              <Image
                src={similarToken.image}
                alt={similarToken.name}
                width={40}
                height={40}
                unoptimized
                className="rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold text-sm">
                    {similarToken.name}
                  </span>
                  <span className="text-yellow-400 text-xs">
                    {similarToken.age}
                  </span>
                </div>
                <div className="text-gray-400 text-xs">
                  TX: {similarToken.age}
                </div>
              </div>
              <div className="text-[#2fe3ac] font-semibold text-sm">
                {similarToken.marketCap}
              </div>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>

      {/* Pill icon badge - bottom right */}
      <div
        className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border flex items-center justify-center bg-white/10 backdrop-blur-sm pointer-events-none"
        style={{ borderColor: borderColor }}
        aria-hidden="true"
      >
        <Pill
          className="h-2.5 w-2.5"
          style={{ color: borderColor }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
});
