import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // For decoding the JWT token
import { getProduct, createOrder, addProductToWishlist } from '../utils/api';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [userId, setUserId] = useState(null); // Store user ID from JWT

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    const getTokenAndDecode = () => {
      const token = localStorage.getItem('token'); // Retrieve JWT from localStorage or cookies
      if (token) {
        const decodedToken = jwtDecode(token); // Decode JWT to extract user ID
        setUserId(decodedToken.id); // Set user ID
      }
    };

    fetchProduct();
    getTokenAndDecode(); // Get user ID from token
  }, [id]);

  const handleBuy = async () => {
    if (!userId) {
      alert('You must be logged in to place an order.');
      return;
    }

    try {
      const orderData = {
        orderItems: [{ product: product._id, qty: 1 }],
        totalAmount: product.price,
        shippingAddress: {
          address: '123 Main St', // You can update this to take address from the user profile if needed
          city: 'Unknown City',
          postalCode: '00000',
          country: 'Unknown Country',
        },
        userEmail: 'user@example.com', // Dummy email, should come from the user profile
        userName: 'John Doe', // Dummy name, should come from the user profile
        sellerInfo: product.sellerInfo || {
          sellerAddress: {
            address: 'Seller Address',
            city: 'Seller City',
            postalCode: '00000',
            country: 'Unknown Country',
          },
          sellerPhone: '000-000-0000',
          sellerEmail: 'seller@example.com',
        }
      };

      const config = {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
      };

      const { data } = await createOrder(orderData, config);
      setOrderDetails(data);
      setModalOpen(true);
    } catch (error) {
      console.error('Error placing order:', error.response?.data?.message || error.message);
      alert('Failed to place order. Please try again.');
    }
  };

  const handleAddToWishlist = async () => {
    if (!userId) {
      alert('You must be logged in to add items to your wishlist.');
      return;
    }

    try {
      await addProductToWishlist(userId, product._id); // Pass user ID from token and product ID
      alert('Product added to wishlist!');
    } catch (error) {
      console.error('Error adding to wishlist:', error.response?.data?.message || error.message);
      alert('Failed to add product to wishlist.');
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" />
          <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-xl font-bold mt-2">${product.price}</p>

          <div className="mt-4 flex space-x-2">
            <button
              onClick={handleBuy}
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Buy
            </button>
            <button
              onClick={handleAddToWishlist}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Add to Wishlist
            </button>
          </div>
        </div>
      </main>
      <Footer />

      {modalOpen && orderDetails && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>
            <p className="text-lg mb-2">Order ID: {orderDetails._id}</p>
            <p className="text-lg mb-2">Total Amount: ${orderDetails.totalAmount}</p>

            <h3 className="text-xl font-semibold mb-2">Order Items:</h3>
            <ul className="list-disc list-inside mb-4">
              {orderDetails.orderItems.map((item) => (
                <li key={item._id}>
                  Product ID: {item.product} - Quantity: {item.qty}
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold mb-2">Shipping Address:</h3>
            <p className="mb-2">{orderDetails.shippingAddress.address}</p>
            <p className="mb-2">{orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.postalCode}</p>
            <p className="mb-4">{orderDetails.shippingAddress.country}</p>

            <h3 className="text-xl font-semibold mb-2">User Info:</h3>
            <p className="mb-2">User ID: {orderDetails.user}</p>
            <p className="mb-2">Name: {orderDetails.userName}</p>
            <p className="mb-2">Email: {orderDetails.userEmail}</p>

            <h3 className="text-xl font-semibold mb-2">Seller Info:</h3>
            {orderDetails.sellerInfo && (
              <>
                <p className="mb-2">Seller Address: {orderDetails.sellerInfo.sellerAddress.address}</p>
                <p className="mb-2">Seller Phone: {orderDetails.sellerInfo.sellerPhone}</p>
                <p className="mb-2">Seller Email: {orderDetails.sellerInfo.sellerEmail}</p>
              </>
            )}

            <button
              onClick={() => setModalOpen(false)}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
