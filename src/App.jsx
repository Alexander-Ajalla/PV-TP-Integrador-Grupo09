// src/App.jsx
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store/store";
import NavBar from "./components/NavBar.jsx";
import Home from "./views/Home.jsx";
import Footer from "./components/Footer.jsx";
import Favorites from "./views/Favorites.jsx";
import ProductDetails from "./views/ProductDetails.jsx";
import ProductForm from "./views/ProductForm.jsx";
import { fetchProducts } from "./store/productSlice";
import Cart from "./views/Cart.jsx";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./views/Login"; // para que ya este listo para el que lo cree
import Register from "./views/Register"; //esto tambien
import { useNavigate } from "react-router-dom";
import { logout } from "../src/store/authSlice.js"; //la ruta tiene que ser asi
import About from "./views/About.jsx"; // Importa el componente About

// Este componente "wrapper" se encargará de la carga inicial de datos y las rutas
function AppWrapper() {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.theme);

  // Despacha fetchProducts cuando el componente se monta por primera vez
  useEffect(() => {
    dispatch(fetchProducts());
    // Rehidratación del usuario desde localStorage
    const sessionUser = JSON.parse(localStorage.getItem("sessionUser"));
    if (sessionUser) {
      dispatch({ type: "auth/login", payload: sessionUser });
    }
    // Inicializar usuarios por defecto si no existen
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (!storedUsers || storedUsers.length === 0) {
      const defaultUsers = [
        {
          name: "admin",
          email: "admin@gmail.com",
          password: "123456",
        },
      ];
      localStorage.setItem("users", JSON.stringify(defaultUsers));
    }
  }, [dispatch]); // La dependencia `dispatch` asegura que se ejecute solo una vez al montar

  React.useEffect(() => {
    document.body.className = `theme-${mode}`;
  }, [mode]);

  return (
    <div className={`d-flex flex-column min-vh-100 theme-${mode}`}>
      <NavBar />
      <main className="flex-grow-1 container py-4">
        {/* Routes debe estar dentro de un Router, que ahora estará en main.jsx */}
        <Routes>
          {/* --- Rutas Públicas --- */}
          {/* Cualquiera puede ver el login y el registro */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* --- Rutas Privadas --- */}
          {/* Solo usuarios autenticados pueden ver estas rutas */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/favoritos"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />
          <Route
            path="/productos/:id"
            element={
              <PrivateRoute>
                <ProductDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/crear"
            element={
              <PrivateRoute>
                <ProductForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/productos/:id/editar"
            element={
              <PrivateRoute>
                <ProductForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/carrito"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
          <Route path="/acerca" element={<About />} />
        </Routes>
      </main>
       <Footer />
    </div>
  );
}

function App() {
  return (
    // El Provider debe envolver todo lo que necesite acceso al store de Redux
    <Provider store={store}>
      <Toaster position="top-right" />
      <AppWrapper />
    </Provider>
  );
}

export default App;
