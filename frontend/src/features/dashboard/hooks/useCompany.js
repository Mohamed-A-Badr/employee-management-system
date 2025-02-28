import { useState, useCallback, useMemo } from 'react';
import { api } from '../../../utils/auth';
import { getTokens } from '../../../utils/auth';

export const useCompany = () => {
  const { access: token } = getTokens() || {};
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
    currentPage: 1,
    totalPages: 0
  });

  // Memoized cache to prevent redundant API calls
  const pageCache = useMemo(() => ({}), []);

  const fetchCompanies = useCallback(async (page = 1) => {
    // Check if data for this page is already in cache
    if (pageCache[page]) {
      setCompanies(pageCache[page].companies);
      setPagination(pageCache[page].pagination);
      return;
    }

    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/company/?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { results, count, next, previous } = response.data;
      const totalPages = Math.ceil(count / results.length);

      const pageData = {
        companies: results,
        pagination: {
          count,
          next,
          previous,
          currentPage: page,
          totalPages
        }
      };

      // Cache the page data
      pageCache[page] = pageData;

      setCompanies(results);
      setPagination(prevPagination => ({
        count,
        next,
        previous,
        currentPage: page,
        totalPages
      }));
    } catch (err) {
      setError(err.response?.data || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [token, pageCache]);

  const navigateToPage = useCallback((page) => {
    if (page < 1 || page > pagination.totalPages) return;
    fetchCompanies(page);
  }, [fetchCompanies, pagination.totalPages]);

  const deleteCompany = useCallback(async (id) => {
    try {
      await api.delete(`/company/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCompanies(companies => companies.filter(company => company.id !== id));
      return true;
    } catch (err) {
      setError(err.response?.data || "Failed to delete company");
      return false;
    }
  }, [token]);

  const saveCompany = useCallback(async (companyData) => {
    try {
      if (companyData.id) {
        // Update existing company
        const response = await api.put(`/company/${companyData.id}/`, companyData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCompanies(companies =>
          companies.map(company =>
            company.id === companyData.id ? response.data : company
          )
        );
      } else {
        // Create new company
        const response = await api.post("/company/", companyData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCompanies(companies => [...companies, response.data]);
      }
      return true;
    } catch (err) {
      setError(err.response?.data || "Failed to save company");
      return false;
    }
  }, [token]);

  return {
    companies,
    loading,
    error,
    pagination,
    fetchCompanies,
    navigateToPage,
    deleteCompany,
    saveCompany,
    setError
  };
};
