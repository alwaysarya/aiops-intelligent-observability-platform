import { Navigate, Outlet } from 'react-router-dom'
import { authService } from '../../services/auth'

export default function ProtectedRoute() {
  const isAuth = authService.isAuthenticated()
  
  if (!isAuth) {
    return <Navigate to="/login" replace />
  }
  
  return <Outlet />
}
