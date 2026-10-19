import { motion } from 'framer-motion'
import { 
  Target, Activity, TrendingUp, AlertTriangle, CheckCircle2, 
  Clock, Shield, Zap, ArrowRight, Radio, BarChart3, 
  TrendingDown, AlertCircle, Sparkles, Server, Globe, 
  Award, Download
} from 'lucide-react'
import DarkFooter from '../components/Premium/DarkFooter'

const linearEase = [0.25, 0.1, 0.25, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.05, ease: linearEase } }),
}

function SLAPage() {
  const services = [
    { name: 'API Gateway', uptime: '99.98', target: '99.9', latency: '45ms', targetLatency: '100ms', errorBudget: 78, status: 'healthy', trend: 'up' },
    { name: 'Payment Service', uptime: '99.45', target: '99.9', latency: '1240ms', targetLatency: '200ms', errorBudget: 12, status: 'critical', trend: 'down' },
    { name: 'User Service', uptime: '99.95', target: '99.9', latency: '32ms', targetLatency: '100ms', errorBudget: 92, status: 'healthy', trend: 'up' },
    { name: 'Database Cluster', uptime: '99.99', target: '99.95', latency: '8ms', targetLatency: '50ms', errorBudget: 99, status: 'healthy', trend: 'up' },
    { name: 'AI Detector', uptime: '99.87', target: '99.9', latency: '180ms', targetLatency: '200ms', errorBudget: 45, status: 'warning', trend: 'down' },
    { name: 'Alert Service', uptime: '99.99', target: '99.9', latency: '12ms', targetLatency: '100ms', errorBudget: 97, status: 'healthy', trend: 'up' },
  ]

  const globalKPIs = [
    { label: 'Overall Uptime', value: '99.87%', target: '99.90%', status: 'warning', icon: Shield, color: '#E5A00D' },
    { label: 'Avg Response Time', value: '180ms', target: '200ms', status: 'healthy', icon: Activity, color: '#30D158' },
    { label: 'Error Budget Used', value: '34%', target: '100%', status: 'healthy', icon: Target, color: '#30D158' },
    { label: 'Active SLO Breaches', value: '1', target: '0', status: 'critical', icon: AlertTriangle, color: '#FF453A' },
  ]

  const getStatusColor = (status) => {
    return status === 'healthy' ? '#30D158' : status === 'warning' ? '#E5A00D' : '#FF453A'
  }

  const getStatusBg = (status) => {
    return status === 'healthy' ? 'bg-[#30D158]/10' : status === 'warning' ? 'bg-[#E5A00D]/10' : 'bg-[#FF453A]/10'
  }

  const getStatusBorder = (status) => {
    return status === 'healthy' ? 'border-[#30D158]/20' : status === 'warning' ? 'border-[#E5A00D]/20' : 'border-[#FF453A]/20'
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
                  <Target size={12} className="text-[#5E6AD2]" />
                  <span className="text-[12px] font-medium text-[#8A8F98]">SLA & SLO Tracking</span>
                </div>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: linearEase }} className="text-[56px] md:text-[72px] font-semibold tracking-[-0.04em] leading-[1.05] mb-4 text-[#EDEDED]">
                Reliability <br />
                <span className="bg-gradient-to-r from-[#5E6AD2] via-[#30D158] to-[#5E6AD2] bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]">at a glance.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2, ease: linearEase }} className="text-[17px] text-[#8A8F98] max-w-[500px] leading-[1.6]">
                Track uptime, latency, and error budgets across every service in real-time.
              </motion.p>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3, ease: linearEase }}>
              <button className="px-5 py-3 rounded-lg bg-[#EDEDED] text-[#09090B] text-[14px] font-semibold hover:bg-white shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all flex items-center gap-2">
                <Download size={16} /> Export Report
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GLOBAL KPI GRID */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} className="relative w-full bg-[#09090B] py-16 border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {globalKPIs.map((kpi, i) => (
              <motion.div key={kpi.label} variants={fadeUp} custom={i} whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.15)' }}
                className="bg-[#0F1011] rounded-xl p-5 border border-white/[0.06] transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${kpi.color}15`, border: `1px solid ${kpi.color}30` }}>
                    <kpi.icon size={14} style={{ color: kpi.color }} />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border ${getStatusBg(kpi.status)} ${getStatusBorder(kpi.status)}`} style={{ color: getStatusColor(kpi.status) }}>
                    {kpi.status === 'healthy' ? 'On Track' : kpi.status === 'warning' ? 'At Risk' : 'Breach'}
                  </span>
                </div>
                <p className="text-[24px] font-semibold tracking-tighter text-[#EDEDED] mb-1">{kpi.value}</p>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-medium text-[#5A5F66] uppercase tracking-wider">{kpi.label}</p>
                  <p className="text-[10px] font-mono text-[#5A5F66]">Target: {kpi.target}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SERVICE-WISE SLA CARDS */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} className="relative w-full bg-[#09090B] py-16 border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-[24px] font-semibold text-[#EDEDED] tracking-[-0.02em]">Service SLAs</h2>
              <p className="text-[13px] text-[#8A8F98] mt-1">Real-time uptime, latency, and error budget tracking</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161718] border border-white/[0.06]">
              <Radio size={12} className="text-[#30D158] animate-pulse" />
              <span className="text-[11px] font-medium text-[#8A8F98]">Live</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((svc, i) => (
              <motion.div key={svc.name} variants={fadeUp} custom={i} whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.15)' }}
                className="bg-[#0F1011] rounded-xl border border-white/[0.06] p-5 transition-all relative overflow-hidden group">
                
                {/* Top accent line */}
                <div className="absolute top-0 left-0 w-full h-[2px]" style={{ background: `linear-gradient(90deg, ${getStatusColor(svc.status)}, transparent)` }} />

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#161718] border border-white/[0.06]">
                      <Server size={14} className="text-[#8A8F98]" />
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-[#EDEDED]">{svc.name}</p>
                      <p className="text-[10px] font-medium text-[#5A5F66] capitalize">{svc.status}</p>
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full animate-pulse`} style={{ background: getStatusColor(svc.status), boxShadow: `0 0 8px ${getStatusColor(svc.status)}` }} />
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#5A5F66] mb-1">Uptime</p>
                    <div className="flex items-baseline gap-1">
                      <p className="text-[16px] font-semibold text-[#EDEDED] font-mono">{svc.uptime}%</p>
                      <span className={`text-[10px] ${svc.uptime >= svc.target ? 'text-[#30D158]' : 'text-[#FF453A]'}`}>
                        {svc.uptime >= svc.target ? '↑' : '↓'}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#5A5F66]">Target: {svc.target}%</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#5A5F66] mb-1">Latency</p>
                    <div className="flex items-baseline gap-1">
                      <p className="text-[16px] font-semibold text-[#EDEDED] font-mono">{svc.latency}</p>
                    </div>
                    <p className="text-[10px] text-[#5A5F66]">Target: {svc.targetLatency}</p>
                  </div>
                </div>

                {/* Error Budget Bar */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#5A5F66]">Error Budget</p>
                    <p className="text-[10px] font-mono font-semibold" style={{ color: getStatusColor(svc.status) }}>{svc.errorBudget}%</p>
                  </div>
                  <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }} 
                      whileInView={{ width: `${svc.errorBudget}%` }} 
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.3 }}
                      className="h-full rounded-full" 
                      style={{ background: getStatusColor(svc.status), boxShadow: `0 0 8px ${getStatusColor(svc.status)}60` }} 
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ERROR BUDGET BURN RATE */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} className="relative w-full bg-[#09090B] py-16 border-b border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div variants={fadeUp} className="mb-8">
            <h2 className="text-[24px] font-semibold text-[#EDEDED] tracking-[-0.02em]">Error Budget Burn Rate</h2>
            <p className="text-[13px] text-[#8A8F98] mt-1">How fast you're consuming your monthly error budget</p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-[#0F1011] rounded-xl border border-white/[0.06] p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#5E6AD2]/[0.05] blur-[80px] rounded-full pointer-events-none" />
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#FF453A]/10 border border-[#FF453A]/20 flex items-center justify-center">
                  <TrendingDown size={16} className="text-[#FF453A]" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-[#EDEDED]">Payment Service</p>
                  <p className="text-[11px] text-[#5A5F66]">Critical burn rate detected</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-[#FF453A]/10 text-[#FF453A] border border-[#FF453A]/20">
                2.4x faster than normal
              </span>
            </div>

            <div className="h-[180px] w-full relative z-10">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 200">
                <defs>
                  <linearGradient id="burnGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF453A" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#FF453A" stopOpacity="0" />
                  </linearGradient>
                </defs>
                
                {/* Grid lines */}
                {[40, 80, 120, 160].map(y => (
                  <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                ))}

                {/* Danger zone */}
                <rect x="0" y="0" width="1000" height="60" fill="rgba(255,69,58,0.05)" />
                <text x="10" y="20" fill="#FF453A" fontSize="10" fontFamily="monospace">DANGER ZONE</text>

                <motion.path 
                  initial={{ opacity: 0 }} 
                  whileInView={{ opacity: 1 }} 
                  transition={{ duration: 1.5 }}
                  d="M 0,160 C 100,155 200,150 300,140 C 400,120 450,100 500,80 C 550,60 600,40 700,30 C 800,20 900,15 1000,10 L 1000,200 L 0,200 Z" 
                  fill="url(#burnGradient)" 
                />
                <motion.path 
                  initial={{ pathLength: 0 }} 
                  whileInView={{ pathLength: 1 }} 
                  transition={{ duration: 2 }}
                  d="M 0,160 C 100,155 200,150 300,140 C 400,120 450,100 500,80 C 550,60 600,40 700,30 C 800,20 900,15 1000,10" 
                  fill="none" 
                  stroke="#FF453A" 
                  strokeWidth="2.5" 
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_10px_rgba(255,69,58,0.8)]"
                />
                <motion.circle 
                  initial={{ scale: 0 }} 
                  whileInView={{ scale: 1 }} 
                  transition={{ delay: 1.5, type: "spring" }}
                  cx="1000" 
                  cy="10" 
                  r="5" 
                  fill="#FF453A" 
                  className="drop-shadow-[0_0_10px_#FF453A]"
                />
              </svg>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/[0.04] relative z-10">
              <span className="text-[11px] font-medium text-[#5A5F66]">0 days ago</span>
              <span className="text-[11px] font-medium text-[#8A8F98]">Now</span>
              <span className="text-[11px] font-medium text-[#5A5F66]">30 days left</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* SLO COMPLIANCE TABLE */}
      <motion.section initial="hidden" whileInView="show" viewport={{ once: true }} className="relative w-full bg-[#09090B] py-16">
        <div className="max-w-[1100px] mx-auto px-6">
          <motion.div variants={fadeUp} className="mb-8">
            <h2 className="text-[24px] font-semibold text-[#EDEDED] tracking-[-0.02em]">SLO Compliance</h2>
            <p className="text-[13px] text-[#8A8F98] mt-1">Detailed compliance breakdown per service</p>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-[#0F1011] rounded-xl border border-white/[0.06] overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/[0.04] bg-[#121316]">
              <div className="col-span-3 text-[10px] font-bold uppercase tracking-wider text-[#5A5F66]">Service</div>
              <div className="col-span-2 text-[10px] font-bold uppercase tracking-wider text-[#5A5F66]">Uptime SLO</div>
              <div className="col-span-2 text-[10px] font-bold uppercase tracking-wider text-[#5A5F66]">Latency SLO</div>
              <div className="col-span-2 text-[10px] font-bold uppercase tracking-wider text-[#5A5F66]">Error Budget</div>
              <div className="col-span-3 text-[10px] font-bold uppercase tracking-wider text-[#5A5F66]">Compliance</div>
            </div>

            {/* Table Rows */}
            {services.map((svc, i) => {
              const uptimeOk = parseFloat(svc.uptime) >= parseFloat(svc.target)
              const latencyOk = parseInt(svc.latency) <= parseInt(svc.targetLatency)
              const compliance = Math.round((svc.errorBudget + (uptimeOk ? 100 : 0) + (latencyOk ? 100 : 0)) / 3)
              
              return (
                <motion.div key={svc.name} variants={fadeUp} custom={i} 
                  className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/[0.04] last:border-0 hover:bg-[#121316] transition-colors items-center">
                  <div className="col-span-3 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: getStatusColor(svc.status), boxShadow: `0 0 6px ${getStatusColor(svc.status)}` }} />
                    <span className="text-[13px] font-medium text-[#EDEDED]">{svc.name}</span>
                  </div>
                  <div className="col-span-2">
                    <span className={`text-[12px] font-mono font-semibold ${uptimeOk ? 'text-[#30D158]' : 'text-[#FF453A]'}`}>{svc.uptime}%</span>
                  </div>
                  <div className="col-span-2">
                    <span className={`text-[12px] font-mono font-semibold ${latencyOk ? 'text-[#30D158]' : 'text-[#FF453A]'}`}>{svc.latency}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-[12px] font-mono font-semibold text-[#8A8F98]">{svc.errorBudget}%</span>
                  </div>
                  <div className="col-span-3 flex items-center gap-2">
                    <div className="flex-grow h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: `${compliance}%` }} viewport={{ once: true }} transition={{ duration: 1 }} className="h-full rounded-full" style={{ background: getStatusColor(svc.status) }} />
                    </div>
                    <span className="text-[11px] font-mono font-semibold" style={{ color: getStatusColor(svc.status) }}>{compliance}%</span>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </motion.section>

      <DarkFooter 
        badge="Reliability" 
        title="Track your" 
        highlight="SLOs." 
        description="Set targets, monitor error budgets, and prevent breaches before they happen." 
        primary="Configure SLOs" 
        secondary="View Reports" 
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

export default SLAPage
