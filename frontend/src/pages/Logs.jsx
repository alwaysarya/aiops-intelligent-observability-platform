import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Clock, Server, Filter, Download, X } from 'lucide-react'
import DarkFooter from '../components/Premium/DarkFooter'
import { exportToCSV } from '../services/export'
import { showToast } from '../components/Premium/Toast'

const sampleLogs = [
  { timestamp: '10:00:00', level: 'INFO', service: 'api-gateway', message: 'Request processed successfully', duration: 45 },
  { timestamp: '10:01:00', level: 'WARN', service: 'payment-service', message: 'High latency detected in payment processing', duration: 1250 },
  { timestamp: '10:02:00', level: 'ERROR', service: 'user-service', message: 'Database connection timeout after 5s', duration: 5000 },
  { timestamp: '10:03:00', level: 'INFO', service: 'catalog-service', message: 'Cache hit ratio: 0.95', duration: 12 },
  { timestamp: '10:04:00', level: 'ERROR', service: 'payment-service', message: 'Payment gateway unreachable', duration: 3000 },
]

function Logs() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilters, setActiveFilters] = useState([])
  const [levelFilter, setLevelFilter] = useState('all')

  const toggleFilter = (filter) => {
    setActiveFilters(prev => prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter])
  }

  const filteredLogs = sampleLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) || log.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter
    const matchesTags = activeFilters.length === 0 || activeFilters.some(f => log.service.includes(f) || log.level === f)
    return matchesSearch && matchesLevel && matchesTags
  })

  const handleExport = () => {
    exportToCSV(filteredLogs, 'aiops-logs-export')
    showToast('Logs exported to CSV successfully!', 'success')
  }

  const getLevelBadge = (level) => {
    const map = { INFO: 'bg-blue-50 text-apple-blue border-blue-200', WARN: 'bg-orange-50 text-apple-orange border-orange-200', ERROR: 'bg-red-50 text-apple-red border-red-200' }
    return map[level] || map.INFO
  }

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-[52px] md:text-[72px] font-semibold tracking-[-0.04em] leading-[1.02] text-text-primary mb-4">
            Search <span className="bg-gradient-to-r from-[#0071E3] to-[#AF52DE] bg-clip-text text-transparent">Logs.</span>
          </h1>
          <p className="text-[18px] text-text-secondary">Advanced filtering and inspection.</p>
        </motion.div>
      </div>

      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="bg-white rounded-[24px] border border-black/[0.04] shadow-sm p-5 mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
              <input type="text" placeholder="Search logs or services..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-ink-grey border border-transparent focus:bg-white focus:border-apple-blue/40 outline-none transition-all text-[15px]" />
            </div>
            <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}
              className="px-5 py-3 rounded-xl bg-ink-grey border border-transparent outline-none text-[14px] font-medium text-text-primary">
              <option value="all">All Levels</option>
              <option value="INFO">INFO</option>
              <option value="WARN">WARN</option>
              <option value="ERROR">ERROR</option>
            </select>
            <button onClick={handleExport} className="px-5 py-3 rounded-xl bg-white border border-black/[0.08] text-text-primary font-medium hover:bg-ink-grey transition-all flex items-center gap-2">
              <Download size={16} /> Export CSV
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[12px] font-bold text-text-tertiary uppercase tracking-wider mr-2 flex items-center gap-1"><Filter size={12} /> Quick Filters:</span>
            {['payment-service', 'user-service', 'ERROR', 'WARN'].map(tag => (
              <button key={tag} onClick={() => toggleFilter(tag)}
                className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all flex items-center gap-1.5 ${activeFilters.includes(tag) ? 'bg-apple-blue text-white shadow-sm' : 'bg-ink-grey text-text-secondary hover:bg-gray-200'}`}>
                {tag}
                {activeFilters.includes(tag) && <X size={12} />}
              </button>
            ))}
            {activeFilters.length > 0 && (
              <button onClick={() => setActiveFilters([])} className="text-[12px] font-medium text-apple-red hover:underline ml-2">Clear all</button>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <AnimatePresence>
            {filteredLogs.map((log, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.05 }}
                className="bg-white rounded-[20px] border border-black/[0.04] p-5 hover:shadow-md transition-all group">
                <div className="flex flex-wrap items-center gap-4 mb-3">
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold border ${getLevelBadge(log.level)}`}>{log.level}</span>
                  <div className="flex items-center gap-1.5 text-[13px] text-text-tertiary font-mono"><Clock size={14} /> {log.timestamp}</div>
                  <div className="flex items-center gap-1.5 text-[13px] text-apple-blue font-medium"><Server size={14} /> {log.service}</div>
                  <div className="text-[12px] text-text-tertiary bg-ink-grey px-2 py-1 rounded-md ml-auto">{log.duration}ms</div>
                </div>
                <p className="text-[15px] text-text-primary">{log.message}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      <DarkFooter badge="Log Analysis" title="Dive into" highlight="the details." description="Connect your real Elasticsearch cluster to see live production logs." primary="Configure ES" secondary="Read Docs" />
    </div>
  )
}

export default Logs
