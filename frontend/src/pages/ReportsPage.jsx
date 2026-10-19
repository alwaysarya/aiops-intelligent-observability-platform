import { motion } from 'framer-motion'
import { FileText, Download, Shield, FileCheck, ArrowRight, Clock, Sparkles, CheckCircle2, Award } from 'lucide-react'
import DarkFooter from '../components/Premium/DarkFooter'

const linearEase = [0.25, 0.1, 0.25, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.05, ease: linearEase } }),
}

function ReportsPage() {
  const reports = [
    { name: 'Trust Score Evaluation', type: 'Trust', time: '3 mins ago', status: 'READY', color: '#30D158' },
    { name: 'Model Integrity Report', type: 'Model', time: '1 hour ago', status: 'READY', color: '#5E6AD2' },
    { name: 'Dataset Quality Report', type: 'Dataset', time: '2 hours ago', status: 'READY', color: '#8B5CF6' },
    { name: 'Security Threat Report', type: 'Attack', time: '5 hours ago', status: 'READY', color: '#FF453A' },
  ]

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
                  <FileText size={12} className="text-[#5E6AD2]" />
                  <span className="text-[12px] font-medium text-[#8A8F98]">Reports & Evidence</span>
                </div>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: linearEase }} className="text-[56px] md:text-[72px] font-semibold tracking-[-0.04em] leading-[1.05] mb-4 text-[#EDEDED]">
                Every report, <br />
                <span className="bg-gradient-to-r from-[#5E6AD2] via-[#30D158] to-[#5E6AD2] bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]">signed & archived.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: linearEase }} className="text-[17px] text-[#8A8F98] max-w-[500px] leading-[1.6]">
                Generated assurance reports, evidence records, and exportable compliance documentation.
              </motion.p>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: linearEase }}>
              <button className="px-5 py-3 rounded-lg bg-[#EDEDED] text-[#09090B] text-[14px] font-semibold hover:bg-white shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all flex items-center gap-2">
                <Download size={16} /> Download All
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* COMPLIANCE BADGES */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} className="relative w-full bg-[#09090B] py-16 border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['NIST AI RMF', 'ISO 27001', 'EU AI Act', 'SIH 26228'].map((std, i) => (
              <motion.div key={std} variants={fadeUp} custom={i} whileHover={{ y: -4, borderColor: 'rgba(48,209,88,0.3)' }}
                className="bg-[#0F1011] rounded-xl border border-white/[0.06] p-5 flex items-center gap-3 transition-all">
                <div className="w-9 h-9 rounded-lg bg-[#30D158]/10 border border-[#30D158]/20 flex items-center justify-center shadow-[0_0_10px_rgba(48,209,88,0.15)]">
                  <FileCheck size={16} className="text-[#30D158]" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-[#EDEDED]">{std}</p>
                  <p className="text-[11px] text-[#30D158] font-medium uppercase tracking-wider flex items-center gap-1">
                    <CheckCircle2 size={10} /> Compliant
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FULL LIBRARY */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} className="relative w-full bg-[#09090B] py-16 border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-[24px] font-semibold text-[#EDEDED] tracking-[-0.02em]">Full Library</h2>
            <div className="text-[12px] text-[#8A8F98] bg-[#161718] border border-white/[0.06] px-3 py-1.5 rounded-lg font-medium">
              {reports.length} reports ready
            </div>
          </div>

          <div className="bg-[#0F1011] rounded-xl border border-white/[0.06] overflow-hidden">
            {reports.map((rpt, i) => (
              <motion.div key={rpt.name} variants={fadeUp} custom={i}
                className="flex items-center justify-between p-5 border-b border-white/[0.04] last:border-0 hover:bg-[#121316] transition-colors cursor-pointer group">
                
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-[#161718] border border-white/[0.06] group-hover:border-white/[0.15] transition-colors" style={{ color: rpt.color }}>
                    <FileText size={18} />
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-[#EDEDED] group-hover:text-[#5E6AD2] transition-colors">{rpt.name}</p>
                    <div className="flex items-center gap-3 mt-1 text-[12px] text-[#5A5F66]">
                      <span className="flex items-center gap-1"><Shield size={11}/> {rpt.type}</span>
                      <span className="w-1 h-1 rounded-full bg-white/[0.1]" />
                      <span className="flex items-center gap-1"><Clock size={11}/> {rpt.time}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border"
                    style={{ background: `${rpt.color}15`, color: rpt.color, borderColor: `${rpt.color}30` }}>
                    {rpt.status}
                  </span>
                  <ArrowRight size={16} className="text-[#5A5F66] group-hover:text-[#EDEDED] group-hover:translate-x-1 transition-all" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <DarkFooter 
        badge="Compliance" 
        title="Ready for" 
        highlight="any audit." 
        description="Every report cryptographically signed and exportable for compliance review." 
        primary="Generate Report" 
        secondary="Audit Trail" 
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

export default ReportsPage
