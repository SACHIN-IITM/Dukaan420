const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Registration and Login Routes
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

// Profile Route with Authentication Protection
router.get('/profile', authController.protect, authController.getUserProfile);
router.put('/profile', authController.protect, authController.updateUserProfile); // Add route for updating user profile
router.delete('/profile', authController.protect, authController.deleteUserProfile); // Add route for deleting user profile

module.exports = router;
