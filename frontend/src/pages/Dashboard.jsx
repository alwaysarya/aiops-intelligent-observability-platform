import { motion, useScroll, useTransform } from 'framer-motion'
import { useState } from 'react'
import { ArrowRight, ChevronRight, Activity, CheckCircle2, ShieldCheck, RefreshCw, Box, Zap, TrendingUp, ArrowDown, AlertCircle } from 'lucide-react'

const linearEase = [0.25, 0.1, 0.25, 1]

function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: linearEase }}
    >
      {children}
    </motion.div>
  )
}

function Heading({ eyebrow, title, description }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: linearEase }}
      className="mb-12"
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5E6AD2] mb-4">{eyebrow}</p>
      <h2 className="text-[clamp(32px,4vw,48px)] font-semibold tracking-[-0.04em] leading-[1.1] text-[#EDEDED]">{title}</h2>
      {description && <p className="max-w-[560px] text-[15px] leading-[1.7] text-[#8A8F98] mt-4">{description}</p>}
    </motion.div>
  )
}

function Pill({ children, warning }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold whitespace-nowrap border ${
      warning 
        ? 'bg-[#E5A00D]/10 text-[#E5A00D] border-[#E5A00D]/20' 
        : 'bg-[#30D158]/10 text-[#30D158] border-[#30D158]/20'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${warning ? 'bg-[#E5A00D]' : 'bg-[#30D158]'} animate-pulse`} />
      {children}
    </span>
  )
}

const services = [
  { name: 'API Gateway', detail: 'Request routing and traffic', uptime: '99.98%', status: 'Operational', icon: Box },
  { name: 'Application Server', detail: 'Core application services', uptime: '99.95%', status: 'Operational', icon: Zap },
  { name: 'Build Pipeline', detail: 'Continuous integration', uptime: '99.91%', status: 'Operational', icon: TrendingUp },
  { name: 'Compute Engine', detail: 'Processing resources', uptime: '98.76%', status: 'Monitoring', icon: ShieldCheck },
]

const activities = [
  { title: 'Deployment completed', detail: 'Production · main branch', time: '8 min ago', type: 'success' },
  { title: 'Build pipeline passed', detail: 'Build #284 · 12 checks', time: '24 min ago', type: 'success' },
  { title: 'Resource usage increased', detail: 'Compute Engine · 72% CPU', time: '41 min ago', type: 'warning' },
  { title: 'Configuration updated', detail: 'Environment variables', time: '1 hr ago', type: 'info' },
]

const deployments = [
  { version: 'v2.8.4', branch: 'main', environment: 'Production', status: 'Successful', time: 'Today · 10:42 AM' },
  { version: 'v2.8.3', branch: 'release/stable', environment: 'Staging', status: 'Successful', time: 'Today · 9:18 AM' },
  { version: 'v2.8.2', branch: 'main', environment: 'Production', status: 'Successful', time: 'Yesterday · 6:32 PM' },
]

export default function Dashboard() {
  const [filter, setFilter] = useState('All activity')
  const [refreshing, setRefreshing] = useState(false)
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.3])

  const filtered = activities.filter(item =>
    filter === 'All activity' ||
    (filter === 'Alerts' && item.type === 'warning') ||
    (filter === 'Deployments' && item.type === 'success')
  )

  const refresh = () => {
    setRefreshing(true)
    window.setTimeout(() => setRefreshing(false), 700)
  }

  return (
    <main className="w-full min-h-screen bg-[#09090B] text-[#EDEDED] font-[-apple-system,BlinkMacSystemFont,'Inter','Helvetica_Neue',sans-serif] antialiased selection:bg-[#5E6AD2]/30 overflow-x-hidden">
      
      {/* HERO */}
      <section className="relative w-full overflow-hidden border-b border-white/[0.06]" style={{ minHeight: '100vh' }}>
        
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_60%,transparent_100%)]" />
        
        {/* Ambient Green Glow */}
        <div className="absolute top-0 right-[15%] w-[600px] h-[600px] bg-[#00C98B]/[0.08] blur-[140px] rounded-full pointer-events-none" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }} 
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 left-[10%] w-[400px] h-[400px] bg-[#5E6AD2]/[0.08] blur-[120px] rounded-full pointer-events-none" 
        />

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-[1200px] mx-auto px-6 py-24 md:py-32"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: linearEase }}>
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16DFAA] shadow-[0_0_12px_#16DFAA] animate-pulse" />
                <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#C5D5CE]">Your Infrastructure, In Focus</span>
              </div>

              <h1 className="text-[clamp(48px,5.5vw,80px)] font-semibold tracking-[-0.05em] leading-[1.02] mb-6 text-[#F7F9F8]">
                Every signal,<br />
                <span className="bg-gradient-to-r from-[#39E9BB] via-[#00C98B] to-[#78EFAC] bg-clip-text text-transparent">one clear picture.</span>
              </h1>

              <p className="text-[16px] leading-[1.8] text-[#929D97] max-w-[480px] mb-10">
                Unify logs, detect anomalies, monitor service health, and trace root causes from one intelligent observability platform.
              </p>

              <div className="flex flex-wrap gap-3">
                <a href="#overview" className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-[#F4FAF7] text-[#07100C] text-[13px] font-semibold hover:bg-[#DFFCF0] transition-all hover:scale-[1.02] shadow-[0_5px_24px_rgba(255,255,255,0.1)]">
                  Explore dashboard <ArrowRight size={16} />
                </a>
                <a href="#services" className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-white/[0.06] text-[#C3D0C9] text-[13px] font-semibold border border-white/[0.1] hover:bg-white/[0.1] transition-all hover:scale-[1.02]">
                  View infrastructure <ChevronRight size={16} />
                </a>
              </div>
            </motion.div>

            {/* Right - 3D Topology Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1.2, delay: 0.2, ease: linearEase }}
              className="relative flex items-center justify-center"
            >
              <div className="relative w-full max-w-[500px] aspect-square">
                
                {/* Glowing Aura */}
                <motion.div 
                  animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-[10%] rounded-full bg-[#00F0B5]/[0.15] blur-[60px]"
                />
                
                {/* Orbital Rings */}
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-[10%] rounded-full border border-dashed border-[#51F3CF]/20"
                />
                <motion.div 
                  animate={{ rotate: -360 }} 
                  transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-[18%] rounded-full border border-[#42EDC3]/15"
                />
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-[25%] rounded-full border border-dashed border-[#51F3CF]/10"
                />

                {/* Central AI Core */}
                <motion.div 
                  animate={{ scale: [1, 1.05, 1], boxShadow: ['0 0 40px rgba(0,240,181,0.2)', '0 0 60px rgba(0,240,181,0.4)', '0 0 40px rgba(0,240,181,0.2)'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140px] h-[140px] rounded-full bg-gradient-to-br from-[#0B2D23] to-[#051510] border-2 border-[#20DCA9]/60 flex flex-col items-center justify-center shadow-2xl"
                >
                  <span className="text-[16px] font-bold text-[#DFFFF5] tracking-wider">AIOps</span>
                  <span className="text-[9px] text-[#75D9BB] tracking-[0.2em] mt-1">INTELLIGENCE</span>
                </motion.div>

                {/* Orbiting Nodes */}
                {[
                  { label: 'LOGS', angle: 0 },
                  { label: 'METRICS', angle: 90 },
                  { label: 'AI/ML', angle: 180 },
                  { label: 'ALERTS', angle: 270 },
                ].map((node, i) => {
                  const radius = 180
                  const x = Math.cos((node.angle * Math.PI) / 180) * radius
                  const y = Math.sin((node.angle * Math.PI) / 180) * radius
                  return (
                    <motion.div
                      key={node.label}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
                      className="absolute top-1/2 left-1/2 w-[70px] h-[56px] rounded-xl bg-[#0B211B] border border-[#36E8B4]/60 flex flex-col items-center justify-center shadow-lg"
                      style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
                    >
                      <span className="text-[14px] text-[#65EFC7] mb-1">
                        {i === 0 ? '⌘' : i === 1 ? '⌁' : i === 2 ? '◇' : '!'}
                      </span>
                      <span className="text-[8px] font-semibold text-[#D5EEE5] tracking-wider">{node.label}</span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>

          </div>
        </motion.div>

        {/* Scroll Hint */}
        <motion.p 
          animate={{ y: [0, 6, 0] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-semibold tracking-[0.2em] uppercase text-[#65756D] flex items-center gap-2"
        >
          <ArrowDown size={12} /> Scroll to explore
        </motion.p>
      </section>

      {/* TOPOLOGY SECTION */}
      <section className="max-w-[1180px] mx-auto px-6 py-24" id="overview">
        <Heading eyebrow="Live Service Topology" title="Your infrastructure, connected." description="Explore service dependencies, system health, and the signals flowing across your infrastructure." />

        <motion.div 
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8, delay: 0.2, ease: linearEase }}
          className="relative rounded-3xl border border-white/[0.06] bg-gradient-to-b from-[#0F1011] to-[#0A0B0C] p-8 overflow-hidden"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#5E6AD2]/[0.04] blur-[80px] rounded-full pointer-events-none" />
          
          <div className="flex justify-between items-center flex-wrap gap-4 mb-8 relative z-10">
            <div>
              <h3 className="text-[16px] font-semibold text-[#EDEDED]">Service dependency map</h3>
              <p className="text-[12px] text-[#5A5F66] mt-1">Illustrative topology · Sample service data</p>
            </div>
            <div className="flex gap-4 text-[11px] font-medium">
              <span className="flex items-center gap-1.5 text-[#30D158]">
                <span className="w-2 h-2 rounded-full bg-[#30D158] shadow-[0_0_6px_#30D158]" /> Operational
              </span>
              <span className="flex items-center gap-1.5 text-[#E5A00D]">
                <span className="w-2 h-2 rounded-full bg-[#E5A00D] shadow-[0_0_6px_#E5A00D]" /> Attention
              </span>
            </div>
          </div>

          <svg viewBox="0 0 760 300" className="w-full h-auto relative z-10" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="flowGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#5E6AD2" stopOpacity="0.1" />
                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#5E6AD2" stopOpacity="0.1" />
              </linearGradient>
              <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {[
              [135, 82, 300, 150], [300, 150, 470, 82], [300, 150, 470, 230],
              [470, 82, 630, 150], [470, 230, 630, 150], [135, 82, 135, 230],
            ].map(([x1, y1, x2, y2], i) => (
              <g key={i}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.06)" strokeWidth="2" />
                <motion.line 
                  x1={x1} y1={y1} x2={x2} y2={y2} 
                  stroke="url(#flowGrad)" strokeWidth="2" strokeDasharray="5 10" strokeLinecap="round"
                  animate={{ strokeDashoffset: [0, -30] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: i * 0.2 }}
                />
              </g>
            ))}

            {[
              { x: 135, y: 82, label: 'Web frontend', sub: '12.4k req/min', c: '#5E6AD2' },
              { x: 300, y: 150, label: 'Core API', sub: '142 ms latency', c: '#8B5CF6' },
              { x: 470, y: 82, label: 'PostgreSQL', sub: 'Database', c: '#5E6AD2' },
              { x: 470, y: 230, label: 'Redis cache', sub: 'Cache layer', c: '#E5A00D' },
              { x: 630, y: 150, label: 'Monitoring', sub: 'Telemetry', c: '#5E6AD2' },
              { x: 135, y: 230, label: 'Auth service', sub: 'Identity', c: '#5E6AD2' },
            ].map((node, i) => (
              <motion.g 
                key={node.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ transformOrigin: `${node.x}px ${node.y}px` }}
              >
                <circle cx={node.x} cy={node.y} r="35" fill={node.c} opacity="0.05" />
                <circle cx={node.x} cy={node.y} r="23" fill="#0F1011" stroke={node.c} strokeWidth="1.5" />
                <circle cx={node.x} cy={node.y} r="5" fill={node.c} filter="url(#nodeGlow)" />
                <text x={node.x} y={node.y + 45} textAnchor="middle" fontSize="12" fontWeight="600" fill="#EDEDED">{node.label}</text>
                <text x={node.x} y={node.y + 60} textAnchor="middle" fontSize="10" fill="#8A8F98">{node.sub}</text>
              </motion.g>
            ))}
          </svg>

          <div className="flex justify-between items-center flex-wrap gap-4 border-t border-white/[0.04] pt-5 mt-6 relative z-10">
            <span className="text-[12px] text-[#8A8F98]">6 services · 6 connections</span>
            <span className="text-[12px] font-semibold text-[#5E6AD2] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5E6AD2] animate-pulse" /> Topology preview
            </span>
          </div>
        </motion.div>
      </section>

      {/* SERVICES & ACTIVITY */}
      <section className="max-w-[1180px] mx-auto px-6 py-24" id="services">
        <Heading eyebrow="Infrastructure" title="Built to keep things moving." description="See the state of core services without digging through logs and multiple tools." />
        
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12">
          
          {/* Service Health */}
          <div>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-[16px] font-semibold text-[#EDEDED]">Service health</h3>
              <span className="text-[11px] text-[#8A8F98]">Current overview</span>
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-[#0F1011] overflow-hidden">
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <motion.div 
                    key={service.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: linearEase }}
                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                    className="flex items-center gap-4 p-5 border-b border-white/[0.04] last:border-0 cursor-default"
                  >
                    <div className="w-11 h-11 rounded-xl bg-[#5E6AD2]/10 border border-[#5E6AD2]/20 flex items-center justify-center flex-shrink-0">
                      <Icon size={20} className="text-[#5E6AD2]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-[#EDEDED]">{service.name}</p>
                      <p className="text-[11px] text-[#8A8F98] mt-0.5">{service.detail}</p>
                    </div>
                    <div className="text-right mr-2">
                      <p className="text-[12px] font-semibold text-[#EDEDED] font-mono">{service.uptime}</p>
                      <p className="text-[10px] text-[#5A5F66]">Availability</p>
                    </div>
                    <Pill warning={service.status !== 'Operational'}>{service.status}</Pill>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-[16px] font-semibold text-[#EDEDED]">Recent activity</h3>
              <select 
                value={filter} 
                onChange={e => setFilter(e.target.value)}
                className="text-[11px] px-3 py-1.5 rounded-lg bg-[#161718] border border-white/[0.06] text-[#EDEDED] outline-none cursor-pointer hover:border-white/[0.12] transition-colors"
              >
                <option>All activity</option>
                <option>Deployments</option>
                <option>Alerts</option>
              </select>
            </div>
            <div className="rounded-2xl border border-white/[0.06] bg-[#0F1011] p-5">
              {filtered.map((item, i) => (
                <motion.div 
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex gap-3 py-3 border-b border-white/[0.04] last:border-0"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    item.type === 'success' ? 'bg-[#30D158]/10 text-[#30D158] border border-[#30D158]/20' :
                    item.type === 'warning' ? 'bg-[#E5A00D]/10 text-[#E5A00D] border border-[#E5A00D]/20' :
                    'bg-[#5E6AD2]/10 text-[#5E6AD2] border border-[#5E6AD2]/20'
                  }`}>
                    <Activity size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-[#EDEDED]">{item.title}</p>
                    <p className="text-[11px] text-[#8A8F98] mt-0.5">{item.detail}</p>
                    <p className="text-[10px] text-[#5A5F66] mt-1">{item.time}</p>
                  </div>
                </motion.div>
              ))}
              {!filtered.length && <p className="text-[12px] text-[#8A8F98] py-4">No matching activity.</p>}
            </div>
          </div>

        </div>
      </section>

      {/* DEPLOYMENTS */}
      <section className="max-w-[1180px] mx-auto px-6 py-24" id="deployments">
        <Heading eyebrow="Delivery" title="Every release, accounted for." description="A clean history of recent changes across production and staging." />
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-2xl border border-white/[0.06] bg-[#0F1011] overflow-hidden"
        >
          <div className="grid grid-cols-[1fr_0.8fr_0.8fr_1fr] gap-4 px-6 py-4 bg-[#121316] border-b border-white/[0.06]">
            {['Release', 'Environment', 'Status', 'Updated'].map(h => (
              <span key={h} className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#5A5F66]">{h}</span>
            ))}
          </div>
          {deployments.map((item, i) => (
            <motion.div 
              key={item.version}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
              className="grid grid-cols-[1fr_0.8fr_0.8fr_1fr] gap-4 px-6 py-4 border-b border-white/[0.04] last:border-0 items-center cursor-default"
            >
              <div>
                <p className="text-[13px] font-semibold text-[#EDEDED] font-mono">{item.version}</p>
                <p className="text-[11px] text-[#5A5F66] mt-0.5">{item.branch}</p>
              </div>
              <span className="text-[12px] text-[#8A8F98]">{item.environment}</span>
              <span><Pill><CheckCircle2 size={10} /> {item.status}</Pill></span>
              <span className="text-[12px] text-[#8A8F98]">{item.time}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SYSTEM CONFIDENCE */}
      <section className="w-full bg-[#0A0F1A] border-y border-white/[0.06]">
        <div className="max-w-[1180px] mx-auto px-6 py-24">
          <Heading eyebrow="System Confidence" title="Know where you stand." description="A quick, readable snapshot of the indicators teams use to assess system readiness." />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: 'API availability', value: '99%', width: '99%' },
              { name: 'Build success rate', value: '96%', width: '96%' },
              { name: 'Resource capacity', value: '72%', width: '72%' }
            ].map((item, i) => (
              <motion.div 
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -4, borderColor: 'rgba(94,106,210,0.3)' }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-sm transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-[#5E6AD2]/10 border border-[#5E6AD2]/20 flex items-center justify-center mb-5">
                  <ShieldCheck size={18} className="text-[#5E6AD2]" />
                </div>
                <p className="text-[28px] font-semibold text-[#EDEDED] tracking-tight mb-2">{item.value}</p>
                <p className="text-[12px] text-[#8A8F98] mb-5">{item.name}</p>
                <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: item.width }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.3, ease: linearEase }}
                    className="h-full bg-gradient-to-r from-[#5E6AD2] to-[#8B5CF6] rounded-full shadow-[0_0_10px_rgba(94,106,210,0.5)]"
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-[10px] text-[#5A5F66] mt-5">Example monitoring values. Live system measurements are not connected to these cards yet.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-[1180px] mx-auto px-6 py-8 flex flex-wrap items-center justify-between gap-4 text-[11px] text-[#5A5F66]">
        <span>© {new Date().getFullYear()} AIOps · Infrastructure overview</span>
        <div className="flex gap-6">
          <a href="#home" className="hover:text-[#5E6AD2] transition-colors">Back to top ↑</a>
          <a href="#services" className="hover:text-[#5E6AD2] transition-colors">Service health</a>
          <a href="#deployments" className="hover:text-[#5E6AD2] transition-colors">Deployments</a>
        </div>
      </footer>

      {/* REFRESH FAB */}
      <div className="fixed bottom-6 right-6 z-20">
        <motion.button 
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={refresh}
          aria-label="Refresh"
          className="w-12 h-12 rounded-full bg-[#0F1011] border border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex items-center justify-center text-[#EDEDED] hover:border-white/[0.15] transition-colors"
        >
          <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''} />
        </motion.button>
      </div>

    </main>
  )
}