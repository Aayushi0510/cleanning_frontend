import { Slice, createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    allCatgeory: [],
    selectedCategory: null,
    isTableLoading: false,
  },
  reducers: {
    setAllCategory: (state, action) => {
      state.allCatgeory = action.payload;
    },

    setIsTableLoading: (state, action) => {
      state.isTableLoading = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
});
export const { setUser, setIsTableLoading, setSelectedCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
