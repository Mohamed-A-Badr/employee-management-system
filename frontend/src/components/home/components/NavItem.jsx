/* eslint-disable react/prop-types */
import { Link, useLocation } from "react-router-dom";

const NavItem = ({ path, text, icon }) => {
  const location = useLocation();
  
  return (
    <Link
      to={path}
      className={`nav-link ${location.pathname === path ? "active" : ""}`}
    >
      <span>{icon}</span>
      <span className="nav-text">{text}</span>
    </Link>
  );
};

export default NavItem;
