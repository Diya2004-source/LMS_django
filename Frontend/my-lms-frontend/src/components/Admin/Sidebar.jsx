import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="admin-sidebar shadow">
      <div className="p-4">
        <h4 className="text-white fw-bold">LMS <span className="text-orange">PRO</span></h4>
      </div>
      <nav className="nav flex-column mt-3">
        <Link className="nav-link active" to="/admin/dashboard">Overview</Link>
        <Link className="nav-link" to="/admin/students">Students List</Link>
        <Link className="nav-link" to="/admin/courses">Manage Courses</Link>
        <Link className="nav-link danger-link" to="/admin/risk-alerts">Risk Alerts</Link>
      </nav>
    </div>
  );
};

export default Sidebar;