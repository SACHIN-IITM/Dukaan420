import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onBuy, onAddToWishlist }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mt-1">{product.description}</p>
        <p className="text-2xl font-bold text-gray-900 mt-2">Rs.{product.price}</p>
        <Link
          to={`/products/${product._id}`}
          className="mt-4 block text-center bg-accent text-white py-2 px-4 rounded-lg hover:bg-accent-dark transition-colors"
        >
          View Details
        </Link>
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => onBuy(product)}
            className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
          >
            Buy
          </button>
          <button
            onClick={() => onAddToWishlist(product)}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors ml-2"
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
