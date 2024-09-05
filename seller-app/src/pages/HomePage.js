import React from 'react';
import Analytics from '../components/Dashboard/Analytics';
import OrderTable from '../components/Dashboard/OrderTable';

const HomePage = () => {
  // Example data
  const analyticsData = { revenue: 5000, orders: 120, avgOrderValue: 41.67 };
  const orders = [
    { id: 1, orderId: 'ORD123', item: 'Item 1', price: 50, status: 'Completed' },
    // Add more orders here
  ];

  return (
    <div className="p-4">
      <Analytics {...analyticsData} />
      <OrderTable orders={orders} />
    </div>
  );
};

export default HomePage;
