import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout'
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


function PageTitle({ title }) {
  useEffect(() => {
    document.title = `${title} | AIOps Observability`
  }, [title])
  return null
}

function App() {
  return (
    <Routes>
      {/* 1. Landing Page (Default at '/') */}
      <Route path="/" element={<><PageTitle title='Home' /><LandingPage /></>} />
      
      {/* 2. App Layout (Dashboard) at '/app' */}
      <Route path="/app" element={<Layout />}>
        <Route index element={<><PageTitle title='Dashboard' /><Dashboard /></>} />
        <Route path="analytics" element={<><PageTitle title='Analytics' /><AnalyticsPage /></>} />
        <Route path="logs" element={<><PageTitle title='Logs' /><Logs /></>} />
        <Route path="alerts" element={<><PageTitle title='Alerts' /><Alerts /></>} />
        <Route path="root-cause" element={<><PageTitle title='Root Cause' /><RootCause /></>} />
        <Route path="service-map" element={<><PageTitle title='Service Map' /><ServiceMapPage /></>} />
        <Route path="sla" element={<><PageTitle title='SLA' /><SLAPage /></>} />
        <Route path="datasets" element={<><PageTitle title='Datasets' /><DatasetsPage /></>} />
        <Route path="models" element={<><PageTitle title='Models' /><ModelsPage /></>} />
        <Route path="reports" element={<><PageTitle title='Reports' /><ReportsPage /></>} />
        <Route path="kubernetes" element={<><PageTitle title='Kubernetes' /><KubernetesPage /></>} />
        <Route path="incidents" element={<><PageTitle title='Incidents' /><IncidentsPage /></>} />
        <Route path="incidents/:id" element={<IncidentDetail />} />
        <Route path="traces" element={<><PageTitle title='Traces' /><TracesPage /></>} />
        <Route path="settings" element={<><PageTitle title='Settings' /><Settings /></>} />
        <Route path="*" element={<NotFound />} />
      </Route>
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
