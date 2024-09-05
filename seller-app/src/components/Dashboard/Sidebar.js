import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="bg-gray-200 w-64 min-h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Dashboard</h2>
      <ul>
        <li><Link to="/dashboard" className="block py-2 px-4 hover:bg-gray-300">Dashboard</Link></li>
        <li><Link to="/dashboard/products" className="block py-2 px-4 hover:bg-gray-300">Products</Link></li>
        <li><Link to="/dashboard/orders" className="block py-2 px-4 hover:bg-gray-300">Orders</Link></li>
        <li><Link to="/dashboard/analytics" className="block py-2 px-4 hover:bg-gray-300">Analytics</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
