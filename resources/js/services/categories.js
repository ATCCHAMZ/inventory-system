import api from './api';

export const categoryService = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/categories?${queryString}`);
  },

  getById: (id) => api.get(`/categories/${id}`),

  create: (categoryData) => api.post('/categories', categoryData),

  update: (id, categoryData) => api.put(`/categories/${id}`, categoryData),

  delete: (id) => api.delete(`/categories/${id}`),
};