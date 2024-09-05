import React from 'react';
import CustomerDetail from '../components/Customer/CustomerDetails';

const CustomerDetailPage = ({ customerId }) => {
  // Example data
  const customer = { id: 1, name: 'Customer 1', email: 'customer1@example.com', phone: '123-456-7890', address: '123 Street' };

  return (
    <div className="p-4">
      <CustomerDetail customer={customer} />
    </div>
  );
};

export default CustomerDetailPage;
