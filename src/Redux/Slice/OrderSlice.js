import { Slice, createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: [],
    selectedCategory: null,
    isTableLoading: false,
  },
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },

    setIsTableLoading: (state, action) => {
      state.isTableLoading = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});
export const { setOrder ,setIsTableLoading, setSelectedCategory } =
  orderSlice.actions;

export default orderSlice.reducer;
