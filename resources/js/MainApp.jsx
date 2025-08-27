import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Dashboard from './pages/Dashboard'
import ProductList from './pages/Products/ProductList'
import ProductForm from './pages/Products/ProductForm'
import ProtectedRoute from './components/ProtectedRoute'
import CategoryList from './pages/Categories/CategoryList';
import CategoryForm from './pages/Categories/CategoryForm';

function MainApp() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/products" element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          } />
          <Route path="/products/new" element={
            <ProtectedRoute>
              <ProductForm />
            </ProtectedRoute>
          } />
          <Route path="/products/edit/:id" element={
            <ProtectedRoute>
              <ProductForm />
            </ProtectedRoute>
          } />
          <Route path="/categories" element={
  <ProtectedRoute>
    <CategoryList />
  </ProtectedRoute>
} />
<Route path="/categories/new" element={
  <ProtectedRoute>
    <CategoryForm />
  </ProtectedRoute>
} />
<Route path="/categories/edit/:id" element={
  <ProtectedRoute>
    <CategoryForm />
  </ProtectedRoute>
} />
        </Routes>
      </div>
    </Router>
    
  )
}

export default MainApp

