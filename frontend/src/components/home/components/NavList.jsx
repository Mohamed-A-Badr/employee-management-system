import NavItem from "./NavItem";

const navItems = [
  { path: "/employees", text: "Employees", icon: "👥" },
  { path: "/companies", text: "Companies", icon: "🏢" },
  { path: "/departments", text: "Departments", icon: "🏗️" },
];

const NavList = () => {
  return (
    <nav className="nav-links">
      {navItems.map((item) => (
        <NavItem key={item.path} {...item} />
      ))}
    </nav>
  );
};

export default NavList;
