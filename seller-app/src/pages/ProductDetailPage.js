import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/Product/ProductForm';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    imageUrl: '', 
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setEditedProduct({
          name: data.name || '',
          description: data.description || '',
          price: data.price ? data.price.toString() : '',
          category: data.category || '',
          stock: data.stock ? data.stock.toString() : '',
          imageUrl: data.images && data.images.length > 0 ? data.images[0] : '' // Assuming a single image URL for simplicity
        });
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });
      navigate('/products');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSave = async (updatedProduct) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...updatedProduct,
          price: parseFloat(updatedProduct.price),
          stock: parseInt(updatedProduct.stock, 10),
        }),
      });

      if (response.ok) {
        setProduct({
          ...product,
          ...updatedProduct,
          price: parseFloat(updatedProduct.price),
          stock: parseInt(updatedProduct.stock, 10),
        });
        setIsModalOpen(false);
      } else {
        console.error('Error updating product:', await response.text());
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (!product) return <p>Product not found</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      <div className="border p-4 rounded shadow-sm">
        <img
          src={product?.imageUrl || 'http://via.placeholder.com/150'}
          alt={product?.name || 'Product'}
          className="w-full h-64 object-cover mb-4"
        />
        <h2 className="text-xl font-semibold mb-2">{product?.name || 'Unknown Product'}</h2>
        <p className="text-gray-600 mb-2">${product?.price.toFixed(2)}</p>
        <p className="text-gray-700 mb-4">{product?.description || 'No description available'}</p>
        <p className="text-gray-700 mb-4">Category: {product?.category || 'Unknown'}</p>
        <p className="text-gray-700 mb-4">Stock: {product?.stock || 0}</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-accent text-white rounded-lg mr-2"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Delete
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white p-2 rounded-lg shadow-lg w-full max-w-lg">
            <div className="flex justify-between items-center ">
              <h2 className="text-xl font-semibold"></h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                &times;
              </button>
            </div>
            <ProductForm addProduct={handleSave} initialData={editedProduct} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
