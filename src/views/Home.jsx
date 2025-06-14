import React from "react";
import { useSelector } from "react-redux"; // Solo necesitamos useSelector, no useDispatch para la carga aquí
import ProductCard from "../components/ProductCard";

const Home = () => {
  // Obtenemos los productos, y también los estados de carga y error del slice
  const { products, loading, error } = useSelector((state) => state.products);

  // Muestra un estado de carga mientras los productos se obtienen
  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando productos...</span>
        </div>
        <p className="mt-2">Cargando productos...</p>
      </div>
    );
  }

  // Muestra un mensaje de error si la carga falló
  if (error) {
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        Error al cargar productos: {error}
      </div>
    );
  }

  // Opcional: Mostrar un mensaje si no hay productos después de la carga
  if (!products || products.length === 0) {
    return (
      <div className="text-center mt-5">
        <p>No hay productos disponibles en este momento.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Bienvenida + Logo */}
      <div className="container mt-5 pt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold">¡Bienvenido a Mi Tienda de Tecnología!</h2>
            <p className="text-muted">
              Descubrí nuestros productos destacados para armar tu PC ideal.
            </p>
          </div>
          <img
            src="/logo.png"
            alt="Logo Tienda"
            style={{ height: "80px", objectFit: "contain" }}
          />
        </div>

        {/* Listado de productos */}
        <div className="row">
          {products.map((product) => (
            // Es vital que el product.id sea único para la key
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;