import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { authService } from './services/auth'
import Layout from './components/Layout/Layout'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import AnalyticsPage from './pages/AnalyticsPage'
import Logs from './pages/Logs'
import Alerts from './pages/Alerts'
import RootCause from './pages/RootCause'
import ServiceMapPage from './pages/ServiceMapPage'
import Settings from './pages/Settings'
import LoginPage from './pages/LoginPage'
import NotFound from './pages/NotFound'
import DatasetsPage from './pages/DatasetsPage'
import ModelsPage from './pages/ModelsPage'
import ReportsPage from './pages/ReportsPage'
import KubernetesPage from './pages/KubernetesPage'
import IncidentsPage from './pages/IncidentsPage'
import IncidentDetail from './pages/IncidentDetail'
import TracesPage from './pages/TracesPage'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated())

  useEffect(() => {
    const handleLogin = () => setIsAuthenticated(true)
    window.addEventListener('login-success', handleLogin)
    return () => window.removeEventListener('login-success', handleLogin)
  }, [])

  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Login */}
      <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/dashboard" />} />
      
      {/* Protected App Routes */}
      <Route path="/dashboard" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
        <Route index element={<Dashboard />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="logs" element={<Logs />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="root-cause" element={<RootCause />} />
        <Route path="service-map" element={<ServiceMapPage />} />
        <Route path="datasets" element={<DatasetsPage />} />
        <Route path="models" element={<ModelsPage />} />
        <Route path="reports" element={<ReportsPage />} />
        <Route path="kubernetes" element={<KubernetesPage />} />
        <Route path="incidents" element={<IncidentsPage />} />
        <Route path="incidents/:id" element={<IncidentDetail />} />
        <Route path="traces" element={<TracesPage />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
