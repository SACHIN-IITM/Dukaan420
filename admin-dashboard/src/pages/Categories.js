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

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/categories'); // Adjust API URL
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  // Add a new category
  const handleAddCategory = async () => {
    try {
      await axios.post('http://localhost:5000/api/categories', newCategory); // Adjust API URL
      fetchCategories(); // Refresh the category list
      setNewCategory({ name: '', description: '' }); // Reset form
    } catch (error) {
      console.error('Error adding category', error);
    }
  };

  // Delete a category
  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`); // Adjust API URL
      fetchCategories(); // Refresh category list
    } catch (error) {
      console.error('Error deleting category', error);
    }
  };

  // Edit a category (start editing)
  const startEditingCategory = (category) => {
    setEditingCategoryId(category._id);
    setEditingCategory({ name: category.name, description: category.description });
  };

  // Save edited category
  const handleSaveEditCategory = async () => {
    try {
      await axios.put(`http://localhost:5000/api/categories/${editingCategoryId}`, editingCategory); // Adjust API URL
      fetchCategories(); // Refresh the list
      setEditingCategoryId(null); // Exit edit mode
      setEditingCategory({ name: '', description: '' }); // Reset edit form
    } catch (error) {
      console.error('Error editing category', error);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingCategoryId(null); // Exit edit mode
    setEditingCategory({ name: '', description: '' }); // Reset edit form
  };

  return (
    <div>
      <h1>Categories</h1>

      {/* Form to add a new category */}
      <div className="category-form">
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category Description"
          value={newCategory.description}
          onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>

      {/* List of existing categories */}
      <div className="category-list">
        <h2>Existing Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category._id}>
              {/* Editing mode for category */}
              {editingCategoryId === category._id ? (
                <div>
                  <input
                    type="text"
                    value={editingCategory.name}
                    onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                  />
                  <input
                    type="text"
                    value={editingCategory.description}
                    onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  />
                  <button onClick={handleSaveEditCategory}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                <div>
                  <span>{category.name}</span> - <span>{category.description}</span>
                  <button onClick={() => startEditingCategory(category)}>Edit</button>
                  <button onClick={() => handleDeleteCategory(category._id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
