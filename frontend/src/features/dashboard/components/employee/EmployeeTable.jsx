import PropTypes from "prop-types";
import "./EmployeeTable.css";

const EmployeeTable = ({ 
  employees, 
  onEdit, 
  onDelete, 
  onNavigateToPage, 
  pagination 
}) => {
  // Generate an array of page numbers to display
  const generatePageNumbers = () => {
    const { currentPage, totalPages } = pagination;
    const pageNumbers = [];
    
    // Always show first page
    if (currentPage > 3) {
      pageNumbers.push(1);
      if (currentPage > 4) pageNumbers.push('...');
    }
    
    // Show pages around current page
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);
    
    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    
    // Always show last page
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  return (
    <div className="table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Department</th>
            <th>Role</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Hired On</th>
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
              <td>{employee.company_name}</td>
              <td>{employee.department_name}</td>
              <td>{employee.role}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile_number}</td>
              <td>{employee.hired_on}</td>
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
      {pagination.totalPages > 1 && (
        <div className="pagination">
          <button 
            onClick={() => onNavigateToPage(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="pagination-btn"
          >
            Previous
          </button>
          <div className="page-numbers">
            {generatePageNumbers().map((page, index) => (
              <button
                key={index}
                onClick={() => typeof page === 'number' && onNavigateToPage(page)}
                className={`page-number ${page === pagination.currentPage ? 'active' : ''} ${typeof page !== 'number' ? 'ellipsis' : ''}`}
                disabled={typeof page !== 'number'}
              >
                {page}
              </button>
            ))}
          </div>
          <button 
            onClick={() => onNavigateToPage(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

EmployeeTable.propTypes = {
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      employee_name: PropTypes.string.isRequired,
      company_name: PropTypes.string.isRequired,
      department_name: PropTypes.string.isRequired,
      role: PropTypes.string,
      email: PropTypes.string,
      mobile_number: PropTypes.string,
      hired_on: PropTypes.string,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onNavigateToPage: PropTypes.func,
  pagination: PropTypes.shape({
    count: PropTypes.number,
    next: PropTypes.string,
    previous: PropTypes.string,
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
  })
};

EmployeeTable.defaultProps = {
  onNavigateToPage: () => {},
  pagination: {
    count: 0,
    next: null,
    previous: null,
    currentPage: 1,
    totalPages: 1
  }
};

export default EmployeeTable;
