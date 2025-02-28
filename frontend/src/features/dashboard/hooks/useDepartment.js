import { useState, useCallback, useMemo } from 'react';
import { api } from '../../../utils/auth';
import { getTokens } from '../../../utils/auth';

export const useDepartment = () => {
  const { access: token } = getTokens() || {};
  const [departments, setDepartments] = useState([]);
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

  const fetchDepartments = useCallback(async (page = 1) => {
    // Check if data for this page is already in cache
    if (pageCache[page]) {
      setDepartments(pageCache[page].departments);
      setPagination(pageCache[page].pagination);
      return;
    }

    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/department/?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { results, count, next, previous } = response.data;
      const totalPages = Math.ceil(count / results.length);

      const pageData = {
        departments: results,
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

      setDepartments(results);
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
    fetchDepartments(page);
  }, [fetchDepartments, pagination.totalPages]);

  const deleteDepartment = useCallback(async (id) => {
    try {
      await api.delete(`/department/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDepartments(departments => departments.filter(department => department.id !== id));
      return true;
    } catch (err) {
      setError(err.response?.data || 'Failed to delete department');
      return false;
    }
  }, [token]);

  const saveDepartment = useCallback(async (departmentData) => {
    try {
      if (departmentData.id) {
        // Update existing department
        const response = await api.put(`/department/${departmentData.id}/`, departmentData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDepartments(departments =>
          departments.map(department =>
            department.id === departmentData.id ? response.data : department
          )
        );
      } else {
        // Create new department
        const response = await api.post("/department/", departmentData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setDepartments(departments => [...departments, response.data]);
      }
      return true;
    } catch (err) {
      setError(err.response?.data || 'Failed to save department');
      return false;
    }
  }, [token]);

  return {
    departments,
    loading,
    error,
    pagination,
    fetchDepartments,
    navigateToPage,
    deleteDepartment,
    saveDepartment,
    setError
  };
};
