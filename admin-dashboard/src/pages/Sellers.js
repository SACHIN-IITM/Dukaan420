import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Sellers = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentSeller, setCurrentSeller] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });

  // Fetch sellers from the server
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/sellers/sellers');
        setSellers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching sellers:', err);
        setError('Failed to load sellers.');
        setLoading(false);
      }
    };

    fetchSellers();
  }, []);

  // Handle delete operation
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/sellers/seller/${id}`);
      setSellers(sellers.filter((seller) => seller._id !== id));
    } catch (err) {
      console.error('Error deleting seller:', err);
      setError('Failed to delete seller.');
    }
  };

  // Handle edit button click and populate the form
  const handleEdit = (seller) => {
    setCurrentSeller(seller);
    setFormData({
      name: seller.name,
      email: seller.email,
      phone: seller.phone,
      address: seller.address?.address || '',
      city: seller.address?.city || '',
      postalCode: seller.address?.postalCode || '',
      country: seller.address?.country || ''
    });
    setShowEditModal(true);
  };

  // Handle form data changes
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission to update the seller
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/sellers/seller/${currentSeller._id}`, formData);
      setSellers(
        sellers.map((seller) =>
          seller._id === currentSeller._id ? { ...seller, ...formData, address: { ...formData } } : seller
        )
      );
      setShowEditModal(false);
    } catch (err) {
      console.error('Error updating seller:', err);
      setError('Failed to update seller.');
    }
  };

  if (loading) {
    return <div className="text-center text-lg text-gray-600 mt-6">Loading sellers...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-6">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Sellers</h1>
      {sellers.length === 0 ? (
        <p className="text-center text-gray-500">No sellers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Phone</th>
                <th className="py-3 px-6 text-left">Address</th>
                <th className="py-3 px-6 text-left">City</th>
                <th className="py-3 px-6 text-left">Postal Code</th>
                <th className="py-3 px-6 text-left">Country</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller) => (
                <tr key={seller._id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-6">{seller.name}</td>
                  <td className="py-3 px-6">{seller.email}</td>
                  <td className="py-3 px-6">{seller.phone}</td>
                  <td className="py-3 px-6">{seller.address?.address}</td>
                  <td className="py-3 px-6">{seller.address?.city}</td>
                  <td className="py-3 px-6">{seller.address?.postalCode}</td>
                  <td className="py-3 px-6">{seller.address?.country}</td>
                  <td className="py-3 px-6 text-right">
                    <button
                      onClick={() => handleEdit(seller)}
                      className="bg-accent hover:bg-green-800 text-white font-bold py-2 px-4 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(seller._id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Seller</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-accent text-white px-4 py-2 rounded-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sellers;
