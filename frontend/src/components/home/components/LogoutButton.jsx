/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { api, clearTokens, getTokens } from "../../../utils/auth";
import GradientButton from "../../common/GradientButton";
import "./LogoutButton.css";
import "font-awesome/css/font-awesome.min.css";

const LogoutButton = ({ isExpanded }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const tokens = getTokens();
      if (tokens?.refresh) {
        await api.post("/auth/logout/", {
          refresh: tokens.refresh
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearTokens();
      navigate("/login");
    }
  };

  return (
    <div className="logout-container">
      <GradientButton 
        onClick={handleLogout}
        className={`logout-button ${!isExpanded ? 'collapsed' : ''}`}
        title="Logout"
      >
        <i className="fa fa-sign-out"></i>
        {isExpanded && <span>Logout</span>}
      </GradientButton>
    </div>
  );
};

export default LogoutButton;
