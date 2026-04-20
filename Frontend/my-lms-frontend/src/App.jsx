// 1. All Imports go AT THE TOP
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Auth/Register';
import AdminDashboard from './pages/Admin/AdminDashboard';
import './App.css';

// 2. The App component MUST be a Function
function App() {
  
  // 3. (Optional) Any hooks like useState go INSIDE the function, above the 'return'
  // const [data, setData] = React.useState(null); 

  return (
    // 4. Everything inside 'return' is your HTML/Components
    <Router>
      <Routes>
        {/* http://localhost:5173/register */}
        <Route path="/register" element={<Register />} />

        {/* http://localhost:5173/admin */}
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Redirect home to register for now */}
        <Route path="/" element={<Navigate to="/register" />} />
      </Routes>
    </Router>
  );
}

// 5. This tells other files they can use 'App'
export default App;