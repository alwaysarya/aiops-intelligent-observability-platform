import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, ShieldAlert, CheckCircle2, Server, Zap } from 'lucide-react'

const initialActivities = [
  { id: 1, type: 'success', title: 'Dataset Integrity Verified', desc: 'coco_val_2017 • 5,000 images', time: 'Just now' },
  { id: 2, type: 'info', title: 'Model Signature Matched', desc: 'yolov8n.pt • SHA-256 OK', time: '2m ago' },
  { id: 3, type: 'warning', title: 'High Latency Detected', desc: 'payment-service • 1250ms', time: '5m ago' },
  { id: 4, type: 'success', title: 'Inference Batch Anchored', desc: 'Batch #847 • Block 0x8f3a', time: '8m ago' },
  { id: 5, type: 'danger', title: 'Backdoor Scan Complete', desc: '0 triggers detected', time: '12m ago' },
]

export default function LiveActivity() {
  const [activities, setActivities] = useState(initialActivities)

  // Simulate new incoming activity
  useEffect(() => {
    const interval = setInterval(() => {
      const newAct = {
        id: Date.now(),
        type: Math.random() > 0.7 ? 'warning' : 'success',
        title: Math.random() > 0.5 ? 'Log Parsed & Anchored' : 'Service Health Check',
        desc: Math.random() > 0.5 ? 'api-gateway • 24ms latency' : 'All systems operational',
        time: 'Just now'
      }
      setActivities(prev => [newAct, ...prev].slice(0, 5))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const getIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle2 size={16} className="text-apple-green" />
      case 'warning': return <ShieldAlert size={16} className="text-apple-orange" />
      case 'danger': return <Zap size={16} className="text-apple-red" />
      default: return <Activity size={16} className="text-apple-blue" />
    }
  }

  return (
    <div className="bg-white rounded-[32px] border border-black/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.03)] p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-[20px] font-semibold text-text-primary flex items-center gap-2">
            <Activity className="w-5 h-5 text-apple-blue" /> Live Activity
          </h3>
          <p className="text-[13px] text-text-tertiary">Real-time event stream</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-100">
          <span className="w-1.5 h-1.5 rounded-full bg-apple-red animate-pulse" />
          <span className="text-[11px] font-bold text-apple-red uppercase tracking-wider">Live</span>
        </div>
      </div>

      <div className="flex-1 space-y-3">
        <AnimatePresence>
          {activities.map((act) => (
            <motion.div 
              key={act.id} 
              initial={{ opacity: 0, x: -20, height: 0 }} 
              animate={{ opacity: 1, x: 0, height: 'auto' }} 
              exit={{ opacity: 0, x: 20, height: 0 }}
              className="flex items-start gap-3 p-3 rounded-2xl hover:bg-ink-grey transition-colors border border-transparent hover:border-black/[0.04]"
            >
              <div className="mt-0.5 p-2 rounded-xl bg-white border border-black/[0.04] shadow-sm">
                {getIcon(act.type)}
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-semibold text-text-primary">{act.title}</p>
                <p className="text-[12px] text-text-tertiary mt-0.5">{act.desc}</p>
              </div>
              <span className="text-[11px] text-text-tertiary font-medium whitespace-nowrap">{act.time}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
