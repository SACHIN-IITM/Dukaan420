import React, { useEffect, useState } from 'react';
import { getOrder, getUserProfile } from '../utils/api';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  // eslint-disable-next-line
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAndOrders = async () => {
      try {
        // Fetch user profile to get user information
        const { data: userData } = await getUserProfile();
        console.log(userData.data.user._id);

        if (userData && userData.data && userData.data.user) {
          const userInfo = userData.data.user;
          setUser(userInfo);

          // Fetch orders for the logged-in user using user ID
          const ordersData = await getOrder(userInfo._id); // Pass user ID to getUserOrders
          console.log(ordersData.data);
          setOrders(ordersData.data);
        }
      } catch (error) {
        console.error('Error fetching user or orders:', error);
        setError('Failed to fetch orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndOrders();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h1 className="text-3xl font-bold mb-4">My Orders</h1>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Order ID</th>
                  <th className="py-2 px-4 border-b">Total Amount</th>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Shipping Address</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td className="py-2 px-4 border-b">{order._id}</td>
                    <td className="py-2 px-4 border-b">${order.totalAmount.toFixed(2)}</td>
                    <td className="py-2 px-4 border-b">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-2 px-4 border-b">
                      {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.country} - {order.shippingAddress.postalCode}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => alert(`View details for Order ID: ${order._id}`)}
                        className="bg-blue-500 text-white py-1 px-2 rounded-lg hover:bg-blue-600"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserOrdersPage;
