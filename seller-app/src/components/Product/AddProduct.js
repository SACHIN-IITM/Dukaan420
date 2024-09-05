import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../utils/api';

const AddProduct = () => {
  const [product, setProduct] = useState({ name: '', price: '', description: '', imageUrl: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct(product);
      navigate('/products');
    } catch (error) {
      console.error('Error adding product', error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-black mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={product.imageUrl}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
