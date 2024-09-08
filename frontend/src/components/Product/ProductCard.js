import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onBuy, onAddToWishlist }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-gray-600">{product.description}</p>
        <p className="text-xl font-bold">${product.price}</p>
        <Link to={`/products/${product._id}`} className="mt-2 inline-block bg-accent text-white py-2 px-4 rounded-lg hover:bg-accent-dark">View Details</Link>
        <div className="mt-4 flex space-x-2">
          <button 
            onClick={() => onBuy(product)} 
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Buy
          </button>
          <button 
            onClick={() => onAddToWishlist(product)} 
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
