import { useEffect, useState } from "react";
import { useEmployee } from "../hooks/useEmployee";
import { useCompany } from "../hooks/useCompany";
import { useDepartment } from "../hooks/useDepartment";
import EmployeeTable from "../components/employee/EmployeeTable";
import EmployeeForm from "../components/employee/EmployeeForm";
import DeleteConfirmation from "../components/DeleteConfirmation";
import CompanyHeader from "../components/company/CompanyHeader";
import "./Employees.css";

const Employees = () => {
  const {
    employees,
    loading: employeesLoading,
    error: employeesError,
    fetchEmployees,
    deleteEmployee,
    saveEmployee,
    setError: setEmployeesError
  } = useEmployee();

  const {
    companies,
    loading: companiesLoading,
    error: companiesError,
    fetchCompanies
  } = useCompany();

  const {
    departments,
    loading: departmentsLoading,
    error: departmentsError,
    fetchDepartments
  } = useDepartment();

  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  useEffect(() => {
    fetchEmployees();
    fetchCompanies();
    fetchDepartments();
  }, [fetchEmployees, fetchCompanies, fetchDepartments]);

  const handleDelete = async () => {
    if (!employeeToDelete) return;
    
    const success = await deleteEmployee(employeeToDelete.id);
    if (success) {
      setShowDeleteConfirm(false);
      setEmployeeToDelete(null);
    }
  };

  const handleSave = async (formData) => {
    const success = await saveEmployee(formData);
    if (success) {
      setShowForm(false);
      setEditingEmployee(null);
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteConfirm(true);
  };

  if (employeesLoading || companiesLoading || departmentsLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (employeesError || companiesError || departmentsError) {
    return <div className="error">{employeesError || companiesError || departmentsError}</div>;
  }

  return (
    <div className="employees-page">
      <CompanyHeader 
        title="Employees"
        onAdd={() => {
          setEditingEmployee(null);
          setShowForm(true);
        }} 
      />
      
      <EmployeeTable
        employees={employees}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {showForm && (
        <EmployeeForm
          employee={editingEmployee}
          companies={companies}
          departments={departments}
          onSubmit={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditingEmployee(null);
            setEmployeesError(null);
          }}
        />
      )}

      {showDeleteConfirm && (
        <DeleteConfirmation
          message={`Are you sure you want to delete ${employeeToDelete?.first_name} ${employeeToDelete?.last_name}?`}
          onConfirm={handleDelete}
          onCancel={() => {
            setShowDeleteConfirm(false);
            setEmployeeToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default Employees;
