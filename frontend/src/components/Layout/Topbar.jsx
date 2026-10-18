import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Bell, Search, ChevronDown, LayoutDashboard, FileText, GitBranch, Network, Settings, Brain, BarChart3, Database, Box, FileCheck, Server, AlertOctagon, Activity, Sun, Moon } from 'lucide-react'
import { checkAllServices } from '../../services/api'
import UserMenu from './UserMenu'
import NotificationPanel from './NotificationPanel'

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Analytics', path: '/dashboard/analytics', icon: BarChart3 },
  { label: 'Logs', path: '/dashboard/logs', icon: FileText },
  { label: 'Alerts', path: '/dashboard/alerts', icon: Bell },
  { 
    label: 'Platform', 
    icon: Brain,
    dropdown: [
      { label: 'Datasets', path: '/dashboard/datasets', icon: Database, desc: 'Data catalog & integrity' },
      { label: 'Models', path: '/dashboard/models', icon: Box, desc: 'AI model registry' },
      { label: 'Reports', path: '/dashboard/reports', icon: FileCheck, desc: 'Audit & compliance' },
      { label: 'Root Cause', path: '/dashboard/root-cause', icon: GitBranch, desc: 'AI issue detection' },
      { label: 'Service Map', path: '/dashboard/service-map', icon: Network, desc: 'Dependency topology' },
    ]
  },
  {
    label: 'Ops',
    icon: Server,
    dropdown: [
      { label: 'Kubernetes', path: '/dashboard/kubernetes', icon: Server, desc: 'Cluster health & pods' },
      { label: 'Incidents', path: '/dashboard/incidents', icon: AlertOctagon, desc: 'Active incident tracker' },
      { label: 'Distributed Traces', path: '/dashboard/traces', icon: Activity, desc: 'Request waterfall' },
    ]
  },
  { label: 'Settings', path: '/dashboard/settings', icon: Settings },
]

function Topbar() {
  const [services, setServices] = useState({ ingestion: false, anomaly: false, alerts: false, rca: false })
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const [isDark, setIsDark] = useState(() => document.documentElement.classList.contains('dark'))
  const navigate = useNavigate()

  const checkHealth = async () => {
    const results = await checkAllServices()
    setServices(results)
  }

  useEffect(() => {
    checkHealth()
    const interval = setInterval(checkHealth, 30000)
    return () => clearInterval(interval)
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const healthyCount = Object.values(services).filter(Boolean).length
  const totalServices = Object.keys(services).length
  const allHealthy = healthyCount === totalServices

  const openCommandPalette = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-black/[0.06] bg-white/90 dark:bg-gray-900/90 dark:border-gray-800 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex h-[64px] max-w-[1400px] items-center justify-between px-6">
        
        <NavLink to="/dashboard" className="flex shrink-0 items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-apple-blue flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Shield size={16} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-text-primary dark:text-white">
            AIOps <span className="text-text-tertiary font-normal">Observability</span>
          </span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            if (item.dropdown) {
              return (
                <div key={item.label} className="relative" onMouseEnter={() => setActiveDropdown(item.label)} onMouseLeave={() => setActiveDropdown(null)}>
                  <button className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${activeDropdown === item.label ? 'bg-ink-grey text-text-primary dark:bg-gray-800 dark:text-white' : 'text-text-secondary hover:bg-ink-grey/50 dark:text-gray-400'}`}>
                    {item.label} <ChevronDown size={14} className={`transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }} className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 min-w-[320px]">
                        <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white dark:bg-gray-800 dark:border-gray-700 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] p-2">
                          {item.dropdown.map(sub => (
                            <button key={sub.path} onClick={() => { navigate(sub.path); setActiveDropdown(null) }} className="w-full flex items-start gap-3 p-3 rounded-xl hover:bg-ink-grey dark:hover:bg-gray-700 transition-colors text-left group">
                              <div className="mt-0.5 p-2 rounded-lg bg-blue-50 text-apple-blue dark:bg-gray-900 group-hover:bg-apple-blue group-hover:text-white transition-colors">
                                <sub.icon size={16} />
                              </div>
                              <div>
                                <div className="text-[13px] font-semibold text-text-primary dark:text-white">{sub.label}</div>
                                <div className="text-[11px] text-text-tertiary mt-0.5">{sub.desc}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            }
            return (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => `flex items-center gap-1.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${isActive ? 'bg-blue-50 text-apple-blue dark:bg-gray-800 dark:text-blue-400' : 'text-text-secondary hover:bg-ink-grey/50 dark:text-gray-400 dark:hover:bg-gray-800'}`}>
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/[0.08] bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm mr-2">
            <div className={`w-2 h-2 rounded-full ${allHealthy ? 'bg-apple-green animate-pulse' : 'bg-apple-orange'}`} />
            <span className="text-[11px] font-medium text-text-secondary dark:text-gray-300">{healthyCount}/{totalServices} Online</span>
          </div>

          <button onClick={toggleTheme} className="p-2 rounded-lg text-text-tertiary hover:bg-ink-grey dark:hover:bg-gray-800 transition-colors">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button onClick={openCommandPalette} className="p-2 rounded-lg text-text-tertiary hover:bg-ink-grey dark:hover:bg-gray-800 transition-colors flex items-center gap-2">
            <Search size={18} />
            <span className="hidden xl:inline text-[11px] font-mono bg-ink-grey dark:bg-gray-800 px-1.5 py-0.5 rounded border border-black/[0.06] dark:border-gray-700">⌘K</span>
          </button>

          <button onClick={() => setIsNotifOpen(true)} className="relative p-2 rounded-lg text-text-tertiary hover:bg-ink-grey dark:hover:bg-gray-800 transition-colors">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-apple-red border-2 border-white dark:border-gray-900 animate-pulse" />
          </button>

          <UserMenu />
        </div>

      </div>

      <NotificationPanel isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </header>
  )
}

export default Topbar
