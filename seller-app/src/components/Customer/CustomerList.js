import React from 'react';
import { Link } from 'react-router-dom';

const CustomerList = ({ customers }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-black mb-4">Customers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {customers.map((customer) => (
          <div key={customer.id} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-black">{customer.name}</h3>
            <p className="text-gray-600">Email: {customer.email}</p>
            <Link to={`/customer/${customer.id}`} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerList;
