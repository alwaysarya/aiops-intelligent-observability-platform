import { motion } from 'framer-motion'

function SectionHeader({ label, labelColor = '#0071E3', icon: Icon, title, gradientTitle, description }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="text-center max-w-[760px] mx-auto mb-16">
      {label && (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 shadow-sm" style={{ background: `${labelColor}10`, border: `1px solid ${labelColor}20` }}>
          {Icon && <Icon size={14} style={{ color: labelColor }} />}
          <span className="text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color: labelColor }}>{label}</span>
        </div>
      )}
      <h2 className="text-[52px] md:text-[64px] font-semibold tracking-[-0.04em] leading-[1.02] text-text-primary">
        {title}
        {gradientTitle && (<><br /><span className="bg-gradient-to-r from-[#0071E3] via-[#5E5CE6] to-[#AF52DE] bg-clip-text text-transparent animate-gradient">{gradientTitle}</span></>)}
      </h2>
      {description && <p className="mt-6 max-w-[560px] mx-auto text-[18px] text-text-secondary leading-[1.5] tracking-[-0.015em]">{description}</p>}
    </motion.div>
  )
}

export default SectionHeader
