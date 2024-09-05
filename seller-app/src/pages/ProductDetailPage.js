import React from 'react';
import ProductDetail from '../components/Product/ProductDetails';

const ProductDetailPage = ({ productId }) => {
  // Example data
  const product = { id: 1, name: 'Product 1', price: 30, description: 'Description here', imageUrl: 'http://via.placeholder.com/150' };

  return (
    <div className="p-4">
      <ProductDetail product={product} />
    </div>
  );
};

export default ProductDetailPage;
