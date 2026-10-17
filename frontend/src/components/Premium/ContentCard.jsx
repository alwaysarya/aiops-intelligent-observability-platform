import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

function ContentCard({ icon: Icon, color = '#0071E3', title, description, meta, actionLabel, onAction, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-[28px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] transition-all"
    >
      {/* Colored top accent */}
      <div className="h-1" style={{ background: `linear-gradient(90deg, ${color}, ${color}00)` }} />

      {/* Hover glow */}
      <div
        className="absolute -top-32 -right-32 h-64 w-64 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `${color}20` }}
      />

      <div className="relative p-7">
        {Icon && (
          <div
            className="flex h-12 w-12 items-center justify-center rounded-2xl mb-6"
            style={{ background: `${color}15`, border: `1px solid ${color}30` }}
          >
            <Icon size={18} style={{ color }} strokeWidth={2.2} />
          </div>
        )}

        <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-white mb-2">
          {title}
        </h3>

        <p className="text-[13px] text-white/50 leading-[1.5] mb-6">
          {description}
        </p>

        {(meta || actionLabel) && (
          <div className="flex items-center justify-between pt-5 border-t border-white/[0.06]">
            <span className="text-[11px] text-white/40">{meta}</span>
            {actionLabel && (
              <button
                onClick={onAction}
                className="flex items-center gap-1.5 text-[12.5px] font-semibold transition-all hover:gap-2.5"
                style={{ color }}
              >
                {actionLabel}
                <ArrowRight size={13} strokeWidth={2.4} />
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default ContentCard
