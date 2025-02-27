import PropTypes from "prop-types";
import GradientButton from "../../../components/common/GradientButton";
import "./DeleteConfirmation.css";

const DeleteConfirmation = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="delete-overlay">
      <div className="delete-modal">
        <div className="delete-icon">
          <i className="fa fa-exclamation-triangle"></i>
        </div>
        <h3>Confirm Delete</h3>
        <p>{message}</p>
        <div className="delete-actions">
          <GradientButton onClick={onConfirm} className="delete-button">
            Delete
          </GradientButton>
          <button onClick={onCancel} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteConfirmation.propTypes = {
  message: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default DeleteConfirmation;
