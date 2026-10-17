import { motion } from 'framer-motion'
import { TrendingUp, ArrowUpRight } from 'lucide-react'

function StatCard({ label, value, color = '#0071E3', icon: Icon, delay = 0 }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true, margin: "-50px" }} 
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative rounded-[28px] bg-white border border-black/[0.04] p-6 overflow-hidden group shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-500"
    >
      {/* Colored Top Accent on Hover */}
      <div className="absolute top-0 left-0 w-full h-[3px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: `linear-gradient(90deg, ${color}00, ${color}, ${color}00)` }} />
      
      {/* Dynamic Background Glow */}
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none" style={{ background: color }} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl transition-transform duration-500 group-hover:scale-110" style={{ background: `${color}10`, border: `1px solid ${color}20`, boxShadow: `0 4px 12px ${color}15` }}>
            {Icon && <Icon size={22} style={{ color }} strokeWidth={2.2} />}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: delay + 0.2 }}
            className="flex items-center gap-1 text-[12px] font-bold text-apple-green bg-green-50/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-green-100"
          >
            <TrendingUp size={14} />
            <span>+12%</span>
          </motion.div>
        </div>

        <p className="text-[13px] font-semibold text-text-tertiary uppercase tracking-[0.1em] mb-1.5">{label}</p>
        <div className="flex items-end justify-between">
          <h3 className="text-[42px] font-semibold leading-none tracking-[-0.04em] text-text-primary tabular-nums">
            {value}
          </h3>
          <ArrowUpRight size={20} className="text-text-tertiary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 mb-1" />
        </div>
      </div>
    </motion.div>
  )
}

export default StatCard
