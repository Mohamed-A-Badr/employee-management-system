import { useEffect, useState } from "react";
import { useCompany } from "../hooks/useCompany";
import CompanyHeader from "../components/CompanyHeader";
import CompanyTable from "../components/CompanyTable";
import CompanyForm from "../components/CompanyForm";
import DeleteConfirmation from "../components/DeleteConfirmation";
import "./Companies.css";

const Companies = () => {
  const {
    companies,
    loading,
    error,
    fetchCompanies,
    deleteCompany,
    saveCompany,
    setError
  } = useCompany();

  const [showForm, setShowForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handleDelete = async () => {
    if (!companyToDelete) return;
    
    const success = await deleteCompany(companyToDelete.id);
    if (success) {
      setShowDeleteConfirm(false);
      setCompanyToDelete(null);
    }
  };

  const handleSave = async (formData) => {
    const success = await saveCompany(formData);
    if (success) {
      setShowForm(false);
      setEditingCompany(null);
    }
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setShowForm(true);
  };

  const handleDeleteClick = (company) => {
    setCompanyToDelete(company);
    setShowDeleteConfirm(true);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="companies-page">
      <CompanyHeader onAdd={() => {
        setEditingCompany(null);
        setShowForm(true);
      }} />
      
      <CompanyTable
        companies={companies}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {showForm && (
        <CompanyForm
          company={editingCompany}
          onSubmit={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditingCompany(null);
            setError(null);
          }}
        />
      )}

      {showDeleteConfirm && (
        <DeleteConfirmation
          message={`Are you sure you want to delete ${companyToDelete?.name}?`}
          onConfirm={handleDelete}
          onCancel={() => {
            setShowDeleteConfirm(false);
            setCompanyToDelete(null);
          }}
        />
      )}
    </div>
  );
};

export default Companies;
