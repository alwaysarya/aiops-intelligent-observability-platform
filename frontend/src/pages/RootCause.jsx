import { useState } from 'react'
import { GitBranch, Search, Zap } from 'lucide-react'
import { rcaApi } from '../services/api'

function RootCause() {
  const [service, setService] = useState('payment-service')
  const [severity, setSeverity] = useState('high')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const analyze = async () => {
    setLoading(true)
    setResult(null)
    try {
      const data = await rcaApi.analyze({ service, severity })
      setResult(data)
    } catch (e) {
      setResult({ error: e.message })
    }
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Root Cause Analysis</h1>
        <p className="text-dark-400">Identify root causes of anomalies</p>
      </div>

      <div className="card">
        <div className="flex gap-4 mb-4">
          <input
            type="text"
            value={service}
            onChange={(e) => setService(e.target.value)}
            placeholder="Service name"
            className="input flex-1"
          />
          <select
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="input w-40"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          <button
            onClick={analyze}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </div>

      {result && !result.error && (
        <div className="space-y-4">
          <div className="card">
            <h3 className="text-lg font-semibold text-white mb-2">
              Analysis Result
            </h3>
            <p className="text-sm text-dark-400">
              Completed in {result.analysis_duration_ms?.toFixed(2)}ms
            </p>
            <p className="text-sm text-dark-400">
              Confidence: <span className="text-primary-400">{(result.confidence * 100).toFixed(1)}%</span>
            </p>
          </div>

          <div className="space-y-3">
            {result.root_causes?.map((rc, i) => (
              <div key={i} className="card">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="font-semibold text-white capitalize">
                      {rc.cause_type.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="badge badge-high">
                    {(rc.confidence * 100).toFixed(0)}% confidence
                  </span>
                </div>
                <p className="text-sm text-dark-200 mb-2">{rc.description}</p>
                <div className="text-xs text-dark-400">
                  <p>Primary: <span className="text-primary-400">{rc.primary_service}</span></p>
                  <p>Affected: {rc.affected_services?.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {result?.error && (
        <div className="card bg-red-500/10 border-red-500/30">
          <p className="text-red-400">Error: {result.error}</p>
        </div>
      )}
    </div>
  )
}

export default RootCause
