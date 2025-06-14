import React from "react";
import FavoriteToggle from "./FavoriteToggle";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { Link } from "react-router-dom";
import "../css/ProductCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="card h-100 product-card">
      <div className="product-card-img-container">
        <img src={product.image} alt={product.title} className="img-fluid" />
      </div>
      <div className="product-card-body">
        <h5 className="product-card-title">{product.title}</h5>
        <p className="product-card-price">{product.price} USD</p>
        <p className="product-card-category">{product.category}</p>

        <div className="product-card-footer">
          <Link
            to={`/productos/${product.id}`}
            className="btn btn-outline-primary btn-sm"
          >
            Ver más detalles
          </Link>
          <FavoriteToggle productId={product.id} />
          <Link
            to={`/productos/${product.id}/editar`}
            className="btn btn-outline-warning btn-sm"
          >
            Editar
          </Link>
          <button onClick={() => dispatch(addToCart(product))}>
            Añadir al Carrito 🛒
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
