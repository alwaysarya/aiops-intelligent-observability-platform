import { useState, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield, Bell, Search, ChevronDown, LayoutDashboard, FileText, GitBranch,
  Network, Settings, Brain, BarChart3, Database, Box, FileCheck, Server,
  AlertOctagon, Activity, Sun, Moon, Sparkles
} from 'lucide-react'
import { checkAllServices } from '../../services/api'
import UserMenu from './UserMenu'
import NotificationPanel from './NotificationPanel'

const linearEase = [0.25, 0.1, 0.25, 1]

const navItems = [
  { label: 'Home', path: '/', icon: LayoutDashboard },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'Logs', path: '/logs', icon: FileText },
  { label: 'Alerts', path: '/alerts', icon: Bell },
  {
    label: 'Platform',
    icon: Brain,
    dropdown: [
      { label: 'Datasets', path: '/datasets', icon: Database, desc: 'Data catalog & integrity' },
      { label: 'Models', path: '/models', icon: Box, desc: 'AI model registry' },
      { label: 'Reports', path: '/reports', icon: FileCheck, desc: 'Audit & compliance' },
      { label: 'Root Cause', path: '/root-cause', icon: GitBranch, desc: 'AI issue detection' },
      { label: 'Service Map', path: '/service-map', icon: Network, desc: 'Dependency topology' },
    ]
  },
  {
    label: 'Ops',
    icon: Server,
    dropdown: [
      { label: 'Kubernetes', path: '/kubernetes', icon: Server, desc: 'Cluster health & pods' },
      { label: 'Incidents', path: '/incidents', icon: AlertOctagon, desc: 'Active incident tracker' },
      { label: 'Distributed Traces', path: '/traces', icon: Activity, desc: 'Request waterfall' },
    ]
  },
  { label: 'Settings', path: '/settings', icon: Settings },
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
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-[#09090B]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[60px] max-w-[1400px] items-center justify-between px-6">

        {/* Logo */}
        <NavLink to="/" className="flex shrink-0 items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-md bg-[#5E6AD2] flex items-center justify-center shadow-[0_0_15px_rgba(94,106,210,0.4)] group-hover:scale-105 transition-transform">
            <Shield size={14} className="text-white" strokeWidth={2.5} />
          </div>
          <span className="text-[14px] font-semibold tracking-tight text-[#EDEDED]">
            AIOps <span className="text-[#5A5F66] font-normal">Observability</span>
          </span>
        </NavLink>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            if (item.dropdown) {
              return (
                <div key={item.label} className="relative" onMouseEnter={() => setActiveDropdown(item.label)} onMouseLeave={() => setActiveDropdown(null)}>
                  <button className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-all ${
                    activeDropdown === item.label
                      ? 'bg-white/[0.06] text-[#EDEDED]'
                      : 'text-[#8A8F98] hover:bg-white/[0.03] hover:text-[#EDEDED]'
                  }`}>
                    {item.label} <ChevronDown size={13} className={`transition-transform duration-200 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: linearEase }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 min-w-[340px]"
                      >
                        <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#0F1011]/95 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] p-1.5">
                          {/* Header */}
                          <div className="px-3 py-2 mb-1 border-b border-white/[0.04]">
                            <p className="text-[10px] font-bold text-[#5A5F66] uppercase tracking-widest">{item.label}</p>
                          </div>

                          {item.dropdown.map(sub => (
                            <button
                              key={sub.path}
                              onClick={() => { navigate(sub.path); setActiveDropdown(null) }}
                              className="w-full flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/[0.04] transition-colors text-left group"
                            >
                              <div className="mt-0.5 w-9 h-9 rounded-lg bg-[#161718] border border-white/[0.06] flex items-center justify-center group-hover:bg-[#5E6AD2]/10 group-hover:border-[#5E6AD2]/30 transition-colors">
                                <sub.icon size={16} className="text-[#8A8F98] group-hover:text-[#5E6AD2] transition-colors" />
                              </div>
                              <div className="flex-grow">
                                <div className="text-[13px] font-medium text-[#EDEDED] group-hover:text-white transition-colors">{sub.label}</div>
                                <div className="text-[11px] text-[#5A5F66] mt-0.5">{sub.desc}</div>
                              </div>
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-2">
                                <ChevronDown size={12} className="text-[#5E6AD2] -rotate-90" />
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
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-all ${
                  isActive
                    ? 'bg-[#5E6AD2]/10 text-[#5E6AD2]'
                    : 'text-[#8A8F98] hover:bg-white/[0.03] hover:text-[#EDEDED]'
                }`}
              >
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-1.5">

          {/* Service Status */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full border border-white/[0.06] bg-white/[0.02] mr-2">
            <div className={`w-1.5 h-1.5 rounded-full ${allHealthy ? 'bg-[#30D158] animate-pulse shadow-[0_0_6px_#30D158]' : 'bg-[#E5A00D] shadow-[0_0_6px_#E5A00D]'}`} />
            <span className="text-[11px] font-medium text-[#8A8F98]">
              <span className={allHealthy ? 'text-[#30D158]' : 'text-[#E5A00D]'}>{healthyCount}</span>/{totalServices} Online
            </span>
          </div>

          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="p-2 rounded-md text-[#8A8F98] hover:bg-white/[0.04] hover:text-[#EDEDED] transition-colors">
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Search */}
          <button onClick={openCommandPalette} className="p-2 rounded-md text-[#8A8F98] hover:bg-white/[0.04] hover:text-[#EDEDED] transition-colors flex items-center gap-2">
            <Search size={16} />
            <span className="hidden xl:inline text-[10px] font-mono bg-white/[0.04] px-1.5 py-0.5 rounded border border-white/[0.06] text-[#5A5F66]">⌘K</span>
          </button>

          {/* Notifications */}
          <button onClick={() => setIsNotifOpen(true)} className="relative p-2 rounded-md text-[#8A8F98] hover:bg-white/[0.04] hover:text-[#EDEDED] transition-colors">
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#FF453A] border-2 border-[#09090B] animate-pulse shadow-[0_0_6px_#FF453A]" />
          </button>

          <UserMenu />
        </div>
      </div>

      <NotificationPanel isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </header>
  )
}

export default Topbar
