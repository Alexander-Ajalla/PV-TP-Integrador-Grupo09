import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";

const Favorites = () => {
  const favorites = useSelector((state) => state.products.favorites);

  return (
    <>
      <div>
        <h1>Mis Favoritos</h1>
        {favorites.length === 0 ? (
          <div>
            <p>Aún no has agregado favoritos.</p>
          </div>
        ) : (
          <div>
            {favorites.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites;