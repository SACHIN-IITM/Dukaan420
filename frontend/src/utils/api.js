import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// User Authentication
export const registerUser = (userData) => axios.post(`${API_URL}/auth/register`, userData);
export const loginUser = (userData) => axios.post(`${API_URL}/auth/login`, userData);

// Products
export const getProducts = () => axios.get(`${API_URL}/products`);
export const getProduct = (id) => axios.get(`${API_URL}/products/${id}`);

// Categories
export const getCategories = () => axios.get(`${API_URL}/categories`);

// Orders
export const createOrder = (orderData, config) => {
    return axios.post(`${API_URL}/orders`, orderData, config); // Adjusted URL path to match backend
};
export const getOrder = (id) => axios.get(`${API_URL}/orders/${id}`);

// Wishlist
export const getWishlist = () => axios.get(`${API_URL}/wishlist`);
export const addToWishlist = (productId) => axios.post(`${API_URL}/wishlist`, { productId });

// User Profile Management
export const getUserProfile = () => {
  const token = localStorage.getItem('token');
  return axios.get(`${API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const updateUserProfile = (userData) => {
  const token = localStorage.getItem('token');
  return axios.put(`${API_URL}/auth/profile`, userData, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const deleteUserProfile = () => {
  const token = localStorage.getItem('token');
  return axios.delete(`${API_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
};
