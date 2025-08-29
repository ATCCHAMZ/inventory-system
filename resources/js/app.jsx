import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './MainApp'
import '../css/app.css' // Import your CSS file

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)