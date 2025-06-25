import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import authReducer from "../feactures/auth/authSlice.js"

export const store = configureStore({
  reducer: { products: productReducer, cart: cartReducer, auth: authReducer },
  //Se agregan los reducers para productos, carrito y autenticación al store
});