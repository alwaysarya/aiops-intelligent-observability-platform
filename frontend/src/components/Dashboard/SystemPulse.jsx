import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Cpu, HardDrive, Zap, Activity } from 'lucide-react'
import { simulator } from '../../services/simulator'

export default function SystemPulse() {
  const [stats, setStats] = useState({ cpu: 34, memory: 68, latency: 24 })

  useEffect(() => {
    simulator.start()
    const unsubscribe = simulator.subscribe((data) => {
      setStats({
        cpu: data.cpu,
        memory: data.memory,
        latency: data.latency
      })
    })
    return () => {
      unsubscribe()
      simulator.stop()
    }
  }, [])

  const MetricBar = ({ label, value, unit, icon: Icon, color }) => (
    <div className="flex items-center justify-between mb-4 last:mb-0">
      <div className="flex items-center gap-3 w-1/3">
        <Icon size={16} style={{ color }} />
        <span className="text-[13px] font-medium text-text-secondary">{label}</span>
      </div>
      <div className="flex-1 flex items-center gap-3">
        <div className="flex-1 h-2 bg-ink-grey rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: `${value}%` }} 
            transition={{ type: 'spring', bounce: 0, duration: 0.8 }}
            className="h-full rounded-full"
            style={{ background: color }}
          />
        </div>
        <span className="text-[13px] font-semibold text-text-primary w-12 text-right tabular-nums">{value}{unit}</span>
      </div>
    </div>
  )

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
      className="bg-white rounded-[28px] border border-black/[0.04] shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-6 h-full flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[18px] font-semibold text-text-primary flex items-center gap-2">
          <Activity className="w-5 h-5 text-apple-indigo" /> System Pulse
        </h3>
        <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-indigo-50 text-apple-indigo text-[10px] font-bold uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-apple-indigo animate-pulse" /> Live
        </span>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <MetricBar label="CPU Usage" value={stats.cpu} unit="%" icon={Cpu} color="#0071E3" />
        <MetricBar label="Memory" value={stats.memory} unit="%" icon={HardDrive} color="#AF52DE" />
        <MetricBar label="Latency" value={stats.latency} unit="ms" icon={Zap} color="#30D158" />
      </div>
      
      <div className="mt-4 pt-4 border-t border-black/[0.04]">
        <p className="text-[12px] text-text-tertiary text-center">Auto-refreshing every 2 seconds</p>
      </div>
    </motion.div>
  )
}
