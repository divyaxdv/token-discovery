"use client";

import { memo } from "react";
import { Token } from "@/types/token";
import { TokenImage } from "@/components/molecules/TokenImage";
import { PriceDisplay } from "@/components/molecules/PriceDisplay";
import { TransactionDisplay } from "@/components/molecules/TransactionDisplay";
import { TokenInfo } from "@/components/molecules/TokenInfo";
import { MiniChart } from "@/components/molecules/MiniChart";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setHoveredToken } from "@/store/slices/uiSlice";
import { setSelectedToken, setModalOpen } from "@/store/slices/uiSlice";
import { Clipboard, Globe, Search, Eye, Users } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface TokenTableRowProps {
  token: Token;
}

/**
 * Individual token table row with all interactions
 */
export const TokenTableRow = memo(function TokenTableRow({ token }: TokenTableRowProps) {
  const dispatch = useAppDispatch();
  const hoveredToken = useAppSelector((state) => state.ui.hoveredToken);
  const timePeriod = useAppSelector((state) => state.tokens.timePeriod);
  const isHovered = hoveredToken === token.id;

  const handleBuy = () => {
    dispatch(setSelectedToken(token.id));
    dispatch(setModalOpen(true));
  };

  return (
    <tr
      className={cn(
        "border-b border-gray-400 transition-colors duration-200",
        isHovered && "bg-gray-900/50"
      )}
      onMouseEnter={() => dispatch(setHoveredToken(token.id))}
      onMouseLeave={() => dispatch(setHoveredToken(null))}
    >
      {/* Pair Info */}
      <td className="px-2 sm:px-4 py-3">
        <div className="flex items-center gap-2 sm:gap-3">
          <TokenImage token={token} size={40} className="hidden sm:block" />
          <TokenImage token={token} size={32} className="block sm:hidden" />
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="text-xs sm:text-sm font-medium truncate">{token.name}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-gray-500 hover:text-gray-300 transition-colors">
                    <Clipboard className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Copy contract address</TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 mt-1 flex-wrap">
              <span className="text-xs text-gray-500">{token.age}</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-gray-500 hover:text-gray-300 transition-colors">
                    <Users className="h-3 w-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>View holders</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-gray-500 hover:text-gray-300 transition-colors hidden sm:inline-flex">
                    <Globe className="h-3 w-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>View website</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-gray-500 hover:text-gray-300 transition-colors hidden sm:inline-flex">
                    <Search className="h-3 w-3" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Search</TooltipContent>
              </Tooltip>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-gray-500 hover:text-gray-300 transition-colors flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    <span className="text-xs hidden sm:inline">{Math.floor(Math.random() * 500)}</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="text-sm">
                    <p className="font-medium mb-2">Token Details</p>
                    <p className="text-gray-400">Views: {Math.floor(Math.random() * 500)}</p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </td>

      {/* Chart */}
      <td className="px-2 sm:px-4 py-3">
        <MiniChart token={token} timePeriod={timePeriod} />
      </td>

      {/* Market Cap */}
      <td className="px-2 sm:px-4 py-3">
        <PriceDisplay value={token.marketCap} change={token.priceChange[timePeriod]} />
      </td>

      {/* Liquidity */}
      <td className="px-2 sm:px-4 py-3 hidden md:table-cell">
        <span className="text-sm">{formatCurrency(token.liquidity)}</span>
      </td>

      {/* Volume */}
      <td className="px-2 sm:px-4 py-3">
        <span className="text-sm">{formatCurrency(token.volume)}</span>
      </td>

      {/* TXNS */}
      <td className="px-2 sm:px-4 py-3 hidden sm:table-cell">
        <TransactionDisplay
          total={token.transactions.total}
          buys={token.transactions.buys}
          sells={token.transactions.sells}
        />
      </td>

      {/* Token Info */}
      <td className="px-2 sm:px-4 py-3 hidden lg:table-cell">
        <TokenInfo token={token} />
      </td>

      {/* Action */}
      <td className="px-2 sm:px-4 py-3">
        <Button onClick={handleBuy} size="sm" className="w-full text-xs sm:text-sm">
          Buy
        </Button>
      </td>
    </tr>
  );
});

