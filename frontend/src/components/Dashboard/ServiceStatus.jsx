import { motion } from 'framer-motion'
import { Server, Activity, ArrowRight } from 'lucide-react'

function ServiceStatus({ services }) {
  const serviceList = [
    { key: 'ingestion', name: 'Log Ingestion', port: 8000, icon: '📥' },
    { key: 'anomaly', name: 'AI Anomaly Detector', port: 8001, icon: '🧠' },
    { key: 'alerts', name: 'Alert Service', port: 8002, icon: '🔔' },
    { key: 'rca', name: 'Root Cause Analyzer', port: 8003, icon: '🔍' },
  ]

  const healthyCount = Object.values(services).filter(Boolean).length
  const total = serviceList.length

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-[32px] border border-black/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden"
    >
      <div className="p-7 border-b border-black/[0.04] flex items-center justify-between bg-white/50 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-blue-50 text-apple-blue shadow-sm">
            <Server className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-[20px] font-semibold text-text-primary">Infrastructure Health</h3>
            <p className="text-[13px] text-text-tertiary">Real-time service status</p>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-full text-[13px] font-bold flex items-center gap-2 ${healthyCount === total ? 'bg-green-50 text-apple-green shadow-sm' : 'bg-orange-50 text-apple-orange'}`}>
          <Activity className="w-4 h-4" />
          {healthyCount}/{total} Online
        </div>
      </div>

      <div className="p-4 space-y-2">
        {serviceList.map(({ key, name, port, icon }, idx) => {
          const isHealthy = services[key]
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 + idx * 0.1 }}
              className="group flex items-center justify-between p-5 rounded-2xl hover:bg-ink-grey border border-transparent hover:border-black/[0.04] transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-5">
                <div className="text-3xl w-12 h-12 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-black/[0.04] group-hover:scale-110 transition-transform duration-300">
                  {icon}
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-text-primary group-hover:text-apple-blue transition-colors">{name}</p>
                  <p className="text-[13px] text-text-tertiary font-mono mt-1">localhost:{port}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative flex h-3 w-3">
                  {isHealthy && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-apple-green opacity-50"></span>}
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${isHealthy ? 'bg-apple-green' : 'bg-apple-red'}`} style={{ boxShadow: `0 0 10px ${isHealthy ? '#30D158' : '#FF453A'}` }}></span>
                </div>
                <span className={`text-[13px] font-bold w-16 text-right ${isHealthy ? 'text-apple-green' : 'text-apple-red'}`}>
                  {isHealthy ? 'Healthy' : 'Down'}
                </span>
                <ArrowRight size={16} className="text-text-tertiary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all ml-2" />
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default ServiceStatus
