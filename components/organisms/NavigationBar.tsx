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
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4">
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((f) => (
              <Button
                key={f.key}
                variant={filter === f.key ? "default" : "ghost"}
                size="sm"
                onClick={() => onFilterChange(f.key)}
                className={cn(
                  "text-xs sm:text-sm",
                  filter === f.key && "bg-blue-600 hover:bg-blue-700"
                )}
              >
                {f.label}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-400">
              <span className="hidden sm:inline">||</span>
              {timePeriods.map((tp) => (
                <Button
                  key={tp.key}
                  variant={timePeriod === tp.key ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "text-xs px-2",
                    timePeriod === tp.key && "bg-blue-600 hover:bg-blue-700",
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

