import React, { useContext } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AddProductPage from './pages/AddProductPage';
import CustomerPage from './pages/CustomerPage';
import CustomerDetailPage from './pages/CustomerDetailPage';
import SalesSummaryPage from './pages/SalesSummaryPage';
import ReportsPage from './pages/ReportsPage';
import HomePage from './pages/HomePage';
import SellerLogin from './components/Seller/SellerLogin';
import SellerRegister from './components/Seller/SellerRegister';
import { AuthProvider, AuthContext } from './contexts/AuthContext'; // Import AuthProvider and AuthContext
import SellerProfile from './components/Seller/SellerProfile';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/seller-login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="p-4">
          <Routes>
            {/* Public Routes */}
            <Route path="/seller-login" element={<SellerLogin />} />
            <Route path="/seller-register" element={<SellerRegister />} />

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute element={HomePage} />} />
            <Route path="/products" element={<ProtectedRoute element={ProductPage} />} />
            <Route path="/products/add" element={<ProtectedRoute element={AddProductPage} />} />
            <Route path="/products/:id" element={<ProtectedRoute element={ProductDetailPage} />} />
            <Route path="/customers" element={<ProtectedRoute element={CustomerPage} />} />
            <Route path="/customers/:id" element={<ProtectedRoute element={CustomerDetailPage} />} />
            <Route path="/sales-summary" element={<ProtectedRoute element={SalesSummaryPage} />} />
            <Route path="/reports" element={<ProtectedRoute element={ReportsPage} />} />
            <Route path="/profile" element={<ProtectedRoute element={SellerProfile} />} />

            {/* Redirect to login if no route matches */}
            <Route path="*" element={<Navigate to="/seller-login" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
