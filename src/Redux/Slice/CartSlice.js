import { Slice, createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    isTableLoading: false,
  },
  reducers: {
    setCart: (state, action) => {
      const newItem = action.payload;

      const existingItemIndex = state.cart.findIndex(
        (item) => item._id === newItem._id
      );


      console.log(newItem)
      if (existingItemIndex !== -1) {
        state.cart[existingItemIndex].quantity += newItem.quantity;
      } else {
        state.cart.push({ ...newItem });
      }
    },
    removeItemFromCart: (state, action) => {
      const itemId = action.payload;
      state.cart = state.cart.filter((item) => item._id !== itemId);
    },
    decreaseItemQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cart.find((item) => item._id === itemId);

      if (item) {
        item.quantity -= 1;
      }
    },
    setIsTableLoading: (state, action) => {
      state.isTableLoading = action.payload;
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});
export const {
  setCart,
  setIsTableLoading,
  removeItemFromCart,
  clearCart,
  decreaseItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
