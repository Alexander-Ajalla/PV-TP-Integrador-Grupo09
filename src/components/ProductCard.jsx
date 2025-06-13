import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div>
      <h2>{product.title}</h2>
      <p>Precio: ${product.price}</p>
    </div>
  );
};

export default ProductCard;
