import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, ShoppingCart, DollarSign } from 'lucide-react';
import { saleService } from '../../services/sales';
import { productService } from '../../services/products';

const SaleForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    product_id: '',
    quantity_sold: 1,
    sale_price: 0,
    sale_date: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    loadProducts();
    if (isEdit) {
      loadSale();
    }
  }, [id]);

  const loadProducts = async () => {
    try {
      const response = await productService.getAll();
      setProducts(response.data.data || []);
    } catch (error) {
      console.error('Failed to load products:', error);
    }
  };

  const loadSale = async () => {
    try {
      setLoading(true);
      const response = await saleService.getById(id);
      const sale = response.data.data;
      
      setFormData({
        product_id: sale.product_id,
        quantity_sold: sale.quantity_sold,
        sale_price: sale.sale_price,
        sale_date: sale.sale_date.split('T')[0],
      });
    } catch (err) {
      setError('Failed to load sale');
      console.error('Load sale error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const submissionData = {
        ...formData,
        quantity_sold: parseInt(formData.quantity_sold),
        sale_price: parseFloat(formData.sale_price),
      };

      if (isEdit) {
        await saleService.update(id, submissionData);
        alert('Sale updated successfully!');
      } else {
        await saleService.create(submissionData);
        alert('Sale created successfully!');
      }
      navigate('/sales');
    } catch (err) {
      const errorMessage = err.response?.data?.message ||
        err.response?.data?.error ||
        `Failed to ${isEdit ? 'update' : 'create'} sale`;
      setError(errorMessage);

      if (err.response?.data?.errors) {
        const validationErrors = Object.values(err.response.data.errors).flat();
        setError(validationErrors.join(', '));
      }
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotal = () => {
    return (parseFloat(formData.sale_price || 0) * parseInt(formData.quantity_sold || 0)).toFixed(2);
  };

  // Get selected product to show current stock
  const selectedProduct = products.find(p => p.id == formData.product_id);
  const availableStock = selectedProduct ? selectedProduct.quantity_in_stock : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link
          to="/sales"
          className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Sales
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEdit ? 'Edit Sale' : 'Create New Sale'}
        </h1>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label htmlFor="product_id" className="block text-sm font-medium text-gray-700 mb-2">
                Product *
              </label>
              <select
                id="product_id"
                name="product_id"
                required
                value={formData.product_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Product</option>
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name} ({product.sku}) - Stock: {product.quantity_in_stock}
                  </option>
                ))}
              </select>
              {selectedProduct && (
                <p className="text-sm text-gray-500 mt-1">
                  Available stock: {availableStock} units
                </p>
              )}
            </div>

            <div>
              <label htmlFor="quantity_sold" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity Sold *
              </label>
              <input
                type="number"
                id="quantity_sold"
                name="quantity_sold"
                min="1"
                max={availableStock}
                required
                value={formData.quantity_sold}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {selectedProduct && formData.quantity_sold > availableStock && (
                <p className="text-sm text-red-600 mt-1">
                  Warning: Quantity exceeds available stock!
                </p>
              )}
            </div>

            <div>
              <label htmlFor="sale_price" className="block text-sm font-medium text-gray-700 mb-2">
                Sale Price ($) *
              </label>
              <input
                type="number"
                id="sale_price"
                name="sale_price"
                step="0.01"
                min="0"
                required
                value={formData.sale_price}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="sale_date" className="block text-sm font-medium text-gray-700 mb-2">
                Sale Date *
              </label>
              <input
                type="date"
                id="sale_date"
                name="sale_date"
                required
                value={formData.sale_date}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Total Sale Amount:</span>
                <span className="text-lg font-bold text-green-600">
                  ${calculateTotal()}
                </span>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <Link
              to="/sales"
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving || (selectedProduct && formData.quantity_sold > availableStock)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {isEdit ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {isEdit ? 'Update Sale' : 'Create Sale'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaleForm;