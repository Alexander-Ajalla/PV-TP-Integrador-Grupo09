import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import Navbar from "../components/NavBar"; 
const Favorites = () => {
  const favorites = useSelector((state) => state.products.favorites);
  const products = useSelector((state) => state.products.products);
  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  );

  return (
    <>
      <div className="container mt-4">
        <h1 className="mb-4"> Mis Favoritos</h1>

        {favoriteProducts.length === 0 ? (
          <div className="alert alert-info text-center">
            Aún no has agregado favoritos.
          </div>
        ) : (
          <div className="row">
            {favoriteProducts.map((product) => (
              <div className="col-md-4 mb-4" key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites;
