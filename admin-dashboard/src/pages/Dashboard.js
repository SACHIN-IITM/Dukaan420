import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div className="dashboard">
        <div className="stats">
          <h2>Analytics</h2>
          <p>Total Customers: 100</p>
          <p>Total Sellers: 50</p>
          <p>Total Orders: 300</p>
        </div>
        <div className="charts">
          <h2>Order Growth</h2>
          {/* Add Chart.js or other chart libraries here */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
