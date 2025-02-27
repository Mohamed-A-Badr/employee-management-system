import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
// import Employees from "./pages/Employees";
import Companies from "../../features/dashboard/pages/Companies";
// import Departments from "./pages/Departments";
import { getTokens } from "../../utils/auth";
import "./Home.css";

const Home = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const tokens = getTokens();

  if (!tokens?.access) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="home-container">
      <Sidebar 
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />
      <div className={`content-area ${isSidebarExpanded ? 'sidebar-expanded' : ''}`}>
        <Routes>
          <Route index element={<h1>Welcome to Dashboard</h1>} />
          <Route path="employees" element={<h1>Employees</h1>} />
          <Route path="companies" element={<Companies />} />
          <Route path="departments" element={<h1>Departments</h1>} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
