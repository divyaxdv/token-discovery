"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Token } from "@/types/token";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setTokens,
  setSortBy,
  setFilter,
  setTimePeriod,
} from "@/store/slices/tokenSlice";
import { SortField } from "@/types/token";
import { useWebSocket } from "@/hooks/useWebSocket";
import { TokenTableRow } from "./TokenTableRow";
import { TableHeader } from "@/components/molecules/TableHeader";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { NavigationBar } from "./NavigationBar";

// Lazy load the modal - only downloaded when user clicks "Buy"
const TokenModal = dynamic(
  () => import("./TokenModal").then((mod) => ({ default: mod.TokenModal })),
  {
    ssr: false,
    loading: () => null,
  }
);

interface TokenTableClientProps {
  initialTokens: Token[];
}

/**
 * Client-side wrapper for the token table
 * Receives pre-generated tokens from the server
 * Handles interactivity: sorting, filtering, real-time updates
 */
export function TokenTableClient({ initialTokens }: TokenTableClientProps) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  // Get tokens and UI state from Redux store
  const {
    tokens: reduxTokens,
    sortBy,
    sortOrder,
    filter,
    timePeriod,
  } = useAppSelector((state) => state.tokens);

  // Initialize Redux store with server-generated tokens
  useEffect(() => {
    if (reduxTokens.length === 0 && initialTokens.length > 0) {
      dispatch(setTokens(initialTokens));
      setIsLoading(false);
    }
  }, [initialTokens, reduxTokens.length, dispatch, timePeriod]);

  // Use Redux tokens if available, otherwise use initial tokens from server
  // This ensures instant display of server-rendered data
  const tokens = useMemo(() => {
    const sourceTokens = reduxTokens.length > 0 ? reduxTokens : initialTokens;
    let result = [...sourceTokens];

    // Apply filter
    if (filter !== "all") {
      result = result.filter((token) => token.category === filter);
    }

    // Apply sorting
    if (sortBy) {
      result.sort((a, b) => {
        let aValue: number;
        let bValue: number;

        switch (sortBy) {
          case "marketCap":
            aValue = a.marketCap;
            bValue = b.marketCap;
            break;
          case "liquidity":
            aValue = a.liquidity;
            bValue = b.liquidity;
            break;
          case "volume":
            aValue = a.volume;
            bValue = b.volume;
            break;
          case "transactions":
            aValue = a.transactions.total;
            bValue = b.transactions.total;
            break;
          case "priceChange":
            aValue = a.priceChange["1h"];
            bValue = b.priceChange["1h"];
            break;
          default:
            return 0;
        }

        if (sortOrder === "asc") {
          return aValue - bValue;
        }
        return bValue - aValue;
      });
    }

    return result;
  }, [reduxTokens, initialTokens, sortBy, sortOrder, filter]);

  // Initialize WebSocket for real-time updates
  useWebSocket(tokens);

  const handleSort = (key: SortField) => {
    dispatch(setSortBy(key));
  };

  const handleFilter = (newFilter: "all" | "new" | "final" | "migrated") => {
    dispatch(setFilter(newFilter));
  };

  const handleTimePeriodChange = (
    newTimePeriod: "1m" | "5m" | "30m" | "1h"
  ) => {
    dispatch(setTimePeriod(newTimePeriod));
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#0a0a0a] w-full overflow-x-hidden">
        <NavigationBar
          filter={filter}
          onFilterChange={handleFilter}
          timePeriod={timePeriod}
          onTimePeriodChange={handleTimePeriodChange}
        />

        <div className="w-full max-w-full px-1 sm:px-2 md:px-4 lg:px-6 pt-0 pb-3 sm:pb-4 md:pb-6">
          <div className="rounded-lg border border-gray-700/50 overflow-hidden bg-[#111111]">
            <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              <div className="max-h-[calc(100vh-200px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                <table
                  className="w-full border-collapse min-w-[450px] sm:min-w-[650px] md:min-w-[850px] lg:min-w-[1050px] xl:min-w-[1200px]"
                  aria-label="Token discovery table"
                  role="table"
                >
                  <thead className="sticky top-0 z-10 bg-[#111111]">
                    <tr className="border-b border-gray-700/50">
                      <TableHeader label="Pair Info" />
                      <TableHeader label="" aria-label="Chart column" />
                      <TableHeader
                        label="Market Cap"
                        sortKey="marketCap"
                        currentSort={sortBy}
                        sortOrder={sortOrder}
                        onSort={handleSort}
                      />
                      <TableHeader
                        label="Liquidity"
                        sortKey="liquidity"
                        currentSort={sortBy}
                        sortOrder={sortOrder}
                        onSort={handleSort}
                        className="hidden md:table-cell"
                      />
                      <TableHeader
                        label="Volume"
                        sortKey="volume"
                        currentSort={sortBy}
                        sortOrder={sortOrder}
                        onSort={handleSort}
                      />
                      <TableHeader
                        label="TXNS"
                        sortKey="transactions"
                        currentSort={sortBy}
                        sortOrder={sortOrder}
                        onSort={handleSort}
                      />
                      <TableHeader label="Token Info" />
                      <TableHeader label="Action" />
                    </tr>
                  </thead>
                  <tbody key={`tbody-${timePeriod}`}>
                    {isLoading ? (
                      // Loading skeleton rows
                      Array.from({ length: 5 }).map((_, i) => (
                        <tr
                          key={`skeleton-${i}`}
                          className="border-b border-gray-700/50 animate-pulse"
                        >
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gray-700 rounded" />
                              <div className="space-y-2">
                                <div className="w-24 h-4 bg-gray-700 rounded" />
                                <div className="w-16 h-3 bg-gray-700 rounded" />
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="w-20 h-10 bg-gray-700 rounded" />
                          </td>
                          <td className="px-4 py-4">
                            <div className="w-16 h-4 bg-gray-700 rounded" />
                          </td>
                          <td className="px-4 py-4 hidden md:table-cell">
                            <div className="w-14 h-4 bg-gray-700 rounded" />
                          </td>
                          <td className="px-4 py-4">
                            <div className="w-14 h-4 bg-gray-700 rounded" />
                          </td>
                          <td className="px-4 py-4">
                            <div className="w-12 h-4 bg-gray-700 rounded" />
                          </td>
                          <td className="px-4 py-4">
                            <div className="w-20 h-4 bg-gray-700 rounded" />
                          </td>
                          <td className="px-4 py-4">
                            <div className="w-16 h-8 bg-gray-700 rounded-full" />
                          </td>
                        </tr>
                      ))
                    ) : tokens.length === 0 ? (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-4 py-8 text-center text-gray-400"
                          role="status"
                          aria-live="polite"
                        >
                          No tokens found
                        </td>
                      </tr>
                    ) : (
                      tokens.map((token) => (
                        <TokenTableRow
                          key={`${token.id}-${timePeriod}`}
                          token={token}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <TokenModal />
      </div>
    </ErrorBoundary>
  );
}
