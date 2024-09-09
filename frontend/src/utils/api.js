import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Helper to get the token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// User Authentication
export const registerUser = (userData) => axios.post(`${API_URL}/auth/register`, userData);
export const loginUser = (userData) => axios.post(`${API_URL}/auth/login`, userData);

// Products
export const getProducts = () => axios.get(`${API_URL}/products`);
export const getProduct = (id) => axios.get(`${API_URL}/products/${id}`);

// Categories
export const getCategories = () => axios.get(`${API_URL}/categories`);

// Orders
export const createOrder = (orderData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),  // Include the Authorization token if available
    },
  };
  return axios.post(`${API_URL}/orders`, orderData, config);
};

export const getOrder = (id) => {
  const config = {
    headers: getAuthHeaders(),
  };
  return axios.get(`${API_URL}/orders/${id}`, config);
};

// Wishlist
export const getWishlist = () => {
  const config = {
    headers: getAuthHeaders(),
  };
  return axios.get(`${API_URL}/wishlist`, config);
};

export const addToWishlist = (productId) => {
  const config = {
    headers: getAuthHeaders(),
  };
  return axios.post(`${API_URL}/wishlist`, { productId }, config);
};

// User Profile Management
export const getUserProfile = () => {
  const config = {
    headers: getAuthHeaders(),
  };
  return axios.get(`${API_URL}/auth/profile`, config);
};

export const updateUserProfile = (userData) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
  };
  return axios.put(`${API_URL}/auth/profile`, userData, config);
};

export const deleteUserProfile = () => {
  const config = {
    headers: getAuthHeaders(),
  };
  return axios.delete(`${API_URL}/auth/profile`, config);
};
