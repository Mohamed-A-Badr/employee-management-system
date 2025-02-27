import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import GradientButton from '../../../components/common/GradientButton';
import './CompanyHeader.css';

const CompanyHeader = ({ onAdd }) => {
  return (
    <div className="company-header">
      <div className="breadcrumbs">
        <Link to="/">Dashboard</Link>
        <span>/</span>
        <span>Companies</span>
      </div>
      <GradientButton onClick={onAdd}>
        <i className="fa fa-plus"></i> Add Company
      </GradientButton>
    </div>
  );
};

CompanyHeader.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default CompanyHeader;
