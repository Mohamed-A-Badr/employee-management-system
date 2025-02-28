import { useEffect, useState } from "react";
import { useDepartment } from "../hooks/useDepartment";
import { useCompany } from "../hooks/useCompany";
import DepartmentTable from "../components/department/DepartmentTable";
import DepartmentForm from "../components/department/DepartmentForm";
import DeleteConfirmation from "../components/DeleteConfirmation";
import CompanyHeader from "../components/company/CompanyHeader";
import "./Departments.css";

const Departments = () => {
  const {
    departments,
    loading: departmentsLoading,
    error: departmentsError,
    fetchDepartments,
    deleteDepartment,
    saveDepartment,
    navigateToPage,
    pagination,
    setError: setDepartmentsError
  } = useDepartment();

  const {
    companies,
    loading: companiesLoading,
    error: companiesError,
    fetchCompanies
  } = useCompany();

  const [showForm, setShowForm] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);

  useEffect(() => {
    fetchDepartments();
    fetchCompanies();
  }, [fetchDepartments, fetchCompanies]);

  const handleDelete = async () => {
    if (!departmentToDelete) return;
    
    const success = await deleteDepartment(departmentToDelete.id);
    if (success) {
      setShowDeleteConfirm(false);
      setDepartmentToDelete(null);
    }
  };

  const handleSave = async (formData) => {
    const success = await saveDepartment(formData);
    if (success) {
      setShowForm(false);
      setEditingDepartment(null);
    }
  };

  const handleEdit = (department) => {
    setEditingDepartment(department);
    setShowForm(true);
  };

  const handleDeleteClick = (department) => {
    setDepartmentToDelete(department);
    setShowDeleteConfirm(true);
  };

  if (departmentsLoading || companiesLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (departmentsError || companiesError) {
    return <div className="error">{departmentsError || companiesError}</div>;
  }

  return (
    <div className="departments-page">
      <CompanyHeader 
        title="Departments"
        onAdd={() => {
          setEditingDepartment(null);
          setShowForm(true);
        }} 
      />
      
      <DepartmentTable
        departments={departments}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        onNavigateToPage={navigateToPage}
        pagination={pagination}
      />

      {showForm && (
        <DepartmentForm
          department={editingDepartment}
          companies={companies}
          onSubmit={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditingDepartment(null);
            setDepartmentsError(null);
          }}
        />
      )}

      {showDeleteConfirm && (
        <DeleteConfirmation
          message={`Are you sure you want to delete ${departmentToDelete?.name}?`}
          onConfirm={handleDelete}
          onCancel={() => {
            setShowDeleteConfirm(false);
            setDepartmentToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default Departments;
