import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        {/* Menu Icon */}
        <button onClick={toggleSidebar} className="text-white lg:hidden">
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Sidebar */}
        <div className={`fixed inset-0 z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:hidden`}>
          <div className="bg-gray-900 text-white w-64 h-full p-4">
            {/* Close Sidebar Icon */}
            <button onClick={toggleSidebar} className="text-white mb-4">
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            <Link to="/dashboard" className="block py-2 hover:bg-gray-700 rounded">Analytics</Link>
            <Link to="/products" className="block py-2 hover:bg-gray-700 rounded">Product Management</Link>
            <Link to="/customers" className="block py-2 hover:bg-gray-700 rounded">Customer Management</Link>
            <Link to="/sales-summary" className="block py-2 hover:bg-gray-700 rounded">Sales and Earnings</Link>
            <Link to="/reports" className="block py-2 hover:bg-gray-700 rounded">Reports</Link>
          </div>

          {/* Overlay for closing sidebar by clicking outside */}
          <div className="fixed inset-0 bg-black opacity-50" onClick={toggleSidebar}></div>
        </div>

        {/* Links for larger screens */}
        <div className="hidden lg:flex space-x-4">
          <Link to="/dashboard" className="hover:text-gray-300">Analytics</Link>
          <Link to="/products" className="hover:text-gray-300">Product Management</Link>
          <Link to="/customers" className="hover:text-gray-300">Customer Management</Link>
          <Link to="/sales-summary" className="hover:text-gray-300">Sales and Earnings</Link>
          <Link to="/reports" className="hover:text-gray-300">Reports</Link>
        </div>
      </div>

      {/* User Icon and Dropdown */}
      <div className="relative">
        <button onClick={toggleDropdown} className="text-white">
          <UserCircleIcon className="h-8 w-8" aria-hidden="true" />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 rounded">Profile</Link>
            <Link to="/logout" className="block px-4 py-2 hover:bg-gray-100 rounded">Sign Out</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
