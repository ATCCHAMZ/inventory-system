import api from './api';

// Named export (recommended)
export const productService = {
  getAll: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return api.get(`/products?${queryString}`);
  },

  getById: (id) => api.get(`/products/${id}`),

  create: (productData) => api.post('/products', productData),

  update: (id, productData) => api.put(`/products/${id}`, productData),

  delete: (id) => api.delete(`/products/${id}`),

  getLowStock: () => api.get('/products?low_stock=true'),
};