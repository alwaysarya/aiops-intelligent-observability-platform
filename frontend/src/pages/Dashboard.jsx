import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Activity, Database, Clock, Network, ChevronRight, 
  ShieldAlert, ShieldCheck, Server, Terminal, Cpu, GitCommit, 
  Check, X, HelpCircle, Sparkles, Lock, ArrowRight, Globe, 
  MessageSquare, Users, Box, Zap, AlertCircle, Search, Command, FileText, CheckCircle2, Award,
  Upload, Play, Shield, PlayCircle, MonitorPlay, TrendingUp, Cloud, Star
} from 'lucide-react'

const appleEase = [0.16, 1, 0.3, 1]
const spring = { type: "spring", stiffness: 300, damping: 25 }

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.9, delay: i * 0.08, ease: appleEase } }),
}

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  show: { opacity: 1, x: 0, transition: { duration: 1, ease: appleEase } },
}

const slideInRight = {
  hidden: { opacity: 0, x: 100 },
  show: { opacity: 1, x: 0, transition: { duration: 1, ease: appleEase } },
}

function useAnimatedNumber(target, duration = 1500) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let raf, start
    const step = (t) => {
      if (!start) start = t
      const p = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 4)
      setVal(Math.floor(eased * target))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return val
}

function Dashboard() {
  const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
  const [logs, setLogs] = useState(13870)
  
  const { scrollYProgress } = useScroll()
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
      setLogs(prev => prev + Math.floor(Math.random() * 3))
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const logsAnim = useAnimatedNumber(logs)

  return (
    <div className="w-full min-h-screen bg-[#000000] text-[#F5F5F7] font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue',sans-serif] antialiased selection:bg-[#0A84FF]/30">
      
      {/* SECTION 1: HERO */}
      <motion.div style={{ scale: heroScale }} className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div key={i} animate={{ y: [0, -150, 0], opacity: [0, 1, 0] }} transition={{ duration: Math.random() * 8 + 5, repeat: Infinity, delay: Math.random() * 5 }}
            className="absolute w-1 h-1 bg-[#0A84FF] rounded-full blur-[1px]" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
        ))}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#0A84FF]/[0.08] blur-[160px] rounded-full pointer-events-none z-0" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24 md:py-32">
          <header className="relative flex flex-col lg:flex-row justify-between items-center mb-10 gap-12 lg:gap-8">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: appleEase }} className="flex-1 text-center lg:text-left z-10">
              <p className="text-[13px] font-semibold tracking-[0.06em] text-[#86868B] uppercase mb-5 flex items-center justify-center lg:justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-[#30D158] shadow-[0_0_15px_#30D158]" /> System Operational
              </p>
              <h1 className="text-[64px] md:text-[80px] font-bold tracking-[-0.04em] leading-none mb-6 bg-gradient-to-br from-white via-white to-[#86868B] bg-clip-text text-transparent drop-shadow-2xl">Overview.</h1>
              <p className="text-[24px] md:text-[28px] text-[#86868B] font-medium tracking-[-0.015em] max-w-lg mx-auto lg:mx-0">Real-time infrastructure intelligence. Designed for absolute scale.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: appleEase }} className="flex-1 relative w-full max-w-[400px] lg:max-w-[500px] h-[300px] lg:h-[400px] flex items-center justify-center">
              <div className="relative w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-gradient-to-b from-[#1C1C1E] to-[#0A0A0C] shadow-[inset_0_0_40px_rgba(255,255,255,0.05),0_0_120px_rgba(10,132,255,0.4)] border border-white/10 flex items-center justify-center z-20">
                 <motion.div animate={{ rotateY: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border border-[#0A84FF]/50 border-t-[#0A84FF] opacity-60" />
                 <Cpu size={64} className="text-[#0A84FF] drop-shadow-[0_0_25px_rgba(10,132,255,1)]" strokeWidth={1} />
              </div>
            </motion.div>
          </header>
        </div>
      </motion.div>

      {/* NEW SECTION: GLOBAL MAP */}
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="relative w-full bg-[#050508] py-32 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="text-[40px] md:text-[56px] font-bold tracking-[-0.03em] mb-4 text-white">Global Infrastructure.</h2>
            <p className="text-[19px] text-[#86868B] font-medium max-w-xl mx-auto">Running across 24 regions worldwide.</p>
          </motion.div>
          <motion.div variants={fadeUp} className="relative w-full h-[400px] rounded-[32px] overflow-hidden border border-white/10 bg-[#0A0A0C] group">
            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" alt="World Map" className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-[#000000]/50" />
            {[{ top: '40%', left: '20%', label: 'US-East' },{ top: '35%', left: '50%', label: 'EU-West' },{ top: '55%', left: '70%', label: 'Asia-Pacific' },{ top: '70%', left: '30%', label: 'SA-East' }].map((loc, i) => (
              <div key={i} className="absolute" style={{ top: loc.top, left: loc.left }}>
                <div className="relative flex h-4 w-4"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0A84FF] opacity-75"></span><span className="relative inline-flex rounded-full h-4 w-4 bg-[#0A84FF] shadow-[0_0_15px_#0A84FF]"></span></div>
                <p className="absolute top-6 left-1/2 -translate-x-1/2 text-[12px] font-mono text-white whitespace-nowrap">{loc.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* NEW SECTION: KEY METRICS */}
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="relative w-full bg-[#000000] py-32 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="text-[40px] md:text-[56px] font-bold tracking-[-0.03em] mb-4 text-white">Numbers that matter.</h2>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[{ value: '99.99', suffix: '%', label: 'Uptime SLA' },{ value: '50', suffix: 'ms', label: 'Avg Response' },{ value: '10', suffix: 'k+', label: 'Deployments' },{ value: '24', suffix: '/7', label: 'Support' }].map((stat, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} className="bg-gradient-to-b from-[#1C1C1E] to-[#0A0A0C] rounded-[24px] p-8 border border-[#2C2C2E] text-center">
                <p className="text-[48px] font-bold tracking-tighter text-white mb-2">{stat.value}<span className="text-[#0A84FF]">{stat.suffix}</span></p>
                <p className="text-[14px] font-medium text-[#86868B] uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* NEW SECTION: INTEGRATIONS */}
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="relative w-full bg-[#FBFBFD] text-[#1D1D1F] py-32 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="text-[40px] md:text-[56px] font-bold tracking-[-0.03em] mb-4">Works with everything.</h2>
            <p className="text-[19px] text-[#86868B] font-medium max-w-xl mx-auto">Seamlessly integrates with your entire stack.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['AWS', 'GCP', 'Azure', 'Kubernetes', 'Docker', 'GitHub', 'Slack', 'Datadog'].map((name, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} whileHover={{ y: -5, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }} className="bg-white rounded-[24px] p-8 border border-[#E5E5EA] flex flex-col items-center justify-center gap-4 cursor-pointer transition-all">
                <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center text-[24px] font-bold text-gray-400">{name[0]}</div>
                <span className="text-[16px] font-bold">{name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* NEW SECTION: CERTIFICATIONS */}
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="relative w-full bg-[#000000] py-32 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <h2 className="text-[40px] md:text-[56px] font-bold tracking-[-0.03em] mb-4 text-white">Enterprise Grade.</h2>
            <p className="text-[19px] text-[#86868B] font-medium max-w-xl mx-auto">Trusted by the world's most secure teams.</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['SOC2 Type II', 'ISO 27001', 'GDPR', 'HIPAA'].map((cert, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} className="bg-[#111111] rounded-[24px] p-8 border border-[#222] flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#30D158]/10 flex items-center justify-center"><ShieldCheck size={32} className="text-[#30D158]" /></div>
                <span className="text-[16px] font-bold text-white">{cert}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* SECTION 2: PURE WHITE (Quick Actions) */}
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="relative w-full bg-[#FBFBFD] text-[#1D1D1F] py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#00000010_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <motion.div variants={fadeUp} className="text-center mb-20">
            <h2 className="text-[40px] md:text-[56px] font-bold tracking-[-0.03em] mb-4">Start in seconds.</h2>
            <p className="text-[19px] text-[#86868B] font-medium max-w-xl mx-auto">Manage your entire DevOps pipeline right out of the box.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[{ title: 'View Live Logs', desc: 'Stream real-time events', icon: Terminal, color: 'text-[#0A84FF]', bg: 'bg-[#0A84FF]/10' },{ title: 'Deploy Service', desc: 'Push to production', icon: PlayCircle, color: 'text-[#5E5CE6]', bg: 'bg-[#5E5CE6]/10' },{ title: 'Run Playbook', desc: 'Execute auto-remediation', icon: ShieldCheck, color: 'text-[#30D158]', bg: 'bg-[#30D158]/10' },{ title: 'View Incidents', desc: 'Manage active alerts', icon: ShieldAlert, color: 'text-[#FF9F0A]', bg: 'bg-[#FF9F0A]/10' }].map((act, i) => (
              <motion.div key={i} variants={fadeUp} custom={i} whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)' }}
                className="bg-white rounded-[24px] p-8 border border-[#E5E5EA] cursor-pointer transition-all flex flex-col items-start relative group">
                <div className={`w-14 h-14 rounded-2xl ${act.bg} flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                  <act.icon size={28} className={act.color} strokeWidth={2} />
                </div>
                <h3 className="text-[18px] font-semibold mb-1">{act.title}</h3>
                <p className="text-[14px] text-[#86868B] font-medium">{act.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* SECTION 3: DARK VISUALS (Absolute Visibility) */}
      <div className="relative w-full bg-[#000000] py-32 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="text-center mb-20">
            <h2 className="text-[40px] md:text-[56px] font-bold tracking-[-0.03em] mb-4 text-white">Absolute Visibility.</h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { title: 'Logs Ingested', value: logsAnim.toLocaleString(), trend: '+12%', isUp: true, color: '#0A84FF', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop' },
              { title: 'Active Alerts', value: '33', trend: '-2', isUp: false, color: '#FF9F0A', img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=800&auto=format&fit=crop' },
              { title: 'Incidents', value: '1', trend: '-1', isUp: false, color: '#FF453A', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop' },
              { title: 'Anomalies', value: '2', trend: '+3', isUp: true, color: '#30D158', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay: i * 0.15, ease: appleEase }}
                whileHover={{ y: -10, scale: 1.02 }} className="relative rounded-[28px] p-8 cursor-pointer flex flex-col justify-between min-h-[220px] transition-all duration-500 group overflow-hidden border border-white/10 shadow-2xl">
                <div className="absolute inset-0 z-0">
                  <img src={stat.img} alt={stat.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent" />
                </div>
                <div className="relative z-20 flex flex-col h-full justify-between">
                  <div>
                    <p className="text-[15px] font-semibold text-white/70 mb-6 uppercase tracking-wider">{stat.title}</p>
                    <div className="flex items-end justify-between">
                      <p className="text-[48px] font-bold tracking-[-0.04em] leading-none text-white drop-shadow-2xl">{stat.value}</p>
                      <span className={`text-[14px] font-bold px-3 py-1.5 rounded-xl border backdrop-blur-md ${stat.isUp ? 'text-[#30D158] bg-[#30D158]/10 border-[#30D158]/30' : 'text-[#FF453A] bg-[#FF453A]/10 border-[#FF453A]/30'}`}>{stat.trend}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div variants={slideInLeft} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
              className="col-span-1 lg:col-span-2 bg-[#0A0A0C] rounded-[24px] p-8 border border-[#222] flex flex-col min-h-[380px] relative overflow-hidden group">
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#0A84FF 1px, transparent 1px), linear-gradient(90deg, #0A84FF 1px, transparent 1px)', backgroundSize: '40px 40px', transform: 'perspective(500px) rotateX(60deg) scale(2)', transformOrigin: 'bottom' }} />
              <div className="flex justify-between items-center mb-8 relative z-10">
                <div><h2 className="text-[22px] font-bold flex items-center gap-3 text-white drop-shadow-md"><Activity size={24} className="text-[#0A84FF]"/> Live Metrics</h2><p className="text-[14px] text-[#86868B] mt-1">Requests per second</p></div>
              </div>
              <div className="flex-grow relative w-full h-[220px] mt-4 z-10">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 200">
                  <defs><linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0A84FF" stopOpacity="0.6" /><stop offset="100%" stopColor="#0A84FF" stopOpacity="0" /></linearGradient></defs>
                  <motion.path initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.5 }} d="M 0,150 C 100,120 150,80 250,120 C 350,160 400,100 500,150 C 600,200 650,40 750,20 C 850,0 900,150 1000,140 L 1000,200 L 0,200 Z" fill="url(#areaGradient)" />
                  <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 2 }} d="M 0,150 C 100,120 150,80 250,120 C 350,160 400,100 500,150 C 600,200 650,40 750,20 C 850,0 900,150 1000,140" fill="none" stroke="#0A84FF" strokeWidth="4" className="drop-shadow-[0_0_20px_rgba(10,132,255,1)]" />
                </svg>
              </div>
            </motion.div>
            
            <motion.div variants={slideInRight} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
              className="col-span-1 bg-[#111111] rounded-[24px] p-8 border border-[#222] flex flex-col min-h-[380px] relative overflow-hidden">
              <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-[22px] font-bold flex items-center gap-3 text-white"><Globe size={24} className="text-[#FF453A]"/> Threat Feed</h2>
              </div>
              <div className="flex-grow flex flex-col space-y-3 relative z-10">
                {[{ ip: '192.168.1.1', type: 'Port Scan', time: '2m ago' },{ ip: '10.0.0.45', type: 'Data Poisoning', time: '15m ago' }].map((threat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.05]">
                    <div className="flex items-center gap-4">
                      <div className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF453A] opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF453A]"></span></div>
                      <div><p className="text-[15px] font-mono font-bold text-white">{threat.ip}</p><p className="text-[13px] text-[#86868B] mt-0.5">{threat.type}</p></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* SECTION 4: WHITE (Security, Compliance, Uptime) */}
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="relative w-full bg-[#FBFBFD] text-[#1D1D1F] py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <motion.div variants={fadeUp} className="text-center mb-20">
            <p className="text-[13px] font-bold tracking-[0.1em] text-[#0A84FF] uppercase mb-4 flex items-center justify-center gap-2"><Sparkles size={16} /> What it covers</p>
            <h2 className="text-[40px] md:text-[56px] font-bold tracking-[-0.03em] mb-4">Everything, end-to-end.</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} whileHover={{ y: -10 }}
              className="bg-white/90 backdrop-blur-2xl rounded-[32px] p-10 border border-[#E5E5EA] shadow-xl flex flex-col h-[420px] relative overflow-hidden group">
              <div className="flex justify-between items-center mb-6 relative z-10">
                <h2 className="text-[22px] font-semibold flex items-center gap-3"><ShieldCheck size={24} className="text-[#30D158]"/> Security</h2>
                <span className="text-[13px] font-bold text-[#30D158] bg-[#30D158]/10 px-4 py-1.5 rounded-full border border-[#30D158]/20">Grade A</span>
              </div>
              <div className="flex-grow relative flex items-center justify-center z-10">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="w-64 h-64 rounded-full border border-[#30D158]/20" />
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute w-48 h-48 rounded-full border border-dashed border-[#30D158]/40" />
                </div>
                <motion.div whileHover={{ scale: 1.1 }} className="relative w-24 h-24 bg-white rounded-[2rem] shadow-[0_10px_20px_rgba(48,209,88,0.2)] border border-[#E5E5EA] flex items-center justify-center">
                   <Shield size={48} className="text-[#30D158]" strokeWidth={1.5} />
                </motion.div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} whileHover={{ y: -10 }}
              className="bg-white/90 backdrop-blur-2xl rounded-[32px] p-10 border border-[#E5E5EA] shadow-xl flex flex-col h-[420px] relative overflow-hidden group">
              <h2 className="text-[22px] font-semibold flex items-center gap-3 mb-8 relative z-10"><Award size={24} className="text-[#0A84FF]"/> Compliance</h2>
              <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                {['SOC2', 'ISO 27001', 'GDPR', 'HIPAA'].map((cert, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.05 }} className="flex flex-col items-center justify-center gap-3 bg-white border border-[#E5E5EA] rounded-2xl p-5 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-[#30D158]/10 flex items-center justify-center"><CheckCircle2 size={22} className="text-[#30D158]" /></div>
                    <span className="text-[14px] font-bold text-[#1D1D1F]">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} whileHover={{ y: -10 }}
              className="bg-white/90 backdrop-blur-2xl rounded-[32px] p-10 border border-[#E5E5EA] shadow-xl flex flex-col h-[420px] relative overflow-hidden group">
              <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-[22px] font-semibold flex items-center gap-3"><Activity size={24} className="text-[#30D158]"/> Uptime</h2>
                <span className="text-[15px] font-bold text-[#30D158]">99.99%</span>
              </div>
              <div className="flex-grow relative z-10 flex items-end pb-4">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 50">
                  <defs><linearGradient id="uptimeGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#30D158" stopOpacity="0.4" /><stop offset="100%" stopColor="#30D158" stopOpacity="0" /></linearGradient></defs>
                  <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5 }} d="M 0,45 Q 10,42 20,45 T 40,40 T 60,42 T 80,15 T 100,20 L 100,50 L 0,50 Z" fill="url(#uptimeGradient)" />
                  <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5 }} d="M 0,45 Q 10,42 20,45 T 40,40 T 60,42 T 80,15 T 100,20" fill="none" stroke="#30D158" strokeWidth="2" />
                </svg>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* SECTION 5: DARK (AI, Terminal) */}
      <div className="relative w-full bg-[#000000] py-24 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="col-span-1 lg:col-span-2 bg-gradient-to-br from-[#1C1C1E] to-[#0A0A0C] rounded-[24px] p-8 border border-[#2C2C2E] relative overflow-hidden flex flex-col min-h-[300px] group">
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[#0A84FF]/20 flex items-center justify-center"><Sparkles size={24} className="text-[#0A84FF]" /></div>
                <div><h2 className="text-[20px] font-bold">AI Copilot</h2><p className="text-[14px] text-[#86868B]">Automated Root Cause Analysis</p></div>
              </div>
              <div className="bg-[#0A0A0C]/80 backdrop-blur-xl border border-[#2C2C2E] rounded-2xl p-6 relative z-10 flex-grow">
                <p className="text-[15px] leading-relaxed text-[#F5F5F7]"><span className="text-[#FF453A] font-bold">Alert:</span> Log Ingestion service is down on port 8000. <br/><br/><span className="text-[#0A84FF] font-bold">Analysis:</span> High memory usage caused a pod crash. <br/><br/><span className="text-[#30D158] font-bold">Suggestion:</span> Increase memory limit to 2GB and restart.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
              className="col-span-1 bg-[#111111] rounded-[24px] p-8 border border-[#222]">
              <h2 className="text-[20px] font-bold mb-8 flex items-center gap-3"><Users size={22} className="text-[#86868B]"/> Team Activity</h2>
              <div className="space-y-6">
                {[{ user: 'Aryan', action: 'deployed v2.0', time: '2m ago', avatar: 'AT', color: 'bg-[#0A84FF]' },{ user: 'John', action: 'resolved incident', time: '15m ago', avatar: 'JD', color: 'bg-[#FF9F0A]' }].map((act, i) => (
                  <div key={i} className="flex items-center gap-4"><div className={`w-10 h-10 rounded-full ${act.color} flex items-center justify-center text-[13px] font-bold text-white`}>{act.avatar}</div><div><p className="text-[15px] font-medium"><span className="font-bold text-white">{act.user}</span> <span className="text-[#86868B]">{act.action}</span></p><p className="text-[13px] text-[#86868B]">{act.time}</p></div></div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="w-full bg-[#0A0A0C] rounded-[24px] border border-[#2C2C2E] overflow-hidden shadow-2xl relative mb-8">
            <div className="flex items-center gap-2.5 px-5 py-4 bg-[#1C1C1E] border-b border-[#2C2C2E]">
              <div className="flex gap-2"><div className="w-3.5 h-3.5 rounded-full bg-[#FF453A]" /><div className="w-3.5 h-3.5 rounded-full bg-[#FF9F0A]" /><div className="w-3.5 h-3.5 rounded-full bg-[#30D158]" /></div>
              <span className="text-[14px] font-bold text-[#86868B] ml-2">Terminal</span>
            </div>
            <div className="p-6 font-mono text-[14px] leading-[1.8] h-[200px]">
              <p className="text-[#30D158]">$ aiops connect --cluster production</p>
              <p className="text-[#86868B] mt-1">Connecting securely...</p>
              <p className="text-[#0A84FF] mt-3">[INFO] Connected to 4 active nodes.</p>
              <p className="text-[#FF453A] mt-1">[ERROR] Log Ingestion (localhost:8000) is unreachable.</p>
              <p className="text-[#30D158] mt-4 flex items-center gap-1.5">$ <span className="w-2.5 h-5 bg-[#F5F5F7] animate-pulse inline-block" /></p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="w-full bg-[#111111] rounded-[24px] p-10 md:p-14 border border-[#222] flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 opacity-10 pointer-events-none"><ShieldCheck size={500} className="text-[#0A84FF]" strokeWidth={1} /></div>
            <div className="flex-1 relative z-10">
              <h2 className="text-[40px] font-bold tracking-[-0.03em] leading-tight mb-4">Full Pipeline Assurance.</h2>
              <p className="text-[18px] text-[#86868B] max-w-md mb-8 leading-relaxed font-medium">Every stage cryptographically verified — from contributor to output.</p>
              <div className="flex gap-4"><motion.button whileHover={{ scale: 1.03 }} className="flex items-center gap-2 px-7 py-3.5 bg-[#F5F5F7] text-black rounded-full text-[16px] font-bold">Download Report</motion.button></div>
            </div>
            <div className="flex-shrink-0 relative w-full md:w-[400px] h-[240px] bg-[#0A0A0C]/80 backdrop-blur-2xl rounded-2xl border border-[#222] p-7 flex flex-col justify-between shadow-2xl z-10">
              <div className="flex items-center gap-3"><ShieldCheck size={26} className="text-[#0A84FF]" strokeWidth={2} /><span className="text-[18px] font-bold">Assurance Certificate</span></div>
              <div className="space-y-3"><div className="h-2 w-full bg-[#222] rounded-full" /><div className="h-2 w-4/5 bg-[#222] rounded-full" /><div className="h-2 w-full bg-[#222] rounded-full" /></div>
              <p className="text-[13px] font-mono font-semibold text-[#86868B]">Signed: 0x8f3a...4b2c</p>
            </div>
          </motion.div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard
