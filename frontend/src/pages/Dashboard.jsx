import { useEffect, useState } from 'react'
import { FileText, AlertTriangle, Bell, GitBranch, Activity } from 'lucide-react'
import MetricsCard from '../components/Dashboard/MetricsCard'
import ServiceStatus from '../components/Dashboard/ServiceStatus'
import { checkAllServices, rcaApi } from '../services/api'

function Dashboard() {
  const [services, setServices] = useState({ ingestion: false, anomaly: false, alerts: false, rca: false })
  const [graphStats, setGraphStats] = useState({ nodes: 0, edges: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      const healthResults = await checkAllServices()
      setServices(healthResults)

      try {
        const stats = await rcaApi.graphStats()
        setGraphStats({ nodes: stats.nodes || 0, edges: stats.edges || 0 })
      } catch (e) {
        console.log('RCA not available')
      }

      setLoading(false)
    }
    loadData()
    const interval = setInterval(loadData, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-dark-400">Real-time overview of your AIOps platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard title="Total Logs" value="0" icon={FileText} color="primary" />
        <MetricsCard title="Anomalies" value="0" icon={AlertTriangle} color="yellow" />
        <MetricsCard title="Alerts" value="0" icon={Bell} color="red" />
        <MetricsCard title="Root Causes" value="0" icon={GitBranch} color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ServiceStatus services={services} />

        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Dependency Graph
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-dark-900 border border-dark-700">
              <span className="text-sm text-dark-300">Services (Nodes)</span>
              <span className="text-2xl font-bold text-primary-400">{graphStats.nodes}</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-dark-900 border border-dark-700">
              <span className="text-sm text-dark-300">Dependencies (Edges)</span>
              <span className="text-2xl font-bold text-green-400">{graphStats.edges}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
