import { useState, useCallback, useMemo } from 'react';
import { api } from '../../../utils/auth';
import { getTokens } from '../../../utils/auth';

export const useEmployee = () => {
  const { access: token } = getTokens() || {};
  const [employees, setEmployees] = useState([]);
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

  const fetchEmployees = useCallback(async (page = 1) => {
    // Check if data for this page is already in cache
    if (pageCache[page]) {
      setEmployees(pageCache[page].employees);
      setPagination(pageCache[page].pagination);
      return;
    }

    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/employee/?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { results, count, next, previous } = response.data;
      const totalPages = Math.ceil(count / results.length);

      const pageData = {
        employees: results,
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

      setEmployees(results);
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
    fetchEmployees(page);
  }, [fetchEmployees, pagination.totalPages]);

  const deleteEmployee = useCallback(async (id) => {
    try {
      await api.delete(`/employee/${id}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEmployees(employees => employees.filter(employee => employee.id !== id));
      return true;
    } catch (err) {
      setError(err.response?.data || "Failed to delete employee");
      return false;
    }
  }, [token]);

  const saveEmployee = useCallback(async (employeeData) => {
    try {
      if (employeeData.id) {
        // Update existing employee
        const response = await api.put(`/employee/${employeeData.id}/`, employeeData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEmployees(employees =>
          employees.map(employee =>
            employee.id === employeeData.id ? response.data : employee
          )
        );
      } else {
        // Create new employee
        const response = await api.post("/employee/", employeeData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEmployees(employees => [...employees, response.data]);
      }
      return true;
    } catch (err) {
      setError(err.response?.data || "Failed to save employee");
      return false;
    }
  }, [token]);

  return {
    employees,
    loading,
    error,
    pagination,
    fetchEmployees,
    navigateToPage,
    deleteEmployee,
    saveEmployee,
    setError
  };
};
