import PropTypes from 'prop-types';
import './DepartmentTable.css';

const DepartmentTable = ({ departments, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Employees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{department.name}</td>
              <td>{department.company_name}</td>
              <td>{department.number_of_employees}</td>
              <td className="actions">
                <button onClick={() => onEdit(department)} className="icon-button">
                  <i className="fa fa-edit"></i>
                </button>
                <button onClick={() => onDelete(department)} className="icon-button delete">
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

DepartmentTable.propTypes = {
  departments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      company_name: PropTypes.string.isRequired,
      number_of_employees: PropTypes.number,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default DepartmentTable;
