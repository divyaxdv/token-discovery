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
}: TableHeaderProps) {
  const isActive = sortKey && currentSort === sortKey;
  const canSort = sortKey && onSort;

  const handleClick = () => {
    if (canSort) {
      onSort(sortKey);
    }
  };

  return (
    <th
      className={cn(
        "px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider",
        canSort && "cursor-pointer hover:text-gray-300 transition-colors",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        <span>{label}</span>
        {canSort && (
          <span className="text-gray-500">
            {isActive ? (
              sortOrder === "asc" ? (
                <ArrowUp className="h-3 w-3" />
              ) : (
                <ArrowDown className="h-3 w-3" />
              )
            ) : (
              <ArrowUpDown className="h-3 w-3" />
            )}
          </span>
        )}
      </div>
    </th>
  );
});

