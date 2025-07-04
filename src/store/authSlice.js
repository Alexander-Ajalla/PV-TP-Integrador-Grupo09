// Importo la función createSlice desde Redux Toolkit para crear el slice de autenticación
import { createSlice } from "@reduxjs/toolkit";

// Estado inicial: intento recuperar el usuario guardado en localStorage (si existe)
const initialState = {
  user: JSON.parse(localStorage.getItem("sessionUser")) || null, // Usuario logueado (si hay uno en localStorage)
  isAuthenticated: !!localStorage.getItem("sessionUser"),        // Booleano que indica si el usuario está autenticado
};

// Creo el slice de autenticación
const authSlice = createSlice({
  name: "auth",        // Nombre del slice (útil si tengo varios)
  initialState,        // Le paso el estado inicial definido arriba
  reducers: {
    // Acción que se dispara cuando el usuario inicia sesión
    login: (state, action) => {
      state.user = action.payload;    // Guardo los datos del usuario
      state.isAuthenticated = true;   // Marco como autenticado
    },
    // Acción que se dispara cuando el usuario cierra sesión
    logout: (state) => {
      state.user = null;              // Limpio los datos del usuario
      state.isAuthenticated = false;  // Lo marco como no autenticado
      localStorage.removeItem("sessionUser"); // Borro el usuario del localStorage
    },
  },
});

// Exporto las acciones para poder usarlas desde los componentes
export const { login, logout } = authSlice.actions;

// Exporto el reducer para integrarlo en el store de Redux
export default authSlice.reducer;