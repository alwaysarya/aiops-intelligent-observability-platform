import { motion } from 'framer-motion'
import { Box, Activity, ShieldAlert, CheckCircle2, TrendingUp, Cpu, ArrowRight, Sparkles, Zap, Target } from 'lucide-react'
import DarkFooter from '../components/Premium/DarkFooter'

const linearEase = [0.25, 0.1, 0.25, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.05, ease: linearEase } }),
}

function ModelsPage() {
  const models = [
    { name: 'yolov8n.pt', size: '6.2 MB', score: '19.3', status: 'Healthy', color: '#30D158', precision: '52.8%', recall: '19.3%' },
    { name: 'custom_v2.pt', size: '12.4 MB', score: '17.5', status: 'Review', color: '#E5A00D', precision: '53.6%', recall: '19.2%' },
    { name: 'resnet50.h5', size: '98.1 MB', score: '15.3', status: 'Critical', color: '#FF453A', precision: '56.7%', recall: '16.6%' },
  ]

  return (
    <div className="w-full min-h-screen bg-[#09090B] text-[#EDEDED] font-[-apple-system,BlinkMacSystemFont,'Inter','Helvetica_Neue',sans-serif] antialiased selection:bg-[#5E6AD2]/30">
      
      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden border-b border-white/[0.06]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#8B5CF6]/[0.12] blur-[130px] rounded-full pointer-events-none" />
        
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div key={i} animate={{ y: [0, -150, 0], opacity: [0, 1, 0] }} transition={{ duration: Math.random() * 8 + 8, repeat: Infinity, delay: Math.random() * 5 }}
            className="absolute w-1 h-1 bg-[#8B5CF6] rounded-full blur-[1px] shadow-[0_0_8px_#8B5CF6]" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
        ))}

        <div className="relative z-10 max-w-[1100px] mx-auto px-6 py-24 md:py-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: linearEase }}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(139,92,246,0.1)]">
                  <Box size={12} className="text-[#8B5CF6]" />
                  <span className="text-[12px] font-medium text-[#8A8F98]">Model Registry</span>
                </div>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: linearEase }} className="text-[56px] md:text-[72px] font-semibold tracking-[-0.04em] leading-[1.05] mb-4 text-[#EDEDED]">
                Every model, <br />
                <span className="bg-gradient-to-r from-[#8B5CF6] via-[#5E6AD2] to-[#8B5CF6] bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]">cryptographically bound.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: linearEase }} className="text-[17px] text-[#8A8F98] max-w-[500px] leading-[1.6]">
                Performance metrics, integrity fingerprints, and lineage — for every registered artifact.
              </motion.p>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: linearEase }} className="flex gap-3">
              <button className="px-5 py-3 rounded-lg bg-[#161718] border border-white/[0.06] text-[14px] font-semibold text-[#EDEDED] hover:bg-[#1A1B1E] hover:border-white/[0.15] transition-all flex items-center gap-2">
                <Cpu size={16} /> Register Model
              </button>
              <button className="px-5 py-3 rounded-lg bg-[#EDEDED] text-[#09090B] text-[14px] font-semibold hover:bg-white shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all flex items-center gap-2">
                Browse Registry <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TOP PERFORMER SPOTLIGHT */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} className="relative w-full bg-[#09090B] py-16 border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div variants={fadeUp} className="bg-gradient-to-br from-[#0F1011] to-[#09090B] rounded-2xl p-8 md:p-12 border border-white/[0.06] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#8B5CF6]/[0.08] blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 max-w-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 text-[#8B5CF6] text-[11px] font-bold uppercase tracking-wider mb-6">
                <TrendingUp size={12} /> Top Performer
              </div>
              <h2 className="text-[32px] md:text-[44px] font-semibold text-[#EDEDED] leading-tight mb-4">The best-in-class model today.</h2>
              <p className="text-[#8A8F98] text-[15px] mb-8 leading-relaxed">Cryptographically signed and lineage-verified. Runtime performance tracked end-to-end.</p>
              <div className="flex gap-4">
                <div className="px-5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-md">
                  <p className="text-[10px] text-[#5A5F66] uppercase tracking-wider mb-1 font-bold">mAP50 Score</p>
                  <p className="text-[24px] font-semibold text-[#30D158]">19.3%</p>
                </div>
                <div className="px-5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-md">
                  <p className="text-[10px] text-[#5A5F66] uppercase tracking-wider mb-1 font-bold">Precision</p>
                  <p className="text-[24px] font-semibold text-[#5E6AD2]">52.8%</p>
                </div>
              </div>
            </div>

            {/* Circular Gauge */}
            <div className="relative z-10 w-48 h-48 rounded-full border-[6px] border-white/[0.06] flex items-center justify-center flex-shrink-0" 
              style={{ borderTopColor: '#30D158', borderRightColor: '#30D158', transform: 'rotate(45deg)', boxShadow: '0 0 40px rgba(48,209,88,0.15)' }}>
              <div className="text-center" style={{ transform: 'rotate(-45deg)' }}>
                <p className="text-[36px] font-bold text-[#EDEDED] leading-none">GOOD</p>
                <p className="text-[11px] text-[#5A5F66] uppercase tracking-wider mt-1 font-bold">Model Status</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* FULL REGISTRY */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} className="relative w-full bg-[#09090B] py-16 border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[24px] font-semibold text-[#EDEDED] tracking-[-0.02em]">Full Registry</h2>
            <div className="text-[12px] text-[#8A8F98] bg-[#161718] border border-white/[0.06] px-3 py-1.5 rounded-lg font-medium">
              {models.length} models indexed
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {models.map((mdl, i) => (
              <motion.div key={mdl.name} variants={fadeUp} custom={i} whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.15)' }}
                className="bg-[#0F1011] rounded-xl border border-white/[0.06] overflow-hidden group cursor-pointer transition-all">
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#161718] border border-white/[0.06] group-hover:bg-[#8B5CF6]/10 group-hover:border-[#8B5CF6]/30 transition-colors">
                      <Cpu size={22} className="text-[#8A8F98] group-hover:text-[#8B5CF6] transition-colors" />
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border"
                      style={{ background: `${mdl.color}15`, color: mdl.color, borderColor: `${mdl.color}30` }}>
                      {mdl.status}
                    </span>
                  </div>
                  
                  <h3 className="text-[16px] font-semibold text-[#EDEDED] mb-1 group-hover:text-[#8B5CF6] transition-colors font-mono">{mdl.name}</h3>
                  <p className="text-[12px] text-[#5A5F66] mb-5">{mdl.size}</p>
                  
                  <div className="space-y-2.5 mb-5">
                    <div className="flex justify-between items-center text-[12px]">
                      <span className="text-[#8A8F98]">Precision</span>
                      <span className="font-semibold text-[#EDEDED] font-mono">{mdl.precision}</span>
                    </div>
                    <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: mdl.precision }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.3 }} className="h-full rounded-full" style={{ background: mdl.color }} />
                    </div>
                    <div className="flex justify-between items-center text-[12px] mt-2">
                      <span className="text-[#8A8F98]">Recall</span>
                      <span className="font-semibold text-[#EDEDED] font-mono">{mdl.recall}</span>
                    </div>
                    <div className="h-1 w-full bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: mdl.recall }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.4 }} className="h-full rounded-full bg-[#5E6AD2]" />
                    </div>
                  </div>

                  <div className="flex items-end justify-between border-t border-white/[0.04] pt-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#5A5F66] mb-1">mAP50 Score</p>
                      <p className="text-[22px] font-semibold leading-none font-mono" style={{ color: mdl.color }}>{mdl.score}%</p>
                    </div>
                    <ArrowRight size={16} className="text-[#5A5F66] group-hover:text-[#8B5CF6] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <DarkFooter 
        badge="MLOps" 
        title="Anchor your" 
        highlight="next model." 
        description="Sign, track, and verify every artifact in minutes. Deploy with confidence." 
        primary="Register Model" 
        secondary="Read Docs" 
      />

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  )
}

export default ModelsPage
