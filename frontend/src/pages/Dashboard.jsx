import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Activity, Database, AlertTriangle, ArrowUpRight, ArrowDownRight, Clock,
  Network, ChevronRight, FileText, Bell, Brain, GitBranch, ArrowRight,
  Sparkles, RefreshCw, Radio, ShieldCheck, Download, Layers, CheckCircle2,
  Server, Terminal, Zap, Globe, Cpu, ShieldAlert, Box, Fingerprint,
  GitCommit, GitPullRequest, Check, X, Search, HelpCircle, ExternalLink,
  ChevronDown, Lock, Play, DollarSign, HardDrive, Users, Bot
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } }),
}

function useAnimatedNumber(target, duration = 1200) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    let raf, start
    const step = (t) => {
      if (!start) start = t
      const p = Math.min((t - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.floor(eased * target))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])
  return val
}

const Gauge = ({ value, size = 240, strokeWidth = 14 }) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>
        <circle stroke="rgba(255,255,255,0.05)" fill="transparent" strokeWidth={strokeWidth} r={radius} cx={size / 2} cy={size / 2} />
        <motion.circle
          initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: offset }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
          stroke="url(#gradient)" fill="transparent" strokeWidth={strokeWidth} strokeDasharray={`${circumference} ${circumference}`} strokeLinecap="round" r={radius} cx={size / 2} cy={size / 2}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-[48px] font-black text-white leading-none tracking-tighter">
          {value}<span className="text-[24px] text-gray-500">%</span>
        </span>
        <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest mt-1">Overall</span>
      </div>
    </div>
  )
}

function Dashboard() {
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  const [metrics, setMetrics] = useState({ logs: 13831, alerts: 33, incidents: 1, anomalies: 2 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
      setMetrics(prev => ({ ...prev, logs: prev.logs + Math.floor(Math.random() * 10) }))
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const logsAnim = useAnimatedNumber(metrics.logs)
  
  const stats = [
    { title: 'Logs Ingested', value: logsAnim.toLocaleString(), icon: Database, grad: 'from-indigo-500 to-violet-600', glow: 'shadow-indigo-500/30', change: '+12%', up: true, spark: [30,45,35,60,55,75,70,90] },
    { title: 'Active Alerts', value: 33, icon: Bell, grad: 'from-amber-400 to-orange-600', glow: 'shadow-amber-500/30', change: '-2', up: false, spark: [70,60,65,50,55,45,40,35] },
    { title: 'Incidents', value: 1, icon: AlertTriangle, grad: 'from-rose-400 to-red-600', glow: 'shadow-rose-500/30', change: '-1', up: false, spark: [40,55,45,50,35,40,30,25] },
    { title: 'Anomalies', value: 2, icon: Activity, grad: 'from-teal-400 to-emerald-600', glow: 'shadow-emerald-500/30', change: '+3', up: true, spark: [20,30,25,40,45,55,60,80] },
  ]

  const events = [
    { title: 'data poisoning attack', desc: 'Recent · 29min ago', severity: 'HIGH', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { title: 'model tampering attack', desc: 'Recent · 50min ago', severity: 'CRITICAL', color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
    { title: 'audit log tampering attack', desc: 'Recent · 38min ago', severity: 'HIGH', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { title: 'inference manipulation', desc: 'Recent · 21min ago', severity: 'CRITICAL', color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
    { title: 'replay attack', desc: 'Recent · 32min ago', severity: 'MEDIUM', color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  ]

  const infraServices = [
    { name: 'Log Ingestion', port: 'localhost:8000', status: 'Down', color: 'text-rose-500', bg: 'bg-rose-500/10', border: 'border-rose-500/20' },
    { name: 'AI Anomaly Detector', port: 'localhost:8001', status: 'Healthy', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { name: 'Alert Service', port: 'localhost:8002', status: 'Healthy', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { name: 'Root Cause Analyzer', port: 'localhost:8003', status: 'Healthy', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  ]

  const incidents = [
    { id: 'INC-4092', title: 'Database Connection Failure', severity: 'Critical', status: 'Investigating', time: '12m', assignee: 'AT', color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { id: 'INC-4091', title: 'High Latency on API Gateway', severity: 'High', status: 'Identified', time: '45m', assignee: 'JD', color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { id: 'INC-4090', title: 'Pod CrashLoopBackOff', severity: 'Medium', status: 'Monitoring', time: '2h', assignee: 'MK', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  ]

  const playbooks = [
    { name: 'Auto-scale Pods', desc: 'Triggered by CPU > 80%', status: 'Success', icon: Zap, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { name: 'Restart Failed Service', desc: 'Log Ingestion (8000)', status: 'Running', icon: RefreshCw, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { name: 'Rollback Deployment', desc: 'Reverting to previous commit', status: 'Pending', icon: GitCommit, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  ]

  const quotas = [
    { name: 'API Requests', used: '840k', limit: '1M', percent: 84, color: 'bg-teal-500' },
    { name: 'Log Storage', used: '450GB', limit: '500GB', percent: 90, color: 'bg-rose-500' },
    { name: 'AI Compute Units', used: '3.2k', limit: '10k', percent: 32, color: 'bg-indigo-500' },
  ]

  return (
    <div className="w-full min-h-screen bg-[#090B10] relative selection:bg-teal-500/30 overflow-x-hidden font-sans text-white">
      
      {/* Background Grid & Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden h-[800px]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-teal-500/20 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 p-6 md:p-12 max-w-[1500px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 pt-4">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-6 shadow-[0_0_20px_rgba(45,212,191,0.1)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
              </span>
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-teal-100/70">Mission Control</span>
            </div>
            <h1 className="text-[44px] md:text-[64px] font-bold tracking-[-0.045em] text-white leading-[1.05]">
              System status.{' '}
              <span className="bg-gradient-to-r from-teal-300 via-emerald-400 to-teal-300 bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]">Live metrics.</span>
            </h1>
            <p className="text-[17px] text-gray-400 font-medium mt-4 max-w-xl">Real-time signals from your entire infrastructure pipeline.</p>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1} className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-lg text-[14px] font-bold text-gray-300 tabular-nums">
              <Clock size={16} className="text-teal-400" /> {time}
            </div>
            <button className="group flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-[#090B10] text-[14px] font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:scale-[1.02] transition-transform">
              <RefreshCw size={15} className="group-hover:rotate-180 transition-transform duration-500" /> Sync
            </button>
          </motion.div>
        </div>

        {/* 1. Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp} initial="hidden" animate="show" custom={i + 2} whileHover={{ y: -5, scale: 1.01 }}
              className="group relative p-6 rounded-[28px] bg-[#11151E]/80 backdrop-blur-xl border border-white/[0.05] shadow-[0_8px_30px_rgba(0,0,0,0.3)] transition-all overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.grad} flex items-center justify-center shadow-lg ${s.glow} ring-1 ring-white/10`}>
                  <s.icon size={22} className="text-white" />
                </div>
                <div className={`flex items-center gap-1 text-[12px] font-bold px-2.5 py-1 rounded-full ${s.up ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
                  {s.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {s.change}
                </div>
              </div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.12em] mb-2">{s.title}</p>
              <p className="text-[36px] font-black text-white tracking-tighter leading-none tabular-nums mb-4">{s.value}</p>
              <div className="flex items-end gap-1.5 h-6">
                {s.spark.map((h, k) => (
                  <motion.div key={k} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.4 + k * 0.05, duration: 0.5, ease: 'easeOut' }}
                    className={`flex-1 rounded-full bg-gradient-to-t ${s.grad} opacity-60 group-hover:opacity-100 transition-opacity`} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 2. Main Grid: Trust Gauge & Active Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* System Trust */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={6} className="p-8 rounded-[32px] bg-[#11151E]/80 backdrop-blur-xl border border-white/[0.05] shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex flex-col justify-between items-center relative overflow-hidden">
            <div className="w-full flex justify-between items-center mb-8">
              <h2 className="text-[13px] font-bold text-gray-400 uppercase tracking-[0.15em]">System Trust</h2>
              <span className="text-[11px] font-bold text-amber-500 bg-amber-500/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-amber-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" /> Review
              </span>
            </div>
            <Gauge value={67} />
            <div className="w-full grid grid-cols-3 gap-4 mt-10">
              {[
                { label: 'Data', val: '67.0%' },
                { label: 'Model', val: '19.3%' },
                { label: 'Output', val: '36.7%' }
              ].map((item, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-4 text-center">
                  <p className="text-[18px] font-bold text-white mb-1">{item.val}</p>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{item.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Active Events */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={7} className="p-8 rounded-[32px] bg-[#11151E]/80 backdrop-blur-xl border border-white/[0.05] shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <h2 className="text-[11px] font-bold text-rose-500 uppercase tracking-widest">Live Alerts</h2>
                </div>
                <h3 className="text-[24px] font-bold text-white">Active Events</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 font-bold text-[18px]">5</div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-rose-500/[0.03] border border-rose-500/10 rounded-xl p-3 text-center">
                <p className="text-[20px] font-black text-rose-500">2</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">Critical</p>
              </div>
              <div className="bg-amber-500/[0.03] border border-amber-500/10 rounded-xl p-3 text-center">
                <p className="text-[20px] font-black text-amber-500">2</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">High</p>
              </div>
              <div className="bg-blue-500/[0.03] border border-blue-500/10 rounded-xl p-3 text-center">
                <p className="text-[20px] font-black text-blue-500">1</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mt-0.5">Medium</p>
              </div>
            </div>

            <div className="space-y-2">
              {events.map((ev, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.05] transition-colors cursor-default">
                  <div className="flex items-center gap-3">
                    <div className={`w-1 h-8 rounded-full ${ev.color.replace('text-', 'bg-')}`} />
                    <div>
                      <p className="text-[13.5px] font-bold text-white capitalize">{ev.title}</p>
                      <p className="text-[11.5px] text-gray-500 font-medium">{ev.desc}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded border ${ev.bg} ${ev.color} ${ev.border}`}>
                    {ev.severity}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 3. Topology & Threat Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
           <motion.div variants={fadeUp} initial="hidden" animate="show" custom={8} className="relative p-8 rounded-[32px] bg-[#11151E]/80 backdrop-blur-xl border border-white/[0.05] shadow-[0_8px_30px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col h-[340px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="flex justify-between items-center mb-4 relative z-10">
                <h2 className="text-[15px] font-bold text-white flex items-center gap-2"><Network size={16} className="text-indigo-400"/> Service Topology</h2>
                <button className="text-[11px] font-bold text-gray-400 hover:text-white flex items-center gap-1">Explore <ChevronRight size={12}/></button>
              </div>
              <div className="flex-grow relative flex items-center justify-center">
                 <svg className="w-full h-full absolute inset-0 pointer-events-none" style={{ filter: 'drop-shadow(0 0 8px rgba(99,102,241,0.5))' }}>
                    <path d="M 150 120 Q 250 50 350 120 T 550 120" fill="transparent" stroke="rgba(99,102,241,0.2)" strokeWidth="2" strokeDasharray="4 4" />
                    <path d="M 150 120 Q 250 200 350 120 T 550 120" fill="transparent" stroke="rgba(45,212,191,0.2)" strokeWidth="2" />
                 </svg>
                 <div className="absolute flex gap-16 items-center">
                    <motion.div animate={{ boxShadow: ['0 0 0 0 rgba(99,102,241,0.4)', '0 0 0 15px rgba(99,102,241,0)'] }} transition={{ duration: 2, repeat: Infinity }} className="w-12 h-12 rounded-xl bg-[#1A222C] border border-indigo-500/30 flex items-center justify-center shadow-lg relative z-10">
                       <Database size={20} className="text-indigo-400" />
                    </motion.div>
                    <motion.div animate={{ boxShadow: ['0 0 0 0 rgba(45,212,191,0.4)', '0 0 0 20px rgba(45,212,191,0)'] }} transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} className="w-16 h-16 rounded-2xl bg-[#1A222C] border border-teal-500/40 flex items-center justify-center shadow-lg relative z-10 scale-110">
                       <Activity size={24} className="text-teal-400" />
                       <div className="absolute -bottom-6 text-[10px] font-bold text-teal-500 whitespace-nowrap bg-teal-500/10 px-2 py-0.5 rounded">AI Engine</div>
                    </motion.div>
                    <motion.div animate={{ boxShadow: ['0 0 0 0 rgba(244,63,94,0.4)', '0 0 0 15px rgba(244,63,94,0)'] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} className="w-12 h-12 rounded-xl bg-[#1A222C] border border-rose-500/30 flex items-center justify-center shadow-lg relative z-10">
                       <ShieldAlert size={20} className="text-rose-400" />
                    </motion.div>
                 </div>
              </div>
              <div className="flex justify-between items-center text-[11px] font-mono text-gray-500 mt-4 border-t border-white/5 pt-3">
                 <span>Latency: 14ms</span>
                 <span>Packets: 1.2k/s</span>
                 <span className="text-emerald-400">Status: Active</span>
              </div>
           </motion.div>

           <motion.div variants={fadeUp} initial="hidden" animate="show" custom={9} className="relative p-8 rounded-[32px] bg-[#11151E]/80 backdrop-blur-xl border border-white/[0.05] shadow-[0_8px_30px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col h-[340px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="flex justify-between items-center mb-6 relative z-10">
                <h2 className="text-[15px] font-bold text-white flex items-center gap-2"><Globe size={16} className="text-rose-400"/> Threat Matrix</h2>
                <span className="flex items-center gap-1.5 text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-1 rounded"><span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"/>Live Map</span>
              </div>
              <div className="flex-grow grid grid-cols-8 grid-rows-4 gap-2 opacity-70">
                 {Array.from({ length: 32 }).map((_, i) => {
                   const isHigh = [3, 7, 12, 18, 25, 29].includes(i);
                   const isMed = [1, 9, 15, 22, 27].includes(i);
                   return (
                     <motion.div key={i} 
                        animate={isHigh || isMed ? { opacity: [0.5, 1, 0.5] } : {}} 
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }} 
                        className={`rounded-md ${isHigh ? 'bg-rose-500/40 border border-rose-500/50 shadow-[0_0_10px_rgba(244,63,94,0.3)]' : isMed ? 'bg-amber-500/30 border border-amber-500/40' : 'bg-white/[0.03] border border-white/[0.05]'}`} 
                     />
                   )
                 })}
              </div>
              <div className="flex justify-between items-center text-[11px] font-mono text-gray-500 mt-6 pt-4 border-t border-white/5 relative z-10">
                 <span>Blocked: 1,024</span>
                 <span className="text-rose-400">Active Threats: 5</span>
              </div>
           </motion.div>
        </div>

        {/* NEW: 4. Active Incidents Table & Auto-Remediation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
           {/* Incidents Table */}
           <motion.div variants={fadeUp} initial="hidden" animate="show" custom={10} className="p-7 rounded-[32px] bg-[#11151E]/80 backdrop-blur-xl border border-white/[0.05] shadow-[0_8px_30px_rgba(0,0,0,0.3)] lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-[15px] font-bold text-white flex items-center gap-2"><AlertTriangle size={16} className="text-rose-400"/> Active Incidents</h2>
                 <button className="text-[12px] font-bold text-rose-400 hover:text-rose-300">View All</button>
              </div>
              <div className="w-full overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                    <thead>
                       <tr className="text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-white/5">
                          <th className="pb-3 px-2">Incident ID</th>
                          <th className="pb-3 px-2">Title</th>
                          <th className="pb-3 px-2">Severity</th>
                          <th className="pb-3 px-2">Status</th>
                          <th className="pb-3 px-2">Assignee</th>
                          <th className="pb-3 px-2 text-right">Time</th>
                       </tr>
                    </thead>
                    <tbody className="text-[13px]">
                       {incidents.map((inc, i) => (
                          <tr key={i} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors group">
                             <td className="py-3.5 px-2 font-mono text-gray-400">{inc.id}</td>
                             <td className="py-3.5 px-2 font-bold text-white">{inc.title}</td>
                             <td className="py-3.5 px-2">
                                <span className={`px-2 py-1 rounded text-[10px] font-bold ${inc.bg} ${inc.color}`}>{inc.severity}</span>
                             </td>
                             <td className="py-3.5 px-2 text-gray-400">{inc.status}</td>
                             <td className="py-3.5 px-2">
                                <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-gray-300 border border-white/5">{inc.assignee}</div>
                             </td>
                             <td className="py-3.5 px-2 text-right text-gray-500 font-mono">{inc.time}</td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </motion.div>

           {/* Auto-Remediation Playbooks */}
           <motion.div variants={fadeUp} initial="hidden" animate="show" custom={11} className="p-7 rounded-[32px] bg-[#11151E]/80 backdrop-blur-xl border border-white/[0.05] shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-[15px] font-bold text-white flex items-center gap-2"><Bot size={16} className="text-teal-400"/> SRE Playbooks</h2>
                 <span className="text-[10px] font-bold text-teal-400 bg-teal-500/10 px-2 py-1 rounded">Automated</span>
              </div>
              <div className="space-y-3">
                 {playbooks.map((pb, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-start gap-3">
                       <div className={`p-2 rounded-lg ${pb.bg} ${pb.color} mt-0.5`}>
                          <pb.icon size={14} />
                       </div>
                       <div className="flex-grow">
                          <p className="text-[13px] font-bold text-white">{pb.name}</p>
                          <p className="text-[11px] text-gray-500 mt-0.5">{pb.desc}</p>
                          <div className={`mt-2 text-[10px] font-bold flex items-center gap-1 ${pb.color}`}>
                             {pb.status === 'Running' && <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />}
                             {pb.status}
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </motion.div>
        </div>

        {/* NEW: 5. API Limits & Cost Usage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
           {/* Quotas */}
           <motion.div variants={fadeUp} initial="hidden" animate="show" custom={12} className="p-7 rounded-[32px] bg-[#11151E]/80 backdrop-blur-xl border border-white/[0.05] shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-[15px] font-bold text-white flex items-center gap-2"><HardDrive size={16} className="text-indigo-400"/> API & Resource Quotas</h2>
              </div>
              <div className="space-y-5">
                 {quotas.map((q, i) => (
                    <div key={i}>
                       <div className="flex justify-between items-end mb-1.5">
                          <span className="text-[13px] font-bold text-gray-300">{q.name}</span>
                          <span className="text-[12px] font-mono text-gray-500"><span className="text-white">{q.used}</span> / {q.limit}</span>
                       </div>
                       <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${q.percent}%` }} transition={{ duration: 1, delay: 0.3 + i*0.1 }} className={`h-full ${q.color} rounded-full`} />
                       </div>
                    </div>
                 ))}
              </div>
           </motion.div>

           {/* Cost Usage */}
           <motion.div variants={fadeUp} initial="hidden" animate="show" custom={13} className="p-7 rounded-[32px] bg-[#11151E]/80 backdrop-blur-xl border border-white/[0.05] shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-[15px] font-bold text-white flex items-center gap-2"><DollarSign size={16} className="text-emerald-400"/> Cloud Cost Breakdown</h2>
                 <span className="text-[12px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">$1,240 <span className="text-gray-500 font-normal">/mo</span></span>
              </div>
              <div className="flex gap-4 items-center">
                 {/* Donut Chart */}
                 <div className="relative w-24 h-24 flex-shrink-0">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                       <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                       <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#2dd4bf" strokeWidth="3" strokeDasharray="50 50" strokeDashoffset="25" />
                       <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#818cf8" strokeWidth="3" strokeDasharray="30 70" strokeDashoffset="75" />
                       <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f43f5e" strokeWidth="3" strokeDasharray="20 80" strokeDashoffset="45" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                       <span className="text-[14px] font-black text-white">100%</span>
                    </div>
                 </div>
                 
                 {/* Legend */}
                 <div className="flex-grow space-y-3">
                    {[
                       { name: 'Compute', val: '$620', color: 'bg-teal-400', percent: '50%' },
                       { name: 'Storage', val: '$370', color: 'bg-indigo-400', percent: '30%' },
                       { name: 'Network', val: '$250', color: 'bg-rose-400', percent: '20%' },
                    ].map((c, i) => (
                       <div key={i} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                             <div className={`w-2 h-2 rounded-full ${c.color}`} />
                             <span className="text-[12px] font-bold text-gray-300">{c.name}</span>
                          </div>
                          <div className="text-right">
                             <p className="text-[12px] font-bold text-white">{c.val}</p>
                             <p className="text-[10px] text-gray-500">{c.percent}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </motion.div>
        </div>

        {/* 6. Deployment Timeline & Global Regions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={14} className="p-7 rounded-[32px] bg-[#11151E]/80 backdrop-blur-xl border border-white/[0.05] shadow-[0_8px_30px_rgba(0,0,0,0.3)] lg:col-span-2">
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-[15px] font-bold text-white flex items-center gap-2"><GitCommit size={16} className="text-indigo-400"/> Recent Deployments</h2>
               <span className="text-[11px] font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded border border-indigo-500/20">CI/CD Pipeline</span>
             </div>
             
             <div className="relative border-l border-white/10 ml-3 space-y-6">
                {[
                  { hash: 'a1b2c3d', msg: 'feat: Add root cause analysis engine', time: '2 mins ago', status: 'success', branch: 'main' },
                  { hash: 'e4f5g6h', msg: 'fix: Resolve memory leak in log ingester', time: '45 mins ago', status: 'success', branch: 'main' },
                  { hash: 'i7j8k9l', msg: 'chore: Update dependencies', time: '2 hrs ago', status: 'failed', branch: 'dev' },
                  { hash: 'm0n1o2p', msg: 'feat: Anomaly detection v2.0', time: '4 hrs ago', status: 'success', branch: 'main' },
                ].map((dep, i) => (
                  <div key={i} className="relative pl-6">
                    <div className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 bg-[#11151E] flex items-center justify-center ${dep.status === 'success' ? 'border-emerald-500' : 'border-rose-500'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${dep.status === 'success' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[13px] font-bold text-white">{dep.msg}</span>
                          <span className="text-[10px] font-mono text-gray-500 bg-white/5 px-1.5 rounded">{dep.hash}</span>
                        </div>
                        <p className="text-[11.5px] text-gray-500 flex items-center gap-2">
                           <GitBranch size={12}/> {dep.branch} <span className="text-gray-600">·</span> {dep.time}
                        </p>
                      </div>
                      <div className={`flex items-center gap-1 text-[11px] font-bold ${dep.status === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {dep.status === 'success' ? <Check size={14} /> : <X size={14} />} {dep.status}
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={15} className="p-7 rounded-[32px] bg-[#11151E]/80 backdrop-blur-xl border border-white/[0.05] shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-[15px] font-bold text-white flex items-center gap-2"><Globe size={16} className="text-teal-400"/> Global Regions</h2>
             </div>
             <div className="space-y-4">
                {[
                  { region: 'US East (N. Virginia)', ping: '12ms', status: 'Healthy', load: '45%', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                  { region: 'EU West (Ireland)', ping: '24ms', status: 'Healthy', load: '62%', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                  { region: 'Asia Pacific (Mumbai)', ping: '45ms', status: 'Degraded', load: '89%', color: 'text-amber-500', bg: 'bg-amber-500/10' },
                  { region: 'South America (São Paulo)', ping: '32ms', status: 'Healthy', load: '28%', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                ].map((r, i) => (
                  <div key={i} className="bg-white/[0.02] border border-white/[0.04] rounded-xl p-3">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-[12.5px] font-bold text-white">{r.region}</span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${r.bg} ${r.color}`}>{r.status}</span>
                     </div>
                     <div className="flex justify-between items-center text-[11px] text-gray-500 font-mono">
                        <span>Ping: {r.ping}</span>
                        <span>Load: {r.load}</span>
                     </div>
                     <div className="w-full bg-white/5 h-1 rounded-full mt-2 overflow-hidden">
                        <div className={`h-full ${r.color.replace('text-','bg-')}`} style={{ width: r.load }} />
                     </div>
                  </div>
                ))}
             </div>
          </motion.div>
        </div>

        {/* 7. Interactive Terminal & FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
           <motion.div variants={fadeUp} initial="hidden" animate="show" custom={16} className="p-0 rounded-[24px] bg-[#0A0D14] border border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.5)] col-span-1 lg:col-span-2 relative overflow-hidden flex flex-col">
             <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.03] border-b border-white/[0.05]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] font-mono text-gray-400 ml-2">aiops-cli</span>
             </div>
             <div className="p-5 font-mono text-[12px] text-gray-300 leading-relaxed h-[220px] overflow-hidden relative">
                <p className="text-teal-400">$ aiops connect --cluster production</p>
                <p className="text-gray-500 mt-1">Establishing secure tunnel...</p>
                <p className="text-emerald-400 mt-1">✔ Connected to 4 nodes.</p>
                <p className="text-teal-400 mt-3">$ aiops status</p>
                <p className="text-gray-400 mt-1">[INFO] Overall System Trust: 67%</p>
                <p className="text-rose-400 mt-1">[WARN] Log Ingestion (localhost:8000) is DOWN.</p>
                <p className="text-gray-400 mt-1">[INFO] AI Engine is actively scanning for anomalies.</p>
                <p className="text-teal-400 mt-3 flex items-center gap-1">$ <span className="w-2 h-4 bg-teal-400 animate-pulse inline-block" /></p>
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0A0D14] to-transparent pointer-events-none" />
             </div>
           </motion.div>

           <motion.div variants={fadeUp} initial="hidden" animate="show" custom={17} className="p-7 rounded-[32px] bg-[#11151E]/80 backdrop-blur-xl border border-white/[0.05] shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
              <h2 className="text-[15px] font-bold text-white flex items-center gap-2 mb-4"><HelpCircle size={16} className="text-gray-400"/> Need help?</h2>
              <p className="text-[13px] text-gray-400 mb-5 leading-relaxed">Access our detailed API docs, SDKs, and integration guides to get the most out of AIOps platform.</p>
              
              <div className="space-y-2">
                {['Quickstart Guide', 'API Reference', 'SDK Integrations', 'Community Discord'].map((item, i) => (
                  <a key={i} href="#" className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.06] transition-colors group">
                     <span className="text-[13px] font-bold text-gray-200 group-hover:text-white">{item}</span>
                     <ExternalLink size={14} className="text-gray-500 group-hover:text-white" />
                  </a>
                ))}
              </div>
           </motion.div>
        </div>

        {/* 8. Infrastructure & Live Logs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={18} className="p-7 rounded-[32px] bg-[#11151E]/80 backdrop-blur-xl border border-white/[0.05] shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[15px] font-bold text-white flex items-center gap-2"><Server size={16} className="text-teal-400"/> Infrastructure</h2>
            </div>
            <div className="space-y-3">
              {infraServices.map((svc, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div>
                    <p className="text-[13.5px] font-bold text-white">{svc.name}</p>
                    <p className="text-[11px] text-gray-500 font-mono mt-0.5">{svc.port}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${svc.bg} ${svc.color} ${svc.border}`}>
                    {svc.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={19} className="p-7 rounded-[32px] bg-[#0A0D14] border border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.5)] col-span-1 lg:col-span-2 relative overflow-hidden">
            <div className="flex justify-between items-center mb-4 border-b border-white/[0.05] pb-4">
              <h2 className="text-[15px] font-bold text-white flex items-center gap-2"><Terminal size={16} className="text-teal-400"/> Live Activity Logs</h2>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-teal-400 bg-teal-500/10 px-2 py-1 rounded">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" /> Streaming
              </span>
            </div>
            <div className="font-mono text-[12px] space-y-2.5 opacity-80">
              <p className="text-gray-400"><span className="text-gray-600">14:32:01</span> <span className="text-emerald-400">INFO</span> [ai-engine] Anomaly detection model v2 loaded successfully.</p>
              <p className="text-gray-400"><span className="text-gray-600">14:31:45</span> <span className="text-rose-400">ERROR</span> [log-service] Failed to connect to database at localhost:8000.</p>
              <p className="text-gray-400"><span className="text-gray-600">14:31:20</span> <span className="text-amber-400">WARN</span> [alert-service] CPU threshold exceeded 80% on node-us-east-1.</p>
              <p className="text-gray-400"><span className="text-gray-600">14:30:12</span> <span className="text-teal-400">INFO</span> [remediation] Auto-scaled pods from 3 to 5 for root-cause-analyzer.</p>
              <p className="text-gray-400"><span className="text-gray-600">14:29:59</span> <span className="text-emerald-400">SUCCESS</span> [api-gateway] Deployment of inference-service completed.</p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0A0D14] to-transparent pointer-events-none" />
          </motion.div>
        </div>

        {/* 9. Pipeline Assurance Report */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={20} className="relative w-full p-10 md:p-14 rounded-[40px] bg-[#11151E]/80 backdrop-blur-xl border border-white/[0.05] shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
          
          <div className="flex-1 relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(45,212,191,0.2)]">
                <ShieldCheck size={20} className="text-teal-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">Complete Report</p>
                <p className="text-[13px] font-bold text-gray-300">Full pipeline assurance</p>
              </div>
            </div>
            
            <h2 className="text-[40px] sm:text-[50px] font-bold leading-[1.1] tracking-[-0.03em] text-white mb-4">
              Full Pipeline<br />
              <span className="text-teal-400">Assurance Report.</span>
            </h2>
            
            <p className="text-[15px] text-gray-400 font-medium max-w-md mb-8 leading-relaxed">
              Every stage cryptographically verified — contributor, dataset, model, inference, and output. Exportable PDF with embedded signatures.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { label: 'Trust Score', val: '67%', color: 'text-teal-400' },
                { label: 'Datasets', val: '3', color: 'text-white' },
                { label: 'Models', val: '3', color: 'text-white' },
                { label: 'Blocks', val: '6', color: 'text-white' },
                { label: 'Wallets', val: '3', color: 'text-white' },
                { label: 'Threats', val: '5', color: 'text-amber-500' },
              ].map((s, i) => (
                <div key={i} className="bg-white/[0.03] border border-white/[0.05] rounded-xl p-3">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">{s.label}</p>
                  <p className={`text-[18px] font-bold ${s.color}`}>{s.val}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-6 py-3 bg-teal-400 hover:bg-teal-300 text-[#090B10] rounded-full text-[14px] font-bold transition-all shadow-[0_0_20px_rgba(45,212,191,0.3)]">
                <Download size={16} /> Download PDF
              </button>
              <button className="flex items-center gap-2 px-6 py-3 bg-transparent border border-white/20 text-white hover:bg-white/5 rounded-full text-[14px] font-bold transition-all">
                <Layers size={16} /> Export JSON
              </button>
            </div>
          </div>

          <div className="flex-1 relative z-10 flex justify-center md:justify-end w-full">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="relative w-full max-w-[320px] rounded-2xl bg-gradient-to-b from-[#1A222C] to-[#11151E] border border-white/10 shadow-2xl p-6">
               <div className="absolute -top-3 -right-3 bg-white text-[#090B10] px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 shadow-lg">
                 <CheckCircle2 size={12} className="text-emerald-500" /> Verified
               </div>
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-8 h-8 rounded bg-teal-500/20 flex items-center justify-center">
                   <ShieldCheck size={14} className="text-teal-400" />
                 </div>
                 <div>
                   <p className="text-[11px] font-bold text-white uppercase tracking-wider">Assurance</p>
                   <p className="text-[9px] text-gray-500">v1.0 · 2026</p>
                 </div>
               </div>
               <div className="space-y-3 mb-8">
                 <div className="h-1.5 w-full bg-white/5 rounded-full" />
                 <div className="h-1.5 w-[80%] bg-white/5 rounded-full" />
                 <div className="h-1.5 w-[90%] bg-white/5 rounded-full" />
                 <div className="h-1.5 w-[60%] bg-white/5 rounded-full" />
                 <div className="h-1.5 w-[75%] bg-white/5 rounded-full" />
               </div>
               <div className="pt-4 border-t border-white/10">
                 <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Signed</p>
                 <p className="text-[12px] font-mono text-teal-400">0x8f3a...4b2c</p>
               </div>
            </motion.div>
          </div>
        </motion.div>

      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>
    </div>
  )
}

export default Dashboard
