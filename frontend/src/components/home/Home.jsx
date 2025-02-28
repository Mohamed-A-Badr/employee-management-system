import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Companies from "../../features/dashboard/pages/Companies";
import { getTokens } from "../../utils/auth";
import "./Home.css";
import Departments from "../../features/dashboard/pages/Departments";
import Employees from "../../features/dashboard/pages/Employees";
import EmployeeDetail from "../../features/dashboard/pages/EmployeeDetail";
import axios from "axios";

const Home = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [userProfileId, setUserProfileId] = useState(null);
  const tokens = getTokens();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/auth/me/', {
          headers: {
            'Authorization': `Bearer ${tokens.access}`
          }
        });
        setUserRole(response.data.role);
        setUserProfileId(response.data.id);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (tokens?.access) {
      fetchUserProfile();
    }
  }, [tokens]);

  if (!tokens?.access) {
    return <Navigate to="/login" />;
  }

  // Role-based route rendering
  const renderRoutes = () => {
    if (userRole === 'employee') {
      return (
        <Routes>
          <Route 
            index 
            element={userProfileId ? <EmployeeDetail employeeId={userProfileId} /> : null} 
          />
          <Route 
            path="employees" 
            element={userProfileId ? <EmployeeDetail employeeId={userProfileId} /> : null} 
          />
          <Route path="*" element={<Navigate to="/employees" />} />
        </Routes>
      );
    }

    return (
      <Routes>
        <Route index element={<h1>Welcome to Dashboard</h1>} />
        <Route path="employees" element={<Employees />} />
        <Route path="employee/:id" element={<EmployeeDetail />} />
        <Route path="companies" element={<Companies />} />
        <Route path="departments" element={<Departments/>} />
      </Routes>
    );
  };

  return (
    <div className="home-container">
      <Sidebar
        isExpanded={isSidebarExpanded}
        setIsExpanded={setIsSidebarExpanded}
      />
      <div className={`content-area ${isSidebarExpanded ? 'sidebar-expanded' : ''}`}>
        {renderRoutes()}
      </div>
    </div>
  );
};

export default Home;
