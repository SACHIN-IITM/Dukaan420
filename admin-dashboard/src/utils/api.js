import axios from 'axios';

// API to get categories
export const getCategories = () => axios.get('/api/categories');

// API to get customers
export const getCustomers = () => axios.get('/api/customers');

// API to get sellers
export const getSellers = () => axios.get('/api/sellers');

// API to get orders
export const getOrders = () => axios.get('/api/orders');

// API to add a new category
export const addCategory = (category) => axios.post('/api/categories', category);

// API to delete a category
export const deleteCategory = (id) => axios.delete(`/api/categories/${id}`);
