import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetails = ({ products, deleteProduct }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <p>Product not found!</p>;
  }

  const handleDelete = () => {
    deleteProduct(product.id);
    navigate('/'); // Navigate back to product list
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-64 object-cover mb-4"
      />
      <p className="text-lg mb-4">Rs.{product.price.toFixed(2)}</p>
      <p className="text-gray-700 mb-4">
        Detailed description of the product goes here.
      </p>
      <div className="mt-6">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded mr-4"
          onClick={() => navigate(`/product/edit/${product.id}`)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
