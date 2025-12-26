"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Shimmer } from "@/components/ui/shimmer";

/**
 * Skeleton loading state for table rows
 */
export function TableSkeleton() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <tr key={i} className="border-b border-gray-400">
          <td className="px-4 py-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex flex-col gap-2">
                <Shimmer width="120px" height="12px" />
                <Shimmer width="80px" height="10px" />
              </div>
            </div>
          </td>
          <td className="px-4 py-3">
            <Shimmer width="80px" height="40px" />
          </td>
          <td className="px-4 py-3">
            <div className="flex flex-col gap-1">
              <Shimmer width="80px" height="14px" />
              <Shimmer width="60px" height="12px" />
            </div>
          </td>
          <td className="px-4 py-3">
            <Shimmer width="70px" height="14px" />
          </td>
          <td className="px-4 py-3">
            <Shimmer width="70px" height="14px" />
          </td>
          <td className="px-4 py-3">
            <div className="flex flex-col gap-1">
              <Shimmer width="40px" height="14px" />
              <Shimmer width="50px" height="12px" />
            </div>
          </td>
          <td className="px-4 py-3">
            <Shimmer width="200px" height="14px" />
          </td>
          <td className="px-4 py-3">
            <Shimmer width="60px" height="32px" />
          </td>
        </tr>
      ))}
    </>
  );
}

