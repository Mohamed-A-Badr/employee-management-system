import PropTypes from 'prop-types';
import './GradientButton.css';

const GradientButton = ({ 
  children, 
  type = "button", 
  onClick, 
  fullWidth = false,
  className = ""
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`gradient-button ${fullWidth ? 'full-width' : ''} ${className}`}
    >
      <span>{children}</span>
    </button>
  );
};

GradientButton.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  fullWidth: PropTypes.bool,
  className: PropTypes.string
};

export default GradientButton;
