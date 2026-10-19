import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Clock, Server, Download, AlertCircle, AlertTriangle, RefreshCw, Play, Pause, Filter, Radio, Activity, TrendingUp, Zap } from 'lucide-react'
import { ingestionApi } from '../services/api'
import { exportToCSV } from '../services/export'
import { showToast } from '../components/Premium/Toast'
import DarkFooter from '../components/Premium/DarkFooter'

const linearEase = [0.25, 0.1, 0.25, 1]

function Logs() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')
  const [error, setError] = useState(null)
  const [autoRefresh, setAutoRefresh] = useState(false)

  const fetchLogs = async (silent = false) => {
    if (!silent) setLoading(true)
    setError(null)
    try {
      const response = await ingestionApi.getLogs()
      const fetchedLogs = response.data || response || []
      setLogs(fetchedLogs)
    } catch (err) {
      console.error(err)
      if (!silent) setError("Failed to fetch logs. Make sure the backend is running.")
    } finally {
      if (!silent) setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  useEffect(() => {
    let interval
    if (autoRefresh) {
      interval = setInterval(() => fetchLogs(true), 5000)
    }
    return () => clearInterval(interval)
  }, [autoRefresh])

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          log.service?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter
    return matchesSearch && matchesLevel
  })

  const handleExport = () => {
    if (filteredLogs.length === 0) return
    exportToCSV(filteredLogs, 'aiops-logs-export')
    showToast('Logs exported!', 'success')
  }

  const getLevelStyles = (level) => {
    const map = {
      INFO: { text: 'text-[#5E6AD2]', bg: 'bg-[#5E6AD2]/10', border: 'border-[#5E6AD2]/20', glow: 'shadow-[0_0_8px_rgba(94,106,210,0.3)]' },
      WARN: { text: 'text-[#E5A00D]', bg: 'bg-[#E5A00D]/10', border: 'border-[#E5A00D]/20', glow: 'shadow-[0_0_8px_rgba(229,160,13,0.3)]' },
      ERROR: { text: 'text-[#FF453A]', bg: 'bg-[#FF453A]/10', border: 'border-[#FF453A]/20', glow: 'shadow-[0_0_8px_rgba(255,69,58,0.3)]' },
    }
    return map[level] || map.INFO
  }

  const errorCount = logs.filter(l => l.level === 'ERROR').length
  const warnCount = logs.filter(l => l.level === 'WARN').length
  const avgDuration = logs.length ? Math.round(logs.reduce((sum, l) => sum + (l.duration_ms || 0), 0) / logs.length) : 0

  return (
    <div className="w-full min-h-screen bg-[#09090B] text-[#EDEDED] font-[-apple-system,BlinkMacSystemFont,'Inter','Helvetica_Neue',sans-serif] antialiased selection:bg-[#5E6AD2]/30">
      
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#5E6AD2]/[0.12] blur-[130px] rounded-full pointer-events-none" />
        
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div key={i} animate={{ y: [0, -150, 0], opacity: [0, 1, 0] }} transition={{ duration: Math.random() * 8 + 8, repeat: Infinity, delay: Math.random() * 5 }}
            className="absolute w-1 h-1 bg-[#5E6AD2] rounded-full blur-[1px] shadow-[0_0_8px_#5E6AD2]" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
        ))}

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 py-24 md:py-28">
          <div className="flex flex-col items-center text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: linearEase }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(94,106,210,0.1)]">
                <Radio size={12} className="text-[#5E6AD2] animate-pulse" />
                <span className="text-[12px] font-medium text-[#8A8F98]">Live Stream</span>
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: linearEase }} className="text-[56px] md:text-[80px] font-semibold tracking-[-0.04em] leading-[1.05] mb-6 text-[#EDEDED]">
              Search <br />
              <span className="bg-gradient-to-r from-[#5E6AD2] via-[#8B5CF6] to-[#5E6AD2] bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]">Logs.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: linearEase }} className="text-[19px] text-[#8A8F98] max-w-[500px] leading-[1.6]">
              Real-time log streaming with AI-powered insights.
            </motion.p>
          </div>
        </div>
      </section>

      {/* STATS ROW */}
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="relative w-full bg-[#09090B] py-12 border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Logs', value: logs.length.toLocaleString(), icon: Activity, color: 'text-[#5E6AD2]' },
              { label: 'Errors', value: errorCount, icon: AlertCircle, color: 'text-[#FF453A]' },
              { label: 'Warnings', value: warnCount, icon: AlertTriangle, color: 'text-[#E5A00D]' },
              { label: 'Avg Duration', value: `${avgDuration}ms`, icon: Clock, color: 'text-[#30D158]' },
            ].map((stat, i) => (
              <div key={i} className="bg-[#0F1011] rounded-xl p-5 border border-white/[0.06]">
                <div className="flex items-center justify-between mb-3">
                  <stat.icon size={18} className={stat.color} />
                </div>
                <p className="text-[24px] font-semibold tracking-tighter text-[#EDEDED] mb-1">{stat.value}</p>
                <p className="text-[11px] font-medium text-[#5A5F66] uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* COMMAND BAR */}
      <section className="relative w-full bg-[#09090B] py-8">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-[#0F1011] rounded-xl border border-white/[0.06] p-4 flex flex-col md:flex-row gap-3">
            
            {/* Search Input */}
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A5F66] group-focus-within:text-[#5E6AD2] transition-colors" />
              <input 
                type="text" 
                placeholder="Search logs by message or service..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-[#161718] border border-white/[0.06] focus:border-[#5E6AD2]/50 focus:bg-[#161718] outline-none transition-all text-[14px] text-[#EDEDED] placeholder:text-[#5A5F66]" 
              />
            </div>
            
            {/* Level Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5A5F66] pointer-events-none" />
              <select 
                value={levelFilter} 
                onChange={(e) => setLevelFilter(e.target.value)}
                className="pl-9 pr-8 py-2.5 rounded-lg bg-[#161718] border border-white/[0.06] focus:border-[#5E6AD2]/50 outline-none text-[13px] font-medium text-[#EDEDED] appearance-none cursor-pointer"
              >
                <option value="all">All Levels</option>
                <option value="INFO">INFO</option>
                <option value="WARN">WARN</option>
                <option value="ERROR">ERROR</option>
              </select>
            </div>
            
            {/* Live Toggle */}
            <button 
              onClick={() => setAutoRefresh(!autoRefresh)} 
              className={`px-4 py-2.5 rounded-lg font-medium text-[13px] transition-all flex items-center gap-2 border ${
                autoRefresh 
                  ? 'bg-[#30D158]/10 text-[#30D158] border-[#30D158]/30' 
                  : 'bg-[#161718] text-[#8A8F98] border-white/[0.06] hover:border-white/[0.15]'
              }`}
            >
              {autoRefresh ? (
                <><Pause size={14}/> <span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#30D158] opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-[#30D158]"></span></span> Live</>
              ) : (
                <><Play size={14}/> Start Live</>
              )}
            </button>

            {/* Refresh */}
            <button 
              onClick={() => fetchLogs(false)}
              className="px-4 py-2.5 rounded-lg bg-[#161718] border border-white/[0.06] text-[#8A8F98] hover:text-[#EDEDED] hover:border-white/[0.15] transition-all flex items-center gap-2"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>

            {/* Export */}
            <button 
              onClick={handleExport} 
              className="px-4 py-2.5 rounded-lg bg-[#EDEDED] text-[#09090B] font-semibold text-[13px] hover:bg-white transition-all flex items-center gap-2"
            >
              <Download size={14} /> Export
            </button>
          </motion.div>
        </div>
      </section>

      {/* LOG STREAM */}
      <section className="relative w-full bg-[#09090B] pb-24">
        <div className="max-w-[1100px] mx-auto px-6">
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-8 h-8 border-2 border-white/[0.1] border-t-[#5E6AD2] rounded-full" />
              <p className="text-[13px] text-[#5A5F66] font-medium">Loading logs...</p>
            </div>
          ) : error ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-[#FF453A]/10 border border-[#FF453A]/20 rounded-xl p-6 flex items-center gap-3">
              <AlertCircle size={20} className="text-[#FF453A]" />
              <div>
                <p className="text-[14px] font-semibold text-[#FF453A]">Connection Error</p>
                <p className="text-[13px] text-[#8A8F98] mt-1">{error}</p>
              </div>
            </motion.div>
          ) : filteredLogs.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-32 gap-3">
              <Search size={32} className="text-[#5A5F66]" />
              <p className="text-[14px] text-[#8A8F98] font-medium">No logs found.</p>
              <p className="text-[12px] text-[#5A5F66]">Try adjusting your filters.</p>
            </motion.div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {filteredLogs.map((log, i) => {
                  const styles = getLevelStyles(log.level)
                  return (
                    <motion.div 
                      key={log.id || i} 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      exit={{ opacity: 0 }} 
                      transition={{ delay: Math.min(i * 0.02, 0.5), ease: linearEase }}
                      className="group bg-[#0F1011] rounded-lg border border-white/[0.06] p-4 hover:border-white/[0.15] hover:bg-[#121316] transition-all cursor-default"
                    >
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${styles.text} ${styles.bg} ${styles.border} ${styles.glow}`}>
                          {log.level || 'INFO'}
                        </span>
                        <div className="flex items-center gap-1.5 text-[11px] text-[#5A5F66] font-mono">
                          <Clock size={11} /> {log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : 'N/A'}
                        </div>
                        <div className="flex items-center gap-1.5 text-[11px] text-[#5E6AD2] font-medium">
                          <Server size={11} /> {log.service || 'unknown'}
                        </div>
                        <div className="text-[10px] text-[#5A5F66] font-mono bg-[#161718] border border-white/[0.04] px-2 py-0.5 rounded ml-auto group-hover:border-white/[0.1] transition-colors">
                          {log.duration_ms || 0}ms
                        </div>
                      </div>
                      <p className="text-[13px] text-[#D1D1D6] font-mono leading-relaxed group-hover:text-[#EDEDED] transition-colors">{log.message}</p>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      <DarkFooter 
        badge="Log Analysis" 
        title="Dive into" 
        highlight="the details." 
        description="Connect your real Elasticsearch cluster." 
        primary="Configure ES" 
        secondary="Read Docs" 
      />

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  )
}

export default Logs
