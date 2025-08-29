import api from './api';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  logout: async () => {
    try {
      await api.post('/logout');
      localStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('auth_token');
    return token ? { token } : null;
  }
};