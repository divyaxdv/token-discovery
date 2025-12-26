"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setModalOpen, setSelectedToken } from "@/store/slices/uiSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Token } from "@/types/token";
import { useMemo } from "react";
import { formatCurrency } from "@/lib/utils";

/**
 * Modal for token purchase/details
 */
export function TokenModal() {
  const dispatch = useAppDispatch();
  const { selectedToken, isModalOpen } = useAppSelector((state) => state.ui);
  const tokens = useAppSelector((state) => state.tokens.tokens);

  const token = useMemo(() => {
    return tokens.find((t) => t.id === selectedToken);
  }, [tokens, selectedToken]);

  const handleClose = () => {
    dispatch(setModalOpen(false));
    dispatch(setSelectedToken(null));
  };

  if (!token) return null;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{token.name}</DialogTitle>
          <DialogDescription>Token purchase details</DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-400">Market Cap:</span>
            <span>{formatCurrency(token.marketCap)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Liquidity:</span>
            <span>{formatCurrency(token.liquidity)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Volume:</span>
            <span>{formatCurrency(token.volume)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Price Change (1h):</span>
            <span className={token.priceChange["1h"] >= 0 ? "text-green-400" : "text-red-400"}>
              {token.priceChange["1h"] >= 0 ? "+" : ""}
              {token.priceChange["1h"].toFixed(2)}%
            </span>
          </div>
          <div className="pt-4">
            <button
              onClick={handleClose}
              className="w-full px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
            >
              Confirm Purchase
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

