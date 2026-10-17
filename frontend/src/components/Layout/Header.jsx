import { useEffect, useState } from 'react'
import { Activity, RefreshCw } from 'lucide-react'
import { checkAllServices } from '../../services/api'

function Header() {
  const [services, setServices] = useState({
    ingestion: false,
    anomaly: false,
    alerts: false,
    rca: false,
  })
  const [lastCheck, setLastCheck] = useState(new Date())

  const checkHealth = async () => {
    const results = await checkAllServices()
    setServices(results)
    setLastCheck(new Date())
  }

  useEffect(() => {
    checkHealth()
    const interval = setInterval(checkHealth, 30000)
    return () => clearInterval(interval)
  }, [])

  const healthyCount = Object.values(services).filter(Boolean).length
  const totalServices = Object.keys(services).length

  return (
    <header className="h-16 bg-dark-800 border-b border-dark-700 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-white">
          AIOps Observability Platform
        </h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Activity
            className={`w-4 h-4 ${
              healthyCount === totalServices ? 'text-green-400' : 'text-yellow-400'
            }`}
          />
          <span className="text-sm text-dark-300">
            Services:{' '}
            <span
              className={
                healthyCount === totalServices ? 'text-green-400' : 'text-yellow-400'
              }
            >
              {healthyCount}/{totalServices}
            </span>
          </span>
        </div>

        <button
          onClick={checkHealth}
          className="p-2 rounded-lg hover:bg-dark-700 transition-colors"
          title={`Last check: ${lastCheck.toLocaleTimeString()}`}
        >
          <RefreshCw className="w-4 h-4 text-dark-300" />
        </button>
      </div>
    </header>
  )
}

export default Header
