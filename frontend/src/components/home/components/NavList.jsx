import { useState, useEffect } from 'react';
import NavItem from "./NavItem";
import axios from 'axios';
import { getTokens } from '../../../utils/auth';

const NavList = () => {
  const [userRole, setUserRole] = useState(null);
  const tokens = getTokens();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/auth/me/', {
          headers: {
            'Authorization': `Bearer ${tokens.access}`
          }
        });
        setUserRole(response.data.role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    if (tokens?.access) {
      fetchUserRole();
    }
  }, [tokens]);

  const adminNavItems = [
    { path: "/employees", text: "Employees", icon: "👥" },
    { path: "/companies", text: "Companies", icon: "🏢" },
    { path: "/departments", text: "Departments", icon: "🏗️" },
  ];

  const employeeNavItems = [
    { path: "/employees", text: "My Details", icon: "👤" },
  ];

  const navItems = userRole === 'employee' ? employeeNavItems : adminNavItems;

  return (
    <nav className="nav-links">
      {navItems.map((item) => (
        <NavItem key={item.path} {...item} />
      ))}
    </nav>
  );
};

export default NavList;
