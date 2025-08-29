import api from './api';

export const purchaseService = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/purchases?${queryString}`);
  },

  getById: (id) => api.get(`/purchases/${id}`),

  create: (purchaseData) => api.post('/purchases', purchaseData),

  update: (id, purchaseData) => api.put(`/purchases/${id}`, purchaseData),

  delete: (id) => api.delete(`/purchases/${id}`),
};