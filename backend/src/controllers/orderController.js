const jwt = require('jsonwebtoken');
const Order = require('../models/orderModel');

exports.createOrder = async (req, res) => {
  try {
    // Check for the token in the headers
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Destructure the order data from the request body
    const { orderItems, totalAmount, shippingAddress, userEmail, userName } = req.body;

    // Check if the order items are provided
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items provided' });
    }

    // Create a new order with the user ID from the token
    const order = new Order({
      user: decoded.id,          // Use the user ID from the decoded token
      userEmail: userEmail || decoded.email, // Store the user's email, fallback to decoded token if not provided
      userName: userName || decoded.name,   // Store the user's name, fallback to decoded token if not provided
      orderItems,
      totalAmount,
      shippingAddress,
    });

    // Save the order to the database
    const createdOrder = await order.save();

    // Respond with the created order
    res.status(201).json(createdOrder);
  } catch (error) {
    // Log the full error stack
    console.error('Error creating order:', error);

    // Send a more detailed error message to the client
    res.status(500).json({
      message: 'Server error. Unable to create order.',
      error: error.message // Send the error message for debugging
    });
  }
};
