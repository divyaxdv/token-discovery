import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  selectedToken: string | null;
  isModalOpen: boolean;
  hoveredToken: string | null;
}

const initialState: UIState = {
  selectedToken: null,
  isModalOpen: false,
  hoveredToken: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSelectedToken: (state, action: PayloadAction<string | null>) => {
      state.selectedToken = action.payload;
    },
    setModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    setHoveredToken: (state, action: PayloadAction<string | null>) => {
      state.hoveredToken = action.payload;
    },
  },
});

export const { setSelectedToken, setModalOpen, setHoveredToken } = uiSlice.actions;
export default uiSlice.reducer;

