const User = require('../models/userModel');

const findUserByEmail = async (req, res, next) => {
  const userEmail = 'sachin@gmail.com'; // Hardcoded email for testing

  console.log('Using hardcoded userEmail:', userEmail); // Log for debugging

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error finding user by email:', error);
    res.status(500).json({ message: 'Server error while finding user', error: error.message });
  }
};


module.exports = findUserByEmail;
