const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Product = require('../models/productModel');

// Helper function to get user from token
const getUserFromToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return await User.findById(decoded.id).select('-password'); // Exclude password from user data
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};

// Add product to wishlist
router.post('/', async (req, res) => {
  try {
    const { productId } = req.body;  // Only productId from request body

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    // Extract token from header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Get user from token
    const user = await getUserFromToken(token);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: 'Product already in wishlist' });
    }

    user.wishlist.push(productId);
    await user.save();

    res.status(201).json({ message: 'Product added to wishlist', wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ message: 'Error adding product to wishlist', error: err.message });
  }
});

// Get wishlist
router.get('/', async (req, res) => {
  try {
    // Extract token from header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Get user from token
    const user = await getUserFromToken(token);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const populatedUser = await User.findById(user._id).populate('wishlist', 'name price description');
    console.log(populatedUser.wishlist);

    res.status(200).json({ wishlist: populatedUser.wishlist });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching wishlist', error: err.message });
  }
});

// Delete product from wishlist
router.delete('/:productId', async (req, res) => {
  try {
    const { productId } = req.params;

    // Extract token from header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Get user from token
    const user = await getUserFromToken(token);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const productIndex = user.wishlist.indexOf(productId);

    if (productIndex === -1) {
      return res.status(404).json({ message: 'Product not found in wishlist' });
    }

    user.wishlist.splice(productIndex, 1);
    await user.save();

    res.status(200).json({ message: 'Product removed from wishlist', wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ message: 'Error removing product from wishlist', error: err.message });
  }
});

module.exports = router;
