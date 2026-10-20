import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronRight, Activity, ShieldCheck, Box, Zap, TrendingUp, ArrowDown, Database } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1]

const services = [
  { name: 'API Gateway', detail: 'Request routing and traffic', uptime: '99.98%', status: 'Operational', icon: Box, color: '#0071E3' },
  { name: 'Application Server', detail: 'Core application services', uptime: '99.95%', status: 'Operational', icon: Zap, color: '#5E5CE6' },
  { name: 'Build Pipeline', detail: 'Continuous integration', uptime: '99.91%', status: 'Operational', icon: TrendingUp, color: '#30D158' },
  { name: 'Compute Engine', detail: 'Processing resources', uptime: '98.76%', status: 'Monitoring', icon: ShieldCheck, color: '#E9A23B' },
]

const deployments = [
  { version: 'v2.8.4', branch: 'main', environment: 'Production', status: 'Successful', time: 'Today · 10:42 AM' },
  { version: 'v2.8.3', branch: 'release/stable', environment: 'Staging', status: 'Successful', time: 'Today · 9:18 AM' },
  { version: 'v2.8.2', branch: 'main', environment: 'Production', status: 'Successful', time: 'Yesterday · 6:32 PM' },
]

const activities = [
  { title: 'Deployment completed', detail: 'Production · main branch', time: '8 min ago', type: 'success' },
  { title: 'Build pipeline passed', detail: 'Build #284 · 12 checks', time: '24 min ago', type: 'success' },
  { title: 'Resource usage increased', detail: 'Compute Engine · 72% CPU', time: '41 min ago', type: 'warning' },
  { title: 'Configuration updated', detail: 'Environment variables', time: '1 hr ago', type: 'info' },
]

export default function Dashboard() {
  const [filter, setFilter] = useState('All activity')
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 80])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.4])

  const filtered = activities.filter(item =>
    filter === 'All activity' ||
    (filter === 'Alerts' && item.type === 'warning') ||
    (filter === 'Deployments' && item.type === 'success')
  )

  return (
    <main className="w-full min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-[-apple-system,BlinkMacSystemFont,'Inter',sans-serif] antialiased overflow-x-hidden">

      {/* ============ HERO ============ */}
      <section className="relative w-full overflow-hidden" style={{ minHeight: '100vh' }}>
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2070&auto=format&fit=crop" alt="Datacenter" className="w-full h-full object-cover opacity-[0.08]" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-[#FBFBFD] to-[#F5F5F7]" />
        </div>
        <div className="absolute top-[-20%] right-[10%] w-[600px] h-[600px] rounded-full bg-[#0071E3]/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[5%] w-[500px] h-[500px] rounded-full bg-[#5E5CE6]/10 blur-[120px] pointer-events-none" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-[1240px] mx-auto px-8 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease }}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-black/[0.06] bg-white/80 backdrop-blur-xl mb-8 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#30D158] shadow-[0_0_8px_#30D158] animate-pulse" />
                <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#6E6E73]">Live Infrastructure</span>
              </div>
              <h1 className="text-[clamp(52px,6vw,88px)] font-black tracking-[-0.055em] leading-[0.95] mb-7">
                Every signal,<br />
                <span className="bg-gradient-to-r from-[#0071E3] via-[#5E5CE6] to-[#AF52DE] bg-clip-text text-transparent">one clear picture.</span>
              </h1>
              <p className="text-[19px] leading-[1.65] text-[#6E6E73] max-w-[480px] mb-10 font-medium">
                Unify logs, detect anomalies, monitor <span className="text-[#0071E3] font-semibold">service health</span>, and trace root causes from one intelligent observability platform.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#overview" className="group inline-flex items-center gap-2 h-14 px-7 rounded-full bg-black text-white text-[15px] font-semibold hover:bg-[#0071E3] transition-all shadow-[0_15px_35px_-10px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_45px_-10px_rgba(0,113,227,0.4)]">
                  Explore dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#services" className="inline-flex items-center gap-2 h-14 px-7 rounded-full bg-white text-[#1D1D1F] text-[15px] font-semibold border border-black/[0.08] hover:border-black/[0.15] transition-all shadow-sm">
                  View infrastructure <ChevronRight size={18} />
                </a>
              </div>
              <div className="flex items-center gap-10 mt-14 pt-8 border-t border-black/[0.06]">
                {[{ v: '99.99%', l: 'Uptime SLA' }, { v: '50ms', l: 'Avg response' }, { v: '24/7', l: 'Support' }].map((s, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.15, duration: 0.6 }}>
                    <p className="text-[26px] font-bold tracking-tight bg-gradient-to-br from-[#1D1D1F] to-[#424245] bg-clip-text text-transparent">{s.v}</p>
                    <p className="text-[11px] font-semibold text-[#86868B] uppercase tracking-wider mt-1">{s.l}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — Live AI Network */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.3, ease }} className="relative flex items-center justify-center">
              <div className="relative w-full max-w-[500px] aspect-square">
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,113,227,0.15),transparent_70%)] blur-2xl" />
                <svg viewBox="0 0 500 500" className="w-full h-full relative z-10">
                  <defs>
                    <radialGradient id="coreGrad" cx="50%" cy="50%">
                      <stop offset="0%" stopColor="#0071E3" />
                      <stop offset="100%" stopColor="#5E5CE6" />
                    </radialGradient>
                    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0071E3" stopOpacity="0.1" />
                      <stop offset="50%" stopColor="#5E5CE6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#AF52DE" stopOpacity="0.1" />
                    </linearGradient>
                    <filter id="svgGlow">
                      <feGaussianBlur stdDeviation="4" result="b" />
                      <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                  </defs>

                  {[
                    [250, 250, 100, 100], [250, 250, 400, 100],
                    [250, 250, 100, 400], [250, 250, 400, 400],
                    [250, 250, 250, 80], [250, 250, 250, 420],
                    [250, 250, 80, 250], [250, 250, 420, 250],
                  ].map(([x1, y1, x2, y2], i) => (
                    <g key={i}>
                      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#lineGrad)" strokeWidth="1.5" />
                      <motion.circle r="3" fill="#5E5CE6" filter="url(#svgGlow)" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}>
                        <animateMotion dur="2.5s" repeatCount="indefinite" path={`M ${x1} ${y1} L ${x2} ${y2}`} begin={`${i * 0.3}s`} />
                      </motion.circle>
                    </g>
                  ))}

                  <circle cx="250" cy="250" r="180" fill="none" stroke="#0071E3" strokeWidth="0.5" strokeOpacity="0.15" />
                  <motion.circle cx="250" cy="250" r="180" fill="none" stroke="#5E5CE6" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="4 8" animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '250px 250px' }} />
                  <motion.circle cx="250" cy="250" r="220" fill="none" stroke="#AF52DE" strokeWidth="0.5" strokeOpacity="0.2" animate={{ rotate: -360 }} transition={{ duration: 90, repeat: Infinity, ease: 'linear' }} style={{ transformOrigin: '250px 250px' }} strokeDasharray="2 12" />

                  <motion.g animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '250px 250px' }}>
                    <circle cx="250" cy="250" r="70" fill="#0071E3" opacity="0.1" />
                    <circle cx="250" cy="250" r="55" fill="url(#coreGrad)" filter="url(#svgGlow)" />
                    <circle cx="250" cy="250" r="40" fill="white" opacity="0.1" />
                    <text x="250" y="245" textAnchor="middle" fontSize="16" fontWeight="800" fill="white" letterSpacing="1">AI</text>
                    <text x="250" y="262" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.7)" letterSpacing="2">CORE</text>
                  </motion.g>

                  {[
                    { x: 100, y: 100, label: 'LOGS', color: '#0071E3' },
                    { x: 400, y: 100, label: 'METRICS', color: '#5E5CE6' },
                    { x: 100, y: 400, label: 'AI/ML', color: '#AF52DE' },
                    { x: 400, y: 400, label: 'ALERTS', color: '#30D158' },
                    { x: 250, y: 80, label: 'APM', color: '#E9A23B' },
                    { x: 250, y: 420, label: 'TRACES', color: '#0071E3' },
                    { x: 80, y: 250, label: 'DB', color: '#5E5CE6' },
                    { x: 420, y: 250, label: 'CACHE', color: '#30D158' },
                  ].map((n, i) => (
                    <g key={n.label}>
                      <motion.circle cx={n.x} cy={n.y} r="20" fill={n.color} opacity="0.15" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} style={{ transformOrigin: `${n.x}px ${n.y}px` }} />
                      <circle cx={n.x} cy={n.y} r="10" fill="white" />
                      <circle cx={n.x} cy={n.y} r="6" fill={n.color} filter="url(#svgGlow)" />
                      <text x={n.x} y={n.y + (n.y < 250 ? -18 : 28)} textAnchor="middle" fontSize="9" fontWeight="700" fill="#1D1D1F" letterSpacing="0.5">{n.label}</text>
                    </g>
                  ))}
                </svg>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.6 }} className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-black/[0.08] shadow-xl z-30">
                  <span className="w-2 h-2 rounded-full bg-[#30D158] animate-pulse shadow-[0_0_8px_#30D158]" />
                  <span className="text-[11px] font-bold text-[#1D1D1F]">8 services online</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#86868B] flex items-center gap-2 animate-bounce">
          <ArrowDown size={14} /> Scroll to explore
        </p>
      </section>

      {/* ============ TOPOLOGY ============ */}
      <section className="relative max-w-[1240px] mx-auto px-8 py-32">
        <div className="text-center mb-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0071E3] mb-4">Live Service Topology</p>
          <h2 className="text-[clamp(40px,5vw,64px)] font-bold tracking-[-0.055em] leading-[1.02] mb-6">Your infrastructure, connected.</h2>
          <p className="max-w-[560px] mx-auto text-[17px] leading-[1.7] text-[#6E6E73]">Explore service dependencies, system health, and the signals flowing across your infrastructure.</p>
        </div>
        <div className="relative rounded-[40px] overflow-hidden border border-black/[0.06] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)]">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop" alt="Circuit" className="w-full h-full object-cover opacity-[0.04]" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#FBFBFD]/95 via-white/90 to-[#F5F5F7]/95" />
          </div>
          <div className="relative p-12">
            <div className="flex justify-between items-center flex-wrap gap-4 mb-10">
              <div>
                <h3 className="text-[20px] font-bold text-[#1D1D1F]">Service dependency map</h3>
                <p className="text-[13px] text-[#86868B] mt-1">Illustrative topology · Sample service data</p>
              </div>
              <div className="flex gap-5 text-[12px] font-semibold">
                <span className="flex items-center gap-2 text-[#177245]"><span className="w-2 h-2 rounded-full bg-[#30D158] shadow-[0_0_8px_#30D158]" /> Operational</span>
                <span className="flex items-center gap-2 text-[#985C00]"><span className="w-2 h-2 rounded-full bg-[#E9A23B] shadow-[0_0_8px_#E9A23B]" /> Attention</span>
              </div>
            </div>
            <svg viewBox="0 0 760 320" className="w-full h-auto" style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="flow" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#0071E3" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#5E5CE6" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0071E3" stopOpacity="0.2" />
                </linearGradient>
                <filter id="glow"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              </defs>
              {[[135, 92, 300, 160], [300, 160, 470, 92], [300, 160, 470, 240], [470, 92, 630, 160], [470, 240, 630, 160], [135, 92, 135, 240]].map(([x1, y1, x2, y2], i) => (
                <g key={i}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#E5E7EB" strokeWidth="2" />
                  <motion.line x1={x1} y1={y1} x2={x2} y2={y2} stroke="url(#flow)" strokeWidth="2" strokeDasharray="6 10" strokeLinecap="round" animate={{ strokeDashoffset: [0, -32] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: i * 0.2 }} />
                </g>
              ))}
              {[
                { x: 135, y: 92, label: 'Web frontend', sub: '12.4k req/min', c: '#0071E3' },
                { x: 300, y: 160, label: 'Core API', sub: '142 ms latency', c: '#5E5CE6' },
                { x: 470, y: 92, label: 'PostgreSQL', sub: 'Database', c: '#0071E3' },
                { x: 470, y: 240, label: 'Redis cache', sub: 'Cache layer', c: '#E9A23B' },
                { x: 630, y: 160, label: 'Monitoring', sub: 'Telemetry', c: '#0071E3' },
                { x: 135, y: 240, label: 'Auth service', sub: 'Identity', c: '#30D158' },
              ].map((node, i) => (
                <motion.g key={node.label} initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} style={{ transformOrigin: `${node.x}px ${node.y}px` }}>
                  <circle cx={node.x} cy={node.y} r="42" fill={node.c} opacity="0.08" />
                  <circle cx={node.x} cy={node.y} r="28" fill="white" stroke={node.c} strokeWidth="2.5" />
                  <motion.circle cx={node.x} cy={node.y} r="7" fill={node.c} filter="url(#glow)" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }} style={{ transformOrigin: `${node.x}px ${node.y}px` }} />
                  <text x={node.x} y={node.y + 52} textAnchor="middle" fontSize="13" fontWeight="700" fill="#1D1D1F">{node.label}</text>
                  <text x={node.x} y={node.y + 68} textAnchor="middle" fontSize="11" fill="#86868B">{node.sub}</text>
                </motion.g>
              ))}
            </svg>
            <div className="flex justify-between items-center flex-wrap gap-4 border-t border-black/[0.06] pt-6 mt-8">
              <span className="text-[13px] text-[#86868B]">6 services · 6 connections</span>
              <span className="text-[13px] font-bold text-[#0071E3] flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#0071E3] animate-pulse" /> Topology preview</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICES & ACTIVITY ============ */}
      <section className="relative max-w-[1240px] mx-auto px-8 py-32">
        <div className="text-center mb-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0071E3] mb-4">Infrastructure</p>
          <h2 className="text-[clamp(40px,5vw,64px)] font-bold tracking-[-0.055em] leading-[1.02] mb-6">Built to keep things moving.</h2>
          <p className="max-w-[560px] mx-auto text-[17px] leading-[1.7] text-[#6E6E73]">See the state of core services without digging through logs and multiple tools.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[20px] font-bold text-[#1D1D1F]">Service health</h3>
              <span className="text-[12px] font-medium text-[#86868B]">Current overview</span>
            </div>
            <div className="rounded-[28px] border border-black/[0.06] bg-white overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)]">
              {services.map((service, i) => {
                const Icon = service.icon
                return (
                  <motion.div key={service.name} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} whileHover={{ x: 6, backgroundColor: '#FAFBFF' }} className="flex items-center gap-5 p-6 border-b border-black/[0.04] last:border-0 cursor-default transition-colors">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all hover:scale-110" style={{ background: `${service.color}15`, border: `1px solid ${service.color}30` }}>
                      <Icon size={22} style={{ color: service.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-[#1D1D1F]">{service.name}</p>
                      <p className="text-[12px] text-[#86868B] mt-1">{service.detail}</p>
                    </div>
                    <div className="text-right mr-3">
                      <p className="text-[14px] font-bold text-[#1D1D1F] font-mono">{service.uptime}</p>
                      <p className="text-[11px] text-[#86868B] mt-0.5">Availability</p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold border ${service.status === 'Operational' ? 'bg-[#E8F8EE] text-[#177245] border-[#30D158]/30' : 'bg-[#FFF4E5] text-[#985C00] border-[#E9A23B]/30'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${service.status === 'Operational' ? 'bg-[#30D158]' : 'bg-[#E9A23B]'} animate-pulse`} />
                      {service.status}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[20px] font-bold text-[#1D1D1F]">Recent activity</h3>
              <select value={filter} onChange={e => setFilter(e.target.value)} className="text-[12px] font-medium px-3 py-2 rounded-lg bg-white border border-black/[0.08] text-[#1D1D1F] outline-none cursor-pointer hover:border-black/[0.15] transition-colors">
                <option>All activity</option>
                <option>Deployments</option>
                <option>Alerts</option>
              </select>
            </div>
            <div className="rounded-[28px] border border-black/[0.06] bg-white p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)]">
              {filtered.map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="flex gap-4 py-4 border-b border-black/[0.04] last:border-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${item.type === 'success' ? 'bg-[#E8F8EE] text-[#177245]' : item.type === 'warning' ? 'bg-[#FFF4E5] text-[#985C00]' : 'bg-[#E8F0FE] text-[#0071E3]'}`}>
                    <Activity size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#1D1D1F]">{item.title}</p>
                    <p className="text-[12px] text-[#86868B] mt-1">{item.detail}</p>
                    <p className="text-[11px] text-[#AEAEB2] mt-1.5">{item.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ DEPLOYMENTS ============ */}
      <section className="relative max-w-[1240px] mx-auto px-8 py-32">
        <div className="text-center mb-20">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0071E3] mb-4">Delivery</p>
          <h2 className="text-[clamp(40px,5vw,64px)] font-bold tracking-[-0.055em] leading-[1.02] mb-6">Every release, accounted for.</h2>
          <p className="max-w-[560px] mx-auto text-[17px] leading-[1.7] text-[#6E6E73]">A clean history of recent changes across production and staging.</p>
        </div>
        <div className="rounded-[32px] border border-black/[0.06] bg-white overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)]">
          <div className="grid grid-cols-[1fr_0.8fr_0.8fr_1fr] gap-4 px-8 py-5 bg-gradient-to-r from-[#FAFBFC] to-[#F5F6FA] border-b border-black/[0.06]">
            {['Release', 'Environment', 'Status', 'Updated'].map(h => (
              <span key={h} className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#86868B]">{h}</span>
            ))}
          </div>
          {deployments.map((item, i) => (
            <motion.div key={item.version} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} whileHover={{ backgroundColor: '#FAFBFF', x: 4 }} className="grid grid-cols-[1fr_0.8fr_0.8fr_1fr] gap-4 px-8 py-6 border-b border-black/[0.04] last:border-0 items-center cursor-default transition-colors">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#30D158] shadow-[0_0_8px_#30D158]" />
                <div>
                  <p className="text-[14px] font-bold text-[#1D1D1F] font-mono">{item.version}</p>
                  <p className="text-[11px] text-[#86868B] mt-0.5">{item.branch}</p>
                </div>
              </div>
              <span className="text-[13px] font-medium text-[#1D1D1F]">{item.environment}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold bg-[#E8F8EE] text-[#177245] border border-[#30D158]/30 w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#30D158]" /> {item.status}
              </span>
              <span className="text-[13px] text-[#86868B]">{item.time}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ SYSTEM CONFIDENCE ============ */}
      <section className="relative w-full bg-white border-y border-black/[0.04]">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0071E3] to-transparent" />
        <div className="max-w-[1240px] mx-auto px-8 py-32">
          <div className="text-center mb-20">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0071E3] mb-4">System Confidence</p>
            <h2 className="text-[clamp(40px,5vw,64px)] font-bold tracking-[-0.055em] leading-[1.02] mb-6">Know where you stand.</h2>
            <p className="max-w-[560px] mx-auto text-[17px] leading-[1.7] text-[#6E6E73]">A quick, readable snapshot of the indicators teams use to assess system readiness.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'API availability', value: '99', suffix: '%', width: '99%', color: '#0071E3' },
              { name: 'Build success rate', value: '96', suffix: '%', width: '96%', color: '#5E5CE6' },
              { name: 'Resource capacity', value: '72', suffix: '%', width: '72%', color: '#AF52DE' }
            ].map((item, i) => (
              <motion.div key={item.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} whileHover={{ y: -8, boxShadow: '0 40px 80px -20px rgba(0,0,0,0.12)' }} className="rounded-[28px] border border-black/[0.06] bg-white p-8 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.06)] transition-all">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6" style={{ background: `${item.color}12`, border: `1px solid ${item.color}30` }}>
                  <ShieldCheck size={22} style={{ color: item.color }} />
                </div>
                <div className="flex items-end gap-2 mb-3">
                  <p className="text-[56px] font-bold text-[#1D1D1F] tracking-[-0.04em] leading-none">{item.value}</p>
                  <span className="text-[28px] font-bold mb-2" style={{ color: item.color }}>{item.suffix}</span>
                  <span className="text-[14px] text-[#30D158] font-bold mb-3 ml-auto">↗</span>
                </div>
                <p className="text-[13px] font-medium text-[#86868B] mb-6">{item.name}</p>
                <div className="h-2 bg-[#F0F0F2] rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: item.width }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.4 }} className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}CC)`, boxShadow: `0 0 12px ${item.color}80` }} />
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-[11px] text-[#86868B] mt-8 text-center">Example monitoring values. Live system measurements are not connected to these cards yet.</p>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="max-w-[1240px] mx-auto px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6 text-[13px] text-[#86868B] border-t border-black/[0.04]">
        <span>© {new Date().getFullYear()} AIOps · Infrastructure overview</span>
        <div className="flex gap-8">
          <a href="#" className="hover:text-[#0071E3] transition-colors font-medium">Back to top ↑</a>
          <a href="#" className="hover:text-[#0071E3] transition-colors font-medium">Service health</a>
          <a href="#" className="hover:text-[#0071E3] transition-colors font-medium">Deployments</a>
        </div>
      </footer>

    </main>
  )
}