import React from 'react'
import ReactDOM from 'react-dom/client'
import MainApp from './MainApp'  // Updated import
import './index.css'

// Debug message
console.log('✅ React app.js is loading...')

// This is the entry point that gets loaded by Laravel
ReactDOM.createRoot(document.getElementById('app')).render(
  React.createElement(React.StrictMode, null,
    React.createElement(MainApp, null)
  )
)