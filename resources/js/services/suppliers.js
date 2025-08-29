import api from './api';

export const supplierService = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/suppliers?${queryString}`);
  },

  getById: (id) => api.get(`/suppliers/${id}`),

  create: (supplierData) => api.post('/suppliers', supplierData),

  update: (id, supplierData) => api.put(`/suppliers/${id}`, supplierData),

  delete: (id) => api.delete(`/suppliers/${id}`),
};