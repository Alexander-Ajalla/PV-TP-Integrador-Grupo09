import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const { products, loading, error } = useSelector((state) => state.products);

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

  if (error) {
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        Error al cargar productos: {error}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center mt-5">
        <p>No hay productos disponibles en este momento.</p>
      </div>
    );
  }

  return (
    <div>
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

        {/* Aquí el grid con Bootstrap responsive y espacio entre cards */}
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {products.map((product) => (
            <div key={product.id} className="col d-flex">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
