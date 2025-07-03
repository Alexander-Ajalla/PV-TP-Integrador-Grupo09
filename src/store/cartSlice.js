import { createSlice } from "@reduxjs/toolkit";
/**
 * Si esta..
 * En tu catálogo o tienda: producto (product)
 * En tu carrito de compras: ítem (item)
 */
const cartSlice = createSlice({
  name: "cart", // nombre del slice en el store
  initialState: {
    items: [], // lista de productos en el carrito
    totalUnits: 0, // cantidad total de unidades (no de productos únicos)
  },
  reducers: {
    // Agrega un producto al carrito o incrementa su cantidad si ya existe
    addToCart: (state, action) => {
      const product = action.payload;
      const quantityToAdd = product.quantity || 1;
      const exists = state.items.find((item) => item.id === product.id);

      if (!exists) {
        // Nuevo producto: se agrega al array
        state.items.push({ ...product, quantity: quantityToAdd });
      } else {
        // Producto ya en el carrito: solo aumenta su cantidad
        exists.quantity += quantityToAdd;
      }

      state.totalUnits += quantityToAdd;
    },

    // Elimina un producto completamente del carrito
    removeFromCart: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        state.totalUnits -= item.quantity; // descuenta todas las unidades del item
      }

      state.items = state.items.filter((item) => item.id !== id);
    },

    // Incrementa en 1 la cantidad del producto
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);

      if (item) {
        item.quantity += 1;
        state.totalUnits += 1;
      }
    },

    // Disminuye en 1 la cantidad del producto (mínimo 1 producto)
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalUnits -= 1;
      }
    },

    // Vacía completamente el carrito
    clearCart: (state) => {
      state.items = [];
      state.totalUnits = 0;
    },
  },
});

// Exporta los action creators generados automáticamente
export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

// Exporta el reducer para usarlo en el store
export default cartSlice.reducer;
