"use client";

import { memo } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SortField } from "@/types/token";

interface TableHeaderProps {
  label: string;
  sortKey?: SortField;
  currentSort?: string | null;
  sortOrder?: "asc" | "desc";
  onSort?: (key: SortField) => void;
  className?: string;
  "aria-label"?: string;
}

/**
 * Sortable table header with visual indicators
 */
export const TableHeader = memo(function TableHeader({
  label,
  sortKey,
  currentSort,
  sortOrder,
  onSort,
  className,
  "aria-label": ariaLabel,
}: TableHeaderProps) {
  const isActive = sortKey && currentSort === sortKey;
  const canSort = sortKey && onSort;

  const handleClick = () => {
    if (canSort) {
      onSort(sortKey);
    }
  };

  const getAriaSort = () => {
    if (!isActive) return undefined;
    return sortOrder === "asc" ? "ascending" : "descending";
  };

  return (
    <th
      className={cn(
        "px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 py-2 sm:py-3 md:py-4 text-left text-[9px] sm:text-[10px] font-medium text-gray-400 uppercase tracking-wider",
        canSort && "cursor-pointer hover:text-gray-300 transition-colors touch-manipulation",
        className
      )}
      onClick={handleClick}
      aria-sort={canSort ? (getAriaSort() || "none") : undefined}
      aria-label={ariaLabel || (canSort ? `${label}, click to sort${isActive ? `, currently sorted ${sortOrder === "asc" ? "ascending" : "descending"}` : ""}` : label || undefined)}
      scope="col"
    >
      <div className="flex items-center gap-2">
        <span>{label}</span>
        {canSort && (
          <span aria-hidden="true">
            {isActive ? (
              sortOrder === "asc" ? (
                <ArrowUp className="h-3 w-3" />
              ) : (
                <ArrowDown className="h-3 w-3" />
              )
            ) : (
              <ArrowUpDown className="h-3 w-3 opacity-50" />
            )}
          </span>
        )}
      </div>
    </th>
  );
});

