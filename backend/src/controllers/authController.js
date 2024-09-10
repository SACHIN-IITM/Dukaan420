const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Function to generate JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// Register User
exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, phone, street, country, state, city, pin, college, year, branch, dob, password } = req.body;
    
    // Validate required fields
    if (!name || !email || !phone || !street || !country || !state || !city || !pin || !college || !year || !branch || !dob || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create new user
    const newUser = await User.create({ name, email, phone, street, country, state, city, pin, college, year, branch, dob, password });
    const token = signToken(newUser._id);

    res.status(201).json({
      status: 'success',
      token,
      data: { user: newUser }
    });
  } catch (err) {
    console.error('Error during registration:', err); // Log the error to the server console
    res.status(500).json({
      message: 'Error registering user',
      error: err.message // Send the error message to the client
    });
  }
};


// Login User
exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password exist
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password!' });
    }

    // Check if user exists and password is correct
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    // Generate JWT token and send response
    const token = signToken(user._id);
    res.status(200).json({
      status: 'success',
      token,
      data: { user }
    });
  } catch (err) {
    next(err);
  }
};

// Protect middleware
exports.protect = async (req, res, next) => {
  try {
    // Get token from request headers
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return res.status(401).json({ message: 'You are not logged in!' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user still exists
    const currentUser = await User.findById(decoded.id);

    
    if (!currentUser) {
      return res.status(401).json({ message: 'The user belonging to this token no longer exists.' });
    }

    // Grant access to protected route
    req.user = currentUser;
    next();
  } catch (err) {
    next(err);
  }
};

// Get User Profile
exports.getUserProfile = async (req, res, next,) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (err) {
    next(err);
  }
};

// Update User Profile
exports.updateUserProfile = async (req, res, next) => {
  try {
    const { name, email, phone, street, city, state, country, pin, college, year, branch, dob } = req.body;
    
    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id, // User ID from token
      { name, email, phone, street, city, state, country, pin, college, year, branch, dob },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return next(new AppError('No user found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser
      }
    });
  } catch (error) {
    return next(new AppError('Failed to update profile', 500));
  }
};

// Delete User Profile
exports.deleteUserProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id); // Find and delete user by ID

    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    return next(new AppError('Failed to delete profile', 500));
  }
};
