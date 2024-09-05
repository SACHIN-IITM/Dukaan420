import React from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import Analytics from '../components/Dashboard/Analytics';


const DashboardPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <Analytics />
      </main>
    </div>
  );
};

export default DashboardPage;
