import { useState, useCallback } from 'react';
import { api } from '../../../utils/auth';

export const useEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployees = useCallback(async () => {
    try {
      const response = await api.get("/employee/");
      setEmployees(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to fetch employees");
      setLoading(false);
    }
  }, []);

  const deleteEmployee = useCallback(async (id) => {
    try {
      await api.delete(`/employee/${id}/`);
      setEmployees(employees => employees.filter(emp => emp.id !== id));
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to delete employee");
      return false;
    }
  }, []);

  const saveEmployee = useCallback(async (employeeData) => {
    try {
      if (employeeData.id) {
        // Update existing employee
        const response = await api.put(`/employee/${employeeData.id}/`, employeeData);
        setEmployees(employees =>
          employees.map(emp =>
            emp.id === employeeData.id ? response.data : emp
          )
        );
      } else {
        // Create new employee
        const response = await api.post("/employee/", employeeData);
        setEmployees(employees => [...employees, response.data]);
      }
      return true;
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to save employee");
      return false;
    }
  }, []);

  return {
    employees,
    loading,
    error,
    fetchEmployees,
    deleteEmployee,
    saveEmployee,
    setError
  };
};
