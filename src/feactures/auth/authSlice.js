// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Función para obtener la sesión del localStorage
// Se rehidrata el estado al inicio con esta función. 
const getSessionUser = () => {
  try {
    const sessionUser = localStorage.getItem('sessionUser');
    return sessionUser ? JSON.parse(sessionUser) : null;
  } catch (error) {
    console.error("Error al parsear sessionUser desde localStorage:", error);
    return null;
  }
};

const authSlice = createSlice({
  name: 'auth', // Nombre del slice
  initialState: {
    user: getSessionUser(), // Inicializa el usuario desde localStorage 
    isAuthenticated: !!getSessionUser(), // true si hay un usuario en sesión
  },
  reducers: {
    // Acción para iniciar sesión 
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      // Guarda el usuario en localStorage 
      localStorage.setItem('sessionUser', JSON.stringify(action.payload));
    },
    // Acción para cerrar sesión 
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      // Elimina el usuario de localStorage 
      localStorage.removeItem('sessionUser');
    },
  },
});

// Exporta las acciones generadas automáticamente por createSlice
export const { loginSuccess, logout } = authSlice.actions;

// Exporta el reducer
export default authSlice.reducer;

// Selectores para acceder fácilmente al estado
export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;