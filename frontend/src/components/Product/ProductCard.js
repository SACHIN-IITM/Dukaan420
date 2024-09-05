import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-xl font-bold">${product.price}</p>
        <Link to={`/products/${product._id}`} className="mt-2 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">View Details</Link>
      </div>
    </div>
  );
};

export default ProductCard;
