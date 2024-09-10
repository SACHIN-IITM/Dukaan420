import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const { data } = await axios.get('https://dukaan420.onrender.com/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data.data.user);
      setFormData(data.data.user);
    } catch (error) {
      setError('Failed to fetch user profile');
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(formData);
      setUser(formData);
      setIsEditing(false);
    } catch (error) {
      setError('Failed to update profile');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteUserProfile();
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      setError('Failed to delete profile');
    }
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
        >
          Go Back
        </button>
        <h2 className="text-4xl font-bold text-gray-800">User Profile</h2>
      </div>
      {error && <div className="mb-6 text-red-600 text-lg">{error}</div>}
      {isEditing ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street</label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street || ''}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your street"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city || ''}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your city"
              />
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state || ''}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your state"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country || ''}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your country"
              />
            </div>
            <div>
              <label htmlFor="pin" className="block text-sm font-medium text-gray-700">PIN Code</label>
              <input
                type="text"
                id="pin"
                name="pin"
                value={formData.pin || ''}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your PIN code"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="college" className="block text-sm font-medium text-gray-700">College</label>
              <input
                type="text"
                id="college"
                name="college"
                value={formData.college || ''}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your college"
              />
            </div>
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700">Year</label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year || ''}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your year"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="branch" className="block text-sm font-medium text-gray-700">Branch</label>
              <input
                type="text"
                id="branch"
                name="branch"
                value={formData.branch || ''}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your branch"
              />
            </div>
            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob?.slice(0, 10) || ''}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="mt-8 flex gap-4">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition duration-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <strong className="block text-sm font-medium text-gray-700">Name:</strong>
              <span className="text-lg text-gray-800">{user?.name}</span>
            </div>
            <div>
              <strong className="block text-sm font-medium text-gray-700">Email:</strong>
              <span className="text-lg text-gray-800">{user?.email}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <strong className="block text-sm font-medium text-gray-700">Phone:</strong>
              <span className="text-lg text-gray-800">{user?.phone}</span>
            </div>
            <div>
              <strong className="block text-sm font-medium text-gray-700">Street:</strong>
              <span className="text-lg text-gray-800">{user?.street}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <strong className="block text-sm font-medium text-gray-700">City:</strong>
              <span className="text-lg text-gray-800">{user?.city}</span>
            </div>
            <div>
              <strong className="block text-sm font-medium text-gray-700">State:</strong>
              <span className="text-lg text-gray-800">{user?.state}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <strong className="block text-sm font-medium text-gray-700">Country:</strong>
              <span className="text-lg text-gray-800">{user?.country}</span>
            </div>
            <div>
              <strong className="block text-sm font-medium text-gray-700">PIN Code:</strong>
              <span className="text-lg text-gray-800">{user?.pin}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <strong className="block text-sm font-medium text-gray-700">College:</strong>
              <span className="text-lg text-gray-800">{user?.college}</span>
            </div>
            <div>
              <strong className="block text-sm font-medium text-gray-700">Year:</strong>
              <span className="text-lg text-gray-800">{user?.year}</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <strong className="block text-sm font-medium text-gray-700">Branch:</strong>
              <span className="text-lg text-gray-800">{user?.branch}</span>
            </div>
            <div>
              <strong className="block text-sm font-medium text-gray-700">Date of Birth:</strong>
              <span className="text-lg text-gray-800">{user?.dob?.slice(0, 10)}</span>
            </div>
          </div>
          <div className="mt-8 flex gap-4">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Delete Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const updateUserProfile = async (formData) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  await axios.put('https://dukaan420.onrender.com/api/auth/profile', formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteUserProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  await axios.delete('https://dukaan420.onrender.com/api/auth/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default ProfilePage;
