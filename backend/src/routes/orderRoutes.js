// routes/orderRoutes.js

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const findUserByEmail = require('../middleware/findUserByEmail');
const { isAuthenticated } = require('../middleware/authMiddleware'); // Ensure this middleware is implemented

// Create Order
router.post('/', findUserByEmail, orderController.createOrder);

// Fetch All Orders (Admin only)
router.get('/', orderController.getAllOrders);

// Fetch Orders for the Logged-In User
router.get('/:id', orderController.getOrdersForUser);

// Fetch Orders by Customer
router.get('/customer/:email', orderController.getOrdersByCustomer);

// Fetch Orders by Status
router.get('/status/:status', orderController.getOrdersByStatus);

// Fetch Orders by Date Range
router.get('/date-range', orderController.getOrdersByDateRange);

module.exports = router;
