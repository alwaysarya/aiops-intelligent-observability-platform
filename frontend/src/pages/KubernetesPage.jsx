import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Server, Box, Activity, Layers, Terminal, X, RefreshCw } from 'lucide-react'
import DarkFooter from '../components/Premium/DarkFooter'

function KubernetesPage() {
  const [selectedPod, setSelectedPod] = useState(null)
  const [logs, setLogs] = useState([])

  const pods = [
    { name: 'aiops-log-ingestion-7d8f9', status: 'Running', restarts: 0, age: '2d', color: '#30D158' },
    { name: 'aiops-anomaly-detector-5c6b', status: 'Running', restarts: 1, age: '1d', color: '#30D158' },
    { name: 'aiops-alert-service-2a3b', status: 'Running', restarts: 0, age: '5h', color: '#30D158' },
    { name: 'aiops-rca-9f8e7d', status: 'CrashLoop', restarts: 12, age: '10m', color: '#FF453A' },
  ]

  const fetchLogs = (podName) => {
    setSelectedPod(podName)
    setLogs(['Connecting to pod...', `Fetching logs for ${podName}...`, '...'])
    
    // Simulate real-time log streaming
    setTimeout(() => {
      const mockLogs = [
        `[INFO] ${new Date().toISOString()} - Starting service...`,
        `[INFO] ${new Date().toISOString()} - Connected to Kafka at kafka:9092`,
        `[INFO] ${new Date().toISOString()} - Connected to Elasticsearch`,
        `[WARN] ${new Date().toISOString()} - High latency detected in poll loop`,
        `[INFO] ${new Date().toISOString()} - Processed 120 logs`,
        `[ERROR] ${new Date().toISOString()} - Failed to connect to database`,
        `[INFO] ${new Date().toISOString()} - Reconnecting...`,
      ]
      setLogs(mockLogs)
    }, 1500)
  }

  return (
    <div className="w-full bg-white dark:bg-gray-900 min-h-screen">
      <section className="max-w-[1200px] mx-auto px-6 pt-20 pb-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-apple-blue mb-6">
            <Layers size={14} />
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase">Infrastructure</span>
          </div>
          <h1 className="text-[52px] md:text-[72px] font-semibold tracking-[-0.04em] leading-[1.02] text-text-primary dark:text-white mb-4">
            Cluster <span className="bg-gradient-to-r from-[#0071E3] to-[#30D158] bg-clip-text text-transparent">Health.</span>
          </h1>
          <p className="text-[18px] text-text-secondary dark:text-gray-400">Monitor Kubernetes nodes, pods, and deployments in real-time.</p>
        </motion.div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Active Pods', value: '12', icon: Box, color: '#0071E3' },
            { label: 'Nodes Online', value: '3', icon: Server, color: '#30D158' },
            { label: 'Deployments', value: '5', icon: Activity, color: '#AF52DE' },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-[24px] border border-black/[0.04] dark:border-gray-700 p-6 shadow-sm flex items-center gap-5">
              <div className="p-4 rounded-2xl" style={{ background: `${stat.color}10`, color: stat.color }}><stat.icon size={24} /></div>
              <div>
                <p className="text-[12px] font-bold uppercase tracking-wider text-text-tertiary mb-1">{stat.label}</p>
                <p className="text-[32px] font-semibold text-text-primary dark:text-white leading-none">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pods List */}
          <div className="bg-white dark:bg-gray-800 rounded-[32px] border border-black/[0.04] dark:border-gray-700 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-black/[0.04] dark:border-gray-700 bg-ink-grey/30 dark:bg-gray-900/50">
              <h3 className="text-[20px] font-semibold text-text-primary dark:text-white flex items-center gap-2"><Box size={20} className="text-apple-blue" /> Pods Overview</h3>
            </div>
            <div className="divide-y divide-black/[0.04] dark:divide-gray-700">
              {pods.map((pod) => (
                <div key={pod.name} onClick={() => fetchLogs(pod.name)} className="flex items-center justify-between p-5 hover:bg-ink-grey dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-3 h-3 rounded-full" style={{ background: pod.color, boxShadow: `0 0 10px ${pod.color}` }} />
                    <div>
                      <p className="text-[15px] font-semibold text-text-primary dark:text-white font-mono">{pod.name}</p>
                      <p className="text-[12px] text-text-tertiary">Restarts: {pod.restarts} • Age: {pod.age}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-[12px] font-bold" style={{ background: `${pod.color}15`, color: pod.color }}>{pod.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Logs Viewer */}
          <div className="bg-black rounded-[32px] border border-gray-800 shadow-lg overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-gray-900">
              <div className="flex items-center gap-2 text-gray-300">
                <Terminal size={16} />
                <span className="text-[13px] font-mono">{selectedPod || 'Select a pod to view logs'}</span>
              </div>
              {selectedPod && <button onClick={() => setSelectedPod(null)} className="text-gray-500 hover:text-white"><X size={16} /></button>}
            </div>
            <div className="p-4 flex-1 overflow-y-auto font-mono text-[12px] leading-relaxed">
              {logs.length === 0 ? (
                <div className="text-gray-500 text-center py-20">Click on a pod to view its live logs</div>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className={`mb-1 ${log.includes('[ERROR]') ? 'text-red-400' : log.includes('[WARN]') ? 'text-yellow-400' : 'text-green-400'}`}>
                    {log}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <DarkFooter badge="Kubernetes" title="Scale with" highlight="confidence." description="Deploy, manage, and scale containerized applications seamlessly." primary="Cluster Settings" secondary="Docs" />
    </div>
  )
}

export default KubernetesPage
