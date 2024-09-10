import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
              <img
                src={product.imageUrl || 'http://via.placeholder.com/300'}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                <p className="text-xl font-bold text-gray-900 mb-2">Rs.{product.price}</p>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <Link
                  to={`/products/${product._id}`}
                  className="inline-block bg-accent text-white py-2 px-4 rounded-lg hover:bg-accent-dark transition-colors duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
