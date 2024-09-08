const jwt = require('jsonwebtoken');
const Order = require('../models/orderModel');

exports.createOrder = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extract token from headers
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode the token to get user ID

    const { orderItems, totalAmount, shippingAddress } = req.body;

    const order = new Order({
      user: decoded.id, // Use the decoded user ID from the token
      orderItems,
      totalAmount,
      shippingAddress,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
