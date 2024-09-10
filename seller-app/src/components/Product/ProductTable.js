import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductTable = ({ products }) => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="text-left p-4 border-b border-gray-200">Product</th>
            <th className="text-left p-4 border-b border-gray-200">Price</th>
            <th className="text-left p-4 border-b border-gray-200">Category</th>
            <th className="text-left p-4 border-b border-gray-200">Stock</th>
            <th className="text-left p-4 border-b border-gray-200">Brand</th>
            <th className="text-left p-4 border-b border-gray-200">Rating</th>
            <th className="text-left p-4 border-b border-gray-200">Reviews</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr
                key={product._id}
                className="border-b cursor-pointer hover:bg-gray-100"
                onClick={() => handleRowClick(product._id)}
              >
                <td className="p-4 flex items-center">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-16 h-16 object-cover inline-block mr-4"
                  />
                  <span>{product.name}</span>
                </td>
                <td className="p-4">${product.price || 'N/A'}</td>
                <td className="p-4">{product.category || 'N/A'}</td>
                <td className="p-4">{product.stock || 'N/A'}</td>
                <td className="p-4">{product.brand || 'N/A'}</td>
                <td className="p-4">{product.rating || 'N/A'}</td>
                <td className="p-4">{product.reviews || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-4">No products available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
