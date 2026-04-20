import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../../components/Admin/Sidebar';

const AdminDashboard = () => {
  // 1. Create States to store data from Django
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. The "Senior" Fetch Function
  const fetchRiskData = async () => {
    try {
      // Replace with your actual Django URL
      const response = await axios.get('http://127.0.0.1:8000/api/academics/risk-data/');
      setStudents(response.data); // Save data to state
      setLoading(false);
    } catch (error) {
      console.error("Django connection failed:", error);
      setLoading(false);
    }
  };

  // 3. useEffect: Runs as soon as the page loads
  useEffect(() => {
    fetchRiskData();
  }, []); // The [] means "run only once"

  return (
    <div className="d-flex admin-wrapper">
      <Sidebar />
      <div className="admin-content p-5 w-100">
        <h2 className="fw-bold">Admin Insights</h2>
        
        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-orange" role="status"></div>
            <p>Analyzing Student Risk Data...</p>
          </div>
        ) : (
          <div className="glass-table-container p-4 shadow-sm mt-4">
            <table className="table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Risk Score</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.username}</td>
                    <td>{student.risk_percentage}%</td>
                    <td>
                      {/* Logic to change color based on AI Score */}
                      <span className={student.risk_percentage > 70 ? 'badge-risk-high' : 'badge-risk-low'}>
                        {student.risk_percentage > 70 ? 'At Risk' : 'Safe'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;