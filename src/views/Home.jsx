import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../store/productSlice";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/Navbar";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    // Obtener productos desde la API al cargar el componente
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        dispatch(setProducts(data));
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div>
      <Navbar />

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
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
