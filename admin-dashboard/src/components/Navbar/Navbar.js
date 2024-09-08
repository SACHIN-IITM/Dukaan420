import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/categories">Categories</Link></li>
        <li><Link to="/customers">Customers</Link></li>
        <li><Link to="/sellers">Sellers</Link></li>
        <li><Link to="/orders">Orders</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
