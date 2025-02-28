import PropTypes from 'prop-types';
import './CompanyTable.css';

const CompanyTable = ({ 
  companies, 
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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Employees</th>
            <th>Departments</th>
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

CompanyTable.propTypes = {
  companies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      number_of_employees: PropTypes.string,
      number_of_departments: PropTypes.string,
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

CompanyTable.defaultProps = {
  onNavigateToPage: () => {},
  pagination: {
    count: 0,
    next: null,
    previous: null,
    currentPage: 1,
    totalPages: 1
  }
};

export default CompanyTable;
