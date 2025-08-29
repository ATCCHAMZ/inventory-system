import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard'
import ProductList from './pages/Products/ProductList'
import ProductForm from './pages/Products/ProductForm'
import ProtectedRoute from './components/ProtectedRoute'
import CategoryList from './pages/Categories/CategoryList';
import CategoryForm from './pages/Categories/CategoryForm';
import SupplierList from './pages/Suppliers/SupplierList';
import SupplierForm from './pages/Suppliers/SupplierForm';
import PurchaseList from './pages/Purchases/PurchaseList';
import PurchaseForm from './pages/Purchases/PurchaseForm';
import SaleList from './pages/Sales/SaleList';
import SaleForm from './pages/Sales/SaleForm';
import Layout from './components/Layout/Layout';

function MainApp() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected Routes with Layout */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/products" element={
              <ProtectedRoute>
                <Layout>
                  <ProductList />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/products/new" element={
              <ProtectedRoute>
                <Layout>
                  <ProductForm />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/products/edit/:id" element={
              <ProtectedRoute>
                <Layout>
                  <ProductForm />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/categories" element={
              <ProtectedRoute>
                <Layout>
                  <CategoryList />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/categories/new" element={
              <ProtectedRoute>
                <Layout>
                  <CategoryForm />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/categories/edit/:id" element={
              <ProtectedRoute>
                <Layout>
                  <CategoryForm />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/suppliers" element={
              <ProtectedRoute>
                <Layout>
                  <SupplierList />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/suppliers/new" element={
              <ProtectedRoute>
                <Layout>
                  <SupplierForm />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/suppliers/edit/:id" element={
              <ProtectedRoute>
                <Layout>
                  <SupplierForm />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/purchases" element={
              <ProtectedRoute>
                <Layout>
                  <PurchaseList />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/purchases/new" element={
              <ProtectedRoute>
                <Layout>
                  <PurchaseForm />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/purchases/edit/:id" element={
              <ProtectedRoute>
                <Layout>
                  <PurchaseForm />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/sales" element={
              <ProtectedRoute>
                <Layout>
                  <SaleList />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/sales/new" element={
              <ProtectedRoute>
                <Layout>
                  <SaleForm />
                </Layout>
              </ProtectedRoute>
            } />
            
            <Route path="/sales/edit/:id" element={
              <ProtectedRoute>
                <Layout>
                  <SaleForm />
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default MainApp