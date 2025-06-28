import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("sessionUser")) || null,
  isAuthenticated: !!localStorage.getItem("sessionUser"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("sessionUser");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;