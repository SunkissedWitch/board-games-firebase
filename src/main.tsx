import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from './router'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CartProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </CartProvider>
  </React.StrictMode>,
)
