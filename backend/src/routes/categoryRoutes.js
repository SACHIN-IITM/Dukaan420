const express = require('express');
const router = express.Router();
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

// Route to add a new category
router.post('/', createCategory);

// Route to get all categories
router.get('/', getCategories);

// Route to update a category by ID
router.put('/:id', updateCategory);

// Route to delete a category by ID
router.delete('/:id', deleteCategory);

module.exports = router;
