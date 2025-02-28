import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getTokens } from '../../../utils/auth';
import './EmployeeDetail.css';

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchEmployeeDetail = async () => {
      try {
        const tokens = getTokens();
        const response = await axios.get(`http://localhost:8000/api/v1/employee/${id}/`, {
          headers: {
            'Authorization': `Bearer ${tokens.access}`
          }
        });

        setEmployee(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching employee details:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchEmployeeDetail();
  }, [id]);

  if (loading) return <div className="employee-detail-loading">Loading...</div>;
  if (error) return <div className="employee-detail-error">Error loading employee details</div>;
  if (!employee) return null;

  return (
    <div className="employee-detail-container">
      <div className="employee-detail-header">
        <h1>{employee.employee_name}</h1>
      </div>
      <div className="employee-detail-content">
        <div className="employee-detail-section">
          <h2>Personal Information</h2>
          <div className="employee-detail-grid">
            <div className="detail-item">
              <span className="detail-label">Email</span>
              <span className="detail-value">{employee.email}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Mobile Number</span>
              <span className="detail-value">{employee.mobile_number}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Address</span>
              <span className="detail-value">{employee.address}</span>
            </div>
          </div>
        </div>
        
        <div className="employee-detail-section">
          <h2>Professional Information</h2>
          <div className="employee-detail-grid">
            <div className="detail-item">
              <span className="detail-label">Company</span>
              <span className="detail-value">{employee.company_name}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Department</span>
              <span className="detail-value">{employee.department_name}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Role</span>
              <span className="detail-value">{employee.role}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Designation</span>
              <span className="detail-value">{employee.designation}</span>
            </div>
          </div>
        </div>
        
        <div className="employee-detail-section">
          <h2>Employment Details</h2>
          <div className="employee-detail-grid">
            <div className="detail-item">
              <span className="detail-label">Date of Joining</span>
              <span className="detail-value">{employee.hired_on}</span>
            </div>  
            <div className="detail-item">
              <span className="detail-label">Days Employed</span>
              <span className="detail-value">{employee.days_employed} days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
