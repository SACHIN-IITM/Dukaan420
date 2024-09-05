import React, { useEffect, useState } from 'react';

import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import ProductList from '../components/Product/ProductList';
import { getCategories } from '../utils/api'; // Import API utility to fetch categories

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <Navbar />
      <main className="p-4">
        {/* Search Bar */}
        <div className="container mx-auto mb-6">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Categories */}
        <div className="container mx-auto mb-6">
          <div className="flex overflow-x-auto space-x-4">
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-lg ${
                  selectedCategory === category.name
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product List */}
        <ProductList category={selectedCategory} />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
