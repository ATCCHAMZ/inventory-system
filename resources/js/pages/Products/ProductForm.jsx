import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { productService } from '../../services/products';
import api from '../../services/api'; // Make sure this points to your axios instance

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category_id: '',
    supplier_id: '',
    description: '',
    price: '',
    cost_price: '',
    quantity_in_stock: '',
    reorder_level: '5',
  });

  useEffect(() => {
    fetchCategories();
    fetchSuppliers();
    if (isEdit) {
      loadProduct();
    }
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data.data);
    } catch (err) {
      console.error('Failed to fetch categories', err);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await api.get('/suppliers');
      setSuppliers(response.data.data);
    } catch (err) {
      console.error('Failed to fetch suppliers', err);
    }
  };

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await productService.getById(id);
      const product = response.data.data;
      setFormData({
        name: product.name || '',
        sku: product.sku || '',
        category_id: product.category_id || '',
        supplier_id: product.supplier_id || '',
        description: product.description || '',
        price: product.price || '',
        cost_price: product.cost_price || '',
        quantity_in_stock: product.quantity_in_stock || '',
        reorder_level: product.reorder_level || '5',
      });
    } catch (err) {
      setError('Failed to load product');
      console.error('Load product error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    const formattedData = {
      name: formData.name,
      sku: formData.sku,
      category_id: parseInt(formData.category_id) || 1,
      supplier_id: parseInt(formData.supplier_id) || 1,
      description: formData.description,
      price: parseFloat(formData.price) || 0,
      cost_price: parseFloat(formData.cost_price) || 0,
      quantity_in_stock: parseInt(formData.quantity_in_stock) || 0,
      reorder_level: parseInt(formData.reorder_level) || 5,
    };

    try {
      if (isEdit) {
        await productService.update(id, formattedData);
        alert('Product updated successfully!');
      } else {
        await productService.create(formattedData);
        alert('Product created successfully!');
      }
      navigate('/products');
    } catch (err) {
      console.log('Full error response:', err.response?.data);
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        `Failed to ${isEdit ? 'update' : 'create'} product`;
      setError(errorMessage);

      if (err.response?.data?.errors) {
        const validationErrors = Object.values(err.response.data.errors).flat();
        setError(validationErrors.join(', '));
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link to="/products" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Products
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product name"
              />
            </div>

            <div>
              <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-2">
                SKU *
              </label>
              <input
                type="text"
                id="sku"
                name="sku"
                required
                value={formData.sku}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter SKU"
              />
            </div>

            <div>
              <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category_id"
                name="category_id"
                required
                value={formData.category_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="supplier_id" className="block text-sm font-medium text-gray-700 mb-2">
                Supplier *
              </label>
              <select
                id="supplier_id"
                name="supplier_id"
                required
                value={formData.supplier_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Supplier</option>
                {suppliers.map((sup) => (
                  <option key={sup.id} value={sup.id}>
                    {sup.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product description"
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Pricing & Inventory</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="cost_price" className="block text-sm font-medium text-gray-700 mb-2">
                  Cost Price ($) *
                </label>
                <input
                  type="number"
                  id="cost_price"
                  name="cost_price"
                  required
                  step="0.01"
                  min="0"
                  value={formData.cost_price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Selling Price ($) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  required
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label htmlFor="quantity_in_stock" className="block text-sm font-medium text-gray-700 mb-2">
                  Initial Stock Quantity *
                </label>
                <input
                  type="number"
                  id="quantity_in_stock"
                  name="quantity_in_stock"
                  required
                  min="0"
                  value={formData.quantity_in_stock}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>

              <div>
                <label htmlFor="reorder_level" className="block text-sm font-medium text-gray-700 mb-2">
                  Reorder Level *
                </label>
                <input
                  type="number"
                  id="reorder_level"
                  name="reorder_level"
                  required
                  min="1"
                  value={formData.reorder_level}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="5"
                />
                <p className="text-sm text-gray-500 mt-1">Alert when stock falls below this level</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <Link to="/products" className="px-4 py-2 text-gray-600 hover:text-gray-900">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isEdit ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {isEdit ? 'Update Product' : 'Create Product'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
