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
        "px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 py-2 sm:py-3 md:py-4 text-left text-[9px] sm:text-[10px] font-medium text-gray-400 uppercase tracking-wider",
        canSort && "cursor-pointer hover:text-gray-300 transition-colors touch-manipulation",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        <span>{label}</span>
      </div>
    </th>
  );
});

