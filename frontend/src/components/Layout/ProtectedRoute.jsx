import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
  // Check if token exists in sessionStorage
  const token = sessionStorage.getItem('aiops_token')
  
  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />
  }
  
  // If token exists, render child routes
  return <Outlet />
}
