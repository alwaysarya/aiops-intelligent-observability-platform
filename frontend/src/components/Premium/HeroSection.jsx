import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useRef } from 'react'

function HeroSection({ badge, titleLine1, titleLine2, description, primaryCTA, secondaryCTA }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section ref={ref} className="relative overflow-hidden bg-white pt-32 pb-32 border-b border-black/[0.04]">
      {/* Light soft gradients */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 pointer-events-none flex justify-center items-start pt-20 -z-10">
        <div className="w-[800px] h-[400px] bg-gradient-to-r from-blue-100 via-purple-100 to-cyan-100 rounded-full blur-[100px] opacity-60" />
      </motion.div>

      <div className="relative mx-auto max-w-[1200px] px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="text-center">
          
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/[0.08] bg-white/80 backdrop-blur-xl shadow-sm mb-12 hover:scale-105 transition-transform cursor-default">
            <Sparkles size={16} className="text-apple-blue animate-pulse" />
            <span className="text-text-secondary text-[12px] font-bold tracking-[0.16em] uppercase">{badge}</span>
          </div>

          <h1 className="max-w-[1000px] mx-auto text-[64px] md:text-[100px] font-semibold leading-[0.95] tracking-[-0.045em] text-text-primary">
            {titleLine1}
            <br />
            <motion.span animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block bg-gradient-to-r from-[#0071E3] via-[#5E5CE6] to-[#AF52DE] bg-clip-text text-transparent bg-[length:200%_100%]">
              {titleLine2}
            </motion.span>
          </h1>

          {description && <p className="mt-8 max-w-[650px] mx-auto text-[20px] leading-[1.6] tracking-[-0.015em] text-text-secondary">{description}</p>}

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            {primaryCTA && (
              <a href={primaryCTA.href || '#'} className="group inline-flex items-center gap-2 rounded-full bg-text-primary px-8 py-4 text-[16px] font-semibold text-white transition-all hover:scale-[1.03] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]">
                {primaryCTA.label} <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" strokeWidth={2.4} />
              </a>
            )}
            {secondaryCTA && (
              <a href={secondaryCTA.href || '#'} className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white/50 backdrop-blur-md px-8 py-4 text-[16px] font-medium text-text-primary transition-all hover:bg-white hover:shadow-md">
                {secondaryCTA.label}
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
