import React from 'react';

const CustomerDetail = ({ customer }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-black mb-4">{customer.name}</h2>
      <p className="text-lg font-semibold text-black">Email: {customer.email}</p>
      <p className="text-gray-600">Phone: {customer.phone}</p>
      <p className="text-gray-600">Address: {customer.address}</p>
    </div>
  );
};

export default CustomerDetail;
