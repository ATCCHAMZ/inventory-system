import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, Mail, User, Lock, Loader, Shield, Sparkles, ArrowLeft } from 'lucide-react'
import api from '../../services/api'
import { useAuth } from '../../contexts/AuthContext'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'staff'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [isVisible, setIsVisible] = useState(false)
  const [focusedField, setFocusedField] = useState('')
  
  const navigate = useNavigate()
  const { register } = useAuth()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Basic validation
    if (formData.password !== formData.password_confirmation) {
      setErrors({ password_confirmation: ['Passwords do not match'] })
      return
    }
    
    setLoading(true)
    setErrors({})

    try {
      const result = await register(formData)

      if (result.success) {
        // Redirect to dashboard on successful registration
        navigate('/Login')
      } else {
        setErrors(result.errors || {})
      }
    } catch (err) {
      console.error('Registration error:', err)
      setErrors({ general: ['Registration failed. Please try again.'] })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const FloatingOrb = ({ className, delay = 0 }) => (
    <div 
      className={`absolute rounded-full opacity-20 animate-pulse ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        background: 'linear-gradient(45deg, #10b981, #3b82f6, #8b5cf6)'
      }}
    />
  )

  const InputField = ({ 
    label, 
    name, 
    type, 
    icon: Icon, 
    showToggle = false,
    value,
    onChange,
    onFocus,
    onBlur,
    error
  }) => (
    <div className="group">
      <label className="block text-sm font-medium text-gray-300 mb-2 transition-colors group-focus-within:text-blue-400">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon className={`h-5 w-5 transition-colors duration-200 ${
            focusedField === name ? 'text-blue-400' : 'text-gray-500'
          }`} />
        </div>
        <input
          type={type}
          name={name}
          required
          className={`block w-full pl-12 pr-14 py-4 bg-white/5 backdrop-blur-sm border rounded-2xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/10 transition-all duration-200 hover:bg-white/5 ${
            error ? 'border-red-500/50' : 'border-white/10'
          }`}
          placeholder={`Enter your ${label.toLowerCase()}`}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={loading}
        />
        {showToggle && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-4 flex items-center hover:bg-white/5 rounded-r-2xl transition-colors duration-200"
            onClick={() => name === 'password' ? setShowPassword(!showPassword) : setShowConfirmPassword(!showConfirmPassword)}
            disabled={loading}
          >
            {(name === 'password' ? showPassword : showConfirmPassword) ? (
              <EyeOff className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
            )}
          </button>
        )}
        {/* Focus Ring Effect */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 transition-opacity duration-200 pointer-events-none ${
          focusedField === name ? 'opacity-100' : ''
        }`} />
      </div>
      {error && (
        <p className="mt-2 text-red-400 text-sm animate-pulse">
          {error[0]}
        </p>
      )}
    </div>
  )

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.1),transparent_50%)]" />
        
        {/* Floating Orbs */}
        <FloatingOrb className="w-72 h-72 -top-36 -left-36" delay={0} />
        <FloatingOrb className="w-96 h-96 -bottom-48 -right-48" delay={2} />
        <FloatingOrb className="w-64 h-64 top-1/2 -right-32" delay={4} />
        <FloatingOrb className="w-80 h-80 -bottom-40 -left-40" delay={1} />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="relative flex items-center justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className={`max-w-md w-full transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Back Button */}
          <button
            onClick={() => navigate('/login')}
            className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors duration-200 group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Login
          </button>

          {/* Glass Card */}
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300" />
            
            {/* Main Card */}
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
              {/* Header with Animated Gradient */}
              <div className="relative py-8 px-6 text-center">
                <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 via-blue-600/20 to-purple-600/20 backdrop-blur-sm" />
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-green-500 to-blue-600 shadow-lg">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                    Create Account
                  </h1>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Sparkles className="w-4 h-4 text-green-400" />
                    <p className="text-gray-300">Join our inventory system</p>
                    <Sparkles className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="py-8 px-6">
                {errors.general && (
                  <div className="mb-6 bg-red-500/10 backdrop-blur-sm border border-red-500/20 text-red-300 px-4 py-3 rounded-2xl animate-pulse">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                      {errors.general[0]}
                    </div>
                  </div>
                )}
                
                <div className="space-y-6">
                  <InputField
                    label="Full Name"
                    name="name"
                    type="text"
                    icon={User}
                    value={formData.name}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField('')}
                    error={errors.name}
                  />

                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    icon={Mail}
                    value={formData.email}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    error={errors.email}
                  />

                  <InputField
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    icon={Lock}
                    showToggle={true}
                    value={formData.password}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    error={errors.password}
                  />

                  <InputField
                    label="Confirm Password"
                    name="password_confirmation"
                    type={showConfirmPassword ? 'text' : 'password'}
                    icon={Lock}
                    showToggle={true}
                    value={formData.password_confirmation}
                    onChange={handleInputChange}
                    onFocus={() => setFocusedField('password_confirmation')}
                    onBlur={() => setFocusedField('')}
                    error={errors.password_confirmation}
                  />

                  {/* Role Selection */}
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Role
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="block w-full pl-4 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-white/10 transition-all duration-200 hover:bg-white/5"
                      disabled={loading}
                    >
                      <option value="staff">Staff</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="relative w-full group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-2xl" />
                    <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-blue-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative py-4 px-6 bg-gradient-to-r from-green-600/90 via-blue-600/90 to-purple-600/90 rounded-2xl backdrop-blur-sm border border-white/10 font-medium text-white group-hover:shadow-2xl group-hover:shadow-green-500/25 transition-all duration-300 group-disabled:opacity-50 group-disabled:cursor-not-allowed">
                      {loading ? (
                        <span className="flex items-center justify-center gap-3">
                          <Loader className="animate-spin h-5 w-5" />
                          <span className="animate-pulse">Creating Account...</span>
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-200">
                          Create Account
                          <div className="w-0 group-hover:w-2 h-2 bg-white/50 rounded-full transition-all duration-200" />
                        </span>
                      )}
                    </div>
                  </button>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center">
                  <p className="text-gray-400">
                    Already have an account?{' '}
                    <Link
                      to="/login"
                      className="font-medium bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-green-300 transition-all duration-200 hover:underline decoration-2 underline-offset-2"
                    >
                      Sign in here
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register