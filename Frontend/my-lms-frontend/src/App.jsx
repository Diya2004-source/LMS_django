// 1. All Imports
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login'; // Import your new Login page
import AdminDashboard from './pages/Admin/AdminDashboard';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />

        <Route path="/login" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* User Dashboard (The page users see after logging in) */}
        <Route path="/dashboard" element={
          <div style={{color: 'white', padding: '20px'}}>
            <h1>User Dashboard</h1>
            <p>Welcome back! You have successfully logged in.</p>
          </div>
        } />

        {/* Home Redirect: Sends users to login by default */}
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;