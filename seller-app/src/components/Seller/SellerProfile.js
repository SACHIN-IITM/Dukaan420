import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SellerProfile = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const token = localStorage.getItem('sellerToken');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('https://dukaan420.onrender.com/api/sellers/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { name, email, phone, address, city, postalCode, country } = response.data;
        setProfile({ name, email, phone, address, city, postalCode, country });
      } catch (error) {
        console.error('Error fetching seller data:', error);
      }
    };

    if (token) {
      fetchProfileData();
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('https://dukaan420.onrender.com/api/sellers/profile', profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating seller profile:', error);
      alert('Profile update failed!');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      try {
        await axios.delete('https://dukaan420.onrender.com/api/sellers/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert('Profile deleted successfully!');
        // Optionally, redirect the user to another page or log them out
        window.location.href = '/login'; // Redirect to login page or homepage
      } catch (error) {
        console.error('Error deleting seller profile:', error);
        alert('Profile deletion failed!');
      }
    }
  };

  return (
    <div className="max-w-4xl mt-10 mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Seller Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-700">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={profile.address}
                onChange={handleChange}
                placeholder="Enter your address"
                required
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-gray-700">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={profile.city}
                onChange={handleChange}
                placeholder="Enter your city"
                required
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="postalCode" className="block text-gray-700">Postal Code</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={profile.postalCode}
                onChange={handleChange}
                placeholder="Enter your postal code"
                required
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="country" className="block text-gray-700">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={profile.country}
                onChange={handleChange}
                placeholder="Enter your country"
                required
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Update Profile
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="space-y-4">
            <p className="text-lg"><strong>Name:</strong> {profile.name || 'N/A'}</p>
            <p className="text-lg"><strong>Phone:</strong> {profile.phone || 'N/A'}</p>
            <p className="text-lg"><strong>Email:</strong> {profile.email || 'N/A'}</p>
            <p className="text-lg"><strong>Address:</strong> {profile.address || 'N/A'}</p>
            <p className="text-lg"><strong>City:</strong> {profile.city || 'N/A'}</p>
            <p className="text-lg"><strong>Postal Code:</strong> {profile.postalCode || 'N/A'}</p>
            <p className="text-lg"><strong>Country:</strong> {profile.country || 'N/A'}</p>
          </div>
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Edit Profile
            </button>
            <button
              onClick={handleDelete}
              className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Delete Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProfile;
