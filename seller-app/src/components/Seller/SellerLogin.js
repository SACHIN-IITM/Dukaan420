import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation

const SellerLogin = () => {
  const [formData, setFormData] = useState({
    sellerEmail: '',
    sellerPassword: '',
  });
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://dukaan420.onrender.com/api/sellers/login', formData);
      const { token } = response.data;
      localStorage.setItem('sellerToken', token); // Store token in localStorage
      alert('Login successful!');
      navigate('/'); // Redirect to dashboard or profile page
    } catch (error) {
      console.error('Error logging in seller:', error);
      alert('Login failed!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Seller Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="sellerEmail" className="block text-gray-600 mb-2">Email</label>
            <input
              type="email"
              id="sellerEmail"
              name="sellerEmail"
              value={formData.sellerEmail}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="sellerPassword" className="block text-gray-600 mb-2">Password</label>
            <input
              type="password"
              id="sellerPassword"
              name="sellerPassword"
              value={formData.sellerPassword}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerLogin;
