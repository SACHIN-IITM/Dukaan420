// components/Dashboard/OrderTable.jsx
import React from 'react';

const OrderTable = ({ orders }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border-b px-4 py-2 text-left">Order ID</th>
            <th className="border-b px-4 py-2 text-left">Item</th>
            <th className="border-b px-4 py-2 text-left">Price</th>
            <th className="border-b px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border-b px-4 py-2">{order.orderId}</td>
              <td className="border-b px-4 py-2">{order.item}</td>
              <td className="border-b px-4 py-2">${order.price}</td>
              <td className="border-b px-4 py-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
