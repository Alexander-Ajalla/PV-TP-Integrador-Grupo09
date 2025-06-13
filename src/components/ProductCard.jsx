import React from 'react';
import FavoriteToggle from './FavoriteToggle';

const ProductCard = ({ product }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        <img
          src={product.image}
          className="card-img-top p-3"
          alt={product.title}
          style={{ height: '200px', objectFit: 'contain' }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">${product.price}</p>
          <p className="card-text">
            <small className="text-muted">{product.category}</small>
          </p>

          <div className="mt-auto d-flex justify-content-between align-items-center">
            <a href={`/detalle/${product.id}`} className="btn btn-primary btn-sm">
              Ver más detalles
            </a>
            <FavoriteToggle productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;