import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Database, Upload, FileCheck, Layers, ShieldCheck, ArrowRight, X, Plus, Sparkles } from 'lucide-react'
import DarkFooter from '../components/Premium/DarkFooter'
import { showToast } from '../components/Premium/Toast'

const linearEase = [0.25, 0.1, 0.25, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.05, ease: linearEase } }),
}

function DatasetsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const datasets = [
    { name: 'coco_val_2017', images: '5,000', score: '97.0', status: 'Verified', color: '#30D158', emoji: '📦' },
    { name: 'custom_traffic_01', images: '12,400', score: '88.5', status: 'Review', color: '#E5A00D', emoji: '🚗' },
    { name: 'faces_v3', images: '3,200', score: '76.2', status: 'Critical', color: '#FF453A', emoji: '👤' },
  ]

  const handleUpload = () => {
    setUploadProgress(10)
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsModalOpen(false)
            setUploadProgress(0)
            showToast('Dataset uploaded & anchored successfully!', 'success')
          }, 500)
          return 100
        }
        return prev + 30
      })
    }, 400)
  }

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
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: linearEase }}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(94,106,210,0.1)]">
                  <Database size={12} className="text-[#5E6AD2]" />
                  <span className="text-[12px] font-medium text-[#8A8F98]">Data Catalog</span>
                </div>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: linearEase }} className="text-[56px] md:text-[72px] font-semibold tracking-[-0.04em] leading-[1.05] mb-4 text-[#EDEDED]">
                Data you can <br />
                <span className="bg-gradient-to-r from-[#5E6AD2] via-[#8B5CF6] to-[#5E6AD2] bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]">trust completely.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: linearEase }} className="text-[17px] text-[#8A8F98] max-w-[400px] leading-[1.6]">
                Cryptographically anchored datasets for AI model training.
              </motion.p>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: linearEase }} className="flex gap-3">
              <button onClick={() => setIsModalOpen(true)} className="px-5 py-3 rounded-lg bg-[#161718] border border-white/[0.06] text-[14px] font-semibold text-[#EDEDED] hover:bg-[#1A1B1E] hover:border-white/[0.15] transition-all flex items-center gap-2">
                <Upload size={16} /> Upload
              </button>
              <button className="px-5 py-3 rounded-lg bg-[#EDEDED] text-[#09090B] text-[14px] font-semibold hover:bg-white shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all flex items-center gap-2">
                View Docs <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS CARDS */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} className="relative w-full bg-[#09090B] py-16 border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: 'Datasets Verified', value: '3', icon: FileCheck, color: '#5E6AD2' },
              { label: 'Total Images', value: '1,020', icon: Layers, color: '#30D158' },
              { label: 'Avg Quality', value: '87%', icon: ShieldCheck, color: '#8B5CF6' },
            ].map((stat, i) => (
              <motion.div key={stat.label} variants={fadeUp} custom={i} whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.15)' }}
                className="bg-[#0F1011] rounded-xl p-6 border border-white/[0.06] flex items-center gap-4 transition-all">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}>
                  <stat.icon size={22} style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#5A5F66] mb-1">{stat.label}</p>
                  <p className="text-[24px] font-semibold text-[#EDEDED] leading-none">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FULL CATALOG */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} className="relative w-full bg-[#09090B] py-16 border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[24px] font-semibold text-[#EDEDED] tracking-[-0.02em]">Full Catalog</h2>
            <div className="text-[12px] text-[#8A8F98] bg-[#161718] border border-white/[0.06] px-3 py-1.5 rounded-lg font-medium">
              {datasets.length} datasets found
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {datasets.map((ds, i) => (
              <motion.div key={ds.name} variants={fadeUp} custom={i} whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.15)' }}
                className="bg-[#0F1011] rounded-xl border border-white/[0.06] overflow-hidden group cursor-pointer transition-all">
                
                {/* Status top line */}
                <div className="h-1" style={{ background: `linear-gradient(90deg, ${ds.color}, ${ds.color}00)` }} />
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl bg-[#161718] border border-white/[0.06]">
                      {ds.emoji}
                    </div>
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border"
                      style={{ background: `${ds.color}15`, color: ds.color, borderColor: `${ds.color}30` }}>
                      {ds.status}
                    </span>
                  </div>
                  
                  <h3 className="text-[16px] font-semibold text-[#EDEDED] mb-1 group-hover:text-[#5E6AD2] transition-colors font-mono">{ds.name}</h3>
                  <p className="text-[12px] text-[#5A5F66] mb-5">{ds.images} images verified</p>
                  
                  <div className="flex items-end justify-between border-t border-white/[0.04] pt-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#5A5F66] mb-1">Quality Score</p>
                      <p className="text-[22px] font-semibold text-[#EDEDED] leading-none">{ds.score}%</p>
                    </div>
                    <ArrowRight size={16} className="text-[#5A5F66] group-hover:text-[#5E6AD2] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <DarkFooter 
        badge="Data Integrity" 
        title="Anchor your" 
        highlight="next dataset." 
        description="Upload, verify, and anchor your datasets to a cryptographically secure ledger in minutes." 
        primary="Upload Dataset" 
        secondary="Read Docs" 
      />

      {/* UPLOAD MODAL - LINEAR STYLE */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} 
              className="bg-[#0F1011] rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/[0.08] w-full max-w-md overflow-hidden">
              
              <div className="flex items-center justify-between p-5 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-[#5E6AD2]/10 border border-[#5E6AD2]/20 flex items-center justify-center">
                    <Upload size={16} className="text-[#5E6AD2]" />
                  </div>
                  <h3 className="text-[16px] font-semibold text-[#EDEDED]">Upload Dataset</h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-md hover:bg-white/[0.06] text-[#8A8F98] hover:text-[#EDEDED] transition-colors">
                  <X size={16} />
                </button>
              </div>
              
              <div className="p-5">
                <div className="border-2 border-dashed border-white/[0.08] rounded-xl p-8 text-center hover:bg-[#161718] hover:border-[#5E6AD2]/30 transition-all cursor-pointer mb-5 group">
                  <div className="w-12 h-12 rounded-full bg-[#161718] border border-white/[0.06] flex items-center justify-center mx-auto mb-3 group-hover:bg-[#5E6AD2]/10 group-hover:border-[#5E6AD2]/30 transition-colors">
                    <Upload size={20} className="text-[#8A8F98] group-hover:text-[#5E6AD2] transition-colors" />
                  </div>
                  <p className="text-[13px] font-semibold text-[#EDEDED]">Click to upload or drag and drop</p>
                  <p className="text-[11px] text-[#5A5F66] mt-1">CSV, JSON, or ZIP up to 500MB</p>
                </div>
                
                {uploadProgress > 0 ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-[12px] font-medium">
                      <span className="text-[#EDEDED]">Uploading...</span>
                      <span className="text-[#5E6AD2] font-mono">{uploadProgress}%</span>
                    </div>
                    <div className="h-1.5 bg-[#161718] rounded-full overflow-hidden">
                      <motion.div className="h-full bg-gradient-to-r from-[#5E6AD2] to-[#8B5CF6]" animate={{ width: `${uploadProgress}%` }} transition={{ duration: 0.3 }} />
                    </div>
                  </div>
                ) : (
                  <button onClick={handleUpload} className="w-full py-2.5 rounded-lg bg-[#EDEDED] text-[#09090B] font-semibold text-[13px] hover:bg-white transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <Sparkles size={14} /> Start Upload
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  )
}

export default DatasetsPage
