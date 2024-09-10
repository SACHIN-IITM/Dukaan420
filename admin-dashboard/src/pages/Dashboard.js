import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Analytics Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Analytics</h2>
          <div className="space-y-2">
            <p className="text-lg text-gray-600"><strong>Total Customers:</strong> 100</p>
            <p className="text-lg text-gray-600"><strong>Total Sellers:</strong> 50</p>
            <p className="text-lg text-gray-600"><strong>Total Orders:</strong> 300</p>
            <p className="text-lg text-gray-600"><strong>Total Revenue:</strong> Rs.50,000</p>
            <p className="text-lg text-gray-600"><strong>Average Order Value:</strong> Rs.167</p>
            <p className="text-lg text-gray-600"><strong>Active Promotions:</strong> 5</p>
            <p className="text-lg text-gray-600"><strong>Pending Deliveries:</strong> 20</p>
          </div>
        </div>

        {/* Order Growth with Dummy Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Order Growth</h2>
          {/* SVG Chart placeholder */}
          <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <rect width="100%" height="100%" fill="lightgray" />
              <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="gray" fontSize="8">
                Chart Placeholder
              </text>
            </svg>
          </div>
        </div>

        {/* Additional Analytics Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Sales Overview</h2>
          <div className="space-y-2">
            <p className="text-lg text-gray-600"><strong>Total Sales:</strong> Rs.75,000</p>
            <p className="text-lg text-gray-600"><strong>Products Sold:</strong> 500</p>
            <p className="text-lg text-gray-600"><strong>Sales Growth:</strong> 12%</p>
            <p className="text-lg text-gray-600"><strong>Returning Customers:</strong> 30%</p>
          </div>
        </div>

        {/* Additional Placeholder for Revenue Growth */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Revenue Growth</h2>
          {/* SVG Chart placeholder */}
          <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
              <rect width="100%" height="100%" fill="lightgray" />
              <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="gray" fontSize="8">
                Chart Placeholder
              </text>
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
