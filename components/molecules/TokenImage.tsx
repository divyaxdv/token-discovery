"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Token } from "@/types/token";
import { Pill } from "lucide-react";

interface TokenImageProps {
  token: Token;
  size?: number;
  className?: string;
}

/**
 * Generate a consistent random color based on token ID
 */
function getRandomBorderColor(tokenId: string): string {
  // Simple hash function to generate consistent color from token ID
  let hash = 0;
  for (let i = 0; i < tokenId.length; i++) {
    hash = tokenId.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generate vibrant colors (avoiding too dark colors)
  const hue = Math.abs(hash) % 360;
  const saturation = 60 + (Math.abs(hash) % 30); // 60-90% saturation
  const lightness = 50 + (Math.abs(hash) % 20); // 50-70% lightness

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

/**
 * Token image with trend indicator badge
 */
export const TokenImage = memo(function TokenImage({
  token,
  size = 40,
  className,
}: TokenImageProps) {
  // Generate consistent border color based on token ID
  const borderColor = useMemo(() => getRandomBorderColor(token.id), [token.id]);

  return (
    <div className={cn("relative w-full h-full", className)}>
      <div
        className="rounded border-2 p-0.5 w-full h-full"
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
      {/* Pill icon badge - bottom right */}
      <div
        className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 flex items-center justify-center bg-white/10 backdrop-blur-sm"
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
