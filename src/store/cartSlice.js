import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalUnits: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const quantityToAdd = product.quantity || 1;
      const exists = state.items.find((item) => item.id === product.id);
      if (!exists) {
        state.items.push({ ...product, quantity: quantityToAdd });
      } else {
        exists.quantity += quantityToAdd;
      }
      state.totalUnits += quantityToAdd;
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        state.totalUnits -= item.quantity;
      }
      state.items = state.items.filter((item) => item.id !== id);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalUnits = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
