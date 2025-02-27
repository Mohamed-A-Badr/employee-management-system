import { Link } from "react-router-dom";
import logo from "../../../assets/logo.svg";

const Logo = () => {
  return (
    <div className="logo-container">
      <Link to="/">
        <img src={logo} alt="Logo" className="logo" />
      </Link>
    </div>
  );
};

export default Logo;
