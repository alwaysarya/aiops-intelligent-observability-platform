import { motion } from 'framer-motion'
import { FileText, Download, Shield, FileCheck, ArrowRight, Clock } from 'lucide-react'
import DarkFooter from '../components/Premium/DarkFooter'

function ReportsPage() {
  const reports = [
    { name: 'Trust Score Evaluation', type: 'Trust', time: '3 mins ago', status: 'READY', color: '#30D158' },
    { name: 'Model Integrity Report', type: 'Model', time: '1 hour ago', status: 'READY', color: '#0071E3' },
    { name: 'Dataset Quality Report', type: 'Dataset', time: '2 hours ago', status: 'READY', color: '#AF52DE' },
    { name: 'Security Threat Report', type: 'Attack', time: '5 hours ago', status: 'READY', color: '#FF453A' },
  ]

  return (
    <div className="w-full bg-white min-h-screen">
      {/* 1. Header Section */}
      <section className="max-w-[1200px] mx-auto px-6 pt-20 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-apple-blue mb-4">
              <FileText size={14} />
              <span className="text-[11px] font-bold tracking-[0.16em] uppercase">Reports & Evidence</span>
            </div>
            <h1 className="text-[52px] md:text-[64px] font-semibold tracking-[-0.04em] leading-[1.02] text-text-primary">
              Every report, <br/>
              <span className="bg-gradient-to-r from-[#0071E3] to-[#30D158] bg-clip-text text-transparent">signed & archived.</span>
            </h1>
            <p className="mt-4 text-[18px] text-text-secondary max-w-[500px]">Generated assurance reports, evidence records, and exportable compliance documentation.</p>
          </div>
          
          <div className="flex gap-3">
            <button className="px-6 py-3.5 rounded-full bg-apple-blue text-white text-[15px] font-semibold hover:bg-apple-blueHover shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2">
              <Download size={16} /> Download All
            </button>
          </div>
        </motion.div>
      </section>

      {/* 2. Sub-Section: Compliance Badges */}
      <section className="max-w-[1200px] mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['NIST AI RMF', 'ISO 27001', 'EU AI Act', 'SIH 26228'].map((std, i) => (
            <motion.div key={std} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[20px] border border-black/[0.04] p-5 shadow-sm flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-apple-green">
                <FileCheck size={16} />
              </div>
              <div>
                <p className="text-[13px] font-bold text-text-primary">{std}</p>
                <p className="text-[11px] text-apple-green font-medium uppercase tracking-wider">Compliant</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Main Section: Reports List */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[28px] font-semibold text-text-primary">Full Library</h2>
          <div className="text-[14px] text-text-tertiary bg-ink-grey px-3 py-1.5 rounded-lg">{reports.length} reports ready</div>
        </div>

        <div className="bg-white rounded-[28px] border border-black/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden">
          {reports.map((rpt, i) => (
            <motion.div key={rpt.name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between p-6 border-b border-black/[0.04] last:border-0 hover:bg-ink-grey transition-colors cursor-pointer group">
              
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white border border-black/[0.04] shadow-sm" style={{ color: rpt.color }}>
                  <FileText size={20} />
                </div>
                <div>
                  <p className="text-[16px] font-semibold text-text-primary group-hover:text-apple-blue transition-colors">{rpt.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-[13px] text-text-tertiary">
                    <span className="flex items-center gap-1"><Shield size={12}/> {rpt.type}</span>
                    <span className="w-1 h-1 rounded-full bg-text-tertiary" />
                    <span className="flex items-center gap-1"><Clock size={12}/> {rpt.time}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-green-50 text-apple-green border border-green-100">{rpt.status}</span>
                <ArrowRight size={18} className="text-text-tertiary group-hover:text-text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Footer CTA */}
      <DarkFooter badge="Compliance" title="Ready for" highlight="any audit." description="Every report cryptographically signed and exportable for compliance review." primary="Generate Report" secondary="Audit Trail" />
    </div>
  )
}

export default ReportsPage
