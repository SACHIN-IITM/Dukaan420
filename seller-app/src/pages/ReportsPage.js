import React from 'react';

const ReportsPage = () => {
  return (
    <div className="p-4">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-4">
        <h2 className="text-xl font-semibold text-black">Reports</h2>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Sales Report</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">Customer Report</button>
        </div>
      </div>
      {/* Add content for reports */}
    </div>
  );
};

export default ReportsPage;
