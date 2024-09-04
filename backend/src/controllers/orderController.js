const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  const { orderItems, totalAmount, shippingAddress } = req.body;
  const order = new Order({ user: req.user._id, orderItems, totalAmount, shippingAddress });

  const createdOrder = await order.save();
  res.status(201).json(createdOrder);
};

exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (order) {
    res.json(order);
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};
