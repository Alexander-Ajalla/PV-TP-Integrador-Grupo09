import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import "../css/home.css";
const Home = () => {
  const { products, loading, error } = useSelector((state) => state.products);
  const user = useSelector((state) => state.auth.user); // usuario autenticado
  // Estado para la categoría seleccionada
  const [selectedCategory, setSelectedCategory] = useState("");

  const [sortType, setSortType] = useState("");

  // Obtener categorías únicas
  const categories = Array.from(new Set(products.map((p) => p.category)));

  // Filtrar productos según la categoría seleccionada
  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;
    
  // ORDENAR productos según el tipo seleccionado
  let sortedProducts = [...filteredProducts];

  if (sortType === "price-asc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortType === "price-desc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  } else if (sortType === "az") {
    sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortType === "za") {
    sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
  } else if (sortType === "newest") {
    sortedProducts.sort((a, b) => b.id - a.id); // Suponiendo que id mayor es más nuevo
  } else if (sortType === "oldest") {
    sortedProducts.sort((a, b) => a.id - b.id);
  }

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
        {/* Cartel de bienvenida */}
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
          <h2 className="fw-bold mb-2">
            {user ? `¡Bienvenido, ${user.name}!` : "¡Bienvenido a TecnoStore!"}
          </h2>
          <p className="text-muted mb-0">
            Todo lo que necesitás en un mismo lugar
          </p>
        </div>

        {/* Selector de categoría */}
        <div className="d-flex justify-content-center gap-3 flex-wrap mb-4">
  <div className="select-category-container d-flex flex-column align-items-center">
    <div className="d-flex align-items-center mb-2">
      <i className="bi bi-funnel-fill me-2" style={{ color: "#00adb5", fontSize: "1.5rem" }}></i>
      <span className="fw-bold" style={{ color: "#00adb5", fontSize: "1.2rem" }}>
        Filtrar por categoría
      </span>
    </div>
    <select
      className="form-select w-auto"
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
    >
      <option value="">Todas las categorías</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  </div>
  
        {/* Selector de ordenamiento */}
             <div className="select-category-container d-flex flex-column align-items-center">
    <div className="d-flex align-items-center mb-2">
      <i className="bi bi-sort-alpha-down me-2" style={{ color: "#00adb5", fontSize: "1.5rem" }}></i>
      <span className="fw-bold" style={{ color: "#00adb5", fontSize: "1.2rem" }}>
        Ordenar por
      </span>
    </div>
    <select
      className="form-select w-auto"
      value={sortType}
      onChange={(e) => setSortType(e.target.value)}
    >
      <option value="">Sin orden</option>
      <option value="price-asc">Precio: Menor a mayor</option>
      <option value="price-desc">Precio: Mayor a menor</option>
      <option value="az">Nombre: A-Z</option>
      <option value="za">Nombre: Z-A</option>
      <option value="newest">Más nuevo</option>
      <option value="oldest">Más viejo</option>
    </select>
  </div>
</div>

        {/* Grilla de productos */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {sortedProducts.map((product) => (
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
