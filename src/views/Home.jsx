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
    <>
      <div className="container pt-3">
        {/* Cartel de bienvenida centrado */}
        <div className="d-flex flex-column align-items-center text-center p-4 mb-5">
          <img
            src="src/assets/logo.png"
            alt="Logo Tienda"
            style={{
              height: "160px",
              width: "auto",
              objectFit: "contain",
            }}
          />
          <h2 className="fw-bold mb-2">¡Bienvenido a TecnoStore!</h2>
          <p className="text-muted mb-0">
            Todo lo que necesitás en un mismo lugar
          </p>
        </div>

        {/* Grilla de productos */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {products.map((product) => (
            <div key={product.id} className="col">
              <div className="card h-100 shadow-sm border-0 hover-shadow">
                <ProductCard product={product} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
