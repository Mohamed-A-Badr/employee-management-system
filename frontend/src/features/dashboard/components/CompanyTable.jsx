import PropTypes from 'prop-types';
import './CompanyTable.css';

const CompanyTable = ({ companies, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number of Employees</th>
            <th>Number of Departments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td>{company.name}</td>
              <td>{company.number_of_employees}</td>
              <td>{company.number_of_departments}</td>
              <td className="actions">
                <button onClick={() => onEdit(company)} className="icon-button">
                  <i className="fa fa-edit"></i>
                </button>
                <button onClick={() => onDelete(company)} className="icon-button delete">
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

CompanyTable.propTypes = {
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      number_of_employees: PropTypes.number,
      number_of_departments: PropTypes.number,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CompanyTable;
