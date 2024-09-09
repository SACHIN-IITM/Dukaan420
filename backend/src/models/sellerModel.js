// models/Seller.js
const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: { type: String, unique: true },
  password: String,
  address: {
    address: String,
    city: String,
    postalCode: String,
    country: String,
  },
});

const Seller = mongoose.model('Seller', sellerSchema);

module.exports = { Seller };
