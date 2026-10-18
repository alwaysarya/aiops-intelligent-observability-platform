import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Clock, Server, Download, AlertCircle, RefreshCw, Play, Pause } from 'lucide-react'
import { ingestionApi } from '../services/api'
import { exportToCSV } from '../services/export'
import { showToast } from '../components/Premium/Toast'
import DarkFooter from '../components/Premium/DarkFooter'

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
      if (!silent) {
        setError("Failed to fetch logs. Make sure the backend is running.")
      }
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

  const getLevelBadge = (level) => {
    const map = { INFO: 'bg-blue-50 text-apple-blue border-blue-200', WARN: 'bg-orange-50 text-apple-orange border-orange-200', ERROR: 'bg-red-50 text-apple-red border-red-200' }
    return map[level] || map.INFO
  }

  return (
    <div className="w-full bg-white dark:bg-gray-900 min-h-screen transition-colors">
      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-[52px] md:text-[72px] font-semibold tracking-[-0.04em] leading-[1.02] text-text-primary dark:text-white mb-4">
            Search <span className="bg-gradient-to-r from-[#0071E3] to-[#AF52DE] bg-clip-text text-transparent">Logs.</span>
          </h1>
        </motion.div>
      </div>

      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="bg-white dark:bg-gray-800 rounded-[24px] border border-black/[0.04] dark:border-gray-700 shadow-sm p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
              <input type="text" placeholder="Search logs..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-ink-grey dark:bg-gray-900 border border-transparent focus:bg-white dark:focus:bg-gray-800 outline-none transition-all text-[15px] dark:text-white" />
            </div>
            <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}
              className="px-5 py-3 rounded-xl bg-ink-grey dark:bg-gray-900 border border-transparent outline-none text-[14px] font-medium text-text-primary dark:text-white">
              <option value="all">All Levels</option>
              <option value="INFO">INFO</option>
              <option value="WARN">WARN</option>
              <option value="ERROR">ERROR</option>
            </select>
            
            <button onClick={() => setAutoRefresh(!autoRefresh)} 
              className={`px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 border ${autoRefresh ? 'bg-green-50 text-apple-green border-green-200' : 'bg-white dark:bg-gray-900 border-black/[0.08] dark:border-gray-700 text-text-primary dark:text-white'}`}>
              {autoRefresh ? <><Pause size={16}/> Stop Live</> : <><Play size={16}/> Start Live</>}
            </button>

            <button onClick={handleExport} className="px-5 py-3 rounded-xl bg-apple-blue text-white font-medium hover:bg-apple-blueHover transition-all flex items-center gap-2">
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-text-tertiary">Loading...</div>
        ) : error ? (
          <div className="bg-red-50 text-apple-red p-6 rounded-2xl flex items-center gap-3 border border-red-100">
            <AlertCircle size={20} /> {error}
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="text-center py-20 text-text-tertiary">No logs found.</div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filteredLogs.map((log, i) => (
                <motion.div key={log.id || i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-[20px] border border-black/[0.04] dark:border-gray-700 p-5 hover:shadow-md transition-all">
                  <div className="flex flex-wrap items-center gap-4 mb-3">
                    <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${getLevelBadge(log.level)}`}>{log.level}</span>
                    <div className="flex items-center gap-1.5 text-[13px] text-text-tertiary font-mono"><Clock size={14} /> {log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : 'N/A'}</div>
                    <div className="flex items-center gap-1.5 text-[13px] text-apple-blue font-medium"><Server size={14} /> {log.service}</div>
                    <div className="text-[12px] text-text-tertiary bg-ink-grey dark:bg-gray-900 px-2 py-1 rounded-md ml-auto">{log.duration_ms || 0}ms</div>
                  </div>
                  <p className="text-[15px] text-text-primary dark:text-gray-200">{log.message}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>

      <DarkFooter badge="Log Analysis" title="Dive into" highlight="the details." description="Connect your real Elasticsearch cluster." primary="Configure ES" secondary="Read Docs" />
    </div>
  )
}

export default Logs
