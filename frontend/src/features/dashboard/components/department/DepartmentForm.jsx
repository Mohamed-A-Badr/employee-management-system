import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import GradientButton from "../../../../components/common/GradientButton";
import "./DepartmentForm.css";

const DepartmentForm = ({ department, companies, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    company: "",
  });

  useEffect(() => {
    if (department) {
      setFormData({
        id: department.id,
        name: department.name || "",
        company: department.company || "",
      });
    }
  }, [department]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="form-overlay">
      <div className="company-form">
        <div className="form-header">
          <h2>{department ? "Edit Department" : "Add Department"}</h2>
          <button onClick={onClose} className="close-button">
            <i className="fa fa-times"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Department Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
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
          <div className="form-actions">
            <GradientButton type="submit">
              {department ? "Update" : "Create"}
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

DepartmentForm.propTypes = {
  department: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    company: PropTypes.number,
  }),
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DepartmentForm;
