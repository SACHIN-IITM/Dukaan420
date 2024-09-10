import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrder, getUserProfile } from '../utils/api';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const UserOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  // eslint-disable-next-line
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchUserAndOrders = async () => {
      try {
        const { data: userData } = await getUserProfile();
        console.log(userData.data.user._id);

        if (userData && userData.data && userData.data.user) {
          const userInfo = userData.data.user;
          setUser(userInfo);

          const ordersData = await getOrder(userInfo._id);
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

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <div className="mb-4">
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
            >
              Go Back
            </button>
          </div>
          <h1 className="text-3xl font-bold mb-4">My Orders</h1>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-left">Order ID</th>
                  <th className="py-2 px-4 border-b text-left">Total Amount</th>
                  <th className="py-2 px-4 border-b text-left">Date</th>
                  <th className="py-2 px-4 border-b text-left">Shipping Address</th>
                  <th className="py-2 px-4 border-b text-left">Actions</th>
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
