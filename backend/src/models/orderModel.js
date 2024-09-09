// orderModel.js
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true }
});

const orderSchema = new mongoose.Schema({
  orderItems: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, qty: { type: Number, required: true } }],
  totalAmount: { type: Number, required: true },
  shippingAddress: addressSchema,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  userEmail: { type: String, required: true },
  userName: { type: String, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' } // Reference to Seller
});

module.exports = mongoose.model('Order', orderSchema);
