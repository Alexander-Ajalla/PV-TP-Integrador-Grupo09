import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const Favorites = () => {
  const favorites = useSelector((state) => state.products.favorites);
  const products = useSelector((state) => state.products.products);
  const favoriteProducts = products.filter((product) => favorites.includes(product.id));

  return (
    <>
      <div>
        <h1>Mis Favoritos</h1>
        {favoriteProducts.length === 0 ? (
          <div>
            <p>Aún no has agregado favoritos.</p>
          </div>
        ) : (
          <div className="row">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites;