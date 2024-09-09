import React, { useState } from 'react';
import axios from 'axios';

const SellerRegister = () => {
  const [formData, setFormData] = useState({
    sellerName: '',
    sellerPhone: '',
    sellerEmail: '',
    sellerPassword: '',
    sellerAddress: {
      address: '',
      city: '',
      postalCode: '',
      country: '',
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [key, nestedKey] = name.split('.'); // Split the name into key and nestedKey

    if (nestedKey) {
      setFormData((prevData) => ({
        ...prevData,
        [key]: {
          ...prevData[key],
          [nestedKey]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/sellers/register', formData);
      alert('Registration successful!');
      window.location.href = '/seller-login'; // Redirect to login page after successful registration
    } catch (error) {
      console.error('Error registering seller:', error);
      alert('Registration failed!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">Seller Registration</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Name */}
            <div className="col-span-1">
              <label htmlFor="sellerName" className="block text-gray-600 mb-2">Name</label>
              <input
                type="text"
                id="sellerName"
                name="sellerName"
                value={formData.sellerName}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            {/* Phone */}
            <div className="col-span-1">
              <label htmlFor="sellerPhone" className="block text-gray-600 mb-2">Phone</label>
              <input
                type="text"
                id="sellerPhone"
                name="sellerPhone"
                value={formData.sellerPhone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            {/* Email */}
            <div className="col-span-1">
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
            {/* Password */}
            <div className="col-span-1">
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
            {/* Address */}
            <div className="col-span-1 md:col-span-2">
              <label htmlFor="sellerAddress.address" className="block text-gray-600 mb-2">Address</label>
              <input
                type="text"
                id="sellerAddress.address"
                name="sellerAddress.address"
                value={formData.sellerAddress.address}
                onChange={handleChange}
                placeholder="Enter your address"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            {/* City */}
            <div className="col-span-1">
              <label htmlFor="sellerAddress.city" className="block text-gray-600 mb-2">City</label>
              <input
                type="text"
                id="sellerAddress.city"
                name="sellerAddress.city"
                value={formData.sellerAddress.city}
                onChange={handleChange}
                placeholder="Enter your city"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            {/* Postal Code */}
            <div className="col-span-1">
              <label htmlFor="sellerAddress.postalCode" className="block text-gray-600 mb-2">Postal Code</label>
              <input
                type="text"
                id="sellerAddress.postalCode"
                name="sellerAddress.postalCode"
                value={formData.sellerAddress.postalCode}
                onChange={handleChange}
                placeholder="Enter your postal code"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            {/* Country */}
            <div className="col-span-1">
              <label htmlFor="sellerAddress.country" className="block text-gray-600 mb-2">Country</label>
              <input
                type="text"
                id="sellerAddress.country"
                name="sellerAddress.country"
                value={formData.sellerAddress.country}
                onChange={handleChange}
                placeholder="Enter your country"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mt-6"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellerRegister;
