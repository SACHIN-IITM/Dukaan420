import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserProfile, deleteUserProfile } from '../utils/api';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const { data } = await axios.get('http://localhost:5000/api/auth/profile', {
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
      window.location.href = '/login';
    } catch (error) {
      setError('Failed to delete profile');
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h2 className="text-3xl font-bold mb-6">User Profile</h2>
      {error && <div className="mb-4 text-red-500">{error}</div>}
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
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm"
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
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm"
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
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm"
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
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm"
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
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm"
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
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm"
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
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm"
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
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm"
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
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm"
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
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm"
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
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm"
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
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm"
              />
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
            >
              Delete Account
            </button>
          </div>
        </div>
      ) : (
        <div>
          {user ? (
            <>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Address:</strong> {user.street}, {user.city}, {user.state}, {user.country}, {user.pin}</p>
              <p><strong>College:</strong> {user.college}</p>
              <p><strong>Year:</strong> {user.year}</p>
              <p><strong>Branch:</strong> {user.branch}</p>
              <p><strong>Date of Birth:</strong> {user.dob}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mt-4"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
