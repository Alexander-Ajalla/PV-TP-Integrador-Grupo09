import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/productSlice";

const FavoriteToggle = ({ productId }) => {
  const dispatch = useDispatch();

  // Obtiene los IDs de productos favoritos desde Redux
  const favorites = useSelector((state) => state.products.favorites);

  // Verifica si este producto está en favoritos
  const isFavorite = favorites.includes(productId);

  // Cambia el estado de favorito (agrega o quita)
  const handleToggle = () => {
    dispatch(toggleFavorite(productId));
  };

  return (
    // Botón con estilo e ícono condicional según el estado
    <button
      className={`btn btn-${isFavorite ? "danger" : "outline-danger"} btn-sm`}
      onClick={handleToggle}
      aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      <i className={`bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}`}></i>
    </button>
  );
};

export default FavoriteToggle;
