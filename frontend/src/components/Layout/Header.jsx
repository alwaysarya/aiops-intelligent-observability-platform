import { useEffect, useState } from 'react'
import { Activity, RefreshCw, Search, Bell } from 'lucide-react'
import { checkAllServices } from '../../services/api'
import { motion } from 'framer-motion'

function Header() {
  const [services, setServices] = useState({ ingestion: false, anomaly: false, alerts: false, rca: false })
  const [lastCheck, setLastCheck] = useState(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const checkHealth = async () => {
    setIsRefreshing(true)
    const results = await checkAllServices()
    setServices(results)
    setLastCheck(new Date())
    setTimeout(() => setIsRefreshing(false), 500)
  }

  useEffect(() => {
    checkHealth()
    const interval = setInterval(checkHealth, 30000)
    return () => clearInterval(interval)
  }, [])

  const healthyCount = Object.values(services).filter(Boolean).length
  const totalServices = Object.keys(services).length
  const allHealthy = healthyCount === totalServices

  return (
    <header className="h-16 relative flex items-center justify-between px-6 border-b border-black/[0.06] bg-white/80 backdrop-blur-xl">
      <div className="flex items-center gap-6">
        <h2 className="text-[15px] font-semibold text-text-primary">
          AIOps <span className="text-text-tertiary">Observability</span>
        </h2>
      </div>

      <div className="flex items-center gap-4">
        {/* Search hint */}
        <button
          onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-black/[0.08] bg-ink-grey hover:bg-white transition-all text-[12px] text-text-tertiary"
        >
          <Search size={14} />
          <span>Search</span>
          <kbd className="px-1.5 py-0.5 bg-white rounded border border-black/[0.08] text-[10px] font-mono">⌘K</kbd>
        </button>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/[0.08] bg-white shadow-sm">
          <div className={`w-2 h-2 rounded-full ${allHealthy ? 'bg-apple-green' : 'bg-apple-orange'}`} />
          <span className="text-[12px] font-medium text-text-secondary">
            Services: <span className={allHealthy ? 'text-apple-green font-bold' : 'text-apple-orange font-bold'}>{healthyCount}/{totalServices}</span>
          </span>
        </div>

        <button onClick={checkHealth} className="p-2 rounded-lg hover:bg-ink-grey transition-colors">
          <RefreshCw className={`w-4 h-4 text-text-tertiary ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>

        <button className="relative p-2 rounded-lg hover:bg-ink-grey transition-colors">
          <Bell className="w-4 h-4 text-text-tertiary" />
        </button>
      </div>
    </header>
  )
}

export default Header
