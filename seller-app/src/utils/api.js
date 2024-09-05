import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getProducts = () => axios.get(`${API_URL}/products`);
export const getProduct = (id) => axios.get(`${API_URL}/products/${id}`);
export const getAnalyticsData = () => axios.get(`${API_URL}/analytics`); // Example endpoint for analytics
export const updateProduct = (id, productData) => axios.put(`${API_URL}/products/${id}`, productData);

export const createProduct = async (product) => {
    const response = await fetch('http://localhost:8000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    return response.json();
  };
  
  // Add other API functions here
  