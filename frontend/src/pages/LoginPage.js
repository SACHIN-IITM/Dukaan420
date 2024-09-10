import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import LoginForm from '../components/Login/LoginForm';
import Footer from '../components/Footer/Footer';


const LoginPage = () => {
  return (
    <div>
      <Navbar />
      <main className="container mx-auto p-4">
        <LoginForm />
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
