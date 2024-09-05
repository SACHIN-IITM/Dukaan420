import React, { useState } from 'react';

const ProfilePage = () => {
  // Example data
  const [profile, setProfile] = useState({ name: 'Seller Name', email: 'seller@example.com' });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update profile API call
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-black mb-4">Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
