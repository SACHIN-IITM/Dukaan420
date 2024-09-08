// orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const User = require('../models/userModel'); // Ensure this model exists

// Create Order
router.post('/', async (req, res) => {
  const { orderItems, totalAmount, shippingAddress, user } = req.body; // Include user field

  try {
    // Validate order items
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({ message: 'Product not found' });
      }
    }

    // Verify the user if provided
    if (user) {
      const userExists = await User.findById(user);
      if (!userExists) {
        return res.status(400).json({ message: 'User not found' });
      }
    }

    // Create new order
    const order = new Order({
      orderItems,
      totalAmount,
      shippingAddress,
      user, // Include user if provided
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Fetch all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('orderItems.product').populate('user');
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Fetch a specific order by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findById(id).populate('orderItems.product').populate('user');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

module.exports = router;
