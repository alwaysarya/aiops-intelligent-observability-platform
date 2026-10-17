import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react'

function MetricsCard({ title, value, change, icon: Icon, gradient = 'from-purple-500 to-indigo-500', trend, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass-card-hover p-6 cursor-pointer group"
    >
      {/* Gradient Border Glow */}
      <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl -z-10`} />

      <div className="flex items-start justify-between mb-4">
        <div className={`relative p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
          <Icon className="w-5 h-5 text-white" />
          <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${gradient} blur-lg opacity-50 -z-10`} />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: delay + 0.2 }}
          className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors"
        >
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
        </motion.div>
      </div>

      <div>
        <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.3 }}
          className="text-4xl font-bold text-white tracking-tight"
        >
          {value}
        </motion.p>

        {change !== undefined && (
          <div className="flex items-center gap-1.5 mt-3">
            {trend === 'up' ? (
              <TrendingUp className="w-3.5 h-3.5 text-green-400" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 text-red-400" />
            )}
            <span className={`text-xs font-semibold ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              {change}
            </span>
            <span className="text-xs text-slate-500">vs last hour</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default MetricsCard
