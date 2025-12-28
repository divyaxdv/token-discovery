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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface TokenTableRowProps {
  token: Token;
}

/**
 * Individual token table row with all interactions
 */
export const TokenTableRow = memo(function TokenTableRow({
  token,
}: TokenTableRowProps) {
  const dispatch = useAppDispatch();
  const hoveredToken = useAppSelector((state) => state.ui.hoveredToken);
  const timePeriod = useAppSelector((state) => state.tokens.timePeriod);
  const isHovered = hoveredToken === token.id;

  const handleBuy = () => {
    dispatch(setSelectedToken(token.id));
    dispatch(setModalOpen(true));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(token.id);
      // You could add a toast notification here if needed
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <tr
      className={cn(
        "border-b border-gray-700/50 transition-colors duration-200",
        isHovered && "bg-gray-800/50"
      )}
      onMouseEnter={() => dispatch(setHoveredToken(token.id))}
      onMouseLeave={() => dispatch(setHoveredToken(null))}
    >
      {/* Pair Info */}
      <td className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 py-2 sm:py-3 md:py-4 min-w-[200px]">
        <div className="flex items-center gap-1.5 sm:gap-1.5 md:gap-2 lg:gap-3">
          <div className="w-7 h-7 sm:w-10 sm:h-10 flex-shrink-0">
            <TokenImage token={token} size={40} />
          </div>
          <div className="flex flex-col w-full flex-1">
            <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2">
              <span className="text-[11px] sm:text-[12px] md:text-xs lg:text-sm font-bold text-white hover:text-blue-500 transition-colors cursor-pointer truncate max-w-[80px] sm:max-w-[120px] md:max-w-none">
                {token.name}
              </span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleCopy}
                    className="text-gray-500 hover:text-gray-400 transition-colors min-h-0 min-w-0"
                  >
                    <Clipboard className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Copy contract address</TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 mt-0.5 sm:mt-1 flex-wrap">
              <span className="text-[11px] sm:text-xs text-[#11af80] font-medium">
                {token.age}
              </span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-blue-500 hover:text-blue-400 transition-colors touch-manipulation min-h-0 min-w-0">
                    <Users className="h-4 w-4 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>View holders</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-gray-500 hover:text-gray-400 transition-colors sm:inline-flex touch-manipulation min-h-0 min-w-0">
                    <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>View website</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="text-gray-500 hover:text-gray-400 transition-colors sm:inline-flex touch-manipulation min-h-0 min-w-0">
                    <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>Search</TooltipContent>
              </Tooltip>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="text-gray-500 hover:text-gray-400 transition-colors flex items-center gap-1 touch-manipulation min-h-0 min-w-0">
                    <Eye className="h-4 w-4 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4" />
                    <span className="text-[11px] sm:text-xs text-gray-500 sm:inline">
                      {Math.floor(Math.random() * 500)}
                    </span>
                  </button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="text-sm">
                    <p className="font-medium mb-2">Token Details</p>
                    <p className="text-gray-400">
                      Views: {Math.floor(Math.random() * 500)}
                    </p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </td>

      {/* Chart */}
      <td className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 py-2 sm:py-3 md:py-4">
        <MiniChart token={token} timePeriod={timePeriod} />
      </td>

      {/* Market Cap */}
      <td className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 py-2 sm:py-3 md:py-4">
        <PriceDisplay
          value={token.marketCap}
          change={token.priceChange[timePeriod]}
        />
      </td>

      {/* Liquidity */}
      <td className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 py-2 sm:py-3 md:py-4 hidden md:table-cell">
        <span className="text-[11px] sm:text-xs md:text-sm">
          {formatCurrency(token.liquidity)}
        </span>
      </td>

      {/* Volume */}
      <td className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 py-2 sm:py-3 md:py-4">
        <span className="text-[11px] sm:text-xs md:text-sm">
          {formatCurrency(token.volume)}
        </span>
      </td>

      {/* TXNS */}
      <td className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 py-2 sm:py-3 md:py-4">
        <TransactionDisplay
          total={token.transactions.total}
          buys={token.transactions.buys}
          sells={token.transactions.sells}
        />
      </td>

      {/* Token Info */}
      <td className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 py-2 sm:py-3 md:py-4">
        <TokenInfo token={token} />
      </td>

      {/* Action */}
      <td className="px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 py-2 sm:py-3 md:py-4">
        <Button
          onClick={handleBuy}
          size="sm"
          className="w-full text-[11px] sm:text-[12px] md:text-xs lg:text-sm rounded-full text-black bg-[#526fff] hover:bg-[#4255d4] touch-manipulation min-h-[28px] sm:min-h-[32px] md:min-h-[36px] px-2 sm:px-3"
        >
          Buy
        </Button>
      </td>
    </tr>
  );
});
