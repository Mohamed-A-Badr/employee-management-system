import PropTypes from 'prop-types';
import './EmployeeTable.css';

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Address</th>
            <th>Designation</th>
            <th>Hired on</th>
            <th>Days Employed</th>
            <th>Company</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.employee_name}</td>
              <td>{employee.email}</td> 
              <td>{employee.mobile_number}</td>
              <td>{employee.role}</td>
              <td>{employee.address}</td>
              <td>{employee.designation}</td>
              <td>{employee.hired_on}</td>
              <td>{employee.days_employed}</td>
              <td>{employee.company_name}</td>
              <td>{employee.department_name}</td>
              <td className="actions">
                <button onClick={() => onEdit(employee)} className="icon-button">
                  <i className="fa fa-edit"></i>
                </button>
                <button onClick={() => onDelete(employee)} className="icon-button delete">
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
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      company_name: PropTypes.string.isRequired,
      department_name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default EmployeeTable;
