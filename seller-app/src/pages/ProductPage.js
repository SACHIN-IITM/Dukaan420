import React, { useState, useEffect } from 'react';
import Modal from '../models/Model';
import ProductForm from '../components/Product/ProductForm';
import ProductTable from '../components/Product/ProductTable';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const productList = await response.json();
      setProducts(productList);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Add a product
  const addProduct = async (newProduct) => {
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      const createdProduct = await response.json();
      setProducts([...products, createdProduct]);
      setIsModalOpen(false); // Close the modal after adding product
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto mt-16 p-4">
      <h1 className="text-3xl font-bold mb-6">Product Listing</h1>
      
      {/* Add Product Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 bg-accent text-white py-2 px-4 rounded"
      >
        Add New Product
      </button>

      {/* Modal for Adding New Product */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ProductForm addProduct={addProduct} />
      </Modal>

      {/* Product Table */}
      <ProductTable products={products} />
    </div>
  );
};

export default ProductPage;
