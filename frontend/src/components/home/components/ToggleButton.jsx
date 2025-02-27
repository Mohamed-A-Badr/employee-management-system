/* eslint-disable react/prop-types */
import GradientButton from "../../common/GradientButton";
import "./ToggleButton.css";
import "font-awesome/css/font-awesome.min.css";

const ToggleButton = ({ isExpanded, onClick }) => {
  return (
    <GradientButton 
      onClick={onClick}
      className="toggle-button"
      title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
    >
      <i className={`fa fa-chevron-${isExpanded ? 'left' : 'right'}`}></i>
    </GradientButton>
  );
};

export default ToggleButton;
