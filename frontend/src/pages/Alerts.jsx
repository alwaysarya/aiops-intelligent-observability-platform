import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, Send, CheckCircle, AlertCircle, MessageSquare, Mail, Webhook, Zap, ShieldAlert, CheckCheck, TrendingDown } from 'lucide-react'
import { alertsApi } from '../services/api'
import DarkFooter from '../components/Premium/DarkFooter'
import { showToast } from '../components/Premium/Toast'

function Alerts() {
  const [channels, setChannels] = useState({ active: [], all: [] })
  const [testing, setTesting] = useState(false)
  const [testResult, setTestResult] = useState(null)
  const [routes, setRoutes] = useState({ critical: 'pagerduty', high: 'slack', medium: 'email' })
  const [acknowledged, setAcknowledged] = useState(false)

  useEffect(() => { loadChannels() }, [])

  const loadChannels = async () => {
    try { const data = await alertsApi.channels(); setChannels(data) } catch (e) {}
  }

  const testAlert = async () => {
    setTesting(true); setTestResult(null)
    try {
      const result = await alertsApi.trigger({ title: 'Test Alert', message: 'Test message', severity: 'high', service: 'test-service', host: 'test-host' })
      setTestResult({ success: true, data: result })
      showToast('Test alert sent successfully!', 'success')
    } catch (e) { 
      setTestResult({ success: false, error: e.message }) 
      showToast('Failed to send alert.', 'error')
    }
    setTesting(false)
  }

  const handleAcknowledgeAll = () => {
    setAcknowledged(true)
    showToast('All active alerts acknowledged!', 'success')
  }

  const channelIcons = { slack: MessageSquare, email: Mail, webhook: Webhook }

  return (
    <div className="w-full bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 pt-20 pb-12 flex justify-between items-end">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-[52px] md:text-[72px] font-semibold tracking-[-0.04em] leading-[1.02] text-text-primary dark:text-white mb-4">
            Alert <span className="bg-gradient-to-r from-[#0071E3] to-[#AF52DE] bg-clip-text text-transparent">Routing.</span>
          </h1>
          <p className="text-[18px] text-text-secondary dark:text-gray-400">Route critical signals to the right teams instantly.</p>
        </motion.div>
        
        <button onClick={handleAcknowledgeAll} disabled={acknowledged} 
          className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${acknowledged ? 'bg-green-50 text-apple-green' : 'bg-text-primary dark:bg-white text-white dark:text-black hover:bg-gray-800 shadow-lg'}`}>
          <CheckCheck size={18} /> {acknowledged ? 'All Acknowledged' : 'Acknowledge All'}
        </button>
      </div>

      <section className="max-w-[1200px] mx-auto px-6 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <div className="space-y-6">
          {/* Model Drift Section (New) */}
          <div className="bg-white dark:bg-gray-800 rounded-[28px] border border-black/[0.04] dark:border-gray-700 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-red-50 text-apple-red"><TrendingDown size={20} /></div>
              <h3 className="text-[20px] font-semibold text-text-primary dark:text-white">Model Drift Alerts</h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 rounded-xl border border-black/[0.04] dark:border-gray-700 bg-ink-grey dark:bg-gray-900">
                <div>
                  <p className="text-[14px] font-semibold text-text-primary dark:text-white">yolov8n.pt</p>
                  <p className="text-[12px] text-text-tertiary">Accuracy dropped by 4% (was 19.3%)</p>
                </div>
                <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-red-50 text-apple-red border border-red-200">Critical</span>
              </div>
              <div className="flex justify-between items-center p-4 rounded-xl border border-black/[0.04] dark:border-gray-700 bg-ink-grey dark:bg-gray-900">
                <div>
                  <p className="text-[14px] font-semibold text-text-primary dark:text-white">custom_v2.pt</p>
                  <p className="text-[12px] text-text-tertiary">Precision dropped by 2% (was 53.6%)</p>
                </div>
                <span className="px-3 py-1 rounded-full text-[12px] font-bold bg-orange-50 text-apple-orange border border-orange-200">Warning</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-[28px] border border-black/[0.04] dark:border-gray-700 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-orange-50 text-apple-orange"><Bell size={20} /></div>
              <h3 className="text-[20px] font-semibold text-text-primary dark:text-white">Connected Channels</h3>
            </div>
            <div className="space-y-3">
              {channels.all?.map((ch) => {
                const isActive = channels.active.includes(ch)
                const Icon = channelIcons[ch] || Bell
                return (
                  <div key={ch} className="flex items-center justify-between p-4 rounded-xl border border-black/[0.04] dark:border-gray-700 bg-ink-grey dark:bg-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-black/[0.04] dark:border-gray-700"><Icon size={18} className="text-text-secondary" /></div>
                      <span className="text-[15px] font-semibold text-text-primary dark:text-white capitalize">{ch}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[12px] font-semibold ${isActive ? 'bg-green-100 text-apple-green' : 'bg-gray-200 text-text-tertiary'}`}>{isActive ? 'Active' : 'Disabled'}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-[28px] border border-black/[0.04] dark:border-gray-700 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-50 text-apple-blue"><Send size={20} /></div>
              <h3 className="text-[20px] font-semibold text-text-primary dark:text-white">Test Delivery</h3>
            </div>
            <p className="text-[15px] text-text-secondary dark:text-gray-400 mb-6">Send a test payload to verify your routing rules.</p>
            <button onClick={testAlert} disabled={testing} className="w-full py-3.5 rounded-xl bg-apple-blue text-white font-semibold hover:bg-apple-blueHover transition-all flex items-center justify-center gap-2">
              {testing ? 'Sending...' : <><Send size={18} /> Trigger Test Alert</>}
            </button>
            {testResult && (
              <div className={`mt-4 p-4 rounded-xl flex items-center gap-2 text-[14px] font-medium ${testResult.success ? 'bg-green-50 text-apple-green' : 'bg-red-50 text-apple-red'}`}>
                {testResult.success ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
                {testResult.success ? `Success! ID: ${testResult.data.alert_id?.slice(0,8)}` : `Error: ${testResult.error}`}
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-[28px] border border-black/[0.04] dark:border-gray-700 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-red-50 text-apple-red"><Zap size={20} /></div>
              <h3 className="text-[20px] font-semibold text-text-primary dark:text-white">Routing Rules</h3>
            </div>
            <div className="space-y-4">
              {[
                { level: 'Critical', color: 'text-apple-red', bg: 'bg-red-50', icon: ShieldAlert, key: 'critical' },
                { level: 'High', color: 'text-apple-orange', bg: 'bg-orange-50', icon: Zap, key: 'high' },
                { level: 'Medium', color: 'text-apple-blue', bg: 'bg-blue-50', icon: Bell, key: 'medium' },
              ].map(rule => (
                <div key={rule.key} className="p-4 rounded-xl border border-black/[0.06] dark:border-gray-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${rule.bg} ${rule.color}`}><rule.icon size={18} /></div>
                    <span className="text-[15px] font-semibold text-text-primary dark:text-white">{rule.level}</span>
                  </div>
                  <select 
                    value={routes[rule.key]} 
                    onChange={(e) => { setRoutes({...routes, [rule.key]: e.target.value}); showToast(`Routing updated`, 'success') }}
                    className="px-4 py-2 rounded-lg bg-ink-grey dark:bg-gray-900 border border-transparent outline-none text-[13px] font-semibold text-text-primary dark:text-white"
                  >
                    <option value="slack">Slack</option>
                    <option value="email">Email</option>
                    <option value="pagerduty">PagerDuty</option>
                    <option value="webhook">Webhook</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      <DarkFooter badge="Alerting" title="Never miss" highlight="an anomaly." description="Configure PagerDuty, Slack, and Email integrations for round-the-clock incident response." primary="Setup Webhooks" secondary="API Docs" />
    </div>
  )
}

export default Alerts
