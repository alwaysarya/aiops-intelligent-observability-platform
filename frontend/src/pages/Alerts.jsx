import { useEffect, useState } from 'react'
import { Bell, Send, CheckCircle } from 'lucide-react'
import { alertsApi } from '../services/api'

function Alerts() {
  const [channels, setChannels] = useState({ active: [], all: [] })
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState(null)

  useEffect(() => {
    loadChannels()
  }, [])

  const loadChannels = async () => {
    try {
      const data = await alertsApi.channels()
      setChannels(data)
    } catch (e) {
      console.log('Alerts service not available')
    }
  }

  const testAlert = async () => {
    setTesting(true)
    setTestResult(null)
    try {
      const result = await alertsApi.trigger({
        title: 'Test Alert from Dashboard',
        message: 'This is a test alert triggered manually',
        severity: 'high',
        service: 'test-service',
        host: 'test-host',
      })
      setTestResult({ success: true, data: result })
    } catch (e) {
      setTestResult({ success: false, error: e.message })
    }
    setTesting(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Alerts</h1>
        <p className="text-dark-400">Manage and test alert channels</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Alert Channels
          </h3>
          <div className="space-y-3">
            {channels.all.map(ch => {
              const isActive = channels.active.includes(ch)
              return (
                <div key={ch} className="flex items-center justify-between p-3 rounded-lg bg-dark-900 border border-dark-700">
                  <span className="text-sm font-medium text-white capitalize">{ch}</span>
                  <span className={`badge ${isActive ? 'badge-low' : 'badge-medium'}`}>
                    {isActive ? 'Active' : 'Disabled'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Send className="w-5 h-5" />
            Test Alert
          </h3>
          <p className="text-sm text-dark-400 mb-4">
            Send a test alert to all enabled channels
          </p>
          <button
            onClick={testAlert}
            disabled={testing}
            className="btn btn-primary w-full"
          >
            {testing ? 'Sending...' : 'Send Test Alert'}
          </button>

          {testResult && (
            <div className={`mt-4 p-3 rounded-lg border ${
              testResult.success
                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}>
              {testResult.success ? (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Alert sent: {testResult.data.alert_id}</span>
                </div>
              ) : (
                <span className="text-sm">Error: {testResult.error}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Alerts
