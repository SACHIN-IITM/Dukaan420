const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser
} = require('../controllers/userController');

// Register User
router.post('/register', registerUser);

// Login User
router.post('/login', loginUser);

// Get User Profile
router.get('/profile/:id', getUserProfile);

// Update User Profile
router.put('/profile/:id', updateUserProfile);

// Delete User
router.delete('/profile/:id', deleteUser);

module.exports = router;
