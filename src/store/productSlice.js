import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    favorites: [],
    message: '',
  },

  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },

    toggleFavorite: (state, action) => {
      const productId = action.payload;
      state.favorites = state.favorites.includes(productId)
        ? state.favorites.filter((id) => id !== productId)
        : [...state.favorites, productId];
    },

    showMessage: (state, action) => {
      state.message = action.payload;
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
        product.id === id ? { ...product, ...updatedData } : product
      );
      state.message = 'Producto actualizado exitosamente';
    },

    deleteProduct: (state, action) => {
      const id = action.payload;
      state.products = state.products.filter((product) => product.id !== id);
      state.favorites = state.favorites.filter((favId) => favId !== id);
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