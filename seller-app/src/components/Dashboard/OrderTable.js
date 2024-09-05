import React from 'react';
import { Link } from 'react-router-dom';

const OrderTable = ({ orders }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-black mb-4">Order Details</h2>
      <table className="w-full bg-white border rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">Item</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="p-2 border">{order.id}</td>
              <td className="p-2 border">{order.orderId}</td>
              <td className="p-2 border">{order.item}</td>
              <td className="p-2 border">${order.price}</td>
              <td className="p-2 border">{order.status}</td>
              <td className="p-2 border">
                <Link to={`/order/${order.id}`} className="text-blue-500">View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
