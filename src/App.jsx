import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store/store";
import { fetchProducts } from "./store/productSlice";

// * Componentes
import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";
import PrivateRoute from "./components/PrivateRoute";
// * Vistas - paginas
import Login from "./views/Login";
import Register from "./views/Register";
import Home from "./views/Home.jsx";
import Favorites from "./views/Favorites.jsx";
import ProductDetails from "./views/ProductDetails.jsx";
import ProductForm from "./views/ProductForm.jsx";
import Cart from "./views/Cart.jsx";
import About from "./views/About.jsx";
import { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import { logout } from "../src/store/authSlice.js"; //la ruta tiene que ser asi
import "./index.css";

// Este componente "wrapper" se encargará de la carga inicial de datos y las rutas
function AppWrapper() {
  const dispatch = useDispatch(); // * hook de redux , se usa para llamar a fetchProducts
  const { mode } = useSelector((state) => state.theme); // * hook que extrae el estado del tema desde redux (light/dark)

  // Despacha fetchProducts cuando el componente se monta por primera vez
  useEffect(() => {
    dispatch(fetchProducts()); // * lama a un thunk para cargar productos y los guarda en productSlice
    // Rehidratación del usuario desde localStorage
    const sessionUser = JSON.parse(localStorage.getItem("sessionUser"));
    // * Si hay un usuario en localStorage, lo vuelve a loguear automaticamente
    // * aunque se recargué la página la sesión no se pierde
    if (sessionUser) {
      dispatch({ type: "auth/login", payload: sessionUser });
    }
    // Inicializar usuarios por defecto si no existen
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    if (!storedUsers || storedUsers.length === 0) {
      // * Si no hay usuarios en localStorage crea el usuario admin
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
