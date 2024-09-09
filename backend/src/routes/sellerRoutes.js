const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // For generating tokens
const { Seller } = require('../models/sellerModel'); // Adjust path if necessary

const router = express.Router();

// Register Route
router.post('/register', async (req, res) => {
  try {
    const { sellerName, sellerPhone, sellerEmail, sellerPassword, sellerAddress } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(sellerPassword, 10);

    // Create new seller
    const newSeller = new Seller({
      name: sellerName,
      phone: sellerPhone,
      email: sellerEmail,
      password: hashedPassword,
      address: sellerAddress,
    });

    await newSeller.save();
    res.status(201).json({ message: 'Seller registered successfully' });
  } catch (error) {
    console.error('Error registering seller:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { sellerEmail, sellerPassword } = req.body;

    // Find the seller by email
    const seller = await Seller.findOne({ email: sellerEmail });
    if (!seller) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the passwords
    const isMatch = await bcrypt.compare(sellerPassword, seller.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: seller._id, email: seller.email },
      'sexy_pratyaksh',
      { expiresIn: '7d' } 
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in seller:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Fetch Profile Route
router.get('/profile', async (req, res) => {
  try {
    // Extract token from headers
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, 'sexy_prat'); // Replace with your actual secret

    // Find the seller by ID
    const seller = await Seller.findById(decoded.id);
    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    res.status(200).json({
      name: seller.name,
      phone: seller.phone,
      email: seller.email,
      address: seller.address.address,
      city: seller.address.city,
      postalCode: seller.address.postalCode,
      country: seller.address.country
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Profile Route
router.put('/profile', async (req, res) => {
  try {
    // Extract token from headers
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Replace with your actual secret

    // Find and update the seller by ID
    const updatedSeller = await Seller.findByIdAndUpdate(
      decoded.id,
      {
        $set: {
          name: req.body.name,
          phone: req.body.phone,
          email: req.body.email,
          address: {
            address: req.body.address,
            city: req.body.city,
            postalCode: req.body.postalCode,
            country: req.body.country
          }
        }
      },
      { new: true }
    );

    if (!updatedSeller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    res.status(200).json({
      name: updatedSeller.name,
      phone: updatedSeller.phone,
      email: updatedSeller.email,
      address: updatedSeller.address.address,
      city: updatedSeller.address.city,
      postalCode: updatedSeller.address.postalCode,
      country: updatedSeller.address.country
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete Profile Route
router.delete('/profile', async (req, res) => {
  try {
    // Extract token from headers
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, 'your_jwt_secret'); // Replace with your actual secret

    // Find and delete the seller by ID
    const deletedSeller = await Seller.findByIdAndDelete(decoded.id);

    if (!deletedSeller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
