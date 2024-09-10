import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingCategory, setEditingCategory] = useState({ name: '', description: '' });

  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  // Add new category
  const handleAddCategory = async () => {
    try {
      await axios.post('http://localhost:5000/api/categories', newCategory);
      fetchCategories(); // Refresh list after adding
      setNewCategory({ name: '', description: '' });
    } catch (error) {
      console.error('Error adding category', error);
    }
  };

  // Delete category
  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      fetchCategories(); // Refresh list after deleting
    } catch (error) {
      console.error('Error deleting category', error);
    }
  };

  // Begin editing category
  const startEditingCategory = (category) => {
    setEditingCategoryId(category._id);
    setEditingCategory({ name: category.name, description: category.description });
  };

  // Save edited category
  const handleSaveEditCategory = async () => {
    try {
      await axios.put(`http://localhost:5000/api/categories/${editingCategoryId}`, editingCategory);
      fetchCategories(); // Refresh list
      setEditingCategoryId(null); // Exit edit mode
    } catch (error) {
      console.error('Error editing category', error);
    }
  };

  // Cancel editing mode
  const handleCancelEdit = () => {
    setEditingCategoryId(null); // Exit edit mode
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 lg:px-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Manage Categories</h1>

        {/* Add New Category Section */}
        <div className="bg-white shadow-lg rounded-lg p-4 mb-8 max-w-lg mx-auto">
          <h2 className="text-xl font-medium text-gray-700 mb-3">Add New Category</h2>
          <input
            type="text"
            placeholder="Category Name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            className="block w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <input
            type="text"
            placeholder="Category Description"
            value={newCategory.description}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            className="block w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            onClick={handleAddCategory}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold text-sm transition duration-300 ease-in-out"
          >
            Add Category
          </button>
        </div>

        {/* Existing Categories List */}
        <div className="bg-white shadow-lg rounded-lg p-4 max-w-2xl mx-auto">
          <h2 className="text-xl font-medium text-gray-700 mb-4">Existing Categories</h2>
          <ul className="space-y-4">
            {categories.map((category) => (
              <li key={category._id} className="border-b last:border-none pb-4">
                {editingCategoryId === category._id ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editingCategory.name}
                      onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                      className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    />
                    <input
                      type="text"
                      value={editingCategory.description}
                      onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                      className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                    />
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={handleSaveEditCategory}
                        className="px-4 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium text-sm transition duration-300 ease-in-out"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded-md font-medium text-sm transition duration-300 ease-in-out"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{category.name}</h3>
                      <p className="text-gray-600 text-sm">{category.description}</p>
                    </div>
                    <div className="space-x-3">
                      <button
                        onClick={() => startEditingCategory(category)}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium text-sm transition duration-300 ease-in-out"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category._id)}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium text-sm transition duration-300 ease-in-out"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Categories;
