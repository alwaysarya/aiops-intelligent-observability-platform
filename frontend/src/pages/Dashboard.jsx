import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Activity, Database, Clock, Network, ChevronRight, 
  ShieldAlert, ShieldCheck, Server, Terminal, Cpu, GitCommit, 
  Check, X, HelpCircle, Sparkles, Lock, ArrowRight, Globe, 
  MessageSquare, Users, Box, Zap, AlertCircle, Search, Command, FileText, CheckCircle2, Award
} from 'lucide-react'

const appleEase = [0.16, 1, 0.3, 1]
const spring = { type: "spring", stiffness: 300, damping: 25 }

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: i * 0.05, ease: appleEase } }),
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
  const [logs, setLogs] = useState(13853)

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
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#0A84FF]/[0.04] blur-[160px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-20 md:py-32">
        
        {/* UPGRADED HERO SECTION */}
        <header className="relative flex flex-col lg:flex-row justify-between items-center mb-24 gap-12 lg:gap-8">
          
          {/* Left Side Text */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="flex-1 text-center lg:text-left z-10">
            <p className="text-[13px] font-semibold tracking-[0.06em] text-[#86868B] uppercase mb-5 flex items-center justify-center lg:justify-start gap-2">
              <span className="w-2 h-2 rounded-full bg-[#30D158] shadow-[0_0_10px_#30D158]" /> System Operational
            </p>
            <h1 className="text-[64px] md:text-[80px] font-bold tracking-[-0.04em] leading-none mb-6 bg-gradient-to-br from-white via-white to-[#86868B] bg-clip-text text-transparent">
              Overview.
            </h1>
            <p className="text-[24px] md:text-[28px] text-[#86868B] font-medium tracking-[-0.015em] max-w-lg mx-auto lg:mx-0">
              Real-time infrastructure intelligence. Designed for absolute scale.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-8">
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={spring} className="flex items-center gap-2 px-6 py-3 bg-[#F5F5F7] text-black rounded-full text-[15px] font-bold tracking-[-0.01em]">
                <Terminal size={16} /> Open Terminal
              </motion.button>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} transition={spring} className="flex items-center gap-2 px-6 py-3 bg-[#1C1C1E] border border-[#2C2C2E] text-white rounded-full text-[15px] font-bold tracking-[-0.01em]">
                <FileText size={16} /> View Docs
              </motion.button>
            </div>
          </motion.div>

          {/* Right Side Visual (Apple-style 3D Orb/Server Core) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1.5, ease: appleEase }}
            className="flex-1 relative w-full max-w-[400px] lg:max-w-[500px] h-[300px] lg:h-[400px] flex items-center justify-center"
          >
            {/* Central Glowing Orb */}
            <div className="relative w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-gradient-to-b from-[#1C1C1E] to-[#0A0A0C] shadow-[inset_0_0_40px_rgba(255,255,255,0.05),0_0_80px_rgba(10,132,255,0.2)] border border-white/10 flex items-center justify-center z-20">
               <motion.div animate={{ rotateY: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-0 rounded-full border border-[#0A84FF]/30 border-t-[#0A84FF] opacity-50" />
               <motion.div animate={{ rotateX: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-4 rounded-full border border-white/10 border-b-white/40 opacity-50" />
               <Cpu size={64} className="text-[#0A84FF] drop-shadow-[0_0_15px_rgba(10,132,255,0.8)]" strokeWidth={1} />
            </div>
            
            {/* Floating Orbit Rings */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute w-[320px] h-[320px] lg:w-[450px] lg:h-[450px] rounded-full border border-white/5 border-dashed z-10" />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 35, repeat: Infinity, ease: "linear" }} className="absolute w-[400px] h-[400px] lg:w-[550px] lg:h-[550px] rounded-full border border-white/[0.03] z-0" />
            
            {/* Floating Data Nodes */}
            <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-0 right-10 w-3 h-3 bg-[#30D158] rounded-full shadow-[0_0_15px_#30D158] z-30" />
            <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-10 left-0 w-2 h-2 bg-[#0A84FF] rounded-full shadow-[0_0_15px_#0A84FF] z-30" />
          </motion.div>
        </header>

        {/* REST OF THE DASHBOARD (UNTOUCHED) */}
        
        {/* TOP STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Logs Ingested', value: logsAnim.toLocaleString(), trend: '+12%', isUp: true },
            { title: 'Active Alerts', value: '33', trend: '-2', isUp: false },
            { title: 'Incidents', value: '1', trend: '-1', isUp: false },
            { title: 'Anomalies', value: '2', trend: '+3', isUp: true },
          ].map((stat, i) => (
            <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} custom={i + 2} 
              whileHover={{ y: -4, backgroundColor: '#232326' }} transition={spring}
              className="bg-[#1C1C1E] rounded-[24px] p-7 border border-[#2C2C2E] cursor-pointer flex flex-col justify-between min-h-[170px]">
              <p className="text-[15px] font-semibold text-[#86868B] mb-6">{stat.title}</p>
              <div className="flex items-end justify-between">
                <p className="text-[42px] font-bold tracking-[-0.03em] leading-none">{stat.value}</p>
                <span className={`text-[14px] font-bold ${stat.isUp ? 'text-[#30D158]' : 'text-[#FF453A]'}`}>{stat.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* BIG BENTO */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} 
            className="col-span-1 lg:col-span-2 bg-[#1C1C1E] rounded-[24px] p-8 border border-[#2C2C2E] relative overflow-hidden flex flex-col min-h-[360px]">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-[22px] font-bold tracking-[-0.02em] flex items-center gap-3"><Activity size={24} className="text-[#0A84FF]" strokeWidth={2}/> Real-Time Metrics</h2>
                <p className="text-[14px] text-[#86868B] mt-1">Requests per second (last 60 mins)</p>
              </div>
              <span className="flex items-center gap-2 text-[12px] font-bold text-[#0A84FF] bg-[#0A84FF]/10 px-3.5 py-1.5 rounded-full border border-[#0A84FF]/20">
                <span className="w-2 h-2 rounded-full bg-[#0A84FF] animate-pulse"/> Live
              </span>
            </div>
            <div className="flex-grow relative flex items-end gap-1.5 pb-2">
              {Array.from({ length: 45 }).map((_, i) => {
                const height = Math.sin(i * 0.25) * 25 + Math.cos(i * 0.4) * 15 + 55;
                return (
                  <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${height}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.02, ease: appleEase }}
                    className="flex-1 bg-gradient-to-t from-[#0A84FF]/20 to-[#0A84FF] rounded-t-sm" />
                )
              })}
            </div>
            <div className="flex justify-between items-center mt-4 text-[12px] text-[#86868B] font-semibold tracking-wide">
              <span>-60 MIN</span><span>-30 MIN</span><span>NOW</span>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} 
            className="col-span-1 bg-[#1C1C1E] rounded-[24px] p-8 border border-[#2C2C2E] flex flex-col min-h-[360px] relative overflow-hidden">
            <div className="flex justify-between items-center mb-4 relative z-10">
              <h2 className="text-[20px] font-bold tracking-[-0.02em] flex items-center gap-3"><Globe size={22} className="text-[#0A84FF]" strokeWidth={2}/> Threat Globe</h2>
            </div>
            <div className="flex-grow relative flex items-center justify-center mt-2">
               <div className="w-48 h-48 rounded-full border border-white/5 relative flex items-center justify-center">
                 <div className="w-32 h-32 rounded-full border border-white/10 absolute" />
                 <div className="w-16 h-16 rounded-full border border-white/20 absolute" />
                 <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} className="absolute top-8 right-12 w-2 h-2 bg-[#FF453A] rounded-full shadow-[0_0_10px_#FF453A]" />
                 <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} className="absolute bottom-10 left-14 w-2 h-2 bg-[#FF453A] rounded-full shadow-[0_0_10px_#FF453A]" />
               </div>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#2C2C2E] relative z-10">
              <span className="text-[13px] text-[#86868B]">Blocked: 1,024</span>
              <span className="text-[13px] text-[#FF453A]">Active: 5</span>
            </div>
          </motion.div>
        </div>

        {/* MIDDLE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="bg-[#1C1C1E] rounded-[24px] p-8 border border-[#2C2C2E] flex flex-col h-[320px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-[20px] font-bold tracking-[-0.02em] flex items-center gap-3"><ShieldCheck size={22} className="text-[#30D158]" strokeWidth={2}/> Security</h2>
              <span className="text-[13px] font-semibold text-[#30D158] bg-[#30D158]/10 px-3 py-1 rounded-full">Grade A</span>
            </div>
            <div className="flex-grow relative flex items-center justify-center">
              <div className="w-40 h-40 rounded-full border border-[#2C2C2E] relative flex items-center justify-center">
                <div className="w-28 h-28 rounded-full border border-[#2C2C2E] absolute" />
                <div className="w-16 h-16 rounded-full border border-[#2C2C2E] absolute" />
                <div className="absolute w-full h-[1px] bg-[#2C2C2E]" />
                <div className="absolute h-full w-[1px] bg-[#2C2C2E]" />
                <motion.svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                  <motion.polygon initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 0.3, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: appleEase }} points="100,30 160,70 140,150 60,160 40,80" fill="#30D158" stroke="#30D158" strokeWidth="2" />
                </motion.svg>
              </div>
            </div>
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-[#2C2C2E]">
              <div className="text-center"><p className="text-[18px] font-bold text-white">0</p><p className="text-[11px] text-[#86868B] font-medium">Critical</p></div>
              <div className="text-center"><p className="text-[18px] font-bold text-[#FF9F0A]">3</p><p className="text-[11px] text-[#86868B] font-medium">Medium</p></div>
              <div className="text-center"><p className="text-[18px] font-bold text-[#30D158]">124</p><p className="text-[11px] text-[#86868B] font-medium">Passed</p></div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="bg-[#1C1C1E] rounded-[24px] p-8 border border-[#2C2C2E] flex flex-col h-[320px]">
            <h2 className="text-[20px] font-bold tracking-[-0.02em] flex items-center gap-3 mb-6"><Award size={22} className="text-[#0A84FF]" strokeWidth={2}/> Compliance</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {['SOC2 Type II', 'ISO 27001', 'GDPR', 'HIPAA'].map((cert, i) => (
                <div key={i} className="flex items-center gap-2 bg-[#0A0A0C] border border-[#2C2C2E] rounded-xl p-3">
                  <CheckCircle2 size={16} className="text-[#30D158]" />
                  <span className="text-[13px] font-bold text-[#F5F5F7]">{cert}</span>
                </div>
              ))}
            </div>
            <div className="flex-grow">
              <p className="text-[11px] font-bold text-[#86868B] mb-3 uppercase tracking-wider">Audit Logs</p>
              <div className="space-y-3">
                {[
                  { log: 'Access policy updated', time: '2h ago' },
                  { log: 'Encryption keys rotated', time: '12h ago' },
                  { log: 'Vuln scan completed', time: '1d ago' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <FileText size={12} className="text-[#86868B]" />
                    <p className="text-[13px] font-medium text-[#F5F5F7] flex-grow">{item.log}</p>
                    <span className="text-[11px] text-[#86868B]">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="bg-[#1C1C1E] rounded-[24px] p-8 border border-[#2C2C2E] flex flex-col h-[320px]">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[20px] font-bold tracking-[-0.02em] flex items-center gap-3"><Activity size={22} className="text-[#30D158]" strokeWidth={2}/> Uptime</h2>
              <span className="text-[13px] font-semibold text-[#30D158]">99.99%</span>
            </div>
            <div className="flex-grow flex items-end justify-between gap-1 pb-4">
              {Array.from({ length: 30 }).map((_, i) => (
                <motion.div key={i} initial={{ height: 0 }} whileInView={{ height: `${Math.random() * 30 + 70}%` }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.02 }}
                  className={`w-full rounded-sm ${i === 15 ? 'bg-[#FF9F0A]' : 'bg-[#30D158]'} opacity-80 hover:opacity-100 transition-opacity`} />
              ))}
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-[#2C2C2E]">
              <span className="text-[12px] font-semibold text-[#86868B]">30 DAYS AGO</span>
              <span className="text-[12px] font-semibold text-[#86868B]">TODAY</span>
            </div>
          </motion.div>
        </div>

        {/* SEARCH BAR */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} 
          className="w-full bg-[#0A0A0C] rounded-[20px] border border-[#2C2C2E] p-5 flex items-center gap-4 mb-8 shadow-xl hover:border-[#48484A] transition-colors cursor-pointer group">
          <Search size={22} className="text-[#86868B] group-hover:text-white transition-colors ml-2" />
          <p className="text-[17px] text-[#86868B] font-medium flex-grow">Search infrastructure, logs, incidents...</p>
          <div className="flex items-center gap-1 bg-[#1C1C1E] border border-[#2C2C2E] rounded-md px-2.5 py-1.5">
            <Command size={14} className="text-[#86868B]" />
            <span className="text-[13px] font-bold text-[#86868B]">K</span>
          </div>
        </motion.div>

        {/* AI COPILOT & TEAM */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
           <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} 
            className="col-span-1 lg:col-span-2 bg-gradient-to-br from-[#1C1C1E] to-[#0A0A0C] rounded-[24px] p-8 border border-[#2C2C2E] relative overflow-hidden flex flex-col min-h-[280px]">
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#0A84FF]/10 blur-[80px] rounded-full pointer-events-none" />
             <div className="flex items-center gap-3 mb-6 relative z-10">
               <div className="w-12 h-12 rounded-xl bg-[#0A84FF]/20 flex items-center justify-center"><Sparkles size={24} className="text-[#0A84FF]" /></div>
               <div>
                 <h2 className="text-[20px] font-bold tracking-[-0.02em]">AI Copilot</h2>
                 <p className="text-[14px] text-[#86868B]">Automated Root Cause Analysis</p>
               </div>
             </div>
             <div className="bg-[#0A0A0C] border border-[#2C2C2E] rounded-2xl p-6 relative z-10 flex-grow">
               <p className="text-[15px] leading-relaxed text-[#F5F5F7]">
                 <span className="text-[#FF453A] font-bold">Alert:</span> Log Ingestion service is down on port 8000. <br/><br/>
                 <span className="text-[#0A84FF] font-bold">Analysis:</span> High memory usage caused a pod crash. Auto-scaling failed due to quota limits. <br/><br/>
                 <span className="text-[#30D158] font-bold">Suggestion:</span> Increase memory limit to 2GB and restart the service.
               </p>
             </div>
             <div className="mt-5 flex gap-3 relative z-10">
               <button className="px-5 py-2.5 bg-[#0A84FF] text-white rounded-full text-[14px] font-bold hover:bg-[#007AFF] transition-colors">Apply Fix</button>
               <button className="px-5 py-2.5 bg-[#2C2C2E] text-white rounded-full text-[14px] font-bold hover:bg-[#3A3A3C] transition-colors">Dismiss</button>
             </div>
           </motion.div>

           <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} 
            className="col-span-1 bg-[#1C1C1E] rounded-[24px] p-8 border border-[#2C2C2E]">
             <h2 className="text-[20px] font-bold tracking-[-0.02em] flex items-center gap-3 mb-8"><Users size={22} className="text-[#86868B]" strokeWidth={2}/> Team Activity</h2>
             <div className="space-y-6">
               {[
                 { user: 'Aryan', action: 'deployed v2.0', time: '2m ago', avatar: 'AT', color: 'bg-[#0A84FF]' },
                 { user: 'John', action: 'resolved INC-4092', time: '15m ago', avatar: 'JD', color: 'bg-[#FF9F0A]' },
                 { user: 'Sarah', action: 'updated policy', time: '1h ago', avatar: 'SM', color: 'bg-[#30D158]' },
               ].map((act, i) => (
                 <div key={i} className="flex items-center gap-4">
                   <div className={`w-10 h-10 rounded-full ${act.color} flex items-center justify-center text-[13px] font-bold text-white`}>{act.avatar}</div>
                   <div className="flex-grow">
                     <p className="text-[15px] font-medium"><span className="font-bold text-white">{act.user}</span> <span className="text-[#86868B]">{act.action}</span></p>
                     <p className="text-[13px] text-[#86868B]">{act.time}</p>
                   </div>
                 </div>
               ))}
             </div>
           </motion.div>
        </div>

        {/* INTEGRATIONS GRID */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} 
          className="w-full bg-[#1C1C1E] rounded-[24px] p-8 border border-[#2C2C2E] mb-8">
           <div className="flex justify-between items-center mb-8">
             <div>
               <h2 className="text-[20px] font-bold tracking-[-0.02em] flex items-center gap-3"><Box size={22} className="text-[#86868B]" strokeWidth={2}/> Integrations</h2>
               <p className="text-[14px] text-[#86868B] mt-1">Connect your favorite tools with AIOps.</p>
             </div>
             <button className="text-[13px] font-bold text-[#0A84FF] hover:text-white transition-colors">View Directory</button>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               { name: 'Slack', icon: MessageSquare, color: 'text-[#4A154B]', bg: 'bg-[#4A154B]/10' },
               { name: 'GitHub', icon: GitCommit, color: 'text-[#F5F5F7]', bg: 'bg-[#F5F5F7]/10' },
               { name: 'AWS', icon: Server, color: 'text-[#FF9F0A]', bg: 'bg-[#FF9F0A]/10' },
               { name: 'Datadog', icon: Activity, color: 'text-[#632CA6]', bg: 'bg-[#632CA6]/10' },
             ].map((int, i) => (
               <div key={i} className="flex flex-col items-center justify-center p-6 rounded-xl bg-[#0A0A0C] border border-[#2C2C2E] hover:border-[#48484A] transition-colors cursor-pointer group">
                 <div className={`w-12 h-12 rounded-xl ${int.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                   <int.icon size={24} className={int.color} />
                 </div>
                 <span className="text-[14px] font-bold text-[#F5F5F7]">{int.name}</span>
               </div>
             ))}
           </div>
        </motion.div>

        {/* INFRA & EVENTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="bg-[#1C1C1E] rounded-[24px] p-8 border border-[#2C2C2E]">
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

          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="bg-[#1C1C1E] rounded-[24px] p-8 border border-[#2C2C2E]">
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

        {/* TOPOLOGY, DEPLOYMENTS, RESOURCES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
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

        {/* TERMINAL & RESOURCES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
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

        {/* FULL PIPELINE ASSURANCE */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} 
          className="w-full bg-[#1C1C1E] rounded-[24px] p-10 md:p-14 border border-[#2C2C2E] flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
          
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
