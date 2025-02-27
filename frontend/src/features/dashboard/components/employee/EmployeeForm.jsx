import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import GradientButton from "../../../../components/common/GradientButton";
import "./EmployeeForm.css";

const EmployeeForm = ({
  employee,
  companies,
  departments,
  onSubmit,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    id: null,
    employee_name: "",
    email: "",
    mobile_number: "",
    address: "",
    designation: "",
    hired_on: "",
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
        employee_name: employee.employee_name || "",
        mobile_number: employee.mobile_number || "",
        address: employee.address || "",
        designation: employee.designation || "",
        hired_on: employee.hired_on || "",
        role: employee.role || "",
        company: employee.company || "",
        department: employee.department || "",
      });
    }
  }, [employee]);

  useEffect(() => {
    if (formData.company) {
      setAvailableDepartments(
        departments.filter((dept) => dept.company === Number(formData.company))
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
      if (name === "company") {
        newData.department = "";
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
            <label htmlFor="employee_name">First Name</label>
            <input
              type="text"
              id="employee_name"
              name="employee_name"
              value={formData.employee_name}
              onChange={handleChange}
              required
            />
          </div>
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
            <label htmlFor="mobile_number">Phone number</label>
            <input
              type="tel"
              id="mobile_number"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="designation">Designation</label>
            <input
              type="text"
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="hired_on">Hire on</label>
            <input
              type="date"
              id="hired_on"
              name="hired_on"
              value={formData.hired_on}
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
              {companies.map((company) => (
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
              {availableDepartments.map((department) => (
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
    employee_name: PropTypes.string,
    mobile_number: PropTypes.string,
    address: PropTypes.string,
    designation: PropTypes.string,
    hired_on: PropTypes.string,
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
