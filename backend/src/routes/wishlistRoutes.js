const express = require('express');
const { getWishlist, addToWishlist } = require('../controllers/wishlistController');
const router = express.Router();

router.get('/', getWishlist);
router.post('/', addToWishlist);

module.exports = router;
