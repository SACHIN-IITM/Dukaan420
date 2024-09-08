import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
  return (
    <div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="border p-4 rounded shadow-sm cursor-pointer"
          >
            {/* Ensure images array is defined and has at least one image */}
            <img
              src={product.images && product.images.length > 0 ? product.images[0] : 'http://via.placeholder.com/150'}
              alt={product.name}
              className="w-full h-48 object-cover mb-4"
            />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
