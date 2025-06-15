import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 1. Definir el thunk asíncrono para obtener productos
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts', // Nombre de la acción
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('No se pudieron obtener los productos');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message); // En caso de error
    }
  }
);

// Cargar favoritos del localStorage al iniciar
const loadFavoritesFromLocalStorage = () => {
  try {
    const serializedFavorites = localStorage.getItem('favorites');
    if (serializedFavorites === null) {
      return [];
    }
    return JSON.parse(serializedFavorites);
  } catch (e) {
    console.warn("Could not load favorites from localStorage", e);
    return [];
  }
};


const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    favorites: loadFavoritesFromLocalStorage(), // Cargar favoritos al inicio
    message: '',
    loading: false, // Estado de carga para el fetch
    error: null,    // Estado de error para el fetch
  },

  reducers: {
    // setProducts ya no es tan necesario si usamos createAsyncThunk,
    // pero lo dejamos por si acaso para otros usos directos
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    toggleFavorite: (state, action) => {
      const productId = action.payload;
      const isFavorite = state.favorites.includes(productId);
      if (isFavorite) {
        state.favorites = state.favorites.filter((id) => id !== productId);
      } else {
        state.favorites.push(productId); // Con Immer, push es seguro
      }
      // Actualizar localStorage aquí mismo para los favoritos es una buena práctica para persistencia simple
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    showMessage: (state, action) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = '';
    },
    addProduct: (state, action) => {
      // Usar un ID más robusto, como Date.now() o nanoid
      const newId = Date.now(); // Mejor que state.products.length + 1 para evitar duplicados si la lista cambia
      state.products.push({ ...action.payload, id: newId }); // Con Immer, push es seguro
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
      localStorage.setItem('favorites', JSON.stringify(state.favorites)); // Actualizar favoritos también
    },
  },
  // 2. Manejar los estados del thunk asíncrono
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setProducts, // Lo mantenemos por si lo usas en otro lado, pero fetchProducts lo reemplaza para la carga inicial
  toggleFavorite,
  showMessage,
  clearMessage,
  addProduct,
  updateProduct,
  deleteProduct,
} = productSlice.actions;

export default productSlice.reducer;