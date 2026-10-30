import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Database, ShieldCheck, Upload, FileText, ChevronRight, Layers, HardDrive, Sparkles, Server, Activity } from 'lucide-react'
import { useRef } from 'react'

const ease = [0.16, 1, 0.3, 1]

const datasets = [
  { id: 1, name: 'coco_val_2017', images: '5,000', quality: '97.0%', status: 'VERIFIED', color: '#30D158', icon: Database, val: 97 },
  { id: 2, name: 'custom_traffic_01', images: '12,400', quality: '88.5%', status: 'REVIEW', color: '#E9A23B', icon: Layers, val: 88.5 },
  { id: 3, name: 'faces_v3', images: '3,200', quality: '76.2%', status: 'CRITICAL', color: '#FF453A', icon: HardDrive, val: 76.2 },
]

function TiltCard({ children, className }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"])

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`perspective-1000 ${className}`}
    >
      <div style={{ transform: "translateZ(50px)" }}>
        {children}
      </div>
    </motion.div>
  )
}

export default function DatasetsPage() {
  return (
    <div className="w-full min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-[-apple-system,BlinkMacSystemFont,'Inter',sans-serif] antialiased selection:bg-[#0071E3]/20 relative overflow-hidden">
      
      {/* EXPONENTIAL BACKGROUND */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.08, 0.05] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[#0071E3] blur-[150px] rounded-full pointer-events-none" />
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.06, 0.03] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-[#5E5CE6] blur-[140px] rounded-full pointer-events-none" />

      {/* HERO */}
      <section className="relative w-full pt-32 pb-20 z-10">
        <div className="max-w-[1240px] mx-auto px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-black/[0.06] bg-white/60 backdrop-blur-xl mb-10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]">
              <Sparkles size={16} className="text-[#0071E3]" />
              <span className="text-[12px] font-bold tracking-[0.15em] uppercase text-[#6E6E73]">Cryptographic Data Catalog</span>
            </div>
            <h1 className="text-[clamp(56px,7vw,110px)] font-black tracking-[-0.055em] leading-[0.92] mb-8">
              Data you can<br />
              <span className="bg-gradient-to-r from-[#0071E3] via-[#5E5CE6] to-[#AF52DE] bg-clip-text text-transparent drop-shadow-sm">trust completely.</span>
            </h1>
            <p className="text-[21px] leading-[1.6] text-[#6E6E73] max-w-[600px] mx-auto font-medium mb-12">
              Anchor your AI model training datasets to an immutable ledger. Verify quality, track lineage, and ensure integrity.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-5">
              <button className="inline-flex items-center gap-2.5 h-16 px-10 rounded-full bg-black text-white text-[16px] font-bold hover:bg-[#0071E3] transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)] hover:scale-105">
                <Upload size={20} /> Upload Dataset
              </button>
              <button className="inline-flex items-center gap-2.5 h-16 px-10 rounded-full bg-white/80 backdrop-blur-md border border-black/[0.1] text-[#1D1D1F] text-[16px] font-bold hover:bg-[#F5F5F7] transition-all shadow-sm hover:scale-105">
                <FileText size={20} /> View Documentation
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS ROW */}
      <section className="relative w-full py-12 z-10">
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Datasets Verified', value: '3', icon: Database, color: '#0071E3', desc: 'Anchored to ledger' },
              { label: 'Total Images', value: '1,020', icon: Layers, color: '#30D158', desc: 'Across all datasets' },
              { label: 'Avg Quality', value: '87%', icon: ShieldCheck, color: '#E9A23B', desc: 'Cryptographic score' },
            ].map((stat, i) => (
              <TiltCard key={i}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1, ease }}
                  className="bg-white/70 backdrop-blur-2xl rounded-[32px] p-8 border border-black/[0.06] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-black/[0.05] to-transparent" />
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm" style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}30` }}>
                      <stat.icon style={{ color: stat.color }} size={28} />
                    </div>
                    <Activity size={20} className="text-[#D1D1D6]" />
                  </div>
                  <p className="text-[13px] font-bold text-[#86868B] uppercase tracking-wider mb-2">{stat.label}</p>
                  <p className="text-[42px] font-black text-[#1D1D1F] leading-none mb-2">{stat.value}</p>
                  <p className="text-[13px] text-[#6E6E73] font-medium">{stat.desc}</p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* DATASETS LIST */}
      <section className="relative w-full py-20 z-10">
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="flex items-end justify-between mb-10 border-b border-black/[0.06] pb-6">
            <div>
              <h2 className="text-[32px] font-bold tracking-tight text-[#1D1D1F]">Full Catalog</h2>
              <p className="text-[15px] text-[#6E6E73] font-medium mt-1">Manage and verify your anchored datasets.</p>
            </div>
            <span className="text-[13px] font-bold text-[#1D1D1F] bg-white px-4 py-1.5 rounded-full border border-black/[0.08] shadow-sm">3 Datasets</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {datasets.map((ds, i) => (
              <TiltCard key={ds.id}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1, ease }}
                  className="bg-white rounded-[32px] p-8 border border-black/[0.06] cursor-pointer transition-all group relative overflow-hidden flex flex-col justify-between min-h-[320px] shadow-[0_15px_40px_-15px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)]">
                  
                  <div className="absolute top-0 left-0 w-full h-2" style={{ background: ds.color }} />
                  
                  <div>
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white shadow-sm border border-black/[0.04]" style={{ color: ds.color }}>
                        <ds.icon size={30} />
                      </div>
                      <span className="text-[11px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider border" style={{ background: `${ds.color}10`, color: ds.color, borderColor: `${ds.color}20` }}>
                        {ds.status}
                      </span>
                    </div>
                    <h3 className="text-[24px] font-bold text-[#1D1D1F] mb-2 tracking-tight">{ds.name}</h3>
                    <p className="text-[14px] text-[#6E6E73] font-medium flex items-center gap-2">
                      <Server size={14} /> {ds.images} images verified
                    </p>
                  </div>

                  <div className="mt-10">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-[12px] font-bold text-[#86868B] uppercase tracking-wider">Quality Score</p>
                      <p className="text-[20px] font-black text-[#1D1D1F]">{ds.quality}</p>
                    </div>
                    <div className="w-full h-2 bg-[#F5F5F7] rounded-full overflow-hidden mb-8">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${ds.val}%` }} transition={{ duration: 1.5, delay: 0.8 + i * 0.2, ease }} 
                        className="h-full rounded-full relative" style={{ background: ds.color }}>
                        <div className="absolute inset-0 bg-white/30 mix-blend-overlay" />
                      </motion.div>
                    </div>

                    <div className="flex items-center justify-between border-t border-black/[0.06] pt-5">
                      <span className="text-[14px] font-bold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">View Dataset</span>
                      <div className="w-10 h-10 rounded-full bg-[#F5F5F7] group-hover:bg-[#0071E3] group-hover:text-white transition-all flex items-center justify-center text-[#1D1D1F] group-hover:scale-110">
                        <ChevronRight size={18} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="relative w-full py-24 z-10">
        <div className="max-w-[1240px] mx-auto px-8">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease }}
            className="bg-gradient-to-b from-white to-[#F5F5F7] rounded-[40px] p-12 md:p-24 text-center border border-black/[0.08] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.1)] relative overflow-hidden">
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0071E3]/[0.08] blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-black/[0.06] bg-white mb-10 shadow-sm">
                <ShieldCheck size={16} className="text-[#0071E3]" />
                <span className="text-[12px] font-bold tracking-[0.15em] uppercase text-[#6E6E73]">Immutable Ledger</span>
              </div>
              <h2 className="text-[clamp(44px,5vw,72px)] font-black tracking-[-0.055em] leading-[0.95] mb-8">
                Anchor your<br />
                <span className="bg-gradient-to-r from-[#0071E3] to-[#5E5CE6] bg-clip-text text-transparent">next dataset.</span>
              </h2>
              <p className="text-[19px] text-[#6E6E73] font-medium mb-12 max-w-xl mx-auto">
                Upload, verify, and anchor your datasets to a cryptographically secure ledger in minutes.
              </p>
              <div className="flex items-center justify-center gap-5">
                <button className="inline-flex items-center gap-2 h-16 px-10 rounded-full bg-black text-white text-[16px] font-bold hover:bg-[#0071E3] transition-all shadow-[0_20px_40px_-10px_rgba(0,0,0,0.4)] hover:scale-105">
                  <Upload size={20} /> Upload Dataset
                </button>
                <button className="inline-flex items-center gap-2 h-16 px-10 rounded-full bg-white text-[#1D1D1F] text-[16px] font-bold hover:bg-[#F5F5F7] transition-all shadow-sm hover:scale-105">
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
