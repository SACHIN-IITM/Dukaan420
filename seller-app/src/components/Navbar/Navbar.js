import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext'; 

const Navbar = () => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext); // Use AuthContext
  const navigate = useNavigate();

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    try {
      // Simple logout logic
      console.log('Attempting to logout...');
      localStorage.removeItem('sellerToken'); // Ensure this key is correct
      setIsAuthenticated(false);
      console.log('Logout successful, redirecting...');
      navigate('/seller-login'); // Ensure this route is correct
    } catch (error) {
      console.error('Error during logout:', error);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <nav className="bg-[#208468] p-4 fixed top-0 w-full z-10">
      <div className="container flex justify-between items-center">
        <div className="flex items-center">
          <button onClick={toggleSidebar} className="text-white mr-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <Link to="/" className="text-white text-2xl font-bold">
            Dukaan420
          </Link>
        </div>
        <div className="flex items-center">
          <div className="relative">
            <button
              onClick={toggleProfileDropdown}
              className="text-white hover:text-gray-300 flex items-center"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm0 2a3 3 0 100 6 3 3 0 000-6z"
                ></path>
              </svg>
              <span className="ml-1">Profile</span>
            </button>
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/seller-login"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Login
                    </Link>
                    <Link
                      to="/seller-register"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {sidebarOpen && (
        <div className="fixed inset-0 flex z-40">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={toggleSidebar}
          ></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#208468]">
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:bg-gray-600"
                onClick={toggleSidebar}
              >
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <nav className="mt-5 px-2 space-y-1">
                <Link
                  to="/"
                  onClick={closeSidebar}
                  className="block py-2 text-white hover:bg-[#1b6b56] rounded"
                >
                  Analytics
                </Link>
                <Link
                  to="/products"
                  onClick={closeSidebar}
                  className="block py-2 text-white hover:bg-[#1b6b56] rounded"
                >
                  Product Management
                </Link>
                {/* <Link
                  to="/customers"
                  onClick={closeSidebar}
                  className="block py-2 text-white hover:bg-[#1b6b56] rounded"
                >
                  Customer Management
                </Link>
                <Link
                  to="/sales-summary"
                  onClick={closeSidebar}
                  className="block py-2 text-white hover:bg-[#1b6b56] rounded"
                >
                  Sales and Earnings
                </Link>
                <Link
                  to="/reports"
                  onClick={closeSidebar}
                  className="block py-2 text-white hover:bg-[#1b6b56] rounded"
                >
                  Reports
                </Link> */}
                <Link
                  to="/profile"
                  onClick={closeSidebar}
                  className="block py-2 text-white hover:bg-[#1b6b56] rounded"
                >
                  Profile
                </Link>
                <Link
                  to="/seller-login"
                  onClick={closeSidebar}
                  className="block py-2 text-white hover:bg-[#1b6b56] rounded"
                >
                  Login
                </Link>
                <Link
                  to="/seller-register"
                  onClick={closeSidebar}
                  className="block py-2 text-white hover:bg-[#1b6b56] rounded"
                >
                  Register
                </Link>
              </nav>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
