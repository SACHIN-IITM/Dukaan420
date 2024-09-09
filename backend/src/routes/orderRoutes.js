// orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const Seller = require('../models/sellerModel');
const findUserByEmail = require('../middleware/findUserByEmail');

// Create Order
router.post('/', findUserByEmail, async (req, res) => {
  const { orderItems, totalAmount, shippingAddress, sellerId } = req.body; // Assume sellerId is provided
  const user = req.user; // User is populated by middleware

  console.log('Request body:', req.body); // Log the request body for debugging

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'Order items are required.' });
  }

  try {
    // Validate sellerId and find the seller
    if (sellerId) {
      const seller = await Seller.findById(sellerId);
      if (!seller) {
        return res.status(400).json({ message: `Seller with ID ${sellerId} not found` });
      }
    }

    // Validate each order item
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({ message: `Product with ID ${item.product} not found` });
      }
    }

    // Create new order
    const order = new Order({
      orderItems,
      totalAmount,
      shippingAddress,
      user: user._id,  // Use the user's ID from the middleware
      userEmail: user.email, // Ensure the user email is correct
      userName: user.name,   // Ensure the user name is correct
      seller: sellerId       // Reference the seller ID
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error); // Log the full error stack
    res.status(500).json({ message: 'Server error. Unable to create order.', error: error.message });
  }
});

module.exports = router;
