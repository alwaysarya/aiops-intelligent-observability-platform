import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle, CheckCircle2, ShieldAlert, Clock } from 'lucide-react'

function NotificationPanel({ isOpen, onClose }) {
  const notifications = [
    { id: 1, type: 'danger', title: 'Critical Anomaly Detected', desc: 'payment-service latency spike (1250ms)', time: '2m ago', unread: true },
    { id: 2, type: 'warning', title: 'Model Drift Warning', desc: 'yolov8n.pt accuracy dropped by 4%', time: '15m ago', unread: true },
    { id: 3, type: 'success', title: 'Dataset Verified', desc: 'coco_val_2017 successfully anchored', time: '1h ago', unread: false },
    { id: 4, type: 'info', title: 'System Update', desc: 'Platform v1.0.1 deployed successfully', time: '3h ago', unread: false },
  ]

  const getIcon = (type) => {
    switch(type) {
      case 'danger': return <ShieldAlert size={18} className="text-apple-red" />
      case 'warning': return <AlertTriangle size={18} className="text-apple-orange" />
      case 'success': return <CheckCircle2 size={18} className="text-apple-green" />
      default: return <Clock size={18} className="text-apple-blue" />
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50" />
          
          {/* Panel */}
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[380px] bg-white shadow-2xl z-50 flex flex-col border-l border-black/[0.08]"
          >
            <div className="flex items-center justify-between p-6 border-b border-black/[0.06] bg-white/80 backdrop-blur-xl">
              <div>
                <h2 className="text-[20px] font-semibold text-text-primary">Notifications</h2>
                <p className="text-[12px] text-text-tertiary">You have 2 unread alerts</p>
              </div>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-ink-grey transition-colors"><X size={20} className="text-text-tertiary" /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {notifications.map(n => (
                <div key={n.id} className={`p-4 rounded-2xl border transition-colors cursor-pointer ${n.unread ? 'bg-blue-50/50 border-blue-100' : 'bg-white border-black/[0.04] hover:bg-ink-grey'}`}>
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-white shadow-sm border border-black/[0.04]">{getIcon(n.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-[14px] font-semibold text-text-primary">{n.title}</p>
                        {n.unread && <span className="w-2 h-2 rounded-full bg-apple-blue" />}
                      </div>
                      <p className="text-[13px] text-text-secondary leading-snug">{n.desc}</p>
                      <p className="text-[11px] text-text-tertiary mt-2 font-medium">{n.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-black/[0.06] bg-ink-grey/30">
              <button className="w-full py-3 rounded-xl bg-white border border-black/[0.08] text-[13px] font-semibold text-text-primary hover:bg-ink-grey transition-colors">
                Mark all as read
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default NotificationPanel
