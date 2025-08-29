import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Edit, Trash2, Truck, Phone, Mail, MapPin } from 'lucide-react';
import { supplierService } from '../../services/suppliers';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      setLoading(true);
      const response = await supplierService.getAll();
      setSuppliers(response.data.data || []);
    } catch (err) {
      setError('Failed to load suppliers. Please try again.');
      console.error('Suppliers load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      await supplierService.delete(id);
      setSuppliers(suppliers.filter(supplier => supplier.id !== id));
      alert('Supplier deleted successfully!');
    } catch (err) {
      alert('Failed to delete supplier. Please try again.');
      console.error('Delete error:', err);
    }
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Suppliers</h1>
          <p className="text-gray-600 mt-2">Manage your product suppliers</p>
        </div>
        <Link
          to="/suppliers/new"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center mt-4 sm:mt-0"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Supplier
        </Link>
      </div>

      {/* Stats and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center">
              <Truck className="h-8 w-8 text-orange-600 mr-3" />
              <div>
                <p className="text-sm text-orange-600">Total Suppliers</p>
                <p className="text-2xl font-bold text-orange-800">{suppliers.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search suppliers by name, contact, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4">
            {error}
          </div>
        )}

        {filteredSuppliers.length === 0 ? (
          <div className="text-center py-12">
            <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">No suppliers found</h3>
            <p className="text-gray-500 mt-2">
              {searchTerm ? 'Try adjusting your search term.' : 'Get started by adding your first supplier.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredSuppliers.map((supplier) => (
              <div key={supplier.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Truck className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{supplier.name}</h3>
                      <p className="text-sm text-gray-500">{supplier.contact_name}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Link
                      to={`/suppliers/edit/${supplier.id}`}
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(supplier.id, supplier.name)}
                      className="text-red-600 hover:text-red-900 p-1"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="truncate">{supplier.email}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    <span>{supplier.phone}</span>
                  </div>

                  <div className="flex items-start text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{supplier.address}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                    {supplier.products_count || 0} products supplied
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredSuppliers.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {filteredSuppliers.length} of {suppliers.length} suppliers
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierList;