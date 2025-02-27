import { useState } from "react";
import Logo from "./components/Logo";
import NavList from "./components/NavList";
import LogoutButton from "./components/LogoutButton";
import ToggleButton from "./components/ToggleButton";
import "./Sidebar.css";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
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
