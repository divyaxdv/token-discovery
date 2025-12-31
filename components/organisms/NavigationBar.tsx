"use client";

import { memo } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationBarProps {
  filter: "all" | "new" | "final" | "migrated";
  onFilterChange: (filter: "all" | "new" | "final" | "migrated") => void;
  timePeriod: "1m" | "5m" | "30m" | "1h";
  onTimePeriodChange: (timePeriod: "1m" | "5m" | "30m" | "1h") => void;
}

/**
 * Navigation bar with filter buttons
 */
export const NavigationBar = memo(function NavigationBar({
  filter,
  onFilterChange,
  timePeriod,
  onTimePeriodChange,
}: NavigationBarProps) {
  const filters = [
    { key: "all" as const, label: "Top" },
    { key: "new" as const, label: "Trending" },
    { key: "final" as const, label: "Surge" },
    { key: "migrated" as const, label: "DEX Screener" },
  ];

  const timePeriods: Array<{ key: "1m" | "5m" | "30m" | "1h"; label: string; hidden?: boolean }> = [
    { key: "1m", label: "1m" },
    { key: "5m", label: "5m" },
    { key: "30m", label: "30m", hidden: true },
    { key: "1h", label: "1h" },
  ];

  return (
    <div className="bg-[#0a0a0a]">
      <div className="w-full max-w-full px-1 sm:px-2 md:px-4 lg:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 py-3 sm:py-4">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {filters.map((f) => (
              <Button
                key={f.key}
                variant="ghost"
                size="sm"
                onClick={() => onFilterChange(f.key)}
                aria-label={`Filter by ${f.label}`}
                aria-pressed={filter === f.key}
                className={cn(
                  "text-sm sm:text-base md:text-lg font-medium touch-manipulation min-h-[36px] sm:min-h-[40px] px-2 sm:px-3 bg-transparent hover:bg-transparent",
                  filter === f.key 
                    ? "text-white" 
                    : "text-gray-500 hover:text-gray-400"
                )}
              >
                {f.label}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1 sm:gap-2">
              <span className="hidden sm:inline text-gray-400 text-base">||</span>
              {timePeriods.map((tp) => (
                <Button
                  key={tp.key}
                  variant="ghost"
                  size="sm"
                  aria-label={`Set time period to ${tp.label}`}
                  aria-pressed={timePeriod === tp.key}
                  className={cn(
                    "text-sm sm:text-base md:text-lg font-medium px-2 sm:px-3 touch-manipulation min-h-[36px] sm:min-h-[40px]",
                    timePeriod === tp.key 
                      ? "text-blue-500 bg-transparent hover:bg-transparent" 
                      : "text-white bg-transparent hover:bg-transparent",
                    tp.hidden && "hidden sm:inline-block"
                  )}
                  onClick={() => onTimePeriodChange(tp.key)}
                >
                  {tp.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
