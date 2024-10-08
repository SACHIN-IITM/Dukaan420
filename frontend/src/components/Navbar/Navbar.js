import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../utils/api'; 
import { UserCircleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          setIsLoggedIn(true);
          const { data } = await getUserProfile();
          setUser(data.user);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking user status:', error);
        setIsLoggedIn(false);
      }
    };

    checkUserStatus();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
    navigate('/');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-accent text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Dukaan420</Link>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link to="/" className="hover:text-gray-400">Home</Link>
              <Link to="/wishlist" className="hover:text-gray-400">Wishlist</Link>
              <Link to="/orders" className="hover:text-gray-400">Orders</Link>
              
              <div className="relative inline-block text-left">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center focus:outline-none"
                >
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="User Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircleIcon className="w-8 h-8 text-gray-300" />
                  )}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                    <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100">Profile</Link>
                    <button
                      onClick={handleSignOut}
                      className="block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-400">Login</Link>
              <Link to="/register" className="hover:text-gray-400">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
