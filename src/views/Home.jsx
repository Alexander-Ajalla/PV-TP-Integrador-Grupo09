import React, { useContext, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { products, fetchProducts, favorites, toggleFavorite } =
    useContext(ProductContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <ProductCard
                product={product}
                isFavorite={favorites.includes(product.id)}
                toggleFavorite={toggleFavorite}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
