import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { filterState } from "../types/filter";

const initialState: filterState = {
  searchInput: "",
  sortOrder: "",
};

const filtersSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    editSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },
    editSortOrder: (state, action: PayloadAction<string>) => {
      state.sortOrder = action.payload;
    },
  },
});

export default filtersSlice.reducer;
export const { editSearchInput, editSortOrder } = filtersSlice.actions;
