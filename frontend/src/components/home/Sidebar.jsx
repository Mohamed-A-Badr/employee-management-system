/* eslint-disable react/prop-types */
import Logo from "./components/Logo";
import NavList from "./components/NavList";
import LogoutButton from "./components/LogoutButton";
import ToggleButton from "./components/ToggleButton";
import UserProfile from "./UserProfile";
import "./Sidebar.css";

const Sidebar = ({ isExpanded, setIsExpanded }) => {
  return (
    <div
      id="sidebar"
      className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}
    >
      <ToggleButton
        isExpanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
      />
      <Logo />
      <NavList />
      <UserProfile isExpanded={isExpanded} />
      <LogoutButton isExpanded={isExpanded} />
    </div>
  );
};

export default Sidebar;
