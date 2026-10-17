import { useState } from 'react'
import { Search, Filter } from 'lucide-react'

function Logs() {
  const [searchTerm, setSearchTerm] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')

  const sampleLogs = [
    { timestamp: '2026-10-16T10:00:00Z', level: 'INFO', service: 'api-gateway', message: 'Request processed successfully', duration: 45 },
    { timestamp: '2026-10-16T10:01:00Z', level: 'WARN', service: 'payment-service', message: 'High latency detected', duration: 1250 },
    { timestamp: '2026-10-16T10:02:00Z', level: 'ERROR', service: 'user-service', message: 'Database connection timeout', duration: 5000 },
    { timestamp: '2026-10-16T10:03:00Z', level: 'INFO', service: 'catalog-service', message: 'Cache hit ratio: 0.95', duration: 12 },
    { timestamp: '2026-10-16T10:04:00Z', level: 'ERROR', service: 'payment-service', message: 'Payment gateway unreachable', duration: 3000 },
  ]

  const filteredLogs = sampleLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          log.service.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter
    return matchesSearch && matchesLevel
  })

  const getLevelBadge = (level) => {
    const map = {
      INFO: 'badge-low',
      WARN: 'badge-medium',
      ERROR: 'badge-high',
      FATAL: 'badge-critical',
    }
    return map[level] || 'badge-medium'
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Logs</h1>
        <p className="text-dark-400">Search and filter logs from all services</p>
      </div>

      <div className="card">
        <div className="flex gap-4 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="input w-40"
          >
            <option value="all">All Levels</option>
            <option value="INFO">INFO</option>
            <option value="WARN">WARN</option>
            <option value="ERROR">ERROR</option>
          </select>
        </div>

        <div className="space-y-2">
          {filteredLogs.map((log, i) => (
            <div key={i} className="p-3 rounded-lg bg-dark-900 border border-dark-700 hover:border-primary-500/50 transition">
              <div className="flex items-center gap-3 mb-2">
                <span className={`badge ${getLevelBadge(log.level)}`}>{log.level}</span>
                <span className="text-xs text-dark-400">{log.timestamp}</span>
                <span className="text-xs text-primary-400 font-medium">{log.service}</span>
                <span className="text-xs text-dark-500">{log.duration}ms</span>
              </div>
              <p className="text-sm text-dark-100">{log.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Logs
