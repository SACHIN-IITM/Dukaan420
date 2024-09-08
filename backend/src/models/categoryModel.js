const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  description: {
    type: String,
    required: true,
    minlength: 5
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
