import { motion } from 'framer-motion'

function SpotlightCard({ icon: Icon, label, sublabel, title, description, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-[40px] overflow-hidden bg-ink-bg"
      style={{ boxShadow: '0 40px 120px -20px rgba(0,0,0,0.4)' }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0">
        <div
          className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full blur-[200px] opacity-25"
          style={{ background: 'radial-gradient(circle, #0071E3, transparent 60%)' }}
        />
      </div>

      {/* Top accent */}
      <div className="relative h-[2px] bg-gradient-to-r from-transparent via-[#0071E3] to-transparent" />

      {/* Content */}
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 p-12 md:p-16 items-center">
        <div>
          <div className="flex items-center gap-3 mb-6">
            {Icon && (
              <div
                className="flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, #0071E3, #5E5CE6)',
                  boxShadow: '0 16px 40px -8px #0071E390',
                }}
              >
                <Icon size={28} className="text-white" strokeWidth={2.2} />
              </div>
            )}
            <div>
              {label && (
                <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-white/40">
                  {label}
                </div>
              )}
              {sublabel && (
                <div className="text-[14px] font-semibold text-white">{sublabel}</div>
              )}
            </div>
          </div>

          <h3 className="text-[56px] md:text-[72px] font-semibold leading-[1] tracking-[-0.045em] text-white">
            {title}
          </h3>

          {description && (
            <p className="mt-6 text-[17px] leading-[1.5] tracking-[-0.01em] text-white/50 max-w-[440px]">
              {description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-center">{children}</div>
      </div>
    </motion.div>
  )
}

export default SpotlightCard
