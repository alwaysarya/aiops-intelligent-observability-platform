import { motion } from 'framer-motion'
import { Network, Activity, Zap } from 'lucide-react'
import ServiceMap from '../components/ServiceMap/ServiceMap'

function ServiceMapPage() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/[0.08] bg-white shadow-sm mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-apple-green" style={{ boxShadow: '0 0 8px #30D158' }} />
          <span className="text-text-secondary text-[11px] font-semibold tracking-[0.16em] uppercase">Live Topology</span>
        </div>
        <h1 className="text-[52px] md:text-[72px] font-semibold leading-[1.02] tracking-[-0.04em] text-text-primary">
          Service <span className="bg-gradient-to-r from-[#0071E3] via-[#5E5CE6] to-[#AF52DE] bg-clip-text text-transparent">Map</span>
        </h1>
        <p className="mt-6 max-w-[560px] mx-auto text-[17px] text-text-secondary leading-[1.5]">
          Real-time service topology. Auto-refreshes every 30 seconds.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {[{ icon: Network, label: 'Live Graph', color: '#0071E3', value: '8 Nodes' }, { icon: Activity, label: 'Health', color: '#30D158', value: 'Real-time' }, { icon: Zap, label: 'Refresh', color: '#5E5CE6', value: 'Every 30s' }].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="relative rounded-xl bg-white border border-black/[0.04] p-4 shadow-sm overflow-hidden">
            <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-2xl opacity-10" style={{ background: stat.color }} />
            <div className="relative flex items-center gap-3">
              <stat.icon size={16} style={{ color: stat.color }} />
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-text-tertiary">{stat.label}</div>
                <div className="text-[14px] font-semibold text-text-primary">{stat.value}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <ServiceMap />
    </div>
  )
}

export default ServiceMapPage
