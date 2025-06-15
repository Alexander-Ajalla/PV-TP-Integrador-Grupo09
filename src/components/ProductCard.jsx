import { useState } from "react";
import FavoriteToggle from "./FavoriteToggle";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "../css/ProductCard.css";

const ProductCard = ({
  product,
  editable = true,
  showAddToCart = true,
  showRemove = false,
  showFavorite = true,
  showDetails = true,
  showTotal = false,
  onRemove,
}) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: Number(quantity) }));
    toast.success(`¡${product.title} añadido al carrito!`);
  };

  return (
    <div className="card product-card">
      <div className="product-card-img-container">
        <img src={product.image} alt={product.title} className="img-fluid" />
      </div>
      <div className="product-card-body">
        <h5 className="product-card-title">
          <strong>{product.title}</strong>
        </h5>
        <p className="product-card-price">
          Precio Unitario: {product.price} USD
        </p>

        {showTotal && (
          <p className="product-card-price">
            Precio Total: {(product.quantity * product.price).toFixed(2)} USD
          </p>
        )}
        <p className="product-card-category">{product.category}</p>

        <div className="product-card-footer">
          {showDetails && (
            <Link
              to={`/productos/${product.id}`}
              className="btn btn-outline-primary btn-sm"
            >
              Ver más detalles
            </Link>
          )}

          {showFavorite && <FavoriteToggle productId={product.id} />}

          {editable && (
            <Link
              to={`/productos/${product.id}/editar`}
              className="btn btn-outline-warning btn-sm"
            >
              Editar
            </Link>
          )}

          {showAddToCart && (
            <label>
              Cantidad:
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="form-control mb-2"
              />
              <button
                className="btn btn-success w-100"
                onClick={handleAddToCart}
              >
                <i class="bi bi-cart-plus-fill"></i>
                Añadir al Carrito
              </button>
            </label>
          )}

          {showRemove && (
            <button className="btn btn-danger btn-sm w-100" onClick={onRemove}>
              <i class="bi bi-x-circle-fill"></i> Quitar del Carrito
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
