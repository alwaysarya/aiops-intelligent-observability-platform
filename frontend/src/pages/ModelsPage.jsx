import { motion } from 'framer-motion'
import { Box, Activity, ShieldAlert, CheckCircle2, TrendingUp, Cpu, ArrowRight } from 'lucide-react'
import DarkFooter from '../components/Premium/DarkFooter'

function ModelsPage() {
  const models = [
    { name: 'yolov8n.pt', size: '6.2 MB', score: '19.3', status: 'Healthy', color: '#30D158', precision: '52.8%', recall: '19.3%' },
    { name: 'custom_v2.pt', size: '12.4 MB', score: '17.5', status: 'Review', color: '#FF9F0A', precision: '53.6%', recall: '19.2%' },
    { name: 'resnet50.h5', size: '98.1 MB', score: '15.3', status: 'Critical', color: '#FF453A', precision: '56.7%', recall: '16.6%' },
  ]

  return (
    <div className="w-full bg-white min-h-screen">
      {/* 1. Header Section */}
      <section className="max-w-[1200px] mx-auto px-6 pt-20 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-apple-purple mb-4">
              <Box size={14} />
              <span className="text-[11px] font-bold tracking-[0.16em] uppercase">Model Registry</span>
            </div>
            <h1 className="text-[52px] md:text-[64px] font-semibold tracking-[-0.04em] leading-[1.02] text-text-primary">
              Every model, <br/>
              <span className="bg-gradient-to-r from-[#AF52DE] to-[#0071E3] bg-clip-text text-transparent">cryptographically bound.</span>
            </h1>
            <p className="mt-4 text-[18px] text-text-secondary max-w-[500px]">Performance metrics, integrity fingerprints, and lineage — for every registered artifact.</p>
          </div>
          
          <div className="flex gap-3">
            <button className="px-6 py-3.5 rounded-full bg-white border border-black/[0.08] text-[15px] font-semibold text-text-primary hover:bg-ink-grey transition-all flex items-center gap-2">
              <Cpu size={16} /> Register Model
            </button>
            <button className="px-6 py-3.5 rounded-full bg-apple-purple text-white text-[15px] font-semibold hover:bg-purple-600 shadow-lg shadow-purple-500/20 transition-all flex items-center gap-2">
              Browse Registry <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </section>

      {/* 2. Sub-Section: Top Performer (Spotlight) */}
      <section className="max-w-[1200px] mx-auto px-6 pb-20">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900 to-black rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-apple-purple rounded-full blur-[100px] opacity-20" />
          
          <div className="relative z-10 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 text-[11px] font-bold uppercase tracking-wider mb-6">
              <TrendingUp size={14} /> Top Performer
            </div>
            <h2 className="text-[36px] md:text-[48px] font-semibold text-white leading-tight mb-4">The best-in-class model today.</h2>
            <p className="text-white/60 text-[16px] mb-8">Cryptographically signed and lineage-verified. Runtime performance tracked end-to-end.</p>
            <div className="flex gap-4">
              <div className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                <p className="text-[11px] text-white/50 uppercase tracking-wider mb-1">mAP50 Score</p>
                <p className="text-[24px] font-bold text-apple-green">19.3%</p>
              </div>
              <div className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md">
                <p className="text-[11px] text-white/50 uppercase tracking-wider mb-1">Precision</p>
                <p className="text-[24px] font-bold text-apple-blue">52.8%</p>
              </div>
            </div>
          </div>

          {/* Circular gauge visualization */}
          <div className="relative z-10 w-48 h-48 rounded-full border-[6px] border-white/10 flex items-center justify-center flex-shrink-0" style={{ borderTopColor: '#30D158', borderRightColor: '#30D158', transform: 'rotate(45deg)' }}>
            <div className="text-center" style={{ transform: 'rotate(-45deg)' }}>
              <p className="text-[40px] font-bold text-white leading-none">GOOD</p>
              <p className="text-[12px] text-white/50 uppercase tracking-wider mt-1">Model Status</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. Main Section: All Models */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[28px] font-semibold text-text-primary">Full Registry</h2>
          <div className="text-[14px] text-text-tertiary bg-ink-grey px-3 py-1.5 rounded-lg">{models.length} models indexed</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((mdl, i) => (
            <motion.div key={mdl.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }}
              className="bg-white rounded-[28px] border border-black/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] transition-all overflow-hidden group cursor-pointer">
              
              <div className="p-7">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-ink-grey border border-black/[0.04]"><Cpu size={22} className="text-text-secondary" /></div>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider" style={{ background: `${mdl.color}15`, color: mdl.color }}>{mdl.status}</span>
                </div>
                
                <h3 className="text-[18px] font-semibold text-text-primary mb-1 group-hover:text-apple-purple transition-colors font-mono">{mdl.name}</h3>
                <p className="text-[13px] text-text-tertiary mb-6">{mdl.size}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-text-secondary">Precision</span>
                    <span className="font-semibold text-text-primary">{mdl.precision}</span>
                  </div>
                  <div className="flex justify-between items-center text-[13px]">
                    <span className="text-text-secondary">Recall</span>
                    <span className="font-semibold text-text-primary">{mdl.recall}</span>
                  </div>
                </div>

                <div className="flex items-end justify-between border-t border-black/[0.04] pt-5">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary mb-1">mAP50 Score</p>
                    <p className="text-[24px] font-semibold text-text-primary leading-none" style={{ color: mdl.color }}>{mdl.score}%</p>
                  </div>
                  <ArrowRight size={18} className="text-text-tertiary group-hover:text-text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Footer CTA */}
      <DarkFooter badge="MLOps" title="Anchor your" highlight="next model." description="Sign, track, and verify every artifact in minutes. Deploy with confidence." primary="Register Model" secondary="Read Docs" />
    </div>
  )
}

export default ModelsPage
