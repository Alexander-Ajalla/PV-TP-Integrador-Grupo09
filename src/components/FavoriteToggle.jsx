import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/productSlice';

const FavoriteToggle = ({ productId }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.products.favorites);
  const isFavorite = favorites.includes(productId);

  const handleToggle = () => {
    dispatch(toggleFavorite(productId));
  };

  return (
    <button
      className={`btn btn-${isFavorite ? 'danger' : 'outline-danger'} btn-sm`}
      onClick={handleToggle}
      aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      <i className={`bi ${isFavorite ? 'bi-heart-fill' : 'bi-heart'}`}></i>
    </button>
  );
};

export default FavoriteToggle;
