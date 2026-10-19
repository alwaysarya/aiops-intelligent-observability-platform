import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Activity, Database, Clock, Network, ChevronRight, 
  ShieldAlert, ShieldCheck, Server, Terminal, Cpu, GitCommit, 
  Check, X, HelpCircle, Sparkles, Lock, ArrowRight
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
  const [logs, setLogs] = useState(13840)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
      setLogs(prev => prev + Math.floor(Math.random() * 3))
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  const logsAnim = useAnimatedNumber(logs)

  return (
    <div className="w-full min-h-screen bg-[#000000] text-[#F5F5F7] font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Display','SF_Pro_Text','Helvetica_Neue',sans-serif] selection:bg-[#2997FF]/30 overflow-x-hidden antialiased">
      
      {/* Background Deep Glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#0A84FF]/[0.03] blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#30D158]/[0.02] blur-[150px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 py-16 md:py-24">
        
        {/* Apple-style Hero Section with Visual */}
        <header className="flex flex-col items-center justify-center text-center mb-24 gap-8 relative">
          
          {/* Animated Core Visual */}
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] opacity-20 pointer-events-none"
          >
            <div className="absolute inset-0 border-[1px] border-white/20 rounded-full" />
            <div className="absolute inset-8 border-[1px] border-white/10 rounded-full" />
            <div className="absolute inset-16 border-[1px] border-white/5 rounded-full" />
            <div className="absolute top-0 left-1/2 w-3 h-3 bg-[#0A84FF] rounded-full blur-[2px]" />
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" className="relative z-10">
            <p className="text-[12px] font-semibold tracking-[0.05em] text-[#86868B] uppercase mb-6 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#30D158] shadow-[0_0_10px_#30D158]" /> System Operational
            </p>
            <h1 className="text-[64px] md:text-[88px] font-bold tracking-[-0.04em] leading-[1.05] mb-6">
              Overview.
            </h1>
            <p className="text-[24px] md:text-[28px] text-[#86868B] font-medium tracking-[-0.01em] max-w-2xl mx-auto">
              Real-time infrastructure intelligence. <br className="hidden md:block" />
              <span className="text-white/60">Designed for scale.</span>
            </p>
          </motion.div>
          
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={spring} 
            className="relative z-10 flex items-center gap-2.5 bg-[#1C1C1E]/80 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 cursor-default shadow-2xl">
            <Clock size={18} className="text-[#86868B]" strokeWidth={2} />
            <span className="text-[16px] font-semibold tracking-[-0.01em]">{time} Local</span>
          </motion.div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { title: 'Logs Ingested', value: logsAnim.toLocaleString(), trend: '+12%', isUp: true },
            { title: 'Active Alerts', value: '33', trend: '-2', isUp: false },
            { title: 'Incidents', value: '1', trend: '-1', isUp: false },
            { title: 'Anomalies', value: '2', trend: '+3', isUp: true },
          ].map((stat, i) => (
            <motion.div key={i} variants={fadeUp} initial="hidden" animate="show" custom={i + 2} 
              whileHover={{ scale: 1.02, backgroundColor: '#232326' }} whileTap={{ scale: 0.98 }} transition={spring}
              className="bg-[#1C1C1E] rounded-[24px] p-8 border border-[#2C2C2E] cursor-pointer flex flex-col justify-between min-h-[160px]">
              <p className="text-[15px] font-semibold text-[#86868B] mb-4">{stat.title}</p>
              <div className="flex items-end justify-between">
                <p className="text-[44px] font-bold tracking-[-0.03em] leading-none">{stat.value}</p>
                <span className={`text-[15px] font-bold tracking-[-0.01em] ${stat.isUp ? 'text-[#30D158]' : 'text-[#FF453A]'}`}>
                  {stat.trend}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* NEW: Premium Feature Visual (Image style) */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} 
          className="relative w-full h-[400px] rounded-[32px] overflow-hidden mb-6 border border-[#2C2C2E] bg-gradient-to-br from-[#1C1C1E] to-[#0A0A0C] flex items-center justify-center group cursor-pointer">
          
          {/* Parallax Glow Background */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-1000 ease-out mix-blend-luminosity" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/50 to-transparent" />
          
          <div className="relative z-10 text-center px-6 max-w-2xl">
            <Sparkles size={32} className="text-[#0A84FF] mx-auto mb-4" />
            <h3 className="text-[40px] md:text-[48px] font-bold tracking-[-0.03em] leading-tight mb-4">
              Intelligence at the edge.
            </h3>
            <p className="text-[18px] text-[#86868B] font-medium leading-relaxed mb-8">
              Our AI engine processes millions of events per second to detect anomalies before they become incidents.
            </p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-3 bg-white text-black rounded-full font-bold text-[15px] flex items-center gap-2 mx-auto">
              Learn more <ArrowRight size={16} />
            </motion.button>
          </div>
        </motion.div>

        {/* Infrastructure & Active Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} 
            className="bg-[#1C1C1E] rounded-[24px] p-8 border border-[#2C2C2E]">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-[20px] font-bold tracking-[-0.02em] flex items-center gap-3"><Server size={22} className="text-[#86868B]" strokeWidth={2}/> Infrastructure</h2>
              <span className="text-[14px] font-semibold bg-[#2C2C2E] px-4 py-1.5 rounded-full">3/4 Online</span>
            </div>
            <div className="space-y-2">
              {[
                { name: 'Log Ingestion', port: '8000', status: 'Down', color: 'text-[#FF453A]', dot: 'bg-[#FF453A]' },
                { name: 'AI Anomaly Detector', port: '8001', status: 'Healthy', color: 'text-[#30D158]', dot: 'bg-[#30D158]' },
                { name: 'Alert Service', port: '8002', status: 'Healthy', color: 'text-[#30D158]', dot: 'bg-[#30D158]' },
                { name: 'Root Cause Analyzer', port: '8003', status: 'Healthy', color: 'text-[#30D158]', dot: 'bg-[#30D158]' },
              ].map((svc, i) => (
                <motion.div key={i} whileHover={{ x: 6 }} transition={spring} className="flex items-center justify-between py-4 border-b border-[#2C2C2E] last:border-0 cursor-default">
                  <div className="flex items-center gap-4">
                    <span className={`w-2.5 h-2.5 rounded-full ${svc.dot}`} />
                    <p className="text-[16px] font-semibold tracking-[-0.01em]">{svc.name}</p>
                  </div>
                  <div className="flex items-center gap-5">
                    <span className="text-[14px] font-mono text-[#86868B]">:{svc.port}</span>
                    <span className={`text-[15px] font-bold ${svc.color}`}>{svc.status}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} 
            className="bg-[#1C1C1E] rounded-[24px] p-8 border border-[#2C2C2E]">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-[20px] font-bold tracking-[-0.02em] flex items-center gap-3"><ShieldAlert size={22} className="text-[#86868B]" strokeWidth={2}/> Active Events</h2>
              <span className="text-[14px] font-semibold bg-[#FF453A]/15 text-[#FF453A] px-4 py-1.5 rounded-full">5 Open</span>
            </div>
            <div className="space-y-2">
              {[
                { title: 'Data Poisoning Attack', time: '29m ago', severity: 'HIGH', color: 'text-[#FF9F0A]' },
                { title: 'Model Tampering Attack', time: '50m ago', severity: 'CRITICAL', color: 'text-[#FF453A]' },
                { title: 'Audit Log Tampering', time: '38m ago', severity: 'HIGH', color: 'text-[#FF9F0A]' },
                { title: 'Inference Manipulation', time: '21m ago', severity: 'CRITICAL', color: 'text-[#FF453A]' },
              ].map((ev, i) => (
                <motion.div key={i} whileHover={{ x: 6 }} transition={spring} className="flex items-center justify-between py-4 border-b border-[#2C2C2E] last:border-0 cursor-default">
                  <div>
                    <p className="text-[16px] font-semibold tracking-[-0.01em]">{ev.title}</p>
                    <p className="text-[14px] font-medium text-[#86868B] mt-1">Detected {ev.time}</p>
                  </div>
                  <span className={`text-[13px] font-bold tracking-[0.02em] ${ev.color}`}>{ev.severity}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Topology */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} 
            whileHover={{ scale: 1.02, backgroundColor: '#232326' }} transition={spring}
            className="bg-[#1C1C1E] rounded-[24px] p-8 border border-[#2C2C2E] flex flex-col h-[320px] cursor-pointer">
            <h2 className="text-[20px] font-bold tracking-[-0.02em] flex items-center gap-3 mb-8"><Network size={22} className="text-[#86868B]" strokeWidth={2}/> Topology</h2>
            <div className="flex-grow relative flex items-center justify-center">
              <div className="absolute w-full h-[2px] bg-[#2C2C2E]" />
              <div className="absolute flex gap-14 items-center">
                <motion.div whileHover={{ scale: 1.1 }} className="w-12 h-12 rounded-full bg-[#2C2C2E] border border-[#3A3A3C] flex items-center justify-center z-10">
                  <Database size={20} className="text-[#86868B]" strokeWidth={2} />
                </motion.div>
                <motion.div animate={{ boxShadow: ['0 0 0 0 rgba(10,132,255,0)', '0 0 0 12px rgba(10,132,255,0.1)', '0 0 0 0 rgba(10,132,255,0)'] }} transition={{ duration: 2.5, repeat: Infinity }} className="w-20 h-20 rounded-full bg-[#1C1C1E] border-[3px] border-[#0A84FF] flex items-center justify-center z-10">
                  <Activity size={30} className="text-[#0A84FF]" strokeWidth={2} />
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} className="w-12 h-12 rounded-full bg-[#2C2C2E] border border-[#3A3A3C] flex items-center justify-center z-10">
                  <ShieldCheck size={20} className="text-[#86868B]" strokeWidth={2} />
                </motion.div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6 pt-5 border-t border-[#2C2C2E]">
              <span className="text-[14px] font-medium text-[#86868B]">AI Engine active</span>
              <span className="text-[14px] font-bold text-[#30D158]">14ms latency</span>
            </div>
          </motion.div>

          {/* Recent Deployments */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} 
            className="bg-[#1C1C1E] rounded-[24px] p-8 border border-[#2C2C2E] flex flex-col h-[320px]">
            <h2 className="text-[20px] font-bold tracking-[-0.02em] flex items-center gap-3 mb-8"><GitCommit size={22} className="text-[#86868B]" strokeWidth={2}/> Recent Deployments</h2>
            <div className="space-y-5 overflow-y-auto pr-2 flex-grow custom-scrollbar">
              {[
                { msg: 'Fix memory leak in ingester', time: '2m ago', success: true },
                { msg: 'Update dependencies', time: '2h ago', success: false },
                { msg: 'Anomaly detection v2.0', time: '4h ago', success: true },
              ].map((dep, i) => (
                <motion.div key={i} whileHover={{ x: 4 }} transition={spring} className="flex items-start gap-4 cursor-default">
                  <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${dep.success ? 'bg-[#30D158]/15 text-[#30D158]' : 'bg-[#FF453A]/15 text-[#FF453A]'}`}>
                    {dep.success ? <Check size={14} strokeWidth={3} /> : <X size={14} strokeWidth={3} />}
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold tracking-[-0.01em] leading-tight">{dep.msg}</p>
                    <p className="text-[14px] font-medium text-[#86868B] mt-1">{dep.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Resource Limits */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} 
            className="bg-[#1C1C1E] rounded-[24px] p-8 border border-[#2C2C2E] flex flex-col h-[320px]">
            <h2 className="text-[20px] font-bold tracking-[-0.02em] flex items-center gap-3 mb-8"><Cpu size={22} className="text-[#86868B]" strokeWidth={2}/> Resource Limits</h2>
            <div className="space-y-8 flex-grow flex flex-col justify-center">
              {[
                { name: 'API Requests', val: 84, color: 'bg-[#0A84FF]' },
                { name: 'Log Storage', val: 90, color: 'bg-[#FF453A]' },
                { name: 'AI Compute', val: 32, color: 'bg-[#30D158]' },
              ].map((q, i) => (
                <div key={i}>
                  <div className="flex justify-between items-end mb-3">
                    <span className="text-[15px] font-semibold text-[#F5F5F7] tracking-[-0.01em]">{q.name}</span>
                    <span className="text-[14px] font-semibold text-[#86868B]">{q.val}%</span>
                  </div>
                  <div className="h-2 w-full bg-[#2C2C2E] rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${q.val}%` }} viewport={{ once: true }} transition={{ duration: 1.2, delay: 0.4, ease: appleEase }} className={`h-full ${q.color} rounded-full`} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Terminal & Resources */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} 
            className="col-span-1 lg:col-span-2 bg-[#0A0A0C] rounded-[24px] border border-[#2C2C2E] overflow-hidden flex flex-col shadow-2xl">
            <div className="flex items-center gap-2.5 px-5 py-4 bg-[#1C1C1E] border-b border-[#2C2C2E]">
              <div className="flex gap-2">
                <div className="w-3.5 h-3.5 rounded-full bg-[#FF453A]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#FF9F0A]" />
                <div className="w-3.5 h-3.5 rounded-full bg-[#30D158]" />
              </div>
              <span className="text-[14px] font-bold tracking-wide text-[#86868B] ml-2">Terminal</span>
            </div>
            <div className="p-6 font-mono text-[14px] leading-[1.8] h-[240px]">
              <p className="text-[#30D158]">$ aiops connect --cluster production</p>
              <p className="text-[#86868B] mt-1">Connecting securely...</p>
              <p className="text-[#0A84FF] mt-3">[INFO] Connected to 4 active nodes.</p>
              <p className="text-[#FF453A] mt-1">[ERROR] Log Ingestion (localhost:8000) is unreachable.</p>
              <p className="text-[#F5F5F7] mt-1">[INFO] AI Engine scanning for anomalies.</p>
              <p className="text-[#30D158] mt-4 flex items-center gap-1.5">$ <span className="w-2.5 h-5 bg-[#F5F5F7] animate-pulse inline-block" /></p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} 
            className="col-span-1 bg-[#1C1C1E] rounded-[24px] p-8 border border-[#2C2C2E]">
            <h2 className="text-[20px] font-bold tracking-[-0.02em] flex items-center gap-3 mb-6"><HelpCircle size={22} className="text-[#86868B]" strokeWidth={2}/> Resources</h2>
            <div className="space-y-2">
              {['Documentation', 'API Reference', 'Community Support'].map((item, i) => (
                <motion.a key={i} href="#" whileHover={{ x: 6, backgroundColor: '#232326' }} transition={spring} className="flex items-center justify-between py-4 border-b border-[#2C2C2E] last:border-0 group rounded-lg px-3 -mx-3">
                  <span className="text-[16px] font-semibold tracking-[-0.01em] text-[#F5F5F7]">{item}</span>
                  <ChevronRight size={20} className="text-[#86868B] group-hover:text-[#F5F5F7] transition-colors" strokeWidth={2} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Full Pipeline Assurance with Glowing Visual */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} 
          className="w-full bg-[#1C1C1E] rounded-[24px] p-10 md:p-14 border border-[#2C2C2E] flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
          
          {/* Glowing Shield Background */}
          <div className="absolute -right-20 -bottom-20 opacity-10 pointer-events-none">
            <ShieldCheck size={400} className="text-[#0A84FF]" strokeWidth={1} />
          </div>

          <div className="flex-1 relative z-10">
            <h2 className="text-[40px] font-bold tracking-[-0.03em] leading-tight mb-4">Full Pipeline Assurance.</h2>
            <p className="text-[18px] text-[#86868B] max-w-md mb-8 leading-relaxed font-medium">
              Every stage cryptographically verified — from contributor to output. Generate an exportable PDF with embedded cryptographic signatures.
            </p>
            <div className="flex gap-4">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={spring} className="flex items-center gap-2 px-7 py-3.5 bg-[#F5F5F7] text-black rounded-full text-[16px] font-bold tracking-[-0.01em]">
                Download Report
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={spring} className="flex items-center gap-2 px-7 py-3.5 bg-[#2C2C2E] text-[#F5F5F7] rounded-full text-[16px] font-bold tracking-[-0.01em]">
                Export JSON
              </motion.button>
            </div>
          </div>
          
          <div className="flex-shrink-0 relative w-full md:w-[400px] h-[240px] bg-[#0A0A0C] rounded-2xl border border-[#2C2C2E] p-7 flex flex-col justify-between shadow-2xl z-10">
            <div className="flex items-center gap-3">
              <ShieldCheck size={26} className="text-[#0A84FF]" strokeWidth={2} />
              <span className="text-[18px] font-bold tracking-[-0.01em]">Assurance Certificate</span>
            </div>
            <div className="space-y-3">
              <div className="h-2 w-full bg-[#2C2C2E] rounded-full" />
              <div className="h-2 w-4/5 bg-[#2C2C2E] rounded-full" />
              <div className="h-2 w-full bg-[#2C2C2E] rounded-full" />
              <div className="h-2 w-3/5 bg-[#2C2C2E] rounded-full" />
            </div>
            <p className="text-[13px] font-mono font-semibold text-[#86868B]">Signed: 0x8f3a...4b2c</p>
          </div>
        </motion.div>

      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #3A3A3C; border-radius: 10px; }
      `}</style>
    </div>
  )
}

export default Dashboard
