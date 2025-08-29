import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    // You can modify successful responses here if needed
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    
    // Handle network errors
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout:', error);
      throw new Error('Request timeout. Please check your connection and try again.');
    }
    
    if (!error.response) {
      console.error('Network error:', error);
      throw new Error('Network error. Please check your connection and try again.');
    }

    const { status, data } = error.response;

    // Handle authentication errors
    if (status === 401) {
      console.warn('Authentication failed, redirecting to login...');
      
      // Clear all auth-related data
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      
      // Redirect to login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
      
      throw new Error(data?.message || 'Your session has expired. Please login again.');
    }

    // Handle validation errors (422)
    if (status === 422) {
      const validationErrors = data.errors || {};
      const errorMessage = data.message || 'Validation failed';
      
      // Create a formatted error object
      const formattedError = new Error(errorMessage);
      formattedError.errors = validationErrors;
      formattedError.status = status;
      
      throw formattedError;
    }

    // Handle server errors (500)
    if (status >= 500) {
      console.error('Server error:', error);
      throw new Error(data?.message || 'Server error. Please try again later.');
    }

    // Handle other errors
    if (data?.message) {
      throw new Error(data.message);
    }

    // Default error handling
    throw new Error(`Request failed with status ${status}`);
  }
);

// Helper functions for common API operations
const apiHelper = {
  // GET request with error handling
  get: async (url, config = {}) => {
    try {
      const response = await api.get(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST request with error handling
  post: async (url, data = {}, config = {}) => {
    try {
      const response = await api.post(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PUT request with error handling
  put: async (url, data = {}, config = {}) => {
    try {
      const response = await api.put(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PATCH request with error handling
  patch: async (url, data = {}, config = {}) => {
    try {
      const response = await api.patch(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // DELETE request with error handling
  delete: async (url, config = {}) => {
    try {
      const response = await api.delete(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('auth_token');
    return !!token;
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  },

  // Clear all authentication data
  clearAuth: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },

  // Set authentication data
  setAuth: (token, user) => {
    localStorage.setItem('auth_token', token);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }
};

// Export both the default axios instance and helper functions
export default api;
export { apiHelper };