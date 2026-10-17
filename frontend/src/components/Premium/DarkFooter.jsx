import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'

function DarkFooter({ badge = "Get Started", title = "Ready to", highlight = "scale up?", description = "Deploy your first microservice, configure alerts, and let the AI detect anomalies automatically.", primary = "Deploy Now", secondary = "Read Docs" }) {
  return (
    <section className="relative bg-ink-grey py-40 px-6 overflow-hidden border-t border-black/[0.04] mt-12">
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 70%)',
      }} />

      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-[800px] mx-auto text-center z-10">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/[0.08] bg-white shadow-sm mb-10 hover:scale-105 transition-transform cursor-default">
          <Sparkles size={14} className="text-apple-blue" />
          <span className="text-text-secondary text-[11px] font-bold tracking-[0.16em] uppercase">{badge}</span>
        </div>

        <h2 className="text-[56px] md:text-[88px] font-semibold leading-[1] tracking-[-0.045em] text-text-primary">
          {title}
          <br />
          <motion.span animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ duration: 6, repeat: Infinity }}
            className="inline-block bg-gradient-to-r from-[#0071E3] via-[#5E5CE6] to-[#AF52DE] bg-clip-text text-transparent bg-[length:200%_100%]">
            {highlight}
          </motion.span>
        </h2>

        <p className="mt-8 text-[20px] leading-[1.6] tracking-[-0.015em] text-text-secondary max-w-[500px] mx-auto">{description}</p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <a href="#" className="group inline-flex items-center gap-2 rounded-full bg-text-primary text-white px-8 py-4 text-[16px] font-semibold transition-all hover:scale-[1.03] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)]">
            {primary} <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#" className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white text-text-primary px-8 py-4 text-[16px] font-medium transition-all hover:bg-white hover:shadow-md">
            {secondary}
          </a>
        </div>
      </motion.div>
    </section>
  )
}

export default DarkFooter
