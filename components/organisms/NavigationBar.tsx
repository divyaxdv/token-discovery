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
    { key: "new" as const, label: "New Pairs" },
    { key: "final" as const, label: "Final Stretch" },
    { key: "migrated" as const, label: "Migrated" },
  ];

  const timePeriods: Array<{ key: "1m" | "5m" | "30m" | "1h"; label: string; hidden?: boolean }> = [
    { key: "1m", label: "1m" },
    { key: "5m", label: "5m" },
    { key: "30m", label: "30m", hidden: true },
    { key: "1h", label: "1h" },
  ];

  return (
    <div className="border-b border-gray-800 bg-[#0a0a0a]">
      <div className="container mx-auto px-2 sm:px-4 md:px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 py-3 sm:py-4">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {filters.map((f) => (
              <Button
                key={f.key}
                variant={filter === f.key ? "default" : "ghost"}
                size="sm"
                onClick={() => onFilterChange(f.key)}
                className={cn(
                  "text-[10px] sm:text-xs md:text-sm touch-manipulation min-h-[32px] sm:min-h-[36px] px-2 sm:px-3",
                  filter === f.key && "bg-blue-600 hover:bg-blue-700"
                )}
              >
                {f.label}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs md:text-sm">
              <span className="hidden sm:inline text-gray-400">||</span>
              {timePeriods.map((tp) => (
                <Button
                  key={tp.key}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "text-[10px] sm:text-xs px-1.5 sm:px-2 touch-manipulation min-h-[32px] sm:min-h-[36px]",
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

