import { motion } from 'framer-motion'
import { AlertOctagon, Clock, CheckCircle2, User, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import DarkFooter from '../components/Premium/DarkFooter'

function IncidentsPage() {
  const navigate = useNavigate()
  const incidents = [
    { id: 'INC-2026-084', title: 'Database Connection Timeout', service: 'user-service', status: 'Active', severity: 'Critical', time: '10m ago', assignee: 'Aryan T.' },
    { id: 'INC-2026-083', title: 'Payment Gateway Latency', service: 'payment-service', status: 'Investigating', severity: 'High', time: '1h ago', assignee: 'Rahul S.' },
    { id: 'INC-2026-082', title: 'Model Drift Detected', service: 'ai-anomaly', status: 'Resolved', severity: 'Medium', time: '4h ago', assignee: 'Priya M.' },
  ]

  const getBadge = (status) => {
    if (status === 'Active') return 'bg-red-50 text-apple-red border-red-200'
    if (status === 'Investigating') return 'bg-orange-50 text-apple-orange border-orange-200'
    return 'bg-green-50 text-apple-green border-green-200'
  }

  return (
    <div className="w-full bg-white min-h-screen">
      <section className="max-w-[1200px] mx-auto px-6 pt-20 pb-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-100 text-apple-red mb-6">
            <AlertOctagon size={14} />
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase">Incident Management</span>
          </div>
          <h1 className="text-[52px] md:text-[72px] font-semibold tracking-[-0.04em] leading-[1.02] text-text-primary mb-4">
            Active <span className="bg-gradient-to-r from-[#FF453A] to-[#FF9F0A] bg-clip-text text-transparent">Incidents.</span>
          </h1>
          <p className="text-[18px] text-text-secondary">Track, manage, and resolve production incidents.</p>
        </motion.div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <div className="space-y-4">
          {incidents.map((inc, i) => (
            <motion.div key={inc.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              onClick={() => navigate(`/incidents/${inc.id}`)}
              className="bg-white rounded-[24px] border border-black/[0.04] shadow-sm p-6 hover:shadow-md transition-all group cursor-pointer">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${inc.status === 'Resolved' ? 'bg-green-50 text-apple-green' : 'bg-red-50 text-apple-red'}`}>
                    {inc.status === 'Resolved' ? <CheckCircle2 size={24} /> : <AlertOctagon size={24} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-[12px] font-mono text-text-tertiary">{inc.id}</span>
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${getBadge(inc.status)}`}>{inc.status}</span>
                    </div>
                    <h3 className="text-[18px] font-semibold text-text-primary group-hover:text-apple-blue transition-colors">{inc.title}</h3>
                    <p className="text-[13px] text-text-secondary mt-1 flex items-center gap-3">
                      <span>Service: {inc.service}</span>
                      <span className="w-1 h-1 bg-text-tertiary rounded-full" />
                      <span className="flex items-center gap-1"><Clock size={12} /> {inc.time}</span>
                      <span className="w-1 h-1 bg-text-tertiary rounded-full" />
                      <span className="flex items-center gap-1"><User size={12} /> {inc.assignee}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 rounded-full text-[12px] font-bold ${inc.severity === 'Critical' ? 'bg-red-50 text-apple-red' : inc.severity === 'High' ? 'bg-orange-50 text-apple-orange' : 'bg-blue-50 text-apple-blue'}`}>{inc.severity}</span>
                  <ArrowRight size={18} className="text-text-tertiary group-hover:text-text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <DarkFooter badge="Response" title="Resolve issues" highlight="faster." description="Integrate with PagerDuty and Slack to automate incident escalations." primary="Setup PagerDuty" secondary="Runbooks" />
    </div>
  )
}

export default IncidentsPage
