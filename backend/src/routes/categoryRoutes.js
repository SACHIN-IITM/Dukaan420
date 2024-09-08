const express = require('express');
const router = express.Router();
const Category = require('../models/categoryModel');

// Add new category
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validate input
    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }
    if (name.length < 3) {
      return res.status(400).json({ message: 'Name must be at least 3 characters long' });
    }
    if (description.length < 5) {
      return res.status(400).json({ message: 'Description must be at least 5 characters long' });
    }

    const category = new Category({ name, description });
    await category.save();
    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Edit a category
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) return res.status(404).json({ message: 'Category not found' });

    res.status(200).json({ message: 'Category updated successfully', updatedCategory });
  } catch (error) {
    res.status(400).json({ message: 'Error updating category', error: error.message });
  }
});

// Delete a category
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) return res.status(404).json({ message: 'Category not found' });

    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error: error.message });
  }
});

module.exports = router;
