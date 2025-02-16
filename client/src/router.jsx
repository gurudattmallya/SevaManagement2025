// src/router.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import BookingLanding from './pages/BookingLanding';
import NotFound from './pages/NotFound'; // A fallback for undefined routes

const RouterConfig = () => {
  return (
    <Router>
      <Routes>
        {/* Define your routes */}
        <Route path="/" element={<BookingLanding />} />
        <Route path="/booking" element={<BookingLanding />} /> {/* Ensure this points to BookingLanding */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        {/* Fallback route for undefined paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default RouterConfig;
