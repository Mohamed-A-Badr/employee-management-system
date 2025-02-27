/* eslint-disable react/prop-types */
import Logo from "./components/Logo";
import NavList from "./components/NavList";
import LogoutButton from "./components/LogoutButton";
import ToggleButton from "./components/ToggleButton";
import "./Sidebar.css";

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  return (
    <div
      id="sidebar"
      className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}
    >
      <Logo />
      <ToggleButton
        isExpanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
      />
      <NavList />
      <LogoutButton isExpanded={isExpanded} />
    </div>
  );
};

export default Sidebar;
