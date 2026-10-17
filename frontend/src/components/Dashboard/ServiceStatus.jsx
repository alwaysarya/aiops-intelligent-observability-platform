import { CheckCircle2, XCircle, Server } from 'lucide-react'

function ServiceStatus({ services }) {
  const serviceList = [
    { key: 'ingestion', name: 'Log Ingestion', port: 8000 },
    { key: 'anomaly', name: 'AI Anomaly Detector', port: 8001 },
    { key: 'alerts', name: 'Alert Service', port: 8002 },
    { key: 'rca', name: 'Root Cause Analyzer', port: 8003 },
  ]

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Server className="w-5 h-5" />
        Service Status
      </h3>
      <div className="space-y-3">
        {serviceList.map(({ key, name, port }) => {
          const isHealthy = services[key]
          return (
            <div
              key={key}
              className="flex items-center justify-between p-3 rounded-lg bg-dark-900 border border-dark-700"
            >
              <div className="flex items-center gap-3">
                {isHealthy ? (
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400" />
                )}
                <div>
                  <p className="text-sm font-medium text-white">{name}</p>
                  <p className="text-xs text-dark-400">Port {port}</p>
                </div>
              </div>
              <span
                className={`badge ${
                  isHealthy ? 'badge-low' : 'badge-critical'
                }`}
              >
                {isHealthy ? 'Healthy' : 'Down'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ServiceStatus
