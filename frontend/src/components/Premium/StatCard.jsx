import { motion } from 'framer-motion'

function StatCard({ label, value, color = '#5AC8FA', icon: Icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6, delay }}
      className="relative rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/[0.08] p-5 overflow-hidden group hover:bg-white/[0.06] transition-all"
    >
      <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-30 group-hover:opacity-60 transition-opacity"
        style={{ background: color }} />
      <div className="relative flex items-center gap-2 mb-3">
        {Icon && <Icon size={12} style={{ color }} strokeWidth={2.4} />}
        <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-white/40">{label}</span>
      </div>
      <div className="relative text-[32px] font-semibold leading-none tracking-[-0.035em] text-white tabular-nums"
        style={{ textShadow: `0 0 40px ${color}80` }}>
        {value}
      </div>
    </motion.div>
  )
}

export default StatCard
