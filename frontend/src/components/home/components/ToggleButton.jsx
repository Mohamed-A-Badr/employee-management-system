/* eslint-disable react/prop-types */
const ToggleButton = ({ isExpanded, onClick }) => {
  return (
    <button
      className="toggle-button"
      onClick={onClick}
      aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
    >
      {isExpanded ? "◀" : "▶"}
    </button>
  );
};

export default ToggleButton;
