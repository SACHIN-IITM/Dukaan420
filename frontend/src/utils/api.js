import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerUser = (userData) => axios.post(`${API_URL}/auth/register`, userData);
export const loginUser = (userData) => axios.post(`${API_URL}/auth/login`, userData);
export const getProducts = () => axios.get(`${API_URL}/products`);
export const getCategories = () => axios.get(`${API_URL}/categories`);
export const getProduct = (id) => axios.get(`${API_URL}/products/${id}`);
export const createOrder = (orderData) => axios.post(`${API_URL}/orders`, orderData);
export const getOrder = (id) => axios.get(`${API_URL}/orders/${id}`);
export const getWishlist = () => axios.get(`${API_URL}/wishlist`);
export const addToWishlist = (productId) => axios.post(`${API_URL}/wishlist`, { productId });
