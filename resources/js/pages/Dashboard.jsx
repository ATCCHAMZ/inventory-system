import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Package, Tags, Truck, ShoppingCart, AlertCircle, RefreshCw } from 'lucide-react'
import api from '../services/api'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalSuppliers: 0,
    lowStockItems: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch dashboard data from API
  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Make API calls to get dashboard statistics
      const [productsRes, categoriesRes, suppliersRes, lowStockRes] = await Promise.all([
        api.get('/api/products'),
        api.get('/api/categories'),
        api.get('/api/suppliers'),
        api.get('/api/products?low_stock=true') // Assuming you have a low stock endpoint
      ])

      setStats({
        totalProducts: productsRes.data.data?.length || 0,
        totalCategories: categoriesRes.data.data?.length || 0,
        totalSuppliers: suppliersRes.data.data?.length || 0,
        lowStockItems: lowStockRes.data.data?.length || 0
      })
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err)
      setError('Failed to load dashboard data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const statItems = [
    { 
      label: 'Total Products', 
      value: stats.totalProducts, 
      icon: Package, 
      color: 'blue', 
      gradient: 'from-blue-500 to-blue-600' 
    },
    { 
      label: 'Categories', 
      value: stats.totalCategories, 
      icon: Tags, 
      color: 'green', 
      gradient: 'from-emerald-500 to-green-600' 
    },
    { 
      label: 'Suppliers', 
      value: stats.totalSuppliers, 
      icon: Truck, 
      color: 'purple', 
      gradient: 'from-purple-500 to-violet-600' 
    },
    { 
      label: 'Low Stock', 
      value: stats.lowStockItems, 
      icon: AlertCircle, 
      color: 'red', 
      gradient: 'from-red-500 to-pink-600' 
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Header */}
        <div className="mb-12 text-center">
          <div className="inline-block p-8 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl mb-6 transform hover:scale-105 transition-all duration-300">
            <h1 className="text-5xl font-black text-white tracking-tight">
              Dashboard
            </h1>
          </div>
          <div className="flex items-center justify-center gap-4">
            <p className="text-xl text-gray-600 font-medium bg-white/70 backdrop-blur-sm rounded-full px-8 py-3 inline-block shadow-lg">
              ✨ Welcome to your inventory management system ✨
            </p>
            <button
              onClick={fetchDashboardData}
              className="p-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all"
              title="Refresh data"
            >
              <RefreshCw className="h-5 w-5 text-indigo-600" />
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative">
            <span>{error}</span>
            <button
              onClick={() => setError(null)}
              className="absolute top-0 right-0 p-2"
            >
              &times;
            </button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {statItems.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div 
                key={index} 
                className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-0 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 hover:bg-white"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.8s ease-out forwards'
                }}
              >
                {/* Background Gradient Glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative flex items-center">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${stat.gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="ml-6">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                    <p className="text-4xl font-black text-gray-800 mt-1">{stat.value}</p>
                  </div>
                </div>

                {/* Sparkle Effect */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-0 p-10 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 opacity-50"></div>
          
          <div className="relative">
            <h2 className="text-3xl font-black text-gray-800 mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              🚀 Quick Actions
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                to="/products"
                className="group relative flex items-center p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl text-white overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Package className="h-8 w-8 mr-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-lg font-bold">Manage Products</span>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                </div>
              </Link>

              <Link
                to="/categories"
                className="group relative flex items-center p-6 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl hover:from-emerald-600 hover:to-green-700 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl text-white overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Tags className="h-8 w-8 mr-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-lg font-bold">Manage Categories</span>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                </div>
              </Link>

              <Link
                to="/suppliers"
                className="group relative flex items-center p-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl hover:from-orange-600 hover:to-red-600 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl text-white overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Truck className="h-8 w-8 mr-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-lg font-bold">Manage Suppliers</span>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </Link>

              <Link
                to="/purchases"
                className="group relative flex items-center p-6 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl hover:from-purple-600 hover:to-violet-700 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl text-white overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Package className="h-8 w-8 mr-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-lg font-bold">Manage Purchases</span>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                </div>
              </Link>

              <Link
                to="/sales"
                className="group relative flex items-center p-6 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl hover:from-pink-600 hover:to-rose-700 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-2xl text-white overflow-hidden md:col-span-2 lg:col-span-1"
              >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <ShoppingCart className="h-8 w-8 mr-4 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-lg font-bold">View Sales</span>
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="fixed top-20 right-10 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-70 animate-pulse"></div>
        <div className="fixed bottom-20 left-10 w-6 h-6 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-50 animate-bounce"></div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

export default Dashboard