import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, AlertTriangle, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { simulator } from '../../services/simulator'

export const showToast = (message, type = 'success') => {
  window.dispatchEvent(new CustomEvent('show-toast', { detail: { message, type } }))
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000)
  }

  useEffect(() => {
    const handleToast = (e) => addToast(e.detail.message, e.detail.type)
    window.addEventListener('show-toast', handleToast)

    // Listen to simulator anomalies
    simulator.start()
    const unsubscribe = simulator.subscribe((data) => {
      if (data.newAnomaly) {
        addToast(`New Anomaly Detected! Score: ${(Math.random() * 0.3 + 0.7).toFixed(2)}`, 'warning')
      }
    })

    return () => {
      window.removeEventListener('show-toast', handleToast)
      unsubscribe()
    }
  }, [])

  const getIcon = (type) => {
    if (type === 'success') return <CheckCircle2 className="text-apple-green" size={20} />
    if (type === 'warning') return <AlertTriangle className="text-apple-orange" size={20} />
    return <AlertCircle className="text-apple-red" size={20} />
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div key={toast.id} initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, x: 50, scale: 0.9 }}
            className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white border border-black/[0.08] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] min-w-[320px]">
            {getIcon(toast.type)}
            <p className="text-[14px] font-semibold text-text-primary flex-1">{toast.message}</p>
            <button onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} className="p-1 hover:bg-ink-grey rounded-lg"><X size={14} className="text-text-tertiary" /></button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
