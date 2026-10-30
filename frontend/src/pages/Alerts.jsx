import { useState, useEffect, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Bell, ShieldAlert, Send, CheckCircle2, AlertTriangle, Zap, Server, Activity, ArrowUpRight, Search, Filter, ShieldCheck, BarChart2 } from 'lucide-react'
import { showToast } from '../components/Premium/Toast'

const ease = [0.25, 0.1, 0.25, 1]

export default function Alerts() {
  const [initialAlerts] = useState([
    { id: 1, title: 'Model Drift Detected', desc: 'yolov8n.pt accuracy dropped by 4%', severity: 'CRITICAL', time: '2 mins ago', icon: AlertTriangle, color: '#FF453A', status: 'Active' },
    { id: 2, title: 'Precision Drop', desc: 'custom_v2.pt precision dropped by 2%', severity: 'WARNING', time: '15 mins ago', icon: ShieldAlert, color: '#E9A23B', status: 'Active' },
    { id: 3, title: 'High Latency', desc: 'Inference latency > 200ms on node-04', severity: 'WARNING', time: '1 hour ago', icon: Server, color: '#E9A23B', status: 'Active' },
  ])
  
  const [alerts, setAlerts] = useState(initialAlerts)
  const [isTesting, setIsTesting] = useState(false)
  const [assignedTo, setAssignedTo] = useState({})
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [selectedAlert, setSelectedAlert] = useState(null)
  const searchInputRef = useRef(null)
  const [liveTime, setLiveTime] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    const timer = setInterval(() => setLiveTime(new Date().toLocaleTimeString()), 1000)
    return () => clearInterval(timer)
  }, [])
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('ALL')

  // Search & Filter Logic
  const filteredAlerts = useMemo(() => {
    return alerts.filter(alert => {
      const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) || alert.desc.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter = filter === 'ALL' || alert.severity === filter
      return matchesSearch && matchesFilter
    })
  }, [alerts, searchTerm, filter])

  
  
  
  const handleAssign = (id, team) => {
    setAssignedTo({ ...assignedTo, [id]: team })
    showToast(`Alert assigned to ${team}`, 'success')
  }

  
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        searchInputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    let interval
    if (autoRefresh) {
      interval = setInterval(() => {
        // Simulate fetch/refresh by adding a mock alert occasionally or just logging
        console.log('Auto-refreshing alerts...')
      }, 10000)
    }
    return () => clearInterval(interval)
  }, [autoRefresh])

  const handleResolve = (id) => {
    setAlerts(alerts.filter(a => a.id !== id))
    showToast('Alert resolved successfully', 'success')
  }

  const handleExport = () => {
    const headers = ['ID', 'Title', 'Description', 'Severity', 'Time', 'Status']
    const csvData = alerts.map(a => [a.id, a.title, a.desc, a.severity, a.time, a.status].join(','))
    const csvContent = "data:text/csv;charset=utf-8," + headers.join(',') + "\n" + csvData.join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "aiops_alerts.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    showToast('Alerts exported to CSV', 'success')
  }

  const stats = [
    { label: 'Total Alerts', value: alerts.length, icon: Bell, color: '#1D1D1F' },
    { label: 'Critical', value: alerts.filter(a => a.severity === 'CRITICAL').length, icon: AlertTriangle, color: '#FF453A' },
    { label: 'Warnings', value: alerts.filter(a => a.severity === 'WARNING').length, icon: ShieldAlert, color: '#E9A23B' },
    { label: 'System Status', value: 'Healthy', icon: ShieldCheck, color: '#30D158' },
  ]

  const handleTestAlert = () => {
    setIsTesting(true)
    setTimeout(() => {
      setIsTesting(false)
      const newAlert = {
        id: Date.now(), title: 'Test Signal Received', desc: 'Test payload processed successfully.', severity: 'WARNING', time: 'Just now', icon: Zap, color: '#E9A23B', status: 'Active'
      }
      setAlerts([newAlert, ...alerts])
      showToast('Test alert triggered successfully!', 'success')
    }, 1200)
  }

  const handleAcknowledgeAll = () => {
    setAlerts([])
    showToast('All alerts acknowledged', 'success')
  }

  return (
    <div className="w-full min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-[-apple-system,BlinkMacSystemFont,'Inter',sans-serif] antialiased selection:bg-[#0071E3]/20 relative overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden border-b border-black/[0.06]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#FF453A]/[0.06] blur-[130px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-[1240px] mx-auto px-8 py-20 md:py-28 flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease }} className="max-w-2xl flex-1">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-black/[0.06] bg-white/80 backdrop-blur-xl mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF453A] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF453A]" />
              </span>
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#6E6E73]">Live Routing</span>
              <span className="ml-2 pl-2 border-l border-black/[0.1] text-[11px] font-mono font-bold text-[#FF453A]">{liveTime}</span>
            </div>
            <h1 className="text-[clamp(52px,6.5vw,96px)] font-black tracking-[-0.055em] leading-[0.92] mb-6">
              Alert<br />
              <span className="bg-gradient-to-r from-[#FF453A] to-[#E9A23B] bg-clip-text text-transparent">Routing.</span>
            </h1>
            <p className="text-[19px] leading-[1.65] text-[#6E6E73] max-w-[480px] font-medium mb-10">
              Route <span className="text-[#FF453A] font-semibold">critical signals</span> to the right teams instantly. Zero noise, maximum impact.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button onClick={handleAcknowledgeAll} className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-black text-white text-[15px] font-semibold hover:bg-[#0071E3] transition-all shadow-[0_15px_35px_-10px_rgba(0,0,0,0.3)] hover:scale-105">
                <CheckCircle2 size={18} /> Acknowledge All
              </button>
              <button onClick={handleExport} className="inline-flex items-center gap-2 h-14 px-6 rounded-full bg-white border border-black/[0.1] text-[#1D1D1F] text-[14px] font-semibold hover:bg-[#F5F5F7] transition-all shadow-sm">
                <Download size={16} /> Export
              </button>
              <div className="flex items-center gap-3 h-14 px-5 rounded-full bg-white border border-black/[0.1] shadow-sm">
                <span className="text-[13px] font-bold text-[#6E6E73]">Auto-Refresh</span>
                <button onClick={() => setAutoRefresh(!autoRefresh)} className={`w-10 h-5 rounded-full transition-colors relative ${autoRefresh ? 'bg-[#30D158]' : 'bg-[#D1D1D6]'}`}>
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${autoRefresh ? 'left-[22px]' : 'left-0.5'}`} />
                </button>
              </div>
            </div>
          </motion.div>

          {/* 3D RADAR VISUAL */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.2, ease }} className="hidden md:flex relative w-[400px] h-[400px] items-center justify-center shrink-0">
            <div className="absolute inset-0 bg-[#FF453A]/[0.02] rounded-full blur-3xl" />
            <div className="absolute inset-0 border-[1.5px] border-black/[0.04] rounded-full animate-[spin_80s_linear_infinite]" />
            <div className="absolute inset-[50px] border-[1.5px] border-black/[0.06] rounded-full animate-[spin_50s_linear_infinite_reverse]" />
            <div className="absolute inset-[100px] border-[1.5px] border-black/[0.08] rounded-full" />
            
            {/* Center Bell */}
            <div className="relative z-10 w-28 h-28 rounded-full bg-white border border-black/[0.06] shadow-[0_25px_50px_-12px_rgba(255,69,58,0.25)] flex items-center justify-center">
              <Bell size={44} className="text-[#FF453A]" />
              <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-[#FF453A] text-white text-[12px] font-bold flex items-center justify-center border-4 border-white shadow-lg">
                {alerts.length}
              </div>
            </div>

            {/* Floating Icons */}
            <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }} className="absolute top-[10%] right-[15%] w-14 h-14 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-black/[0.04] flex items-center justify-center">
              <ShieldAlert size={24} className="text-[#E9A23B]" />
            </motion.div>
            <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.5 }} className="absolute bottom-[15%] left-[10%] w-14 h-14 bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-black/[0.04] flex items-center justify-center">
              <Server size={24} className="text-[#0071E3]" />
            </motion.div>
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 1 }} className="absolute top-[40%] -right-[5%] w-10 h-10 bg-white/80 backdrop-blur-xl rounded-xl shadow-lg border border-black/[0.04] flex items-center justify-center">
              <Zap size={18} className="text-[#FFD60A]" />
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* MAIN CONTENT */}
      <section className="relative w-full bg-[#FBFBFD] py-12">
        <div className="max-w-[1240px] mx-auto px-8">
          

          {/* SEVERITY OVERVIEW CHART */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, ease }}
            className="bg-white rounded-[24px] p-6 border border-black/[0.06] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#0071E3]/10 border border-[#0071E3]/20 flex items-center justify-center">
                <BarChart2 size={18} className="text-[#0071E3]" />
              </div>
              <div>
                <h3 className="font-bold text-[16px] text-[#1D1D1F]">Alert Distribution</h3>
                <p className="text-[12px] text-[#86868B] font-medium">Current severity breakdown</p>
              </div>
            </div>
            
            <div className="flex items-end justify-between gap-8 w-full max-w-lg h-48 mt-4">
              {/* Critical Bar */}
              <div className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
                <div className="w-full bg-[#F5F5F7] rounded-t-xl h-[100%] relative overflow-hidden">
                  <div 
                    style={{ height: `${alerts.length ? Math.max((alerts.filter(a => a.severity === 'CRITICAL').length / alerts.length) * 100, 20) : 20}%` }} 
                    className="absolute bottom-0 w-full bg-gradient-to-t from-[#FF453A] to-[#FF453A]/80 rounded-t-xl shadow-[0_0_15px_rgba(255,69,58,0.4)] transition-all duration-1000">
                  </div>
                </div>
                <span className="text-[12px] font-bold text-[#FF453A]">{alerts.filter(a => a.severity === 'CRITICAL').length} Critical</span>
              </div>

              {/* Warning Bar */}
              <div className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
                <div className="w-full bg-[#F5F5F7] rounded-t-xl h-[100%] relative overflow-hidden">
                  <div 
                    style={{ height: `${alerts.length ? Math.max((alerts.filter(a => a.severity === 'WARNING').length / alerts.length) * 100, 20) : 20}%` }} 
                    className="absolute bottom-0 w-full bg-gradient-to-t from-[#E9A23B] to-[#E9A23B]/80 rounded-t-xl shadow-[0_0_15px_rgba(233,162,59,0.4)] transition-all duration-1000">
                  </div>
                </div>
                <span className="text-[12px] font-bold text-[#E9A23B]">{alerts.filter(a => a.severity === 'WARNING').length} Warning</span>
              </div>

              {/* Info Bar */}
              <div className="flex-1 flex flex-col items-center gap-3 h-full justify-end">
                <div className="w-full bg-[#F5F5F7] rounded-t-xl h-[100%] relative overflow-hidden">
                  <div 
                    style={{ height: `20%` }} 
                    className="absolute bottom-0 w-full bg-gradient-to-t from-[#0071E3] to-[#0071E3]/80 rounded-t-xl shadow-[0_0_15px_rgba(0,113,227,0.4)] transition-all duration-1000">
                  </div>
                </div>
                <span className="text-[12px] font-bold text-[#0071E3]">0 Info</span>
              </div>
            </div>
          </motion.div>

          {/* STATS ROW */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, ease }} 
                className="bg-white rounded-[20px] p-5 border border-black/[0.06] shadow-[0_5px_20px_-10px_rgba(0,0,0,0.05)] flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}10`, border: `1px solid ${stat.color}20` }}>
                  <stat.icon size={18} style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-[20px] font-black tracking-tight leading-none mb-1">{stat.value}</p>
                  <p className="text-[11px] font-bold text-[#86868B] uppercase tracking-wider">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side */}
            <div className="lg:col-span-2 space-y-4">
              
              {/* SEARCH & FILTER BAR */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6 bg-white p-2 rounded-[16px] border border-black/[0.06] shadow-sm">
                <div className="relative flex-1 group">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#AEAEB2] group-focus-within:text-[#0071E3] transition-colors" />
                  <input ref={searchInputRef} type="text" placeholder="Search alerts... (⌘K)" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#F5F5F7] border-none outline-none text-[13px] font-medium placeholder:text-[#AEAEB2] focus:ring-2 focus:ring-[#0071E3]/20 transition-all" />
                </div>
                <div className="flex gap-1 bg-[#F5F5F7] p-1 rounded-xl">
                  {['ALL', 'CRITICAL', 'WARNING'].map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                      className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all ${filter === f ? 'bg-white text-black shadow-sm' : 'text-[#86868B] hover:text-black'}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between mb-2 px-1">
                <div className="flex items-center gap-2">
                  <Bell size={16} className="text-[#1D1D1F]" />
                  <h2 className="text-[16px] font-bold text-[#1D1D1F]">Active Alerts</h2>
                </div>
                <span className="text-[12px] font-bold text-[#6E6E73]">{filteredAlerts.length} results</span>
              </div>

              <AnimatePresence>
                {filteredAlerts.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center p-16 bg-white rounded-[24px] border border-black/[0.06] shadow-sm">
                    <CheckCircle2 size={40} className="text-[#30D158] mb-4" />
                    <p className="text-[#1D1D1F] font-bold text-lg mb-1">No alerts found</p>
                    <p className="text-[#86868B] text-sm">Try adjusting your search or filters.</p>
                  </motion.div>
                ) : (
                  filteredAlerts.map((alert, i) => (
                    <motion.div key={alert.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}
                      onClick={() => setSelectedAlert(alert)}
                      className="relative bg-white rounded-[20px] p-5 border border-black/[0.06] hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.08)] transition-all group cursor-pointer"
                    >
                      <div className="absolute left-0 top-5 bottom-5 w-1 rounded-r-full" style={{ background: alert.color }} />
                      <div className="flex items-start gap-4 pl-3">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${alert.color}12`, border: `1px solid ${alert.color}25` }}>
                          <alert.icon size={20} style={{ color: alert.color }} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-bold text-[15px] text-[#1D1D1F] tracking-tight">{alert.title}</h3>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider" style={{ background: `${alert.color}15`, color: alert.color }}>
                              {alert.severity}
                            </span>
                          </div>
                          <p className="text-[13px] text-[#6E6E73] font-medium">{alert.desc}</p>
                          <div className="flex items-center justify-between mt-2"><p className="text-[11px] text-[#AEAEB2] font-mono font-medium">{alert.time}</p>
                          
                          <div className="flex items-center gap-2 ml-auto">
                            <select 
                              onChange={(e) => { e.stopPropagation(); handleAssign(alert.id, e.target.value); }} 
                              defaultValue="" 
                              className="text-[10px] font-bold text-[#6E6E73] bg-white border border-black/[0.1] rounded-md px-1.5 py-0.5 outline-none cursor-pointer"
                            >
                              <option value="" disabled>Assign</option>
                              <option value="Dev Team">Dev Team</option>
                              <option value="SRE Team">SRE Team</option>
                              <option value="Security">Security</option>
                            </select>
                            {assignedTo[alert.id] && <span className="text-[10px] text-[#0071E3] font-bold">{assignedTo[alert.id]}</span>}
                          </div>

                          <button onClick={(e) => { e.stopPropagation(); handleResolve(alert.id); }} className="ml-auto text-[11px] font-bold text-[#30D158] hover:text-[#28a745] transition-colors flex items-center gap-1">
                            <CheckCircle2 size={12} /> Resolve
                          </button>
</div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Right Side */}
            <div className="space-y-6">
              {/* Test Delivery Widget */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6, ease }}
                className="bg-white rounded-[24px] p-6 border border-black/[0.06] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#0071E3]/10 border border-[#0071E3]/20 flex items-center justify-center">
                    <Send size={18} className="text-[#0071E3]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[15px] text-[#1D1D1F]">Test Delivery</h3>
                    <p className="text-[11px] text-[#86868B] font-medium">Verify routing rules</p>
                  </div>
                </div>
                <p className="text-[13px] text-[#6E6E73] mb-5 leading-relaxed font-medium">
                  Send a test payload to verify your routing rules are working correctly.
                </p>
                <button onClick={handleTestAlert} disabled={isTesting}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-black text-white font-semibold text-[13px] hover:bg-[#0071E3] transition-colors disabled:opacity-50">
                  {isTesting ? <Activity size={14} className="animate-pulse" /> : <Zap size={14} />}
                  {isTesting ? 'Sending...' : 'Trigger Test Alert'}
                </button>
              </motion.div>

              {/* Routing Rules Widget */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, duration: 0.6, ease }}
                className="bg-white rounded-[24px] p-6 border border-black/[0.06] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-[#E9A23B]/10 border border-[#E9A23B]/20 flex items-center justify-center">
                    <ShieldAlert size={18} className="text-[#E9A23B]" />
                  </div>
                  <h3 className="font-bold text-[15px] text-[#1D1D1F]">Routing Rules</h3>
                </div>
                <div className="space-y-2">
                  {[
                    { label: 'Critical → PagerDuty', color: '#FF453A' },
                    { label: 'Warning → Slack #alerts', color: '#E9A23B' },
                    { label: 'Info → Email Digest', color: '#0071E3' },
                  ].map((rule, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[#F5F5F7] hover:bg-[#EBEBF0] transition-colors cursor-default">
                      <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: rule.color }} />
                        <span className="text-[12px] text-[#1D1D1F] font-semibold">{rule.label}</span>
                      </div>
                      <ArrowUpRight size={14} className="text-[#AEAEB2]" />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ALERT DETAIL MODAL */}
      <AnimatePresence>
        {selectedAlert && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setSelectedAlert(null)}
          >
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[24px] w-full max-w-md overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-[14px] flex items-center justify-center" style={{ background: `${selectedAlert.color}15`, border: `1px solid ${selectedAlert.color}30` }}>
                      <selectedAlert.icon size={24} style={{ color: selectedAlert.color }} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#1D1D1F]">{selectedAlert.title}</h2>
                      <p className="text-[12px] font-mono text-[#86868B] mt-1">{selectedAlert.time}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedAlert(null)} className="text-[#86868B] hover:text-black transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-[#F5F5F7]">
                    <p className="text-[11px] font-bold text-[#86868B] uppercase tracking-wider mb-1">Description</p>
                    <p className="text-[14px] text-[#1D1D1F]">{selectedAlert.desc}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[#F5F5F7]">
                      <p className="text-[11px] font-bold text-[#86868B] uppercase tracking-wider mb-1">Severity</p>
                      <p className="text-[14px] font-bold" style={{ color: selectedAlert.color }}>{selectedAlert.severity}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-[#F5F5F7]">
                      <p className="text-[11px] font-bold text-[#86868B] uppercase tracking-wider mb-1">Status</p>
                      <p className="text-[14px] font-bold text-[#30D158]">{selectedAlert.status}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button onClick={() => { setSelectedAlert(null); showToast('Alert acknowledged', 'success'); }} className="flex-1 py-3 rounded-xl bg-black text-white font-semibold text-[14px] hover:bg-gray-800 transition-colors">Acknowledge</button>
                  <button onClick={() => { handleResolve(selectedAlert.id); setSelectedAlert(null); }} className="flex-1 py-3 rounded-xl bg-white border border-black/[0.1] text-[#1D1D1F] font-semibold text-[14px] hover:bg-[#F5F5F7] transition-colors">Resolve</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
