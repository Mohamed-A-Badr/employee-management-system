import PropTypes from "prop-types";
import "./EmployeeTable.css";

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Company</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>
                <a 
                  href={`/employee/${employee.id}`} 
                  className="employee-name-link"
                >
                  {employee.employee_name}
                </a>
              </td>
              <td>{employee.email}</td>
              <td>{employee.mobile_number}</td>
              <td>{employee.role}</td>
              <td>{employee.company_name}</td>
              <td>{employee.department_name}</td>
              <td className="actions">
                <button
                  onClick={() => onEdit(employee)}
                  className="icon-button"
                >
                  <i className="fa fa-edit"></i>
                </button>
                <button
                  onClick={() => onDelete(employee)}
                  className="icon-button delete"
                >
                  <i className="fa fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

EmployeeTable.propTypes = {
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      employee_name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      mobile_number: PropTypes.string,
      role: PropTypes.string,
      company_name: PropTypes.string,
      department_name: PropTypes.string
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default EmployeeTable;
