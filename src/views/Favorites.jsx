import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import "../css/Favorites.css";

const Favorites = () => {
  // Obtiene IDs de productos favoritos desde Redux
  const favorites = useSelector((state) => state.products.favorites);

  // Obtiene todos los productos disponibles
  const products = useSelector((state) => state.products.products);

  // Filtra los productos favoritos basados en los IDs
  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  );

  return (
    <div className="container mt-4">
      <h1 className="favorites-title">Mis Favoritos</h1>

      {/* Si no hay favoritos, muestra mensaje informativo */}
      {favoriteProducts.length === 0 ? (
        <div className="alert alert-info text-center">
          Aún no has agregado favoritos.
        </div>
      ) : (
        // Muestra los productos favoritos en tarjetas
        <div className="row">
          {favoriteProducts.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
