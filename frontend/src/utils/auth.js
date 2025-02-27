import axios from 'axios';

const AUTH_TOKENS = 'auth_tokens';

export const saveTokens = (access, refresh) => {
  const tokens = { access, refresh };
  localStorage.setItem(AUTH_TOKENS, JSON.stringify(tokens));
};

export const getTokens = () => {
  const tokens = localStorage.getItem(AUTH_TOKENS);
  return tokens ? JSON.parse(tokens) : null;
};

export const clearTokens = () => {
  localStorage.removeItem(AUTH_TOKENS);
};

// Create axios instance with default config
export const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
});

// Add request interceptor to add token to all requests
api.interceptors.request.use(
  (config) => {
    const tokens = getTokens();
    if (tokens?.access) {
      config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is not 401 or request has already been retried, reject
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    const tokens = getTokens();

    if (!tokens?.refresh) {
      clearTokens();
      window.location.href = '/login';
      return Promise.reject(error);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/refresh/', {
        refresh: tokens.refresh,
      });

      const { access } = response.data;
      saveTokens(access, tokens.refresh);

      // Update the original request with new token
      originalRequest.headers.Authorization = `Bearer ${access}`;
      return api(originalRequest);
    } catch (refreshError) {
      clearTokens();
      window.location.href = '/login';
      return Promise.reject(refreshError);
    }
  }
);
