const express = require('express');
const router = express.Router();
const {
  registerSeller,
  loginSeller,
  getProfile,
  updateProfile,
  deleteProfile,
  getAllSellers,
  updateSeller,
  deleteSeller
} = require('../controllers/sellerController');

// Register a new seller
router.post('/register', registerSeller);

// Login a seller
router.post('/login', loginSeller);

// Fetch seller profile
router.get('/profile', getProfile);

// Update seller profile
router.put('/profile', updateProfile);

// Delete seller profile
router.delete('/profile', deleteProfile);

// Fetch all sellers (Admin only)
router.get('/sellers', getAllSellers);

// Update other sellers (Admin only)
router.put('/seller/:id', updateSeller);

// Delete other sellers (Admin only)
router.delete('/seller/:id', deleteSeller);

module.exports = router;
