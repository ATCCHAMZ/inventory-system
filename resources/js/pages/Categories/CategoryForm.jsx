import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Tags } from 'lucide-react';
import { categoryService } from '../../services/categories';

const CategoryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    if (isEdit) {
      loadCategory();
    }
  }, [id]);

  const loadCategory = async () => {
    try {
      setLoading(true);
      const response = await categoryService.getById(id);
      const category = response.data.data;
      
      setFormData({
        name: category.name || '',
        description: category.description || ''
      });
    } catch (err) {
      setError('Failed to load category');
      console.error('Load category error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      if (isEdit) {
        await categoryService.update(id, formData);
        alert('Category updated successfully!');
      } else {
        await categoryService.create(formData);
        alert('Category created successfully!');
      }
      navigate('/categories');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          `Failed to ${isEdit ? 'update' : 'create'} category`;
      setError(errorMessage);
      
      // Show validation errors if they exist
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
          to="/categories"
          className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Categories
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEdit ? 'Edit Category' : 'Add New Category'}
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
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Category Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter category name"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter category description"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <Link
              to="/categories"
              className="px-4 py-2 text-gray-600 hover:text-gray-900"
            >
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
                  {isEdit ? 'Update Category' : 'Create Category'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;