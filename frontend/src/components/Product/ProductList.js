import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
  return (
    <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product._id} className="border p-4 rounded-lg shadow-sm">
            <img
              src={product.imageUrl || 'http://via.placeholder.com/150'}
              alt={product.name}
              className="w-full h-40 object-cover mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">${product.price}</p>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <Link
              to={`/products/${product._id}`}
              className="mt-2 inline-block bg-accent text-white py-2 px-4 rounded-lg hover:bg-accent-dark transition duration-300"
            >
              View Details
            </Link>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No products found.</p>
      )}
    </div>
  );
};

export default ProductList;
