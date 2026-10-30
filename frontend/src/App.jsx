import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import ProtectedRoute from './components/Layout/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import AnalyticsPage from './pages/AnalyticsPage'
import Logs from './pages/Logs'
import Alerts from './pages/Alerts'
import RootCause from './pages/RootCause'
import ServiceMapPage from './pages/ServiceMapPage'
import SLAPage from './pages/SLAPage'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'
import DatasetsPage from './pages/DatasetsPage'
import ModelsPage from './pages/ModelsPage'
import ReportsPage from './pages/ReportsPage'
import KubernetesPage from './pages/KubernetesPage'
import IncidentsPage from './pages/IncidentsPage'
import IncidentDetail from './pages/IncidentDetail'
import TracesPage from './pages/TracesPage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <Routes>
      {/* 1. Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* 2. Protected Routes (Login Required) */}
      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="logs" element={<Logs />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="root-cause" element={<RootCause />} />
          <Route path="service-map" element={<ServiceMapPage />} />
          <Route path="sla" element={<SLAPage />} />
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
      </Route>

      {/* 3. Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
