import React from 'react';

const ProductDetail = ({ product }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-black mb-4">{product.name}</h2>
      <img src={product.imageUrl} alt={product.name} className="w-full h-60 object-cover mb-4" />
      <p className="text-lg font-semibold text-black">Price: ${product.price}</p>
      <p className="text-gray-600">Description: {product.description}</p>
    </div>
  );
};

export default ProductDetail;
