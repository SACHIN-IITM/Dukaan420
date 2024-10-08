const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  street: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pin: { type: String, required: true },
  college: { type: String, required: true },
  year: { type: Number, required: true },
  branch: { type: String, required: true },
  dob: { type: Date, required: true },
  password: { type: String, required: true },
  wishlist: [
    { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Product'  // Referencing Product model
    }
  ]
}, { timestamps: true });

// Hash the password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
