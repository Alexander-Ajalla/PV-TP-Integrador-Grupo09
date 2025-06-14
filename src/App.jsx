// src/App.jsx
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import { Provider, useDispatch } from 'react-redux';
import { store } from './store/store';
import NavBar from './components/NavBar.jsx';
import Home from "./views/Home.jsx";
import Favorites from "./views/Favorites.jsx";
import ProductDetails from './views/ProductDetails.jsx';
import ProductForm from "./views/ProductForm.jsx";
import { fetchProducts } from './store/productSlice';

// Este componente "wrapper" se encargará de la carga inicial de datos y las rutas
function AppWrapper() {
  const dispatch = useDispatch();

  // Despacha fetchProducts cuando el componente se monta por primera vez
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]); // La dependencia `dispatch` asegura que se ejecute solo una vez al montar

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <main className="flex-grow-1 container py-4">
        {/* Routes debe estar dentro de un Router, que ahora estará en main.jsx */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoritos" element={<Favorites />} />
          <Route path="/productos/:id" element={<ProductDetails />} />
          <Route path="/productos/nuevo" element={<ProductForm />} />
          <Route path="/productos/:id/editar" element={<ProductForm />} />
          {/*<Route path="/acerca" element={<About />} />*/}
        </Routes>
      </main>
      {/* <Footer /> */}
    </div>
  );
}

function App() {
  return (
    // El Provider debe envolver todo lo que necesite acceso al store de Redux
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  );
}

export default App;