"use client";

import { memo, useState } from "react";
import { Token } from "@/types/token";
import { formatPercentage } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { User, Ghost, UtensilsCrossed, Boxes, Target, BadgeCheck, Users, BarChart3, Star } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Image from "next/image";

interface TokenInfoProps {
  token: Token;
  className?: string;
}

/**
 * Displays comprehensive token information metrics
 * Layout matches the real trading interface:
 * Row 1: Top 10 Holders % | Dev Holders % | Holders Count
 * Row 2: Snipers Holders % | Insiders % | Other Count
 * Row 3: Bundlers % | Paid/Unpaid Status
 */
export const TokenInfo = memo(function TokenInfo({ token, className }: TokenInfoProps) {
  const [openPopover, setOpenPopover] = useState<string | null>(null);

  const MetricBox = ({ 
    label, 
    value, 
    icon: Icon, 
    color, 
    popoverContent 
  }: { 
    label: string; 
    value: string | number; 
    icon: any; 
    color: string;
    popoverContent?: React.ReactNode;
  }) => {
    const isOpen = openPopover === label;

    const content = (
      <span className={cn("flex items-center gap-1 px-2 py-1 rounded border border-gray-700/20 cursor-pointer", color)}>
        <Icon className="h-3.5 w-3.5 sm:h-3 sm:w-3" />
        {value}
      </span>
    );

    if (popoverContent) {
      return (
        <Popover open={isOpen} onOpenChange={() => {}}>
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label={`View details for ${label}`}
              aria-expanded={isOpen}
              onMouseEnter={() => setOpenPopover(label)}
              onMouseLeave={() => setOpenPopover(null)}
              className=""
            >
              {content}
            </button>
          </PopoverTrigger>
          <PopoverContent 
            side="top" 
            className="w-auto p-1.5 bg-black border-0 shadow-none"
            onMouseEnter={() => setOpenPopover(label)}
            onMouseLeave={() => setOpenPopover(null)}
            role="tooltip"
            aria-label={`${label} details`}
          >
            {popoverContent}
          </PopoverContent>
        </Popover>
      );
    }

    return content;
  };

  return (
    <div className={cn("flex flex-col gap-1 text-[11px] sm:text-[10px]", className)}>
      {/* Row 1: Top 10 Holders | Dev Holders | Holders Count */}
      <div className="flex items-center justify-between gap-1">
        <MetricBox
          label="Top 10 Holders"
          value={formatPercentage(token.top10Holders)}
          icon={Star}
          color="text-red-500"
          popoverContent={
            <div>
              <p className="text-[10px] font-medium text-gray-300">Top 10 Holders</p>
            </div>
          }
        />
        <MetricBox
          label="Dev Holdings"
          value={formatPercentage(token.devHolders)}
          icon={Ghost}
          color={token.devHolders < 5 ? "text-[#11af80]" : "text-red-500"}
          popoverContent={
            <div>
              <p className="text-[10px] font-medium text-gray-300">Dev Holdings</p>
            </div>
          }
        />
        <span className="flex items-center gap-1 px-2 py-1 rounded border border-gray-700/20 text-gray-400">
          <Users className="h-3.5 w-3.5 sm:h-3 sm:w-3" />
          {token.holders}
        </span>
      </div>

      {/* Row 2: Snipers | Insiders | Other Count */}
      <div className="flex items-center justify-between gap-1">
        <MetricBox
          label="Snipers"
          value={formatPercentage(token.snipersHolders)}
          icon={UtensilsCrossed}
          color="text-[#11af80]"
          popoverContent={
            <div>
              <p className="text-[10px] font-medium text-gray-300">Snipers</p>
            </div>
          }
        />
        <MetricBox
          label="Insiders"
          value={formatPercentage(token.insiders)}
          icon={Boxes}
          color="text-[#11af80]"
          popoverContent={
            <div>
              <p className="text-[10px] font-medium text-gray-300">Insiders</p>
            </div>
          }
        />
        <span className="flex items-center gap-1 px-2 py-1 rounded border border-gray-700/20 text-gray-400">
          <BarChart3 className="h-3.5 w-3.5 sm:h-3 sm:w-3" />
          {token.otherCount}
        </span>
      </div>

      {/* Row 3: Bundlers | Paid/Unpaid Status */}
      <div className="flex items-center justify-between gap-1">
        <MetricBox
          label="Bundlers"
          value={formatPercentage(token.bundlers)}
          icon={Target}
          color="text-[#11af80]"
          popoverContent={
            <div>
              <p className="text-[10px] font-medium text-gray-300">Bundlers</p>
            </div>
          }
        />
        <Popover open={openPopover === "DEX paid"} onOpenChange={() => {}}>
          <PopoverTrigger asChild>
            <button
              type="button"
              aria-label={`DEX payment status: ${token.paid ? "Paid" : "Unpaid"}`}
              aria-expanded={openPopover === "DEX paid"}
              className={cn("flex items-center gap-1 px-2 py-1 rounded border border-gray-700/20 cursor-pointer", token.paid ? "text-[#11af80]" : "text-red-500")}
              onMouseEnter={() => setOpenPopover("DEX paid")}
              onMouseLeave={() => setOpenPopover(null)}
            >
              <BadgeCheck className="h-3.5 w-3.5 sm:h-3 sm:w-3" />
              {token.paid ? "Paid" : "Unpaid"}
            </button>
          </PopoverTrigger>
          <PopoverContent 
            side="top" 
            className="w-auto p-1.5 bg-black border-0 shadow-none"
            onMouseEnter={() => setOpenPopover("DEX paid")}
            onMouseLeave={() => setOpenPopover(null)}
            role="tooltip"
            aria-label="DEX payment status details"
          >
            {token.paid ? (
              <div className="flex flex-col items-center gap-1">
                <Image
                  src={token.image}
                  alt={token.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                  unoptimized
                />
              </div>
            ) : (
              <div>
                <p className="text-[10px] font-medium text-gray-300">DEX paid</p>
              </div>
            )}
          </PopoverContent>
        </Popover>
        <span className="w-12"></span> {/* Spacer to maintain 3-column alignment */}
      </div>
    </div>
  );
});

