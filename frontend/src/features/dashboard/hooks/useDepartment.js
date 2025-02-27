import { useState, useCallback } from 'react';
import { api } from '../../../utils/auth';

export const useDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDepartments = useCallback(async () => {
    try {
      const response = await api.get("/department/");
      setDepartments(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to fetch departments");
      setLoading(false);
    }
  }, []);

  const deleteDepartment = useCallback(async (id) => {
    try {
      await api.delete(`/department/${id}/`);
      setDepartments(departments => departments.filter(dept => dept.id !== id));
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to delete department");
      return false;
    }
  }, []);

  const saveDepartment = useCallback(async (departmentData) => {
    try {
      if (departmentData.id) {
        // Update existing department
        const response = await api.put(`/department/${departmentData.id}/`, departmentData);
        setDepartments(departments =>
          departments.map(dept =>
            dept.id === departmentData.id ? response.data : dept
          )
        );
      } else {
        // Create new department
        const response = await api.post("/department/", departmentData);
        setDepartments(departments => [...departments, response.data]);
      }
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to save department");
      return false;
    }
  }, []);

  return {
    departments,
    loading,
    error,
    fetchDepartments,
    deleteDepartment,
    saveDepartment,
    setError
  };
};
