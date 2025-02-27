import { useState, useCallback } from 'react';
import { api } from '../../../utils/auth';

export const useCompany = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCompanies = useCallback(async () => {
    try {
      const response = await api.get("/company/");
      setCompanies(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to fetch companies");
      setLoading(false);
    }
  }, []);

  const deleteCompany = useCallback(async (id) => {
    try {
      await api.delete(`/company/${id}/`);
      setCompanies(companies => companies.filter(company => company.id !== id));
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to delete company");
      return false;
    }
  }, []);

  const saveCompany = useCallback(async (companyData) => {
    try {
      if (companyData.id) {
        // Update existing company
        const response = await api.put(`/company/${companyData.id}/`, companyData);
        setCompanies(companies =>
          companies.map(company =>
            company.id === companyData.id ? response.data : company
          )
        );
      } else {
        // Create new company
        const response = await api.post("/company/", companyData);
        setCompanies(companies => [...companies, response.data]);
      }
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to save company");
      return false;
    }
  }, []);

  return {
    companies,
    loading,
    error,
    fetchCompanies,
    deleteCompany,
    saveCompany,
    setError
  };
};
