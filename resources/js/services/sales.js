import api from './api';

export const saleService = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/sales?${queryString}`);
  },

  getById: (id) => api.get(`/sales/${id}`),

  create: (saleData) => api.post('/sales', saleData),

  update: (id, saleData) => api.put(`/sales/${id}`, saleData),

  delete: (id) => api.delete(`/sales/${id}`),
};