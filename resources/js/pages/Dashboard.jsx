import React from 'react'
import { Link } from 'react-router-dom'
import { Package, Tags, Truck, ShoppingCart, AlertCircle } from 'lucide-react'

const Dashboard = () => {
  const stats = [
    { label: 'Total Products', value: '0', icon: Package, color: 'blue' },
    { label: 'Categories', value: '0', icon: Tags, color: 'green' },
    { label: 'Suppliers', value: '0', icon: Truck, color: 'purple' },
    { label: 'Low Stock', value: '0', icon: AlertCircle, color: 'red' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your inventory management system</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/products"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
          >
            <Package className="h-6 w-6 text-blue-600 mr-3" />
            <span className="text-gray-700">Manage Products</span>
          </Link>
          <Link
            to="/categories"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors"
          >
            <Tags className="h-6 w-6 text-green-600 mr-3" />
            <span className="text-gray-700">Manage Categories</span>
          </Link>
          <Link
            to="/sales"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors"
          >
            <ShoppingCart className="h-6 w-6 text-purple-600 mr-3" />
            <span className="text-gray-700">View Sales</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard