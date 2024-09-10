// src/pages/CategoryManagement.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('/api/categories');
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  const handleAdd = async () => {
    try {
      const { data } = await axios.post('/api/categories', { name, description });
      setCategories([...categories, data]);
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error adding category', error);
    }
  };

  const handleEdit = async () => {
    try {
      const { data } = await axios.put(`/api/categories/${editingId}`, { name, description });
      setCategories(categories.map(cat => (cat._id === editingId ? data : cat)));
      setName('');
      setDescription('');
      setEditingId(null);
    } catch (error) {
      console.error('Error editing category', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/categories/${id}`);
      setCategories(categories.filter(cat => cat._id !== id));
    } catch (error) {
      console.error('Error deleting category', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>
      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={editingId ? 'Edit category name' : 'New category name'}
          className="p-2 border rounded"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={editingId ? 'Edit category description' : 'New category description'}
          className="ml-2 p-2 border rounded"
        />
        <button
          onClick={editingId ? handleEdit : handleAdd}
          className="ml-2 bg-blue-500 text-white p-2 rounded"
        >
          {editingId ? 'Update' : 'Add'}
        </button>
      </div>
      <ul>
        {categories.map(category => (
          <li key={category._id} className="flex justify-between items-center mb-2">
            <span>{category.name}</span>
            <span className="ml-4 text-gray-600">{category.description}</span>
            <div>
              <button
                onClick={() => {
                  setName(category.name);
                  setDescription(category.description);
                  setEditingId(category._id);
                }}
                className="bg-yellow-500 text-white p-1 rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(category._id)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManagement;
