import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import GradientButton from "../../../../components/common/GradientButton";
import "./EmployeeForm.css";

const EmployeeForm = ({ employee, companies, departments, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    id: null,
    email: "",
    first_name: "",
    last_name: "",
    role: "",
    company: "",
    department: "",
  });

  const [availableDepartments, setAvailableDepartments] = useState([]);

  useEffect(() => {
    if (employee) {
      setFormData({
        id: employee.id,
        email: employee.email || "",
        first_name: employee.first_name || "",
        last_name: employee.last_name || "",
        role: employee.role || "",
        company: employee.company || "",
        department: employee.department || "",
      });
    }
  }, [employee]);

  useEffect(() => {
    if (formData.company) {
      setAvailableDepartments(
        departments.filter(dept => dept.company === Number(formData.company))
      );
    } else {
      setAvailableDepartments([]);
    }
  }, [formData.company, departments]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: value,
      };
      
      // Reset department when company changes
      if (name === 'company') {
        newData.department = '';
      }
      
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-overlay">
      <div className="company-form">
        <div className="form-header">
          <h2>{employee ? "Edit Employee" : "Add Employee"}</h2>
          <button onClick={onClose} className="close-button">
            <i className="fa fa-times"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="company">Company</label>
            <select
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            >
              <option value="">Select a company</option>
              {companies.map(company => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              disabled={!formData.company}
            >
              <option value="">Select a department</option>
              {availableDepartments.map(department => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-actions">
            <GradientButton type="submit">
              {employee ? "Update" : "Create"}
            </GradientButton>
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EmployeeForm.propTypes = {
  employee: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    role: PropTypes.string,
    company: PropTypes.number,
    department: PropTypes.number,
  }),
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  departments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      company: PropTypes.number.isRequired,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EmployeeForm;
