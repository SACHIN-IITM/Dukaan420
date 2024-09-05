const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // UUID library to generate unique order IDs

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    default: uuidv4 // Automatically generates a unique ID for each order
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  orderItems: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number,
      price: Number
    }
  ],
  shippingAddress: {
    street: String,
    city: String,
    country: String,
    zip: String
  },
  paymentInfo: {
    transactionHash: String,
    status: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed'],
      default: 'Pending'
    }
  },
  totalPrice: Number,
  orderStatus: {
    type: String,
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Processing'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to automatically set a unique orderId if it's not present
orderSchema.pre('save', function(next) {
  if (!this.orderId) {
    this.orderId = uuidv4();
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
