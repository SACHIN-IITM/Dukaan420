import React from 'react';

const Analytics = ({ revenue, orders, avgOrderValue }) => {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-black">Total Revenue</h3>
        <p className="text-2xl font-bold text-black">${revenue}</p>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-black">Number of Orders</h3>
        <p className="text-2xl font-bold text-black">{orders}</p>
      </div>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-black">Average Order Value</h3>
        <p className="text-2xl font-bold text-black">${avgOrderValue}</p>
      </div>
    </div>
  );
};

export default Analytics;
