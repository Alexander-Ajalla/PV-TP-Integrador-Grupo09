// src/App.jsx
import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated} from "./feactures/auth/authSlice.js";
//import Login from "./views/Login.jsx";
//import Register from "./views//Register.jsx";

import NavBar from "./components/NavBar.jsx";
import Home from "./views/Home.jsx";
import Favorites from "./views/Favorites.jsx";
// import About from "./views/About.jsx";
import ProductDetails from "./views/ProductDetails.jsx";
import ProductForm from "./views/ProductForm.jsx";
import { fetchProducts } from "./store/productSlice";
import Cart from "./views/Cart.jsx";
import { Toaster } from "react-hot-toast";

const PrivateRoute = ({ children }) => {
  // Usa el selector para obtener el estado de autenticación del Store de Redux
  const isAuthenticated = useSelector(selectIsAuthenticated);
  // Si está autenticado, renderiza los componentes hijos; de lo contrario, redirige al login
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Este componente "wrapper" se encargará de la carga inicial de datos y las rutas
function AppWrapper() {
  const dispatch = useDispatch();

  // Despacha fetchProducts cuando el componente se monta por primera vez
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]); // La dependencia `dispatch` asegura que se ejecute solo una vez al montar

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />{" "}
      {/* La barra de navegación ahora puede mostrar el estado de autenticación */}
      <main className="flex-grow-1 container py-4">
        {/*
          Definir rutas públicas (register, login) y privadas (home, favoritos, detalle). 
        */}
        <Routes>
          {/* Rutas Públicas: accesibles sin necesidad de autenticación */}
          {/*<Route path="/login" element={<Login />} />*/}
          {/*<Route path="/register" element={<Register />} />*/}

          {/* Rutas Protegidas: envueltas por PrivateRoute */}
          {/* Implementar el componente <PrivateRoute> que verifique la sesión.  */}
          {/* Mientras exista "sessionUser" en localStorage, la Home y el resto de páginas privadas deben ser accesibles.  */}
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
          {/* Ejemplo si tuvieras una ruta 'About' que también fuera privada */}
          {/*
          <Route
            path="/acerca"
            element={
              <PrivateRoute>
                <About />
              </PrivateRoute>
            }
          />
          */}
        </Routes>
      </main>
      {/* Puedes agregar un Footer aquí si lo tienes */}
      {/* <Footer /> */}
    </div>
  );
}

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <AppWrapper />
    </>
  );
}

export default App;
