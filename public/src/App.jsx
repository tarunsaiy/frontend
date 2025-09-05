import React, { useState, createContext, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Footer from './Pages/Footer';
import Home from './Pages/Home';
import Navbar from './Pages/Navbar';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import Login from './Pages/Login';
import SellProduct from './Pages/SellProduct';
import MyListings from './Pages/MyListings';
import Products from './Pages/Products';
import ForgotPassword from './Pages/ForgotPassword';
import UpdateProduct from './Pages/Updateproduct';
import Notfound from './Pages/Notfound';
import AdminLogin from './Pages/AdminLogin';
import Admin_profile from './Pages/Admin_profile';
import PendingProducts from './Pages/PendingProducts';

// Global context
export const Store = createContext(null);
function App() {
  const [usertoken, setuserToken] = useState(null);
  const [admintoken, setadminToken] = useState(null);

  // Store tokens to localStorage on change
  // useEffect(() => {
  //   if (usertoken) {
  //     localStorage.setItem('usertoken', usertoken);
  //   } else {
  //     localStorage.removeItem('usertoken');
  //   }
  // }, [usertoken]);

  // useEffect(() => {
  //   if (admintoken) {
  //     localStorage.setItem('admintoken', admintoken);
  //   } else {
  //     localStorage.removeItem('admintoken');
  //   }
  // }, [admintoken]);
  return (
    <Store.Provider value={{ usertoken, setuserToken, admintoken, setadminToken }}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sellproduct" element={<SellProduct />} />
          <Route path="/mylistings" element={<MyListings />} />
          <Route path="/products" element={<Products />} />
          <Route path="/updatepassword" element={<ForgotPassword />} />
          <Route path="/updateproduct/:productId" element={<UpdateProduct />} />
          <Route path="/admin_login" element={<AdminLogin />} />
          <Route path="/admin_profile" element={<Admin_profile />} />
          <Route path="/pendingproducts" element={<PendingProducts />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
        <Footer />
      </Router>
    </Store.Provider>
  );
}

export default App;
