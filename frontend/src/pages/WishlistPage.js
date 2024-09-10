import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { getWishlist, removeFromWishlist } from '../utils/api'; // Ensure removeFromWishlist is implemented

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await getWishlist();
        console.log(data.wishlist); // Debugging statement
        setWishlist(data.wishlist); // Set wishlist data
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      } finally {
        setLoading(false); // Set loading to false after data fetching
      }
    };

    fetchWishlist();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`); // Navigate to the product detail page
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await removeFromWishlist(productId); // Call API to remove product
      // Remove product from local state
      setWishlist(prevWishlist => prevWishlist.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error removing product from wishlist:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
        <div className="bg-white shadow-md rounded-lg p-4">
          {wishlist.length > 0 ? (
            <ul className="space-y-4">
              {wishlist.map((product) => (
                <li
                  key={product._id}
                  className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4"
                >
                  <div className="w-full md:w-1/4">
                    {/* Placeholder image; update with actual image URL if available */}
                    <img
                      src="https://via.placeholder.com/150"
                      alt={product.name}
                      className="w-full h-24 object-cover"
                    />
                  </div>
                  <div className="w-full md:w-3/4 flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold cursor-pointer" onClick={() => handleProductClick(product._id)}>
                        {product.name}
                      </h2>
                      <p className="text-gray-600">{product.description}</p>
                      <p className="text-gray-800 mt-2">${product.price.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveFromWishlist(product._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No products in your wishlist.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WishlistPage;
