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
  const [isEditing, setIsEditing] = useState(false); // To toggle between view and edit modes
  const token = localStorage.getItem('sellerToken');

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sellers/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { name, email, phone, address, city, postalCode, country } = response.data;
        setProfile({
          name,
          email,
          phone,
          address,
          city,
          postalCode,
          country
        });
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
      await axios.put('http://localhost:5000/api/sellers/profile', {
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        city: profile.city,
        postalCode: profile.postalCode,
        country: profile.country
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Profile updated successfully!');
      setIsEditing(false); // Exit edit mode on success
    } catch (error) {
      console.error('Error updating seller profile:', error);
      alert('Profile update failed!');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-black mb-4">Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
            placeholder="Address"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            name="city"
            value={profile.city}
            onChange={handleChange}
            placeholder="City"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            name="postalCode"
            value={profile.postalCode}
            onChange={handleChange}
            placeholder="Postal Code"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            name="country"
            value={profile.country}
            onChange={handleChange}
            placeholder="Country"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Update Profile
          </button>
          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p><strong>Name:</strong> {profile.name || 'N/A'}</p>
          <p><strong>Phone:</strong> {profile.phone || 'N/A'}</p>
          <p><strong>Email:</strong> {profile.email || 'N/A'}</p>
          <p><strong>Address:</strong> {profile.address || 'N/A'}</p>
          <p><strong>City:</strong> {profile.city || 'N/A'}</p>
          <p><strong>Postal Code:</strong> {profile.postalCode || 'N/A'}</p>
          <p><strong>Country:</strong> {profile.country || 'N/A'}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default SellerProfile;
