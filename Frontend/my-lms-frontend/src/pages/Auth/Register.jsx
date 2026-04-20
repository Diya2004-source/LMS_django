import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Eye, EyeOff, User, Mail, Lock, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import rules from './validationRules.json';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validateField = (name, value) => {
        const rule = rules[name];
        if (rule?.required && !value) return "Required field";
        if (rule?.minLength && value.length < rule.minLength) return rule.message;
        if (rule?.pattern) {
            const regex = new RegExp(rule.pattern);
            if (!regex.test(value)) return rule.message;
        }
        if (name === "confirmPassword" && value !== formData.password)
            return "Passwords do not match";
        return "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    };

    const validateForm = () => {
        let newErrors = {};
        Object.keys(formData).forEach((key) => {
            const err = validateField(key, formData[key]);
            if (err) newErrors[key] = err;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast.error("Validation failed. Please check the fields.");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post('http://127.0.0.1:8000/api/user/register/', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                confirm_password: formData.confirmPassword
            });
            toast.success("Success! Welcome to the platform.");
        } catch (error) {
            toast.error(error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <ToastContainer position="top-right" theme="colored" />
            
            <div className="auth-glass-card">
                <div className="auth-header">
                    <div className="auth-logo">
                        <ShieldCheck size={32} />
                    </div>
                    <h2>Join Us</h2>
                    <p>Create your account in seconds</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form" noValidate>
                    {/* Username */}
                    <div className="auth-input-group">
                        <div className="icon-badge">
                            <User size={20} strokeWidth={2.5} />
                        </div>
                        <input 
                            type="text" 
                            name="username" 
                            placeholder="Username" 
                            value={formData.username}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                        {errors.username && <span className="error-text">{errors.username}</span>}
                    </div>

                    {/* Email */}
                    <div className="auth-input-group">
                        <div className="icon-badge">
                            <Mail size={20} strokeWidth={2.5} />
                        </div>
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="Email Address" 
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    {/* Password */}
                    <div className="auth-input-group">
                        <div className="icon-badge">
                            <Lock size={20} strokeWidth={2.5} />
                        </div>
                        <input 
                            type={showPassword ? "text" : "password"} 
                            name="password" 
                            placeholder="Password" 
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <button type="button" className="auth-eye" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>

                    {/* Confirm Password */}
                    <div className="auth-input-group">
                        <div className="icon-badge">
                            <Lock size={20} strokeWidth={2.5} />
                        </div>
                        <input 
                            type={showConfirmPassword ? "text" : "password"} 
                            name="confirmPassword" 
                            placeholder="Confirm Password" 
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <button type="button" className="auth-eye" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                    </div>

                    <button type="submit" className="auth-submit" disabled={loading}>
                        {loading ? <Loader2 className="spinning" /> : <>Get Started <ArrowRight size={18} /></>}
                    </button>
                </form>

                <div className="auth-footer">
                    Already have an account? <a href="/login">Sign In</a>
                </div>
            </div>
        </div>
    );
};

export default Register;