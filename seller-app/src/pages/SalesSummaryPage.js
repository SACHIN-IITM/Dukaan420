import React from 'react';

const SalesSummaryPage = () => {
  // Example data
  const summary = { totalEarnings: 5000, pendingPayouts: 200 };

  return (
    <div className="p-4">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-semibold text-black">Sales and Earnings Summary</h2>
        <p className="text-lg font-semibold text-black">Total Earnings: ${summary.totalEarnings}</p>
        <p className="text-lg font-semibold text-black">Pending Payouts: ${summary.pendingPayouts}</p>
      </div>
      {/* Transactions Table */}
    </div>
  );
};

export default SalesSummaryPage;
