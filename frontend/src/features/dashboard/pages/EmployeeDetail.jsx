import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getTokens } from '../../../utils/auth';
import './EmployeeDetail.css';

const EmployeeDetail = ({ employeeId }) => {
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const routeParams = useParams();
  const navigate = useNavigate();

  // Prioritize prop employeeId, fallback to route params
  const id = employeeId || routeParams.id;

  useEffect(() => {
    const fetchEmployeeDetail = async () => {
      if (!id) {
        setError(new Error('No employee ID provided'));
        setLoading(false);
        return;
      }

      try {
        const tokens = getTokens();
        
        // Try multiple endpoints to fetch employee details
        const endpoints = [
          `http://localhost:8000/api/v1/employee/${id}/`,
          `http://localhost:8000/api/v1/employees/${id}/`,
          `http://localhost:8000/api/v1/auth/me/`
        ];

        let response;
        for (const endpoint of endpoints) {
          try {
            response = await axios.get(endpoint, {
              headers: {
                'Authorization': `Bearer ${tokens.access}`
              }
            });

            // If successful, break the loop
            break;
          } catch (err) {
            // Continue to next endpoint if this one fails
            console.warn(`Failed to fetch from ${endpoint}:`, err.message);
            continue;
          }
        }

        if (!response) {
          throw new Error('Could not fetch employee details from any endpoint');
        }

        // Handle different response structures
        const employeeData = response.data.employee || response.data;
        setEmployee(employeeData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching employee details:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchEmployeeDetail();
  }, [id]);

  const handleGoBack = () => {
    navigate('/employees');
  };

  if (loading) return <div className="employee-detail-loading">Loading...</div>;
  if (error) return <div className="employee-detail-error">Error loading employee details: {error.message}</div>;
  if (!employee) return null;

  return (
    <div className="employee-detail-container">
      {!employeeId && (
        <div className="employee-detail-breadcrumb">
          <button onClick={handleGoBack} className="breadcrumb-back-button">
            <i className="fa fa-arrow-left"></i> Employees
          </button>
        </div>
      )}
      <div className="employee-detail-header">
        <h1>{employee.employee_name || employee.username || 'Employee Details'}</h1>
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
              <span className="detail-value">{employee.mobile_number || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Address</span>
              <span className="detail-value">{employee.address || 'N/A'}</span>
            </div>
          </div>
        </div>
        
        <div className="employee-detail-section">
          <h2>Professional Information</h2>
          <div className="employee-detail-grid">
            <div className="detail-item">
              <span className="detail-label">Company</span>
              <span className="detail-value">{employee.company_name || employee.company || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Department</span>
              <span className="detail-value">{employee.department_name || employee.department || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Role</span>
              <span className="detail-value">{employee.role || 'N/A'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Designation</span>
              <span className="detail-value">{employee.designation || 'N/A'}</span>
            </div>
          </div>
        </div>
        
        <div className="employee-detail-section">
          <h2>Employment Details</h2>
          <div className="employee-detail-grid">
            <div className="detail-item">
              <span className="detail-label">Date of Joining</span>
              <span className="detail-value">{employee.hired_on || 'N/A'}</span>
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
