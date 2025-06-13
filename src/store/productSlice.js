/* Reductor para manejar productos, favoritos y notificaciones */
import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [], //lista de productos
    favorites: [], // Lista de IDs de productos favoritos
    message: '', // Mensaje de notificación
  },

  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;// Establece la lista de productos
    },

    toggleFavorite: (state, action) => {
      const productId = action.payload;
      state.favorites = state.favorites.includes(productId)
        ? state.favorites.filter((id) => id !== productId)// Elimina de favoritos
        : [...state.favorites, productId];// Agrega a favoritos
    },

    showMessage: (state, action) => {
      state.message = action.payload;// Muestra un mensaje
    },

    clearMessage: (state) => {
      state.message = '';
    },

    addProduct: (state, action) => {
      state.products = [...state.products, { ...action.payload, id: state.products.length + 1 }];
      state.message = 'Producto agregado exitosamente';
    },

    updateProduct: (state, action) => {
      const { id, updatedData } = action.payload;
      state.products = state.products.map((product) =>
        product.id === id ? { ...product, ...updatedData } : product // Actualiza un producto
      );
      state.message = 'Producto actualizado exitosamente';
    },

    deleteProduct: (state, action) => {
      const id = action.payload;
      state.products = state.products.filter((product) => product.id !== id);// Elimina un producto
      state.favorites = state.favorites.filter((favId) => favId !== id);// Limpia favoritos
      state.message = 'Producto eliminado exitosamente';
    },
  },
});

export const {
  setProducts,
  toggleFavorite,
  showMessage,
  clearMessage,
  addProduct,
  updateProduct,
  deleteProduct,
} = productSlice.actions;

export default productSlice.reducer;