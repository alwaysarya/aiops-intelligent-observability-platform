import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

function HeroSection({ badge, titleLine1, titleLine2, description, primaryCTA, secondaryCTA }) {
  return (
    <section className="relative overflow-hidden bg-black">
      {/* Animated Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1300px] h-[1300px] rounded-full blur-[260px]"
          style={{ background: 'radial-gradient(circle, #0071E3, transparent 55%)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/3 right-1/4 w-[1100px] h-[1100px] rounded-full blur-[240px]"
          style={{ background: 'radial-gradient(circle, #5E5CE6, transparent 55%)' }}
        />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }} />

      {/* Floating Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 43) % 100}%`,
            background: ['#5AC8FA', '#AF52DE', '#0071E3'][i % 3],
            boxShadow: `0 0 10px ${['#5AC8FA', '#AF52DE', '#0071E3'][i % 3]}`,
          }}
          animate={{ y: [0, -40, 0], opacity: [0.15, 0.9, 0.15] }}
          transition={{ duration: 4 + (i % 4), repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}

      <div className="relative mx-auto max-w-[1200px] px-6 pt-32 pb-28">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="text-center">
          
          {/* Badge */}
          {badge && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl mb-10">
              <motion.span
                className="w-1.5 h-1.5 rounded-full bg-[#30D158]"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ boxShadow: '0 0 10px #30D158' }}
              />
              <span className="text-white/80 text-[11px] font-semibold tracking-[0.16em] uppercase">{badge}</span>
            </div>
          )}

          {/* Headline with Shimmer */}
          <h1 className="max-w-[1100px] mx-auto text-[72px] md:text-[112px] font-semibold leading-[0.95] tracking-[-0.045em] text-white">
            {titleLine1}
            <br />
            <motion.span
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block bg-gradient-to-r from-[#5AC8FA] via-[#0071E3] via-[#AF52DE] to-[#5AC8FA] bg-clip-text text-transparent bg-[length:200%_100%]"
            >
              {titleLine2}
            </motion.span>
          </h1>

          {/* Subtitle */}
          {description && <p className="mt-10 max-w-[620px] mx-auto text-[21px] leading-[1.5] tracking-[-0.015em] text-white/50">{description}</p>}

          {/* CTAs */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            {primaryCTA && (
              <a href={primaryCTA.href || '#'} className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold tracking-[-0.01em] text-black transition-all hover:scale-[1.03]" style={{ boxShadow: '0 0 60px rgba(255,255,255,0.3)' }}>
                {primaryCTA.label} <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" strokeWidth={2.4} />
              </a>
            )}
            {secondaryCTA && (
              <a href={secondaryCTA.href || '#'} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-[15px] font-medium tracking-[-0.01em] text-white/90 backdrop-blur-xl transition-all hover:bg-white/[0.08]">
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
