import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import GradientButton from "../../../../components/common/GradientButton";
import "./CompanyForm.css";

const CompanyForm = ({ company, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
  });

  useEffect(() => {
    if (company) {
      setFormData({
        id: company.id,
        name: company.name || "",
      });
    }
  }, [company]);

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
          <h2>{company ? "Edit Company" : "Add Company"}</h2>
          <button onClick={onClose} className="close-button">
            <i className="fa fa-times"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Company Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-actions">
            <GradientButton type="submit">
              {company ? "Update" : "Create"}
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

CompanyForm.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CompanyForm;
