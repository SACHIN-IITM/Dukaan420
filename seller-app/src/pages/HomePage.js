// pages/HomePage.jsx
import React from 'react';
import Analytics from '../components/Dashboard/Analytics';
import OrderTable from '../components/Dashboard/OrderTable';

const HomePage = () => {
  // Example data
  const analyticsData = { revenue: 5000, orders: 120, avgOrderValue: 41.67 };
  const orders = [
    { id: 1, orderId: 'ORD123', item: 'Item 1', price: 50, status: 'Completed' },
    { id: 2, orderId: 'ORD124', item: 'Item 2', price: 75, status: 'Pending' },
    { id: 3, orderId: 'ORD125', item: 'Item 3', price: 30, status: 'Completed' },
    // Add more orders here
  ];

  return (
    <div className="p-4 mt-4 bg-gray-100 min-h-screen">
      <div className="container mx-auto">
        <Analytics {...analyticsData} />
        <OrderTable orders={orders} />
      </div>
    </div>
  );
};

export default HomePage;
