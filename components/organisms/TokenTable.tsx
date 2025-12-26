"use client";

import { useTokens } from "@/hooks/useTokens";
import { useWebSocket } from "@/hooks/useWebSocket";
import { TokenTableRow } from "./TokenTableRow";
import { TableHeader } from "@/components/molecules/TableHeader";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSortBy, setFilter, setTimePeriod } from "@/store/slices/tokenSlice";
import { SortField } from "@/types/token";
import { TokenModal } from "./TokenModal";
import { NavigationBar } from "./NavigationBar";
import { TableSkeleton } from "./TableSkeleton";

/**
 * Main token discovery table component
 * Handles data fetching, sorting, filtering, and real-time updates
 */
export function TokenTable() {
  const { tokens, isLoading, error } = useTokens();
  const { sortBy, sortOrder, filter, timePeriod } = useAppSelector((state) => state.tokens);
  const dispatch = useAppDispatch();

  // Initialize WebSocket for real-time updates
  useWebSocket(tokens);

  const handleSort = (key: SortField) => {
    dispatch(setSortBy(key));
  };

  const handleFilter = (newFilter: "all" | "new" | "final" | "migrated") => {
    dispatch(setFilter(newFilter));
  };

  const handleTimePeriodChange = (newTimePeriod: "1m" | "5m" | "30m" | "1h") => {
    dispatch(setTimePeriod(newTimePeriod));
  };

  if (error) {
    return (
      <ErrorBoundary>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <p className="text-red-400 mb-4">Failed to load tokens</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#0a0a0a]">
        <NavigationBar 
          filter={filter} 
          onFilterChange={handleFilter}
          timePeriod={timePeriod}
          onTimePeriodChange={handleTimePeriodChange}
        />
        
        <div className="container mx-auto px-2 sm:px-4 py-6">
          <div className="overflow-x-auto -mx-2 sm:mx-0">
            <table className="w-full border-collapse min-w-[800px] border border-gray-400">
              <thead>
                <tr className="border-b border-gray-400">
                  <TableHeader label="Pair Info" />
                  <TableHeader label="" />
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
                    className="hidden sm:table-cell"
                  />
                  <TableHeader label="Token Info" className="hidden lg:table-cell" />
                  <TableHeader label="Action" />
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <TableSkeleton />
                ) : tokens.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-gray-400">
                      No tokens found
                    </td>
                  </tr>
                ) : (
                  tokens.map((token) => <TokenTableRow key={token.id} token={token} />)
                )}
              </tbody>
            </table>
          </div>
        </div>

        <TokenModal />
      </div>
    </ErrorBoundary>
  );
}

