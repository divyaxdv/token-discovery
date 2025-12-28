"use client";

import { memo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Token } from "@/types/token";

interface TokenImageProps {
  token: Token;
  size?: number;
  className?: string;
}

/**
 * Token image with trend indicator badge
 */
export const TokenImage = memo(function TokenImage({
  token,
  size = 40,
  className,
}: TokenImageProps) {
  const trendColors = {
    up: "bg-[#2fe3ac]",
    down: "bg-[#a92d5b]",
    neutral: "bg-gray-500",
  };

  return (
    <div className={cn("relative", className)}>
      <Image
        src={token.image}
        alt={token.name}
        width={size}
        height={size}
        className="rounded-full"
        unoptimized
      />
      <div
        className={cn(
          "absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-gray-900",
          trendColors[token.trend]
        )}
      />
    </div>
  );
});

