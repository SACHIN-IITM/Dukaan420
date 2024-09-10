import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover mb-4" />
      <h3 className="text-lg font-semibold text-black">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <Link to={`/product/${product.id}`} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">View Details</Link>
    </div>
  );
};

export default ProductCard;
