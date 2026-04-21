import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Eye, EyeOff, User, Lock, Loader2, LogIn, LayoutDashboard } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/user/login/', formData);
            
            // Store data
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('user_role', response.data.role);
            localStorage.setItem('username', response.data.username);

            toast.success(`Welcome back, ${response.data.username}! ✨`);

            // Custom Redirect Logic
            setTimeout(() => {
                if (response.data.role === 'admin') {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/dashboard');
                }
            }, 1500);

        } catch (error) {
            const msg = error.response?.data?.detail || "No active account found with these credentials.";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <ToastContainer position="top-right" theme="colored" />
            <div className="auth-glass-card">
                <div className="auth-header">
                    <div className="auth-logo"><LayoutDashboard size={32} /></div>
                    <h2>Portal Login</h2>
                    <p>Enter your admin or student credentials</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-input-group">
                        <div className="icon-badge"><User size={20} /></div>
                        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                    </div>

                    <div className="auth-input-group">
                        <div className="icon-badge"><Lock size={20} /></div>
                        <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" onChange={handleChange} required />
                        <button type="button" className="auth-eye" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <button type="submit" className="auth-submit" disabled={loading}>
                        {loading ? <Loader2 className="spinning" /> : <>Login to System <LogIn size={18} /></>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;