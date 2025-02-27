/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ isExpanded }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="logout-container">
      <button className="logout-button" onClick={handleLogout}>
        {isExpanded ? (
          <>
            <span>🚪</span>
            <span className="nav-text">Logout</span>
          </>
        ) : (
          <span>🚪</span>
        )}
      </button>
    </div>
  );
};

export default LogoutButton;
