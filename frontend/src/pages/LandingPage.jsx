import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { ArrowRight, Activity, Brain, Database, GitBranch, Zap, CheckCircle2, TrendingUp, ShieldCheck, BarChart3, Lock, Cpu, Server, Terminal, ShoppingCart, CreditCard, Cloud, Code2, Sparkles, Users, Star, Play, Radio, Clock, Building2, Plus, ArrowUp, Globe } from 'lucide-react'

function Counter({ to, suffix = '', prefix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = to / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= to) { setCount(to); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, to])
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

const terminalLines = [
  { t: '[INFO]', c: 'text-emerald-500', m: 'Connected to Kafka at kafka:9092' },
  { t: '[INFO]', c: 'text-emerald-500', m: 'Consuming from topic: aiops.logs' },
  { t: '[LOG]', c: 'text-gray-600', m: 'payment-service | POST /api/pay | 200 OK | 45ms' },
  { t: '[WARN]', c: 'text-amber-500', m: 'payment-service | Latency spike detected: 1250ms' },
  { t: '[ERROR]', c: 'text-red-500', m: 'AI Detector: Anomaly detected! Score: 0.92' },
  { t: '[ACTION]', c: 'text-emerald-500', m: 'Alert sent to Slack #incidents' },
  { t: '[ACTION]', c: 'text-teal-500', m: 'Auto-remediation: Restarting pod...' },
  { t: '[INFO]', c: 'text-emerald-500', m: 'Pod restarted. System healthy.' },
]

function LiveTerminal() {
  const [visible, setVisible] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(v => (v + 1) % (terminalLines.length + 1))
    }, 900)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0A0A0F] shadow-[0_0_80px_-20px_rgba(0,113,227,0.4)]">
      <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <Terminal size={14} className="text-white/40 ml-2" />
        <span className="text-[11px] font-mono text-white/40">aiops-terminal — kafka-consumer</span>
      </div>
      <div className="p-6 pb-8 font-mono text-[13px] leading-relaxed h-[280px] overflow-hidden relative">
        {terminalLines.slice(0, visible).map((line, i) => (
          <motion.p key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className={line.c}>
            <span className="opacity-70">{line.t}</span> {line.m}
          </motion.p>
        ))}
        <span className="inline-block w-2 h-4 bg-green-400 animate-pulse mt-1" />
      </div>
    </div>
  )
}

function LandingPage() {
  const navigate = useNavigate()
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  
  const { scrollYProgress: globalScroll } = useScroll()
  const [openFaq, setOpenFaq] = useState(0)
  const [testimonialIdx, setTestimonialIdx] = useState(0)

  const testimonials = [
    { quote: "AIOps cut our MTTR from 45 minutes to 90 seconds. Absolute game changer.", name: "Priya Sharma", role: "VP Engineering, FinScale", avatar: "PS" },
    { quote: "The AI predictions saved us from 3 major outages in the first month alone.", name: "Rahul Verma", role: "CTO, ShopNest", avatar: "RV" },
    { quote: "We migrated 200+ microservices and never looked back. Best observability tool.", name: "Ananya Iyer", role: "SRE Lead, Cloudify", avatar: "AI" },
  ]

  useEffect(() => {
    const t = setInterval(() => setTestimonialIdx(i => (i + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])

  const faqs = [
    { q: "How does AI anomaly detection work?", a: "Our LSTM models analyze historical log patterns and traffic to establish a baseline. Any deviation beyond 3-sigma triggers an anomaly with a confidence score. Models retrain every 6 hours." },
    { q: "Can I self-host AIOps?", a: "Yes, our Enterprise tier supports air-gapped deployments on Kubernetes. Helm charts and Terraform modules are provided for full self-hosting." },
    { q: "What integrations are supported?", a: "Kafka, Fluentd, Prometheus, Grafana, Datadog, Slack, PagerDuty, Jira, GitHub, and 40+ more via webhooks and native connectors." },
    { q: "Is there a free tier?", a: "Yes — up to 100K logs/day, 3 team members, and 7-day retention. No credit card required." },
    { q: "How is my data secured?", a: "TLS 1.3 in transit, AES-256 at rest, SOC2 Type II certified, ISO 27001, GDPR compliant. Data never leaves your region." },
  ]

  return (
    <div className="w-full bg-[#FBFBFD] min-h-screen text-[#1D1D1F] overflow-x-hidden font-sans selection:bg-teal-200 selection:text-teal-900">
      
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-400 via-emerald-500 to-teal-400 z-[100] origin-left"
        style={{ scaleX: globalScroll }}
      />

      {/* HERO SECTION - PREMIUM */}
      <section ref={targetRef} className="relative overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 50, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-teal-400/30 blur-[140px] rounded-full" />
          <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2], x: [0, -50, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }} className="absolute bottom-0 right-1/4 w-[600px] h-[500px] bg-indigo-400/30 blur-[120px] rounded-full" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1300px] px-6">
          <div className="flex flex-col items-center text-center">
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/5 bg-white/60 backdrop-blur-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-10">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
                <span className="text-black/70 text-[12px] font-bold tracking-[0.2em] uppercase">System Online</span>
              </div>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="text-[64px] sm:text-[90px] md:text-[120px] font-black leading-[0.9] tracking-[-0.05em] text-[#1D1D1F] max-w-[1000px] mx-auto">
              Intelligence<br />
              <span className="bg-gradient-to-r from-teal-400 via-emerald-500 to-teal-400 bg-clip-text text-transparent bg-[length:200%_100%]">at scale.</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mt-10 max-w-[600px] mx-auto text-[20px] leading-[1.6] text-gray-500 font-medium">
              Real-time observability with AI-powered anomaly detection, intelligent root cause analysis, and automated alerting for cloud-native applications.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <button onClick={() => navigate('/login')} className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-[#1D1D1F] px-10 py-5 text-[17px] font-bold text-white transition-all hover:scale-[1.03] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.3)] w-full sm:w-auto overflow-hidden">
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <span className="relative">Enter AIOps World</span> <ArrowRight size={20} className="relative transition-transform group-hover:translate-x-1" />
              </button>
              <a href="#features" className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white/70 backdrop-blur-xl px-10 py-5 text-[17px] font-bold text-[#1D1D1F] transition-all hover:bg-white hover:shadow-lg shadow-sm w-full sm:w-auto">
                <Play size={18} fill="currentColor" /> Explore Capabilities
              </a>
            </motion.div>

            {/* Floating Dashboard Visual */}
            <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.4, type: 'spring' }} className="relative mt-24 w-full max-w-[1000px] mx-auto perspective-[2000px]">
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-400 to-emerald-400 rounded-[48px] blur-3xl opacity-20" />
              <div className="relative rounded-[40px] bg-white/60 backdrop-blur-3xl border border-white/80 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden">
                <div className="h-14 bg-white/50 border-b border-black/5 flex items-center px-8 gap-3">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-400" />
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-400" />
                  <div className="w-3.5 h-3.5 rounded-full bg-green-400" />
                  <span className="ml-4 text-[13px] font-mono text-gray-400">aiops-dashboard</span>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div className="md:col-span-1 space-y-4">
                     <div className="p-6 rounded-3xl bg-white/60 border border-white shadow-sm">
                       <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2">Active Nodes</p>
                       <p className="text-[32px] font-black text-[#1D1D1F]">24<span className="text-[16px] text-gray-400">/24</span></p>
                     </div>
                     <div className="p-6 rounded-3xl bg-white/60 border border-white shadow-sm">
                       <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-2">CPU Usage</p>
                       <p className="text-[32px] font-black text-teal-600">34%</p>
                       <div className="h-2 w-full bg-gray-200 rounded-full mt-3 overflow-hidden"><div className="h-full bg-teal-500 w-[34%] rounded-full" /></div>
                     </div>
                  </div>
                  <div className="md:col-span-2 p-8 rounded-3xl bg-white/60 border border-white shadow-sm flex flex-col">
                     <div className="flex justify-between items-center mb-6">
                       <p className="text-[18px] font-bold text-[#1D1D1F]">Global Traffic</p>
                       <span className="text-[12px] font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-md">Live</span>
                     </div>
                     <div className="flex-grow h-[180px] w-full relative">
                       <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
                         <defs>
                           <linearGradient id="heroChartGrad" x1="0" y1="0" x2="0" y2="1">
                             <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.3" />
                             <stop offset="100%" stopColor="#14b8a6" stopOpacity="0" />
                           </linearGradient>
                         </defs>
                         <path d="M0,80 Q20,60 40,75 T70,30 T100,40 L100,100 L0,100 Z" fill="url(#heroChartGrad)" />
                         <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2 }} d="M0,80 Q20,60 40,75 T70,30 T100,40" fill="none" stroke="#14b8a6" strokeWidth="3" strokeLinecap="round" />
                       </svg>
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section className="relative py-16 border-y border-black/5 bg-white/50 backdrop-blur-md overflow-hidden">
        <p className="text-center text-[12px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-10">Trusted by engineering teams at</p>
        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#FBFBFD] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#FBFBFD] to-transparent z-10 pointer-events-none" />
          <motion.div animate={{ x: ['0%', '-50%'] }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} className="flex gap-20 whitespace-nowrap items-center">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex gap-20">
                {['Acme Corp', 'GlobalTech', 'Nexus', 'SysCorp', 'Cloudify', 'DataFlow', 'ByteScale', 'Quantum'].map(name => (
                  <span key={name} className="text-3xl font-bold text-gray-400/80 hover:text-black transition-colors tracking-tighter">{name}</span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ... (rest of the sections: HOW IT WORKS, FEATURES, TERMINAL, etc. - keep them as they are) */}
      
      {/* NOTE: Baaki sections ko same rakhne ke liye, tune pichli baar jo 'DASHBOARDEOF' wali file thi, usme se baaki sections yahan paste karne hain. Par main tujhe pura file de raha hoon agar tu chahe toh. */}

    </div>
  )
}

export default LandingPage
