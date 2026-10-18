import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, Server, Activity } from 'lucide-react'

const initialEvents = [
  { id: 1, type: 'success', title: 'Deployment Successful', desc: 'payment-service v2.1 deployed to prod', time: 'Just now' },
  { id: 2, type: 'warning', title: 'High Latency Detected', desc: 'api-gateway latency > 500ms', time: '2m ago' },
  { id: 3, type: 'info', title: 'New Log Batch', desc: 'Received 1,200 logs from user-service', time: '5m ago' },
]

export default function LiveActivityFeed() {
  const [events, setEvents] = useState(initialEvents)

  useEffect(() => {
    const interval = setInterval(() => {
      const newEvent = {
        id: Date.now(),
        type: Math.random() > 0.7 ? 'warning' : Math.random() > 0.4 ? 'success' : 'info',
        title: Math.random() > 0.5 ? 'Service Health Check' : 'Anomaly Detected',
        desc: `Auto-triggered by AIOps engine`,
        time: 'Just now'
      }
      setEvents(prev => [newEvent, ...prev].slice(0, 5))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const getIcon = (type) => {
    if (type === 'success') return <CheckCircle2 size={16} className="text-apple-green" />
    if (type === 'warning') return <AlertCircle size={16} className="text-apple-orange" />
    return <Activity size={16} className="text-apple-blue" />
  }

  return (
    <div className="bg-white rounded-[28px] border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[18px] font-semibold text-text-primary flex items-center gap-2">
          <Activity size={18} className="text-apple-blue" /> Live Activity
        </h3>
        <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-apple-green bg-green-50 px-2 py-1 rounded-md">
          <span className="w-1.5 h-1.5 rounded-full bg-apple-green animate-pulse" /> Live
        </span>
      </div>
      
      <div className="flex-1 space-y-3 overflow-hidden">
        <AnimatePresence>
          {events.map((event) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, x: -20, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              exit={{ opacity: 0, x: 20, height: 0 }}
              className="flex items-start gap-3 p-3 rounded-xl border border-black/[0.04] hover:bg-ink-grey transition-colors"
            >
              <div className="p-2 bg-white rounded-lg shadow-sm border border-black/[0.04] mt-0.5">
                {getIcon(event.type)}
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-semibold text-text-primary">{event.title}</p>
                <p className="text-[12px] text-text-secondary mt-0.5">{event.desc}</p>
              </div>
              <span className="text-[11px] text-text-tertiary whitespace-nowrap">{event.time}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
