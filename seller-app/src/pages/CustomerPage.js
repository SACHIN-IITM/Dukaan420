// components/Customer/CustomerList.jsx
import React from 'react';

const CustomerList = ({ customers }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h1 className="text-2xl font-bold mb-4">Customer List</h1>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="border-b px-4 py-2 text-left">ID</th>
            <th className="border-b px-4 py-2 text-left">Name</th>
            <th className="border-b px-4 py-2 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="border-b px-4 py-2">{customer.id}</td>
              <td className="border-b px-4 py-2">{customer.name}</td>
              <td className="border-b px-4 py-2">{customer.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
