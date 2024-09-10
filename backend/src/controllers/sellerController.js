const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Seller } = require('../models/sellerModel'); // Adjust path if necessary

require('dotenv').config(); // To use environment variables

// Register a new seller
exports.registerSeller = async (req, res) => {
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
};

// Login a seller
exports.loginSeller = async (req, res) => {
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
      process.env.JWT_SECRET, // Use environment variable for secret
      { expiresIn: '7d' } 
    );

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in seller:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Fetch seller profile
exports.getProfile = async (req, res) => {
  try {
    // Extract token from headers
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use environment variable for secret

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
};

// Update seller profile
exports.updateProfile = async (req, res) => {
  try {
    // Extract token from headers
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use environment variable for secret

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
};

// Delete seller profile
exports.deleteProfile = async (req, res) => {
  try {
    // Extract token from headers
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use environment variable for secret

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
};

// Fetch all sellers (Admin only)
exports.getAllSellers = async (req, res) => {
  try {
    const sellers = await Seller.find({});
    res.status(200).json(sellers);
  } catch (error) {
    console.error('Error fetching sellers:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update other sellers (Admin only)
exports.updateSeller = async (req, res) => {
  try {
    const { name, phone, email, address } = req.body;

    if (!name || !phone || !email || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const updatedSeller = await Seller.findByIdAndUpdate(
      req.params.id,
      {
        $set: { name, phone, email, address },
      },
      { new: true }
    );

    if (!updatedSeller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    res.status(200).json(updatedSeller);
  } catch (error) {
    console.error('Error updating seller:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete other sellers (Admin only)
exports.deleteSeller = async (req, res) => {
  try {
    const deletedSeller = await Seller.findByIdAndDelete(req.params.id);

    if (!deletedSeller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    res.status(200).json({ message: 'Seller deleted successfully' });
  } catch (error) {
    console.error('Error deleting seller:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
