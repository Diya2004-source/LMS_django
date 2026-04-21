import React from 'react';
import { Users, BookOpen, Settings, LogOut, BarChart3, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username') || 'Admin';

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="sidebar-brand">
                    <ShieldCheck color="#f97316" size={28} />
                    <span>LMS ADMIN</span>
                </div>
                <nav className="sidebar-nav">
                    <div className="nav-item active"><BarChart3 size={20}/> Statistics</div>
                    <div className="nav-item"><Users size={20}/> Manage Users</div>
                    <div className="nav-item"><BookOpen size={20}/> Courses</div>
                    <div className="nav-item"><Settings size={20}/> Settings</div>
                </nav>
                <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={20}/> Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="main-content">
                <header className="top-nav">
                    <h1>Dashboard Overview</h1>
                    <div className="admin-profile">
                        <span>Welcome, <strong>{username}</strong></span>
                        <div className="avatar">{username[0]}</div>
                    </div>
                </header>

                <div className="stats-grid">
                    <div className="stat-card orange"><h3>Total Students</h3><p>1,240</p></div>
                    <div className="stat-card"><h3>Active Courses</h3><p>45</p></div>
                    <div className="stat-card"><h3>Instructors</h3><p>18</p></div>
                </div>

                <div className="recent-activity">
                    <h2>Recent Registrations</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Role</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>John Doe</td><td>Student</td><td>21 Apr 2026</td><td><span className="badge">Active</span></td></tr>
                            <tr><td>Sarah Smith</td><td>Teacher</td><td>20 Apr 2026</td><td><span className="badge">Active</span></td></tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;