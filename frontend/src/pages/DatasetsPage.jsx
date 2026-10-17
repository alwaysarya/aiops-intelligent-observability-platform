import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Database, Upload, FileCheck, Layers, ShieldCheck, ArrowRight, X } from 'lucide-react'
import DarkFooter from '../components/Premium/DarkFooter'
import { showToast } from '../components/Premium/Toast'

function DatasetsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const datasets = [
    { name: 'coco_val_2017', images: '5,000', score: '97.0', status: 'Verified', color: '#30D158' },
    { name: 'custom_traffic_01', images: '12,400', score: '88.5', status: 'Review', color: '#FF9F0A' },
    { name: 'faces_v3', images: '3,200', score: '76.2', status: 'Critical', color: '#FF453A' },
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
    <div className="w-full bg-white min-h-screen">
      <section className="max-w-[1200px] mx-auto px-6 pt-20 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-apple-blue mb-4">
              <Database size={14} />
              <span className="text-[11px] font-bold tracking-[0.16em] uppercase">Data Catalog</span>
            </div>
            <h1 className="text-[52px] md:text-[64px] font-semibold tracking-[-0.04em] leading-[1.02] text-text-primary">
              Data you can <br/>
              <span className="bg-gradient-to-r from-[#0071E3] to-[#5E5CE6] bg-clip-text text-transparent">trust completely.</span>
            </h1>
          </div>
          
          <div className="flex gap-3">
            <button onClick={() => setIsModalOpen(true)} className="px-6 py-3.5 rounded-full bg-white border border-black/[0.08] text-[15px] font-semibold text-text-primary hover:bg-ink-grey transition-all flex items-center gap-2">
              <Upload size={16} /> Upload
            </button>
            <button className="px-6 py-3.5 rounded-full bg-apple-blue text-white text-[15px] font-semibold hover:bg-apple-blueHover shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
              View Docs <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Datasets Verified', value: '3', icon: FileCheck, color: '#0071E3' },
            { label: 'Total Images', value: '1,020', icon: Layers, color: '#30D158' },
            { label: 'Avg Quality', value: '87%', icon: ShieldCheck, color: '#AF52DE' },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[24px] border border-black/[0.04] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex items-center gap-5">
              <div className="p-4 rounded-2xl" style={{ background: `${stat.color}10`, color: stat.color }}><stat.icon size={24} /></div>
              <div>
                <p className="text-[12px] font-bold uppercase tracking-wider text-text-tertiary mb-1">{stat.label}</p>
                <p className="text-[32px] font-semibold text-text-primary leading-none">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[28px] font-semibold text-text-primary">Full Catalog</h2>
          <div className="text-[14px] text-text-tertiary bg-ink-grey px-3 py-1.5 rounded-lg">{datasets.length} datasets found</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {datasets.map((ds, i) => (
            <motion.div key={ds.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6 }}
              className="bg-white rounded-[28px] border border-black/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] transition-all overflow-hidden group cursor-pointer">
              <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${ds.color}, ${ds.color}00)` }} />
              <div className="p-7">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-ink-grey border border-black/[0.04]">{ds.name === 'faces_v3' ? '👤' : ds.name === 'custom_traffic_01' ? '🚗' : '📦'}</div>
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider" style={{ background: `${ds.color}15`, color: ds.color }}>{ds.status}</span>
                </div>
                <h3 className="text-[18px] font-semibold text-text-primary mb-1 group-hover:text-apple-blue transition-colors">{ds.name}</h3>
                <p className="text-[13px] text-text-tertiary mb-6">{ds.images} images verified</p>
                <div className="flex items-end justify-between border-t border-black/[0.04] pt-5">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-text-tertiary mb-1">Quality Score</p>
                    <p className="text-[24px] font-semibold text-text-primary leading-none">{ds.score}%</p>
                  </div>
                  <ArrowRight size={18} className="text-text-tertiary group-hover:text-apple-blue group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <DarkFooter badge="Data Integrity" title="Anchor your" highlight="next dataset." description="Upload, verify, and anchor your datasets to a cryptographically secure ledger in minutes." primary="Upload Dataset" secondary="Read Docs" />

      {/* Upload Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <motion.div initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }} className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-black/[0.06]">
                <h3 className="text-[20px] font-semibold text-text-primary">Upload Dataset</h3>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-ink-grey rounded-lg"><X size={18} /></button>
              </div>
              <div className="p-6">
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:bg-ink-grey transition-colors cursor-pointer mb-6">
                  <Upload size={32} className="mx-auto text-text-tertiary mb-3" />
                  <p className="text-[14px] font-semibold text-text-primary">Click to upload or drag and drop</p>
                  <p className="text-[12px] text-text-tertiary mt-1">CSV, JSON, or ZIP up to 500MB</p>
                </div>
                
                {uploadProgress > 0 ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-[12px] font-semibold text-text-primary"><span>Uploading...</span><span>{uploadProgress}%</span></div>
                    <div className="h-2 bg-ink-grey rounded-full overflow-hidden">
                      <motion.div className="h-full bg-apple-blue" animate={{ width: `${uploadProgress}%` }} />
                    </div>
                  </div>
                ) : (
                  <button onClick={handleUpload} className="w-full py-3.5 rounded-xl bg-apple-blue text-white font-semibold hover:bg-apple-blueHover transition-all">
                    Start Upload
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DatasetsPage
