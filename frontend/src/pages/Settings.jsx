import { Settings as SettingsIcon, Server } from 'lucide-react'

function Settings() {
  const services = [
    { name: 'Log Ingestion', url: 'http://localhost:8000', docs: 'http://localhost:8000/docs' },
    { name: 'AI Anomaly Detector', url: 'http://localhost:8001', docs: 'http://localhost:8001/docs' },
    { name: 'Alert Service', url: 'http://localhost:8002', docs: 'http://localhost:8002/docs' },
    { name: 'Root Cause Analyzer', url: 'http://localhost:8003', docs: 'http://localhost:8003/docs' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
        <p className="text-dark-400">Platform configuration and service endpoints</p>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Server className="w-5 h-5" />
          Service Endpoints
        </h3>
        <div className="space-y-3">
          {services.map(svc => (
            <div key={svc.name} className="p-3 rounded-lg bg-dark-900 border border-dark-700">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-white">{svc.name}</span>
                <a href={svc.docs} target="_blank" rel="noopener noreferrer" className="text-xs text-primary-400 hover:text-primary-300">
                  API Docs →
                </a>
              </div>
              <p className="text-xs text-dark-400 font-mono">{svc.url}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <SettingsIcon className="w-5 h-5" />
          About
        </h3>
        <div className="space-y-2 text-sm text-dark-300">
          <p><span className="text-dark-500">Version:</span> 1.0.0</p>
          <p><span className="text-dark-500">Platform:</span> AIOps Intelligent Observability</p>
          <p><span className="text-dark-500">License:</span> MIT</p>
        </div>
      </div>
    </div>
  )
}

export default Settings
