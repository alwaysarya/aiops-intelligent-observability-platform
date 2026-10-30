import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, LayoutDashboard, BarChart3, FileText, Bell, Brain, Database, Box, FileCheck, GitBranch, Network, Server, AlertOctagon, Activity, Settings, ChevronDown, Search } from 'lucide-react'

const navItems = [
  { label: 'Home', path: '/app', icon: LayoutDashboard },
  { label: 'Analytics', path: '/app/analytics', icon: BarChart3 },
  { label: 'Logs', path: '/app/logs', icon: FileText },
  { label: 'Alerts', path: '/app/alerts', icon: Bell },
  {
    label: 'Platform',
    icon: Brain,
    dropdown: [
      { label: 'Datasets', path: '/app/datasets', icon: Database, desc: 'Data catalog & integrity' },
      { label: 'Models', path: '/app/models', icon: Box, desc: 'AI model registry' },
      { label: 'Reports', path: '/app/reports', icon: FileCheck, desc: 'Audit & compliance' },
      { label: 'Root Cause', path: '/app/root-cause', icon: GitBranch, desc: 'AI issue detection' },
      { label: 'Service Map', path: '/app/service-map', icon: Network, desc: 'Dependency topology' },
    ]
  },
  {
    label: 'Ops',
    icon: Server,
    dropdown: [
      { label: 'Kubernetes', path: '/app/kubernetes', icon: Server, desc: 'Cluster health & pods' },
      { label: 'Incidents', path: '/app/incidents', icon: AlertOctagon, desc: 'Active incident tracker' },
      { label: 'Distributed Traces', path: '/app/traces', icon: Activity, desc: 'Request waterfall' },
    ]
  },
  { label: 'Settings', path: '/app/settings', icon: Settings },
]

export default function Topbar() {
  const navigate = useNavigate()
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0A0C]/80 backdrop-blur-2xl border-b border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 h-14 flex items-center justify-between">
        
        {/* Left: Logo & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <NavLink to="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#5E6AD2] to-[#AF52DE] flex items-center justify-center shadow-lg">
              <span className="text-white text-[12px] font-black">AI</span>
            </div>
            <span className="text-[14px] font-bold text-[#EDEDED] tracking-tight hidden sm:block">
              AIOps <span className="text-[#5A5F66] font-normal">Observability</span>
            </span>
          </NavLink>

          {/* Mobile Hamburger Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#8A8F98] hover:text-[#EDEDED] transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Desktop Navigation */}
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
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 min-w-[340px]"
                      >
                        <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-[#0F1011]/95 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] p-1.5">
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

        {/* Right Side Icons (Search, Theme, Notifications, User) */}
        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/[0.05] transition-colors">
            <Search size={16} className="text-[#8A8F98]" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5E6AD2] to-[#AF52DE] flex items-center justify-center border border-white/[0.1] cursor-pointer hover:scale-105 transition-transform">
              <span className="text-[11px] font-bold text-white">AT</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#0F1011]/95 backdrop-blur-2xl border-b border-white/[0.08] md:hidden z-50 shadow-2xl max-h-[80vh] overflow-y-auto"
          >
            <div className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => {
                if (item.dropdown) {
                  return (
                    <div key={item.label} className="flex flex-col">
                      <span className="text-[11px] font-bold text-[#5A5F66] uppercase tracking-widest px-4 py-2 mt-2">{item.label}</span>
                      {item.dropdown.map(sub => (
                        <NavLink key={sub.path} to={sub.path} onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg text-[14px] font-medium text-[#8A8F98] hover:bg-white/[0.03] hover:text-[#EDEDED] transition-all"
                        >
                          <sub.icon size={16} /> {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  )
                }
                return (
                  <NavLink key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg text-[15px] font-medium transition-all ${
                      isActive ? 'bg-[#5E6AD2]/10 text-[#5E6AD2]' : 'text-[#8A8F98] hover:bg-white/[0.03] hover:text-[#EDEDED]'
                    }`}
                  >
                    <item.icon size={18} /> {item.label}
                  </NavLink>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
