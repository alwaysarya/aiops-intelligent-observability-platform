import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Clock, Server, RefreshCw, Activity, Terminal } from 'lucide-react'

export default function Logs() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchLogs = async () => {
    setLoading(true)
    setError(null)
    try {
      // Backend API se logs fetch karo
      const res = await fetch('http://localhost:8000/logs')
      if (!res.ok) throw new Error('Backend error: ' + res.status)
      const json = await res.json()
      const data = json.data || json || []
      setLogs(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogs()
  }, [])

  const filteredLogs = logs.filter(log => 
    (log.message || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.service || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#FBFBFD] p-8 font-sans">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-[#1D1D1F] tracking-tight">System Logs</h1>
            <p className="text-[#6E6E73] text-sm mt-1">Real-time logs from all services.</p>
          </div>
          <button onClick={fetchLogs} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black text-white font-semibold text-sm hover:bg-gray-800 transition-all shadow-lg">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search logs by message or service..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-black/[0.08] bg-white focus:outline-none focus:border-[#0071E3] text-sm"
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <RefreshCw className="animate-spin text-[#0071E3]" size={32} />
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 p-6 rounded-2xl">
            <p className="font-bold">Error: {error}</p>
            <p className="text-sm mt-1">Make sure backend is running on port 8000.</p>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-black/[0.06]">
            <Terminal size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No logs found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLogs.map((log, i) => (
              <motion.div key={log.id || i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-5 border border-black/[0.06] shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                <div className="flex items-start gap-4">
                  <div className={`px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                    log.level === 'ERROR' ? 'bg-red-100 text-red-600' : 
                    log.level === 'WARN' ? 'bg-yellow-100 text-yellow-600' : 
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {log.level || 'INFO'}
                  </div>
                  <div>
                    <p className="text-[#1D1D1F] font-medium text-sm">{log.message}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Server size={12} /> {log.service}</span>
                      <span className="flex items-center gap-1"><Clock size={12} /> {new Date(log.timestamp).toLocaleString()}</span>
                      <span className="flex items-center gap-1"><Activity size={12} /> {log.duration_ms}ms</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
