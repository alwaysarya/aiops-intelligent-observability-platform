import { motion } from 'framer-motion'

function SectionHeader({ label, labelColor = '#0071E3', icon: Icon, title, gradientTitle, description }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.7 }}
      className="text-center max-w-[760px] mx-auto mb-16">
      {label && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5" style={{ background: `${labelColor}15`, border: `1px solid ${labelColor}30` }}>
          {Icon && <Icon size={12} style={{ color: labelColor }} />}
          <span className="text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color: labelColor }}>{label}</span>
        </div>
      )}
      <h2 className="text-[52px] md:text-[64px] font-semibold tracking-[-0.04em] leading-[1.02] text-text-primary">
        {title}
        {gradientTitle && (<><br /><span className="bg-gradient-to-r from-[#0071E3] to-[#AF52DE] bg-clip-text text-transparent">{gradientTitle}</span></>)}
      </h2>
      {description && <p className="mt-5 max-w-[560px] mx-auto text-[18px] text-text-secondary leading-[1.5] tracking-[-0.015em]">{description}</p>}
    </motion.div>
  )
}

export default SectionHeader
