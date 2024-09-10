// controllers/orderController.js
const { v4: uuidv4 } = require('uuid');
const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const Seller = require('../models/sellerModel');

// Create Order
exports.createOrder = async (req, res) => {
  const { orderItems, totalAmount, shippingAddress, sellerId } = req.body;
  const user = req.user;

  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'Order items are required.' });
  }

  try {
    if (sellerId) {
      const seller = await Seller.findById(sellerId);
      if (!seller) {
        return res.status(400).json({ message: `Seller with ID ${sellerId} not found` });
      }
    }

    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(400).json({ message: `Product with ID ${item.product} not found` });
      }
    }

    const order = new Order({
      orderId: uuidv4(),  // Generate a unique orderId
      orderItems,
      totalAmount,
      shippingAddress,
      user: user._id,
      userEmail: user.email,
      userName: user.name,
      seller: sellerId
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error. Unable to create order.', error: error.message });
  }
};


// Fetch All Orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('orderItems.product').populate('seller');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error. Unable to fetch orders.', error: error.message });
  }
};

// Fetch Orders by Customer
exports.getOrdersByCustomer = async (req, res) => {
  const { email } = req.params;

  try {
    const orders = await Order.find({ userEmail: email }).populate('orderItems.product').populate('seller');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders by customer:', error);
    res.status(500).json({ message: 'Server error. Unable to fetch orders by customer.', error: error.message });
  }
};

// Fetch Orders by Status
exports.getOrdersByStatus = async (req, res) => {
  const { status } = req.params;

  try {
    const orders = await Order.find({ status }).populate('orderItems.product').populate('seller');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders by status:', error);
    res.status(500).json({ message: 'Server error. Unable to fetch orders by status.', error: error.message });
  }
};

// Fetch Orders by Date Range
exports.getOrdersByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: 'Start date and end date are required.' });
  }

  try {
    const orders = await Order.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
    }).populate('orderItems.product').populate('seller');
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders by date range:', error);
    res.status(500).json({ message: 'Server error. Unable to fetch orders by date range.', error: error.message });
  }
};

// controllers/orderController.js

// Fetch Orders for the Logged-In User
exports.getOrdersForUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const orders = await Order.find({ user: id })
      .populate('orderItems.product') // Populate product details if needed
      .populate('seller'); // Populate seller details if needed

    if (!orders.length) {
      return res.status(404).json({ message: 'No orders found for this user.' });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders for user:', error);
    res.status(500).json({ message: 'Server error. Unable to fetch orders for user.', error: error.message });
  }
};