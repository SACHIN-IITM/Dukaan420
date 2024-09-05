import React from 'react';
import ProductList from '../components/Product/ProductList';

const ProductPage = () => {
  // Example data
  const products = [
    { id: 1, name: 'Product 1', price: 30, imageUrl: 'http://via.placeholder.com/150' },
    // Add more products here
  ];

  return (
    <div className="p-4">
      <ProductList products={products} />
    </div>
  );
};

export default ProductPage;
