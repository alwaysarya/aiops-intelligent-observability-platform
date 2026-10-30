import { motion } from 'framer-motion'
import { Database, ShieldCheck, Upload, FileText, ChevronRight, Layers, HardDrive, Sparkles } from 'lucide-react'

const ease = [0.25, 0.1, 0.25, 1]

const datasets = [
  { id: 1, name: 'coco_val_2017', images: '5,000', quality: '97.0%', status: 'VERIFIED', color: '#30D158', icon: Database, val: 97 },
  { id: 2, name: 'custom_traffic_01', images: '12,400', quality: '88.5%', status: 'REVIEW', color: '#E9A23B', icon: Layers, val: 88.5 },
  { id: 3, name: 'faces_v3', images: '3,200', quality: '76.2%', status: 'CRITICAL', color: '#FF453A', icon: HardDrive, val: 76.2 },
]

export default function DatasetsPage() {
  return (
    <div className="w-full min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-[-apple-system,BlinkMacSystemFont,'Inter',sans-serif] antialiased selection:bg-[#0071E3]/20 relative overflow-hidden">
      
      {/* GLOBAL BACKGROUND EFFECTS */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#0071E3]/[0.08] blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-[#30D158]/[0.05] blur-[120px] rounded-full pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative w-full pt-24 pb-16 z-10">
        <div className="max-w-[1240px] mx-auto px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-black/[0.06] bg-white/80 backdrop-blur-xl mb-8 shadow-sm">
              <Sparkles size={14} className="text-[#0071E3]" />
              <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#6E6E73]">Data Catalog</span>
            </div>
            <h1 className="text-[clamp(52px,6.5vw,96px)] font-black tracking-[-0.055em] leading-[0.92] mb-6">
              Data you can<br />
              <span className="bg-gradient-to-r from-[#0071E3] to-[#5E5CE6] bg-clip-text text-transparent">trust completely.</span>
            </h1>
            <p className="text-[19px] leading-[1.65] text-[#6E6E73] max-w-[540px] mx-auto font-medium mb-10">
              Cryptographically anchored datasets for AI model training. Ensure integrity, verify quality, and track lineage.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-black text-white text-[15px] font-semibold hover:bg-[#0071E3] transition-all shadow-[0_15px_35px_-10px_rgba(0,0,0,0.3)] hover:scale-105">
                <Upload size={18} /> Upload Dataset
              </button>
              <button className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-white border border-black/[0.1] text-[#1D1D1F] text-[15px] font-semibold hover:bg-[#F5F5F7] transition-all shadow-sm hover:scale-105">
                <FileText size={18} /> Read Docs
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS ROW */}
      <section className="relative w-full py-8 z-10">
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Datasets Verified', value: '3', icon: Database, color: '#0071E3' },
              { label: 'Total Images', value: '1,020', icon: Layers, color: '#30D158' },
              { label: 'Avg Quality', value: '87%', icon: ShieldCheck, color: '#E9A23B' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1, ease }} whileHover={{ y: -6 }}
                className="bg-white/80 backdrop-blur-xl rounded-[24px] p-6 border border-black/[0.06] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] flex items-center gap-5 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:via-black/[0.05] transition-all" />
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm" style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}>
                  <stat.icon style={{ color: stat.color }} size={24} />
                </div>
                <div className="relative z-10">
                  <p className="text-[12px] font-bold text-[#86868B] uppercase tracking-wider mb-1">{stat.label}</p>
                  <p className="text-[32px] font-black text-[#1D1D1F] leading-none">{stat.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DATASETS LIST */}
      <section className="relative w-full py-12 z-10">
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[24px] font-bold tracking-tight text-[#1D1D1F]">Full Catalog</h2>
            <span className="text-[13px] font-bold text-[#86868B] bg-white px-3 py-1 rounded-full border border-black/[0.06] shadow-sm">3 datasets found</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {datasets.map((ds, i) => (
              <motion.div key={ds.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1, ease }}
                whileHover={{ y: -8, boxShadow: "0 30px 60px -15px rgba(0,0,0,0.15)" }}
                className="bg-white rounded-[24px] p-6 border border-black/[0.06] cursor-pointer transition-all group relative overflow-hidden flex flex-col justify-between min-h-[260px]">
                
                {/* Top Bar Indicator */}
                <div className="absolute top-0 left-0 w-full h-1.5" style={{ background: ds.color }} />
                
                <div>
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${ds.color}10`, border: `1px solid ${ds.color}20` }}>
                      <ds.icon size={26} style={{ color: ds.color }} />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider" style={{ background: `${ds.color}15`, color: ds.color }}>
                      {ds.status}
                    </span>
                  </div>
                  <h3 className="text-[20px] font-bold text-[#1D1D1F] mb-1 tracking-tight">{ds.name}</h3>
                  <p className="text-[14px] text-[#6E6E73] font-medium">{ds.images} images verified</p>
                </div>

                <div className="mt-8">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[11px] font-bold text-[#86868B] uppercase tracking-wider">Quality Score</p>
                    <p className="text-[16px] font-black text-[#1D1D1F]">{ds.quality}</p>
                  </div>
                  
                  {/* Premium Progress Bar */}
                  <div className="w-full h-1.5 bg-[#F5F5F7] rounded-full overflow-hidden mb-5">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${ds.val}%` }} transition={{ duration: 1, delay: 0.8 + i * 0.2, ease }} 
                      className="h-full rounded-full" style={{ background: ds.color }} />
                  </div>

                  <div className="flex items-center justify-between border-t border-black/[0.06] pt-4">
                    <span className="text-[13px] font-semibold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">View Details</span>
                    <div className="w-8 h-8 rounded-full bg-[#F5F5F7] group-hover:bg-[#0071E3] group-hover:text-white transition-colors flex items-center justify-center text-[#1D1D1F]">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA SECTION */}
      <section className="relative w-full py-24 z-10">
        <div className="max-w-[1240px] mx-auto px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}
            className="bg-white rounded-[32px] p-12 md:p-20 text-center border border-black/[0.06] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#0071E3]/[0.05] blur-[80px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/[0.06] bg-[#FBFBFD] mb-8 shadow-sm">
                <ShieldCheck size={14} className="text-[#0071E3]" />
                <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#6E6E73]">Data Integrity</span>
              </div>
              <h2 className="text-[clamp(40px,5vw,64px)] font-black tracking-[-0.055em] leading-[0.95] mb-6">
                Anchor your<br />
                <span className="bg-gradient-to-r from-[#0071E3] to-[#5E5CE6] bg-clip-text text-transparent">next dataset.</span>
              </h2>
              <p className="text-[17px] text-[#6E6E73] font-medium mb-10 max-w-md mx-auto">
                Upload, verify, and anchor your datasets to a cryptographically secure ledger in minutes.
              </p>
              <div className="flex items-center justify-center gap-4">
                <button className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-black text-white text-[14px] font-semibold hover:bg-[#0071E3] transition-all shadow-lg hover:scale-105">
                  <Upload size={16} /> Upload Dataset
                </button>
                <button className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-[#F5F5F7] text-[#1D1D1F] text-[14px] font-semibold hover:bg-[#E5E5EA] transition-all hover:scale-105">
                  Read Docs
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
