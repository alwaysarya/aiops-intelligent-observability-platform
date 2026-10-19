import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Activity, Database, Clock, Network, ChevronRight, 
  ShieldAlert, ShieldCheck, Server, Terminal, Cpu, GitCommit, 
  Check, X, HelpCircle, Sparkles, Lock, ArrowRight, Globe, 
  MessageSquare, Users, Box, Zap, AlertCircle, Search, Command, FileText, CheckCircle2, Award,
  Upload, Play, Shield, PlayCircle, MonitorPlay, TrendingUp
} from 'lucide-react'

const appleEase = [0.16, 1, 0.3, 1]
const spring = { type: "spring", stiffness: 300, damping: 25 }

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.08, ease: appleEase } }),
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
      <div className="relative w-full overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div key={i} animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }} transition={{ duration: Math.random() * 5 + 5, repeat: Infinity, delay: Math.random() * 5 }}
            className="absolute w-1 h-1 bg-[#0A84FF] rounded-full blur-[1px]" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }} />
        ))}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#0A84FF]/[0.08] blur-[160px] rounded-full pointer-events-none z-0" />
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-24 md:py-32">
          <header className="relative flex flex-col lg:flex-row justify-between items-center mb-10 gap-12 lg:gap-8">
            <motion.div variants={fadeUp} initial="hidden" animate="show" className="flex-1 text-center lg:text-left z-10">
              <p className="text-[13px] font-semibold tracking-[0.06em] text-[#86868B] uppercase mb-5 flex items-center justify-center lg:justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-[#30D158] shadow-[0_0_15px_#30D158]" /> System Operational
              </p>
              <h1 className="text-[64px] md:text-[80px] font-bold tracking-[-0.04em] leading-none mb-6 bg-gradient-to-br from-white via-white to-[#86868B] bg-clip-text text-transparent drop-shadow-2xl">Overview.</h1>
              <p className="text-[24px] md:text-[28px] text-[#86868B] font-medium tracking-[-0.015em] max-w-lg mx-auto lg:mx-0">Real-time infrastructure intelligence. Designed for absolute scale.</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: appleEase }} className="flex-1 relative w-full max-w-[400px] lg:max-w-[500px] h-[300px] lg:h-[400px] flex items-center justify-center">
              <div className="relative w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-gradient-to-b from-[#1C1C1E] to-[#0A0A0C] shadow-[inset_0_0_40px_rgba(255,255,255,0.05),0_0_120px_rgba(10,132,255,0.4)] border border-white/10 flex items-center justify-center z-20">
                 <motion.div animate={{ rotateY: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border border-[#0A84FF]/50 border-t-[#0A84FF] opacity-60 shadow-[0_0_20px_#0A84FF]" />
                 <motion.div animate={{ rotateX: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-4 rounded-full border border-white/10 border-b-white/50 opacity-60" />
                 <Cpu size={64} className="text-[#0A84FF] drop-shadow-[0_0_25px_rgba(10,132,255,1)]" strokeWidth={1} />
              </div>
            </motion.div>
          </header>
        </div>
      </div>

      {/* SECTION 2: PURE WHITE (Quick Actions) */}
      <div className="relative w-full bg-[#FBFBFD] text-[#1D1D1F] py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#00000010_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: appleEase }} className="text-center mb-16">
            <h2 className="text-[40px] md:text-[48px] font-bold tracking-[-0.03em] mb-4">Start in seconds.</h2>
            <p className="text-[19px] text-[#86868B] font-medium max-w-xl mx-auto">Manage your entire DevOps pipeline right out of the box.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'View Live Logs', desc: 'Stream real-time events', icon: Terminal, color: 'text-[#0A84FF]', bg: 'bg-[#0A84FF]/10' },
              { title: 'Deploy Service', desc: 'Push to production', icon: PlayCircle, color: 'text-[#5E5CE6]', bg: 'bg-[#5E5CE6]/10' },
              { title: 'Run Playbook', desc: 'Execute auto-remediation', icon: ShieldCheck, color: 'text-[#30D158]', bg: 'bg-[#30D158]/10' },
              { title: 'View Incidents', desc: 'Manage active alerts', icon: ShieldAlert, color: 'text-[#FF9F0A]', bg: 'bg-[#FF9F0A]/10' },
            ].map((act, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1, ease: appleEase }}
                whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)' }}
                className="bg-white rounded-[24px] p-8 border border-[#E5E5EA] cursor-pointer transition-all flex flex-col items-start relative group">
                <div className={`absolute top-8 left-8 w-14 h-14 ${act.bg} blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className={`relative w-14 h-14 rounded-2xl ${act.bg} flex items-center justify-center mb-6 shadow-sm group-hover:shadow-md transition-shadow`}>
                  <act.icon size={28} className={act.color} strokeWidth={2} />
                </div>
                <h3 className="text-[18px] font-semibold mb-1">{act.title}</h3>
                <p className="text-[14px] text-[#86868B] font-medium">{act.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3: DARK VISUALS (Absolute Visibility) */}
      <div className="relative w-full bg-[#000000] py-32 overflow-hidden">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[200px] md:text-[300px] font-black text-white/[0.02] select-none pointer-events-none whitespace-nowrap">THREATS</div>
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="neural" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M0 50 L100 50 M50 0 L50 100" stroke="#0A84FF" strokeWidth="0.5" fill="none"/><circle cx="50" cy="50" r="2" fill="#0A84FF" /></pattern></defs><rect width="100%" height="100%" fill="url(#neural)" /></svg>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: appleEase }} className="text-center mb-20">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#FF453A]/10 mb-6 shadow-[0_0_50px_rgba(255,69,58,0.4)] border border-[#FF453A]/30 relative">
               <div className="absolute inset-0 rounded-full border border-[#FF453A]/50 animate-ping" />
               <Shield size={44} className="text-[#FF453A]" strokeWidth={1.5} />
            </div>
            <h2 className="text-[40px] md:text-[56px] font-bold tracking-[-0.03em] mb-4 text-white">Absolute Visibility.</h2>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              { title: 'Logs Ingested', value: logsAnim.toLocaleString(), trend: '+12%', isUp: true, color: '#0A84FF', img: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop' },
              { title: 'Active Alerts', value: '33', trend: '-2', isUp: false, color: '#FF9F0A', img: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=800&auto=format&fit=crop' },
              { title: 'Incidents', value: '1', trend: '-1', isUp: false, color: '#FF453A', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop' },
              { title: 'Anomalies', value: '2', trend: '+3', isUp: true, color: '#30D158', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.6, delay: i * 0.1, ease: appleEase }}
                whileHover={{ y: -10, scale: 1.02 }} className="relative rounded-[28px] p-8 cursor-pointer flex flex-col justify-between min-h-[220px] transition-all duration-500 group overflow-hidden border border-white/10 shadow-2xl">
                <div className="absolute inset-0 z-0">
                  <img src={stat.img} alt={stat.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent" />
                  <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500 mix-blend-overlay" style={{ background: stat.color }} />
                </div>
                <div className="absolute top-0 left-0 w-full h-[2px] z-20 transition-all duration-500 group-hover:h-[4px]" style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }} />
                <div className="relative z-20 flex flex-col h-full justify-between">
                  <div>
                    <p className="text-[15px] font-semibold text-white/70 mb-6 uppercase tracking-wider">{stat.title}</p>
                    <div className="flex items-end justify-between">
                      <p className="text-[48px] font-bold tracking-[-0.04em] leading-none text-white drop-shadow-2xl group-hover:scale-105 origin-left transition-transform duration-300">{stat.value}</p>
                      <span className={`text-[14px] font-bold px-3 py-1.5 rounded-xl border backdrop-blur-md ${stat.isUp ? 'text-[#30D158] bg-[#30D158]/10 border-[#30D158]/30' : 'text-[#FF453A] bg-[#FF453A]/10 border-[#FF453A]/30'}`}>{stat.trend}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] rounded-full blur-[2px] opacity-50 group-hover:opacity-100 group-hover:w-full transition-all duration-500 z-20" style={{ background: stat.color }} />
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: appleEase }}
              className="col-span-1 lg:col-span-2 bg-[#0A0A0C] rounded-[24px] p-8 border border-[#222] flex flex-col min-h-[380px] relative overflow-hidden group shadow-[inset_0_0_50px_rgba(10,132,255,0.05)]">
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#0A84FF 1px, transparent 1px), linear-gradient(90deg, #0A84FF 1px, transparent 1px)', backgroundSize: '40px 40px', transform: 'perspective(500px) rotateX(60deg) scale(2)', transformOrigin: 'bottom' }} />
              <motion.div animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} className="absolute left-0 right-0 h-[2px] bg-[#0A84FF] shadow-[0_0_20px_#0A84FF] opacity-50 z-0" />
              <div className="flex justify-between items-center mb-8 relative z-10">
                <div><h2 className="text-[22px] font-bold flex items-center gap-3 text-white drop-shadow-md"><Activity size={24} className="text-[#0A84FF]"/> Live Metrics</h2><p className="text-[14px] text-[#86868B] mt-1">Requests per second (last 60 mins)</p></div>
                <div className="w-3 h-3 rounded-full bg-[#0A84FF] shadow-[0_0_15px_#0A84FF] animate-pulse" />
              </div>
              <div className="flex-grow relative w-full h-[220px] mt-4 z-10">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 200">
                  <defs><linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#0A84FF" stopOpacity="0.6" /><stop offset="100%" stopColor="#0A84FF" stopOpacity="0" /></linearGradient><linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#0A84FF" /><stop offset="50%" stopColor="#5E5CE6" /><stop offset="100%" stopColor="#0A84FF" /></linearGradient></defs>
                  <motion.path initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.5 }} d="M 0,150 C 100,120 150,80 250,120 C 350,160 400,100 500,150 C 600,200 650,40 750,20 C 850,0 900,150 1000,140 L 1000,200 L 0,200 Z" fill="url(#areaGradient)" />
                  <motion.path initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} transition={{ duration: 2, ease: "easeInOut" }} d="M 0,150 C 100,120 150,80 250,120 C 350,160 400,100 500,150 C 600,200 650,40 750,20 C 850,0 900,150 1000,140" fill="none" stroke="url(#lineGradient)" strokeWidth="4" className="drop-shadow-[0_0_20px_rgba(10,132,255,1)]" />
                  <motion.circle initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 1.5, type: "spring" }} cx="750" cy="20" r="6" fill="#fff" className="drop-shadow-[0_0_15px_#0A84FF]" />
                </svg>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3, ease: appleEase }}
              className="col-span-1 bg-gradient-to-b from-[#1A0A0A] to-[#0A0A0C] rounded-[24px] p-8 border border-[#FF453A]/20 flex flex-col min-h-[380px] relative overflow-hidden group shadow-[inset_0_0_50px_rgba(255,69,58,0.05)]">
              <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none perspective-[1000px]">
                 <motion.div animate={{ rotateX: 60, rotateZ: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="w-[400px] h-[400px] rounded-full border border-[#FF453A] shadow-[0_0_30px_rgba(255,69,58,0.4)] relative">
                    <div className="absolute inset-10 border border-[#FF453A]/50 rounded-full" /><div className="absolute inset-20 border border-[#FF453A]/30 rounded-full" /><div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#FF453A]/50" /><div className="absolute top-0 left-1/2 w-[1px] h-full bg-[#FF453A]/50" /><div className="absolute top-1/4 left-1/4 w-2 h-2 bg-[#FF453A] rounded-full shadow-[0_0_10px_#FF453A]" /><div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-[#FF453A] rounded-full shadow-[0_0_10px_#FF453A]" />
                 </motion.div>
              </div>
              <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-[22px] font-bold flex items-center gap-3 text-white"><Globe size={24} className="text-[#FF453A]"/> Threat Feed</h2>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#FF453A] bg-[#FF453A]/10 px-2.5 py-1 rounded-full border border-[#FF453A]/20"><span className="w-1.5 h-1.5 rounded-full bg-[#FF453A] animate-ping"/> LIVE</span>
              </div>
              <div className="flex-grow flex flex-col space-y-3 relative z-10">
                {[{ ip: '192.168.1.1', type: 'Port Scan', time: '2m ago' },{ ip: '10.0.0.45', type: 'Data Poisoning', time: '15m ago' },{ ip: '172.16.0.8', type: 'Model Tampering', time: '32m ago' }].map((threat, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.05] hover:border-[#FF453A]/50 hover:bg-[#FF453A]/5 transition-all group/item shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-default">
                    <div className="flex items-center gap-4"><div className="relative flex h-4 w-4 items-center justify-center"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF453A] opacity-40"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF453A] shadow-[0_0_10px_#FF453A]"></span></div>
                      <div><p className="text-[15px] font-mono font-bold text-white group-hover/item:text-[#FF453A] transition-colors">{threat.ip}</p><p className="text-[13px] text-[#86868B] mt-0.5">{threat.type}</p></div></div>
                    <span className="text-[11px] font-bold text-[#FF453A]/70">{threat.time}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* UPGRADED SECTION 4: PURE WHITE (Security, Compliance, Uptime) */}
      {/* ========================================================= */}
      <div className="relative w-full bg-[#FBFBFD] text-[#1D1D1F] py-32 overflow-hidden">
        
        {/* Background Grid & Ambient Glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#0A84FF]/[0.03] blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: appleEase }} className="text-center mb-20">
            <p className="text-[13px] font-bold tracking-[0.1em] text-[#0A84FF] uppercase mb-4 flex items-center justify-center gap-2"><Sparkles size={16} /> What it covers</p>
            <h2 className="text-[40px] md:text-[56px] font-bold tracking-[-0.03em] mb-4">Everything, end-to-end.</h2>
            <p className="text-[19px] text-[#86868B] font-medium max-w-xl mx-auto">Absolute protection across every layer of your infrastructure.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Security Card - 3D Hexagon Shield & Rings */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} whileHover={{ y: -10, boxShadow: '0 40px 80px -20px rgba(0,0,0,0.1)' }}
              className="bg-white/90 backdrop-blur-2xl rounded-[32px] p-10 border border-[#E5E5EA] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-[420px] relative overflow-hidden group transition-all">
              
              <div className="flex justify-between items-center mb-6 relative z-10">
                <h2 className="text-[22px] font-semibold flex items-center gap-3"><ShieldCheck size={24} className="text-[#30D158]"/> Security</h2>
                <span className="text-[13px] font-bold text-[#30D158] bg-[#30D158]/10 px-4 py-1.5 rounded-full border border-[#30D158]/20">Grade A</span>
              </div>
              
              <div className="flex-grow relative flex items-center justify-center z-10">
                
                {/* Glowing Background Rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="w-64 h-64 rounded-full border border-[#30D158]/20 shadow-[0_0_40px_rgba(48,209,88,0.1)]" />
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute w-48 h-48 rounded-full border border-dashed border-[#30D158]/40" />
                  <div className="absolute w-32 h-32 rounded-full bg-[#30D158]/10 blur-xl" />
                </div>
                
                {/* 3D Hexagon Shield Center */}
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={spring} className="relative w-24 h-24 bg-gradient-to-b from-white to-[#F5F5F7] rounded-[2rem] shadow-[0_10px_20px_rgba(48,209,88,0.2),inset_0_-4px_8px_rgba(0,0,0,0.05)] border border-[#E5E5EA] flex items-center justify-center">
                   <Shield size={48} className="text-[#30D158] drop-shadow-sm" strokeWidth={1.5} />
                </motion.div>

              </div>
            </motion.div>

            {/* Compliance Card - 3D Glass Buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} whileHover={{ y: -10, boxShadow: '0 40px 80px -20px rgba(0,0,0,0.1)' }}
              className="bg-white/90 backdrop-blur-2xl rounded-[32px] p-10 border border-[#E5E5EA] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-[420px] relative overflow-hidden group transition-all">
              
              <h2 className="text-[22px] font-semibold flex items-center gap-3 mb-8 relative z-10"><Award size={24} className="text-[#0A84FF]"/> Compliance</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-8 relative z-10">
                {['SOC2', 'ISO 27001', 'GDPR', 'HIPAA'].map((cert, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.05, y: -2 }} className="flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-white to-[#F9F9FB] border border-[#E5E5EA] rounded-2xl p-5 shadow-[0_4px_10px_rgba(0,0,0,0.03),inset_0_-2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all cursor-default">
                    <div className="w-10 h-10 rounded-full bg-[#30D158]/10 flex items-center justify-center"><CheckCircle2 size={22} className="text-[#30D158]" /></div>
                    <span className="text-[14px] font-bold text-[#1D1D1F]">{cert}</span>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-auto relative z-10">
                <div className="h-2 w-full bg-[#E5E5EA] rounded-full overflow-hidden shadow-inner">
                   <motion.div initial={{ width: 0 }} whileInView={{ width: '100%' }} viewport={{ once: true }} transition={{ duration: 1.5, delay: 0.5 }} className="h-full bg-gradient-to-r from-[#0A84FF] to-[#5E5CE6] rounded-full" />
                </div>
                <p className="text-[12px] font-medium text-[#86868B] mt-3 text-center">All certifications up to date</p>
              </div>
            </motion.div>

            {/* Uptime Card - 3D Glowing Area Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} whileHover={{ y: -10, boxShadow: '0 40px 80px -20px rgba(0,0,0,0.1)' }}
              className="bg-white/90 backdrop-blur-2xl rounded-[32px] p-10 border border-[#E5E5EA] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col h-[420px] relative overflow-hidden group transition-all">
              
              <div className="flex justify-between items-center mb-8 relative z-10">
                <h2 className="text-[22px] font-semibold flex items-center gap-3"><Activity size={24} className="text-[#30D158]"/> Uptime</h2>
                <span className="text-[15px] font-bold text-[#30D158] bg-[#30D158]/10 px-4 py-1.5 rounded-full border border-[#30D158]/20">99.99%</span>
              </div>
              
              <div className="flex-grow relative z-10 flex items-end pb-4">
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 50">
                  <defs>
                    <linearGradient id="uptimeGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#30D158" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#30D158" stopOpacity="0" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <motion.path 
                    initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: appleEase }}
                    d="M 0,45 Q 10,42 20,45 T 40,40 T 60,42 T 80,15 T 100,20 L 100,50 L 0,50 Z" 
                    fill="url(#uptimeGradient)" 
                  />
                  <motion.path 
                    initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5, ease: appleEase }}
                    d="M 0,45 Q 10,42 20,45 T 40,40 T 60,42 T 80,15 T 100,20" 
                    fill="none" stroke="#30D158" strokeWidth="2" filter="url(#glow)" strokeLinecap="round"
                  />
                  {/* Glowing Data Point */}
                  <motion.circle initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ delay: 1.2, type: "spring" }} cx="80" cy="15" r="3" fill="#fff" stroke="#30D158" strokeWidth="1.5" className="drop-shadow-[0_0_8px_#30D158]" />
                </svg>
              </div>
              
              <div className="flex justify-between items-center pt-4 border-t border-[#E5E5EA] relative z-10">
                <span className="text-[12px] font-bold text-[#86868B]">30 DAYS AGO</span>
                <span className="text-[12px] font-bold text-[#86868B]">TODAY</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* SECTION 5: DARK (AI, Terminal, Infra with Matrix Effect) */}
      <div className="relative w-full bg-[#000000] py-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[300px] font-black text-white/[0.02] select-none pointer-events-none whitespace-nowrap">AIOPS</div>
        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="col-span-1 lg:col-span-2 bg-gradient-to-br from-[#1C1C1E] to-[#0A0A0C] rounded-[24px] p-8 border border-[#2C2C2E] relative overflow-hidden flex flex-col min-h-[300px] group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A84FF]/10 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-[2000ms] ease-linear pointer-events-none" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0A84FF]/20 blur-[80px] rounded-full pointer-events-none" />
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-[#0A84FF]/20 flex items-center justify-center shadow-[0_0_20px_rgba(10,132,255,0.4)]"><Sparkles size={24} className="text-[#0A84FF]" /></div>
                <div><h2 className="text-[20px] font-bold tracking-[-0.02em]">AI Copilot</h2><p className="text-[14px] text-[#86868B]">Automated Root Cause Analysis</p></div>
              </div>
              <div className="bg-[#0A0A0C]/80 backdrop-blur-xl border border-[#2C2C2E] rounded-2xl p-6 relative z-10 flex-grow">
                <p className="text-[15px] leading-relaxed text-[#F5F5F7]"><span className="text-[#FF453A] font-bold">Alert:</span> Log Ingestion service is down on port 8000. <br/><br/><span className="text-[#0A84FF] font-bold">Analysis:</span> High memory usage caused a pod crash. Auto-scaling failed due to quota limits. <br/><br/><span className="text-[#30D158] font-bold">Suggestion:</span> Increase memory limit to 2GB and restart the service.</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
              className="col-span-1 bg-[#111111] rounded-[24px] p-8 border border-[#222]">
              <h2 className="text-[20px] font-bold tracking-[-0.02em] flex items-center gap-3 mb-8"><Users size={22} className="text-[#86868B]" strokeWidth={2}/> Team Activity</h2>
              <div className="space-y-6">
                {[{ user: 'Aryan', action: 'deployed v2.0', time: '2m ago', avatar: 'AT', color: 'bg-[#0A84FF]' },{ user: 'John', action: 'resolved INC-4092', time: '15m ago', avatar: 'JD', color: 'bg-[#FF9F0A]' },{ user: 'Sarah', action: 'updated policy', time: '1h ago', avatar: 'SM', color: 'bg-[#30D158]' }].map((act, i) => (
                  <div key={i} className="flex items-center gap-4 group"><div className={`w-10 h-10 rounded-full ${act.color} flex items-center justify-center text-[13px] font-bold text-white shadow-lg group-hover:scale-110 transition-transform`}>{act.avatar}</div><div className="flex-grow"><p className="text-[15px] font-medium"><span className="font-bold text-white">{act.user}</span> <span className="text-[#86868B]">{act.action}</span></p><p className="text-[13px] text-[#86868B]">{act.time}</p></div></div>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              className="col-span-1 lg:col-span-2 bg-[#0A0A0C] rounded-[24px] border border-[#2C2C2E] overflow-hidden flex flex-col shadow-2xl relative">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
              <div className="flex items-center gap-2.5 px-5 py-4 bg-[#1C1C1E] border-b border-[#2C2C2E] relative z-10">
                <div className="flex gap-2"><div className="w-3.5 h-3.5 rounded-full bg-[#FF453A]" /><div className="w-3.5 h-3.5 rounded-full bg-[#FF9F0A]" /><div className="w-3.5 h-3.5 rounded-full bg-[#30D158]" /></div><span className="text-[14px] font-bold tracking-wide text-[#86868B] ml-2">Terminal</span>
              </div>
              <div className="p-6 font-mono text-[14px] leading-[1.8] h-[240px] relative z-10">
                <p className="text-[#30D158]">$ aiops connect --cluster production</p><p className="text-[#86868B] mt-1">Connecting securely...</p><p className="text-[#0A84FF] mt-3">[INFO] Connected to 4 active nodes.</p><p className="text-[#FF453A] mt-1">[ERROR] Log Ingestion (localhost:8000) is unreachable.</p><p className="text-[#F5F5F7] mt-1">[INFO] AI Engine scanning for anomalies.</p><p className="text-[#30D158] mt-4 flex items-center gap-1.5">$ <span className="w-2.5 h-5 bg-[#F5F5F7] animate-pulse inline-block" /></p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
              className="col-span-1 bg-[#111111] rounded-[24px] p-8 border border-[#222]">
              <h2 className="text-[20px] font-bold tracking-[-0.02em] flex items-center gap-3 mb-6"><HelpCircle size={22} className="text-[#86868B]" strokeWidth={2}/> Resources</h2>
              <div className="space-y-2">
                {['Documentation', 'API Reference', 'Community Support'].map((item, i) => (
                  <motion.a key={i} href="#" whileHover={{ x: 6, backgroundColor: '#222' }} transition={spring} className="flex items-center justify-between py-4 border-b border-[#222] last:border-0 group rounded-lg px-3 -mx-3"><span className="text-[16px] font-semibold tracking-[-0.01em] text-[#F5F5F7]">{item}</span><ChevronRight size={20} className="text-[#86868B] group-hover:text-[#F5F5F7] transition-colors" strokeWidth={2} /></motion.a>
                ))}
              </div>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="w-full bg-[#111111] rounded-[24px] p-10 md:p-14 border border-[#222] flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 opacity-10 pointer-events-none"><ShieldCheck size={500} className="text-[#0A84FF]" strokeWidth={1} /></div>
            <div className="flex-1 relative z-10">
              <h2 className="text-[40px] font-bold tracking-[-0.03em] leading-tight mb-4">Full Pipeline Assurance.</h2>
              <p className="text-[18px] text-[#86868B] max-w-md mb-8 leading-relaxed font-medium">Every stage cryptographically verified — from contributor to output. Generate an exportable PDF with embedded cryptographic signatures.</p>
              <div className="flex gap-4"><motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={spring} className="flex items-center gap-2 px-7 py-3.5 bg-[#F5F5F7] text-black rounded-full text-[16px] font-bold tracking-[-0.01em] shadow-[0_0_20px_rgba(255,255,255,0.2)]">Download Report</motion.button></div>
            </div>
            <div className="flex-shrink-0 relative w-full md:w-[400px] h-[240px] bg-[#0A0A0C]/80 backdrop-blur-2xl rounded-2xl border border-[#222] p-7 flex flex-col justify-between shadow-2xl z-10 hover:border-[#0A84FF]/50 transition-colors">
              <div className="flex items-center gap-3"><ShieldCheck size={26} className="text-[#0A84FF]" strokeWidth={2} /><span className="text-[18px] font-bold tracking-[-0.01em]">Assurance Certificate</span></div>
              <div className="space-y-3"><div className="h-2 w-full bg-[#222] rounded-full" /><div className="h-2 w-4/5 bg-[#222] rounded-full" /><div className="h-2 w-full bg-[#222] rounded-full" /><div className="h-2 w-3/5 bg-[#222] rounded-full" /></div>
              <p className="text-[13px] font-mono font-semibold text-[#86868B]">Signed: 0x8f3a...4b2c</p>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .animate-spin-slow { animation: spin 8s linear infinite; }
        .animate-reverse-spin { animation: spin 10s linear infinite reverse; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

export default Dashboard
