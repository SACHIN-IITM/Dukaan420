const Wishlist = require('../models/wishlistModel');

exports.getWishlist = async (req, res) => {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');
    res.json(wishlist);
};

exports.addToWishlist = async (req, res) => {
    const { productId } = req.body;
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (
        wishlist) { if (!wishlist.products.includes(productId)) { 
            wishlist.products.push(productId); 
            await wishlist.save(); res.json(wishlist); 
        } else { 
            res.status(400).json({ message: 'Product already in wishlist' }); 
        } 
    } else { 
        const newWishlist = new Wishlist({ user: req.user._id, products: [productId] }); 
        await newWishlist.save(); 
        res.json(newWishlist); 
    }
};