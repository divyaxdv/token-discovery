import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token } from "@/types/token";

interface TokenState {
  tokens: Token[];
  sortBy: string | null;
  sortOrder: "asc" | "desc";
  filter: "all" | "new" | "final" | "migrated";
  timePeriod: "1m" | "5m" | "30m" | "1h";
}

const initialState: TokenState = {
  tokens: [],
  sortBy: null,
  sortOrder: "desc",
  filter: "all",
  timePeriod: "1h",
};

const tokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.tokens = action.payload;
    },
    updateToken: (state, action: PayloadAction<{ id: string; updates: Partial<Token> }>) => {
      const index = state.tokens.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tokens[index] = { ...state.tokens[index], ...action.payload.updates };
      }
    },
    setSortBy: (state, action: PayloadAction<string | null>) => {
      if (state.sortBy === action.payload) {
        state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
      } else {
        state.sortBy = action.payload;
        state.sortOrder = "desc";
      }
    },
    setFilter: (state, action: PayloadAction<"all" | "new" | "final" | "migrated">) => {
      state.filter = action.payload;
    },
    setTimePeriod: (state, action: PayloadAction<"1m" | "5m" | "30m" | "1h">) => {
      state.timePeriod = action.payload;
    },
  },
});

export const { setTokens, updateToken, setSortBy, setFilter, setTimePeriod } = tokenSlice.actions;
export default tokenSlice.reducer;

