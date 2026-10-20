import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Bell, ShieldAlert, Send, CheckCircle2, AlertTriangle, Zap, Server, Activity, ArrowUpRight, Search, Filter, ShieldCheck } from 'lucide-react'
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

        <div className="relative z-10 max-w-[1240px] mx-auto px-8 py-20 md:py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-black/[0.06] bg-white/80 backdrop-blur-xl mb-6 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF453A] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF453A]" />
                </span>
                <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#6E6E73]">Live Routing</span>
                {/* LIVE CLOCK */}
                <span className="ml-2 pl-2 border-l border-black/[0.1] text-[11px] font-mono font-bold text-[#FF453A]">{liveTime}</span>
              </div>
              <h1 className="text-[clamp(52px,6.5vw,88px)] font-black tracking-[-0.055em] leading-[0.92] mb-4">
                Alert<br />
                <span className="bg-gradient-to-r from-[#FF453A] to-[#E9A23B] bg-clip-text text-transparent">Routing.</span>
              </h1>
              <p className="text-[19px] leading-[1.65] text-[#6E6E73] max-w-[480px] font-medium">
                Route <span className="text-[#FF453A] font-semibold">critical signals</span> to the right teams instantly.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2, ease }}>
              <button 
                onClick={handleAcknowledgeAll}
                className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-black text-white text-[14px] font-semibold hover:bg-[#0071E3] transition-all shadow-[0_15px_35px_-10px_rgba(0,0,0,0.3)] hover:scale-105"
              >
                <CheckCircle2 size={16} /> Acknowledge All
              </button>
              
              <div className="flex items-center gap-2 h-12 px-4 rounded-full bg-white border border-black/[0.1]">
                <span className="text-[12px] font-bold text-[#6E6E73]">Auto-Refresh</span>
                <button 
                  onClick={() => setAutoRefresh(!autoRefresh)}
                  className={`w-8 h-4 rounded-full transition-colors relative ${autoRefresh ? 'bg-[#30D158]' : 'bg-[#D1D1D6]'}`}
                >
                  <span className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${autoRefresh ? 'left-4.5' : 'left-0.5'}`} />
                </button>
              </div>

              <button onClick={handleExport} className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white border border-black/[0.1] text-[#1D1D1F] text-[14px] font-semibold hover:bg-[#F5F5F7] transition-all">
                <Download size={16} /> Export CSV
              </button>

            </motion.div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="relative w-full bg-[#FBFBFD] py-12">
        <div className="max-w-[1240px] mx-auto px-8">
          
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
                  <input type="text" placeholder="Search alerts..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
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
                      className="relative bg-white rounded-[20px] p-5 border border-black/[0.06] hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.08)] transition-all group"
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
    </div>
  )
}
