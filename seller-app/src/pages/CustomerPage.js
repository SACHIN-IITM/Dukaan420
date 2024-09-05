import React from 'react';
import CustomerList from '../components/Customer/CustomerList';

const CustomerPage = () => {
  // Example data
  const customers = [
    { id: 1, name: 'Customer 1', email: 'customer1@example.com' },
    // Add more customers here
  ];

  return (
    <div className="p-4">
      <CustomerList customers={customers} />
    </div>
  );
};

export default CustomerPage;
