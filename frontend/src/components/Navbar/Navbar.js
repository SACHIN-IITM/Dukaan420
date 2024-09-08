import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-accent text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Dukaan420</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          
          <Link to="/wishlist" className="hover:text-gray-400">Wishlist</Link>
          <Link to="/orders" className="hover:text-gray-400">Orders</Link>
          <Link to="/login" className="hover:text-gray-400">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
