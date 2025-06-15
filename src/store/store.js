import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";

export const store = configureStore({
  reducer: { products: productReducer, cart: cartReducer },
  //Se agregan los reducers para productos y carrito al store
});
