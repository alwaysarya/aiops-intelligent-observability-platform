import { motion } from 'framer-motion'
import { Network, Activity, Zap, Radio, Sparkles } from 'lucide-react'
import ServiceMap from '../components/ServiceMap/ServiceMap'

const linearEase = [0.25, 0.1, 0.25, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.05, ease: linearEase } }),
}

function ServiceMapPage() {
  return (
    <div className="w-full min-h-screen bg-[#09090B] text-[#EDEDED] font-[-apple-system,BlinkMacSystemFont,'Inter','Helvetica_Neue',sans-serif] antialiased selection:bg-[#5E6AD2]/30">
      
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#5E6AD2]/[0.12] blur-[130px] rounded-full pointer-events-none" />
        
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div key={i} animate={{ y: [0, -150, 0], opacity: [0, 1, 0] }} transition={{ duration: Math.random() * 8 + 8, repeat: Infinity, delay: Math.random() * 5 }}
            className="absolute w-1 h-1 bg-[#5E6AD2] rounded-full blur-[1px] shadow-[0_0_8px_#5E6AD2]" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
        ))}

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 py-24 md:py-28">
          <div className="flex flex-col items-center text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: linearEase }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(94,106,210,0.1)]">
                <Radio size={12} className="text-[#30D158] animate-pulse" />
                <span className="text-[12px] font-medium text-[#8A8F98]">Live Topology</span>
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: linearEase }} className="text-[56px] md:text-[80px] font-semibold tracking-[-0.04em] leading-[1.05] mb-6 text-[#EDEDED]">
              Service <br />
              <span className="bg-gradient-to-r from-[#5E6AD2] via-[#8B5CF6] to-[#5E6AD2] bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]">Map.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: linearEase }} className="text-[19px] text-[#8A8F98] max-w-[500px] leading-[1.6]">
              Real-time service topology. Auto-refreshes every 30 seconds.
            </motion.p>
          </div>
        </div>
      </section>

      {/* STATS ROW */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} className="relative w-full bg-[#09090B] py-12 border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { icon: Network, label: 'Live Graph', color: '#5E6AD2', value: '8 Nodes' },
              { icon: Activity, label: 'Health', color: '#30D158', value: 'Real-time' },
              { icon: Zap, label: 'Refresh', color: '#8B5CF6', value: 'Every 30s' },
            ].map((stat, i) => (
              <motion.div key={stat.label} variants={fadeUp} custom={i} whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.15)' }}
                className="relative rounded-xl bg-[#0F1011] border border-white/[0.06] p-4 overflow-hidden transition-all">
                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-2xl opacity-10" style={{ background: stat.color }} />
                <div className="relative flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}>
                    <stat.icon size={16} style={{ color: stat.color }} />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#5A5F66]">{stat.label}</div>
                    <div className="text-[14px] font-semibold text-[#EDEDED]">{stat.value}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SERVICE MAP GRAPH */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} className="relative w-full bg-[#09090B] py-12">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="bg-[#0F1011] rounded-xl border border-white/[0.06] overflow-hidden relative" style={{ minHeight: '600px' }}>
            <div className="absolute top-4 left-4 z-10 bg-[#09090B]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/[0.08] shadow-lg">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A8F98] flex items-center gap-1.5">
                <Sparkles size={11} className="text-[#5E6AD2]" /> Live Topology Graph
              </p>
            </div>
            <ServiceMap />
          </div>
        </div>
      </motion.section>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  )
}

export default ServiceMapPage
