import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/Navbar/Navbar';
import ProductList from '../components/Product/ProductList';
import { getCategories, getProducts } from '../utils/api'; // Import API utilities to fetch products and categories

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const { data } = await getProducts(); // Fetch all products
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  useEffect(() => {
    // Filter products based on category and search term
    const filterProducts = () => {
      let filtered = products;

      if (selectedCategory) {
        filtered = filtered.filter(product =>
          product.category === selectedCategory
        );
      }

      if (searchTerm) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [selectedCategory, searchTerm, products]);

  return (
    <div>
      <Navbar />
      <main className="p-4">
        {/* Search Bar */}
        <div className="container mx-auto mb-6">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Categories */}
        <div className="container mx-auto mb-6">
          <div className="flex overflow-x-auto space-x-4">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-lg ${
                !selectedCategory ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              All
            </button>
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
        <ProductList products={filteredProducts} />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
