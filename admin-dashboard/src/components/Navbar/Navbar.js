import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-accent p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Admin Dashboard</h1>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="text-white hover:text-blue-200 transition-colors duration-300"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/categories"
              className="text-white hover:text-blue-200 transition-colors duration-300"
            >
              Categories
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="text-white hover:text-blue-200 transition-colors duration-300"
            >
              Customers
            </Link>
          </li>
          <li>
            <Link
              to="/sellers"
              className="text-white hover:text-blue-200 transition-colors duration-300"
            >
              Sellers
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="text-white hover:text-blue-200 transition-colors duration-300"
            >
              Orders
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
